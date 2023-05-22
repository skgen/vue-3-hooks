import type { Awaitable } from '@src/types';
import { ref, type Ref } from 'vue';

type UseAsyncOptions = {
  trackLatest: boolean;
};

type UseAsyncReturnType<P extends unknown[], R> = [
  (...args: P) => Promise<R>,
  Ref<boolean>,
];

export default function useAsync
<P extends unknown[], R>(
  callback: (...args: P) => Awaitable<R>,
  options?: UseAsyncOptions,
): UseAsyncReturnType<P, R> {
  const loading = ref(false);
  let loadingTransaction = 0;

  async function exec(...args: P) {
    loadingTransaction += 1;
    const scopedLoadingTransaction = loadingTransaction;
    loading.value = true;
    try {
      return await callback(...args);
    } finally {
      if (loadingTransaction === scopedLoadingTransaction || !options?.trackLatest) {
        loading.value = false;
      }
    }
  }

  return [exec, loading];
}
