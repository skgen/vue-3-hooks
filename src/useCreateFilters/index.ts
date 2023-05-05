import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
import rison from 'rison';
import merge from 'lodash/merge';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { logger } from '@src/lib/logger';

const scalarFilterValueTypes = [
  z.string().nullable().optional(),
  z.number().nullable().optional(),
  z.boolean().nullable().optional(),
  z.array(z.string()).optional(),
] as const;

const scalarFilterValueSchema = z.union(scalarFilterValueTypes);

type ScalarFilterValue = z.infer<typeof scalarFilterValueSchema>;

const filterValueSchema: z.ZodType<FilterValue> = z.union([
  ...scalarFilterValueTypes,
  z.lazy(() => z.record(z.string(), filterValueSchema)),
]);

type FilterValue = ScalarFilterValue | {
  [key: string]: FilterValue;
};

const filtersSchema = z.record(
  z.string(),
  filterValueSchema,
);

type Filters = z.infer<typeof filtersSchema>;

function filtersToQueryFilters(o: Filters, defaultFilters: Filters): Filters {
  const cleaned: Filters = {};
  for (const [key, value] of Object.entries(o)) {
    if (isNumber(value) || isString(value) || isBoolean(value)) {
      if (!isEqual(value, defaultFilters[key])) {
        cleaned[key] = value;
      }
    } else if (isArray(value)) {
      if (!isEqual([...value], defaultFilters[key])) {
        cleaned[key] = [...value];
      }
    } else if (isObject(value)) {
      const deep = filtersToQueryFilters(value, defaultFilters) as Filters;
      if (Object.keys(deep).length > 0) {
        if (!isEqual(deep, defaultFilters[key])) {
          cleaned[key] = deep;
        }
      }
    }
  }
  return cleaned;
}

function encodeFiltersModelToQuery<T extends Record<string, unknown>>(model: T): string | null {
  const cleaned = model;
  if (Object.keys(cleaned).length > 0) {
    const encoded = rison.encode(cleaned);
    return encoded;
  }
  return null;
}

function decodeFiltersModelFromQuery(query: string) {
  try {
    return rison.decode(query);
  } catch (e) {
    return null;
  }
}

type HookOptions<T extends Filters> = {
  schema: z.ZodType<T>;
  filters: () => T;
  urlBound: boolean;
  queryName?: string;
};

export default function useCreateFilters<T extends Filters>(options: HookOptions<T>) {
  const router = useRouter();
  const route = useRoute();
  const filters = reactive(options.filters());

  const queryName = options.queryName ?? 'f';

  if (options.urlBound) {
    const encodedQueryFilters = route.query[queryName];
    if (isString(encodedQueryFilters)) {
      const queryFilters = decodeFiltersModelFromQuery(encodedQueryFilters);
      try {
        const mergedDefaultFilters = merge(merge({}, options.filters()), queryFilters);
        const newFilters = options.schema.parse(mergedDefaultFilters);
        Object.assign(filters, newFilters);
      } catch (e) {
        logger.warn('Corrupted filters have been reset');
      }
    }
  }

  const snapshot = reactive({ ...filters });

  watch(filters, (newFilters) => {
    const queryFilters = filtersToQueryFilters(newFilters, options.filters());
    const encodedQueryFilters = encodeFiltersModelToQuery(queryFilters);
    const newQuery = encodedQueryFilters ?? undefined;
    router.replace({
      ...route,
      query: {
        ...route.query,
        [queryName]: newQuery,
      },
    });
  });

  function commit() {
    Object.assign(filters, snapshot);
  }

  function sync() {
    Object.assign(snapshot, filters);
  }

  function reset() {
    Object.assign(filters, options.filters());
    Object.assign(snapshot, options.filters());
  }

  return {
    snapshot,
    filters,
    $commit: commit,
    $reset: reset,
    $sync: sync,
  };
}
