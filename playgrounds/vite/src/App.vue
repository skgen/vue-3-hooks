<template>
  <mkt-app>
    <div class="pux-App">
      <router-view />
    </div>
  </mkt-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const appVersion = `v${__APP__.version}`;

  document.title = `[${appVersion}] Vite playground`;
});
</script>
