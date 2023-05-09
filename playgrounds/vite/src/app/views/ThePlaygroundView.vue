<template>
  <div class="pux-ThePlaygroundView">
    <AppHookDemo
      v-for="item of list"
      :key="item.name"
    >
      <template #hook>
        {{ item.name }}
      </template>
      <component :is="item.component" />
    </AppHookDemo>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import AppHookDemo from '@/app/components/partials/AppHookDemo.vue';

const hooks = [
  'UseAsync',
  'UseFilters',
];

const list = hooks.map((hook) => ({
  name: hook,
  component: defineAsyncComponent(() => import(`@/app/components/${hook}.vue`)),
}));

</script>

<style lang="scss">
.pux-ThePlaygroundView {
    display: flex;
    flex-direction: column;
    gap: var(--app-m-4);
    min-height: 100vh;
    padding: var(--app-m-2);
}
</style>
