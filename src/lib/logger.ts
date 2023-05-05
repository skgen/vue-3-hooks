type LogParameters = Parameters<typeof console.log>;
type LogCallback = typeof console.log;

function log(l: LogParameters, o: LogCallback) {
  o(`[@patriarche/vue-hooks]: ${l}`);
}

export const logger = {
  log(...l: LogParameters) {
    log(l, console.log);
  },
  warn(...l: LogParameters) {
    log(l, console.warn);
  },
};
