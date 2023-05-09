# useFilters

A hook for managing filters bound or not to the URL

## Definition
```
function useFilters
<T extends Filters>(
  options: UseFiltersOptions<T>,
): UseFiltersReturnType<T>
```

## Options
```
type UseFiltersOptions<T extends Filters> = {
  schema: z.ZodType<T>;
  filters: () => T;
  urlBound: boolean;
  queryName?: string;
};
```
`schema`: The [Zod](https://www.npmjs.com/package/zod) Schema to validate the model
`filters`: A function returning the default filters
`urlBound`: If set to `true`, the filters will be encoded with [rison](https://www.npmjs.com/package/rison) and stored in the URL
`queryName`: The key of the URL query parameter to store the filters, defaults to `f`

## Return type
```
type UseFiltersReturnType<T> = {
  snapshot: UnwrapNestedRefs<UnwrapNestedRefs<T>>;
  filters: UnwrapNestedRefs<T>;
  $commit: () => void;
  $reset: () => void;
  $sync: () => void;
};
```
`snapshot`: A snapshot of the filters, you can see it as an in memory mirror of the filters, waiting to be commited
`filters`: The model containing the filters, this is the model bount to the URL (if `urlBound` is set to `true`)
`$commit`: Apply all the modifications of `snapshot` to filters
`$reset`: Reset `filters` & `snapshot` to `option.filters` return value
`$sync`: Reset the `snapshot` value to current `filters` value

> *i.e.*: `snapshot` & `filters` are reactive objects

## Example
```
import { useFilters } from '@patriarche/vue-hooks';
import { z } from 'zod';

const filtersSchema = z.object({
  name: z.string().nullable(),
  age: z.number(),
  isAdmin: z.boolean(),
});

type FiltersSchema = z.infer<typeof filtersSchema>;

const {
  snapshot, filters, $commit, $reset, $sync,
} = useFilters<FiltersSchema>({
  schema: filtersSchema,
  filters: () => ({
    name: 'Panda',
    age: 1,
    isAdmin: true,
  }),
  urlBound: true,
  queryName: 'customFiltersQueryName',
});
```