export function isDef<T>(v: T): v is T extends undefined ? never : T {
  return typeof v !== 'undefined';
}

export function isValue<T>(v: T): v is NonNullable<T> {
  return !(!isDef(v) || v === null);
}

export function isArray<T>(v: unknown): v is T[] {
  return isValue(v) && Array.isArray(v);
}

export function isFunc(v: unknown): boolean {
  return isValue(v) && typeof v === 'function';
}

export function isObject(v: unknown) : v is Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isValue(v) && v.constructor === Object;
}

export function isString(v: unknown) : v is string {
  return isValue(v) && typeof v === 'string';
}

export function isNumber(v: unknown) : v is number {
  return isValue(v) && typeof v === 'number' && !Number.isNaN(v);
}

export function getDefault<T, D>(v: T, d: D): NonNullable<T> | D {
  return isValue(v) ? v : d;
}

export function getDefaultAs
  <T, R = T, D = R>(
  t: T,
  c: (v: NonNullable<T>) => NonNullable<R> | D,
  d: NonNullable<R> | D,
): NonNullable<R> | D {
  return isValue(t) ? c(t) : d;
}

export function isEmpty<T extends Record<string, unknown> | unknown[] | string | undefined | null>(v: T)
  : boolean {
  if (!isValue(v)) {
    return true;
  }
  if (isObject(v)) {
    return Object.keys(v).length === 0;
  }
  if (isArray(v)) {
    return v.length === 0;
  }
  if (isString(v)) {
    return v.length === 0;
  }
  throw new Error('Element is not Object nor Array not string');
}
