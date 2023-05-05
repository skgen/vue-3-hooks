import { ref, type Ref } from 'vue';

export default function useAsync
<T, S extends []>(action: (...args: S) => Awaitable<T>): [
  (...args: S) => Promise<void>,
  Ref<boolean>,
] {
  const loading = ref(false);

  async function exec(...args: S) {
    loading.value = true;
    try {
      await action(...args);
    } finally {
      loading.value = false;
    }
  }

  return [exec, loading];
}
