# useAsync

A simple hook for tracking loading state in an async action

## Definition
```
function useAsync
<P extends [], R>(
  callback: (...args: P) => Awaitable<R>,
  options?: UseAsyncOptions,
): UseAsyncReturnType<P, R>
```

## Options
```
type UseAsyncOptions = {
  trackLatest: boolean;
};
```
`trackLatest`: If set to `true`, the loading state will only track the latest callback call
> *i.e.:* If you call the callback twice in a row, `loading` might get back to `false` from first callback end after second callback has started.

## Return type
```
type UseAsyncReturnType<P extends [], R> = [
  (...args: P) => Promise<R>,
  Ref<boolean>,
];
```
`[0]`: The reference of the callback passed in parameter

`[1]`: A `ref` of the loading state

## Example
```
import { useAsync } from '@patriarche/vue-hooks';

const [handleAsync, loading] = useAsync(async () => 
  // Do some async stuff
);
```