<template>
  <p>
    Trigger an async action of {{ time }}ms
  </p>
  <p>
    Time remaining : {{ time - diff }}ms
  </p>
  <p>
    Loading : <strong>{{ loading }}</strong>
  </p>
  <mk-button
    outlined
    :disabled="loading"
    @click="handleAsync(time)"
  >
    Execute async
  </mk-button>
</template>

<script lang="ts" setup>
import { useAsync } from '@patriarche/vue-hooks';
import { computed, ref, watch } from 'vue';

const time = 2000;
const start = ref(0);
const elapsed = ref(time);
let frame: number | null = null;

const [handleAsync, loading] = useAsync(
  async (scopedTime: number) => {
    await new Promise<void>((done) => {
      setTimeout(() => {
        done();
      }, scopedTime);
    });
  },
);

function decount() {
  frame = requestAnimationFrame(() => {
    elapsed.value = new Date().getTime();
    decount();
  });
}

const diff = computed(() => elapsed.value - start.value);

watch(loading, (newLoading) => {
  if (newLoading) {
    start.value = new Date().getTime();
    decount();
  } else if (frame) {
    cancelAnimationFrame(frame);
    start.value = 0;
    elapsed.value = time;
  }
});
</script>
