<template>
  <p>
    <mk-button
      outlined
      @click="handleMutateSnapshot"
    >
      Mutate snapshot
    </mk-button>
    {{ ' ' }}
    <mk-button
      outlined
      @click="handleMutateFilters"
    >
      Mutate filters
    </mk-button>
    {{ ' ' }}
    <mk-button
      outlined
      @click="$reset"
    >
      Reset
    </mk-button>
    {{ ' ' }}
    <mk-button
      outlined
      @click="$sync"
    >
      Synchronize snapshot to filters
    </mk-button>
    {{ ' ' }}
    <mk-button
      outlined
      @click="$commit"
    >
      Commit snapshot to filters
    </mk-button>
  </p>
  <p>
    <code>filters</code>
  </p>
  <p>
    <pre>{{ JSON.stringify(filters, null, 2) }}</pre>
  </p>
  <p>
    <code>snapshot</code>
  </p>
  <p>
    <pre>{{ JSON.stringify(snapshot, null, 2) }}</pre>
  </p>
</template>

<script lang="ts" setup>
import { useCreateFilters } from '@patriarche/vue-hooks';
import { z } from 'zod';

const filtersSchema = z.object({
  name: z.string().nullable(),
  age: z.number(),
  isAdmin: z.boolean(),
});

type FiltersSchema = z.infer<typeof filtersSchema>;

const {
  snapshot, filters, $commit, $reset, $sync,
} = useCreateFilters<FiltersSchema>({
  schema: filtersSchema,
  filters: () => ({
    name: 'Panda',
    age: 1,
    isAdmin: true,
  }),
  urlBound: true,
  queryName: 'customFiltersQueryName',
});

function handleMutateSnapshot() {
  snapshot.age += 1;
}

function handleMutateFilters() {
  filters.age += 1;
}

</script>
