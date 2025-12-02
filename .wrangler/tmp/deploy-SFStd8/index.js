var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
var unenvProcess = new Process({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime3,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
var {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert: assert2,
  disconnect,
  mainModule
} = unenvProcess;
var {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// C:/Users/mutia/AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/tinybase/index.js
var getTypeOf = /* @__PURE__ */ __name((thing) => typeof thing, "getTypeOf");
var EMPTY_STRING = "";
var STRING = getTypeOf(EMPTY_STRING);
var BOOLEAN = getTypeOf(true);
var NUMBER = getTypeOf(0);
var FUNCTION = getTypeOf(getTypeOf);
var TYPE = "type";
var DEFAULT = "default";
var SUM = "sum";
var AVG = "avg";
var MIN = "min";
var MAX = "max";
var LISTENER = "Listener";
var RESULT = "Result";
var GET = "get";
var SET = "set";
var ADD = "add";
var DEL = "del";
var HAS = "Has";
var IDS = "Ids";
var TABLE = "Table";
var TABLES = TABLE + "s";
var TABLE_IDS = TABLE + IDS;
var ROW = "Row";
var ROW_COUNT = ROW + "Count";
var ROW_IDS = ROW + IDS;
var SORTED_ROW_IDS = "Sorted" + ROW + IDS;
var CELL = "Cell";
var CELL_IDS = CELL + IDS;
var VALUE = "Value";
var VALUES = VALUE + "s";
var VALUE_IDS = VALUE + IDS;
var TRANSACTION = "Transaction";
var id = /* @__PURE__ */ __name((key) => EMPTY_STRING + key, "id");
var strStartsWith = /* @__PURE__ */ __name((str, prefix) => str.startsWith(prefix), "strStartsWith");
var strEndsWith = /* @__PURE__ */ __name((str, suffix) => str.endsWith(suffix), "strEndsWith");
var strSplit = /* @__PURE__ */ __name((str, separator = EMPTY_STRING, limit) => str.split(separator, limit), "strSplit");
var GLOBAL = globalThis;
var math = Math;
var mathMax = math.max;
var mathMin = math.min;
var mathFloor = math.floor;
var isFiniteNumber = isFinite;
var isInstanceOf = /* @__PURE__ */ __name((thing, cls) => thing instanceof cls, "isInstanceOf");
var isUndefined = /* @__PURE__ */ __name((thing) => thing == void 0, "isUndefined");
var ifNotUndefined = /* @__PURE__ */ __name((value, then, otherwise) => isUndefined(value) ? otherwise?.() : then(value), "ifNotUndefined");
var isTypeStringOrBoolean = /* @__PURE__ */ __name((type) => type == STRING || type == BOOLEAN, "isTypeStringOrBoolean");
var isString = /* @__PURE__ */ __name((thing) => getTypeOf(thing) == STRING, "isString");
var isFunction = /* @__PURE__ */ __name((thing) => getTypeOf(thing) == FUNCTION, "isFunction");
var isArray = /* @__PURE__ */ __name((thing) => Array.isArray(thing), "isArray");
var slice = /* @__PURE__ */ __name((arrayOrString, start, end) => arrayOrString.slice(start, end), "slice");
var size = /* @__PURE__ */ __name((arrayOrString) => arrayOrString.length, "size");
var test = /* @__PURE__ */ __name((regex, subject) => regex.test(subject), "test");
var getUndefined = /* @__PURE__ */ __name(() => void 0, "getUndefined");
var arrayHas = /* @__PURE__ */ __name((array, value) => array.includes(value), "arrayHas");
var arrayEvery = /* @__PURE__ */ __name((array, cb) => array.every(cb), "arrayEvery");
var arrayIsEqual = /* @__PURE__ */ __name((array1, array2) => size(array1) === size(array2) && arrayEvery(array1, (value1, index) => array2[index] === value1), "arrayIsEqual");
var arrayIsSorted = /* @__PURE__ */ __name((array, sorter) => arrayEvery(
  array,
  (value, index) => index == 0 || sorter(array[index - 1], value) <= 0
), "arrayIsSorted");
var arraySort = /* @__PURE__ */ __name((array, sorter) => array.sort(sorter), "arraySort");
var arrayForEach = /* @__PURE__ */ __name((array, cb) => array.forEach(cb), "arrayForEach");
var arrayMap = /* @__PURE__ */ __name((array, cb) => array.map(cb), "arrayMap");
var arraySum = /* @__PURE__ */ __name((array) => arrayReduce(array, (i, j) => i + j, 0), "arraySum");
var arrayIsEmpty = /* @__PURE__ */ __name((array) => size(array) == 0, "arrayIsEmpty");
var arrayReduce = /* @__PURE__ */ __name((array, cb, initial) => array.reduce(cb, initial), "arrayReduce");
var arrayClear = /* @__PURE__ */ __name((array, to) => array.splice(0, to), "arrayClear");
var arrayPush = /* @__PURE__ */ __name((array, ...values) => array.push(...values), "arrayPush");
var arrayPop = /* @__PURE__ */ __name((array) => array.pop(), "arrayPop");
var arrayUnshift = /* @__PURE__ */ __name((array, ...values) => array.unshift(...values), "arrayUnshift");
var arrayShift = /* @__PURE__ */ __name((array) => array.shift(), "arrayShift");
var object = Object;
var getPrototypeOf = /* @__PURE__ */ __name((obj) => object.getPrototypeOf(obj), "getPrototypeOf");
var objEntries = object.entries;
var objFrozen = object.isFrozen;
var isObject = /* @__PURE__ */ __name((obj) => !isUndefined(obj) && ifNotUndefined(
  getPrototypeOf(obj),
  (objPrototype) => objPrototype == object.prototype || isUndefined(getPrototypeOf(objPrototype)),
  /* istanbul ignore next */
  () => true
), "isObject");
var objIds = object.keys;
var objFreeze = object.freeze;
var objNew = /* @__PURE__ */ __name((entries = []) => object.fromEntries(entries), "objNew");
var objHas = /* @__PURE__ */ __name((obj, id2) => id2 in obj, "objHas");
var objDel = /* @__PURE__ */ __name((obj, id2) => {
  delete obj[id2];
  return obj;
}, "objDel");
var objForEach = /* @__PURE__ */ __name((obj, cb) => arrayForEach(objEntries(obj), ([id2, value]) => cb(value, id2)), "objForEach");
var objToArray = /* @__PURE__ */ __name((obj, cb) => arrayMap(objEntries(obj), ([id2, value]) => cb(value, id2)), "objToArray");
var objSize = /* @__PURE__ */ __name((obj) => size(objIds(obj)), "objSize");
var objIsEmpty = /* @__PURE__ */ __name((obj) => isObject(obj) && objSize(obj) == 0, "objIsEmpty");
var objEnsure = /* @__PURE__ */ __name((obj, id2, getDefaultValue) => {
  if (!objHas(obj, id2)) {
    obj[id2] = getDefaultValue();
  }
  return obj[id2];
}, "objEnsure");
var objValidate = /* @__PURE__ */ __name((obj, validateChild, onInvalidObj, emptyIsValid = 0) => {
  if (isUndefined(obj) || !isObject(obj) || !emptyIsValid && objIsEmpty(obj) || objFrozen(obj)) {
    onInvalidObj?.();
    return false;
  }
  objToArray(obj, (child, id2) => {
    if (!validateChild(child, id2)) {
      objDel(obj, id2);
    }
  });
  return emptyIsValid ? true : !objIsEmpty(obj);
}, "objValidate");
var collSizeN = /* @__PURE__ */ __name((collSizer) => (coll) => arrayReduce(collValues(coll), (total, coll2) => total + collSizer(coll2), 0), "collSizeN");
var collSize = /* @__PURE__ */ __name((coll) => coll?.size ?? 0, "collSize");
var collSize2 = collSizeN(collSize);
var collSize3 = collSizeN(collSize2);
var collSize4 = collSizeN(collSize3);
var collHas = /* @__PURE__ */ __name((coll, keyOrValue) => coll?.has(keyOrValue) ?? false, "collHas");
var collIsEmpty = /* @__PURE__ */ __name((coll) => isUndefined(coll) || collSize(coll) == 0, "collIsEmpty");
var collValues = /* @__PURE__ */ __name((coll) => [...coll?.values() ?? []], "collValues");
var collClear = /* @__PURE__ */ __name((coll) => coll.clear(), "collClear");
var collForEach = /* @__PURE__ */ __name((coll, cb) => coll?.forEach(cb), "collForEach");
var collDel = /* @__PURE__ */ __name((coll, keyOrValue) => coll?.delete(keyOrValue), "collDel");
var mapNew = /* @__PURE__ */ __name((entries) => new Map(entries), "mapNew");
var mapKeys = /* @__PURE__ */ __name((map) => [...map?.keys() ?? []], "mapKeys");
var mapGet = /* @__PURE__ */ __name((map, key) => map?.get(key), "mapGet");
var mapForEach = /* @__PURE__ */ __name((map, cb) => collForEach(map, (value, key) => cb(key, value)), "mapForEach");
var mapMap = /* @__PURE__ */ __name((coll, cb) => arrayMap([...coll?.entries() ?? []], ([key, value]) => cb(value, key)), "mapMap");
var mapSet = /* @__PURE__ */ __name((map, key, value) => isUndefined(value) ? (collDel(map, key), map) : map?.set(key, value), "mapSet");
var mapEnsure = /* @__PURE__ */ __name((map, key, getDefaultValue, hadExistingValue) => {
  if (!collHas(map, key)) {
    mapSet(map, key, getDefaultValue());
  } else {
    hadExistingValue?.(mapGet(map, key));
  }
  return mapGet(map, key);
}, "mapEnsure");
var mapMatch = /* @__PURE__ */ __name((map, obj, set, del = mapSet) => {
  objToArray(obj, (value, id2) => set(map, id2, value));
  mapForEach(map, (id2) => objHas(obj, id2) ? 0 : del(map, id2));
  return map;
}, "mapMatch");
var mapToObj = /* @__PURE__ */ __name((map, valueMapper, excludeMapValue, excludeObjValue) => {
  const obj = {};
  collForEach(map, (mapValue, id2) => {
    if (!excludeMapValue?.(mapValue, id2)) {
      const objValue = valueMapper ? valueMapper(mapValue, id2) : mapValue;
      if (!excludeObjValue?.(objValue)) {
        obj[id2] = objValue;
      }
    }
  });
  return obj;
}, "mapToObj");
var mapToObj2 = /* @__PURE__ */ __name((map, valueMapper, excludeMapValue) => mapToObj(
  map,
  (childMap) => mapToObj(childMap, valueMapper, excludeMapValue),
  collIsEmpty,
  objIsEmpty
), "mapToObj2");
var mapToObj3 = /* @__PURE__ */ __name((map, valueMapper, excludeMapValue) => mapToObj(
  map,
  (childMap) => mapToObj2(childMap, valueMapper, excludeMapValue),
  collIsEmpty,
  objIsEmpty
), "mapToObj3");
var mapClone = /* @__PURE__ */ __name((map, mapValue) => {
  const map2 = mapNew();
  collForEach(map, (value, key) => map2.set(key, mapValue?.(value) ?? value));
  return map2;
}, "mapClone");
var mapClone2 = /* @__PURE__ */ __name((map) => mapClone(map, mapClone), "mapClone2");
var mapClone3 = /* @__PURE__ */ __name((map) => mapClone(map, mapClone2), "mapClone3");
var visitTree = /* @__PURE__ */ __name((node, path, ensureLeaf, pruneLeaf, p = 0) => ifNotUndefined(
  (ensureLeaf ? mapEnsure : mapGet)(
    node,
    path[p],
    p > size(path) - 2 ? ensureLeaf : mapNew
  ),
  (nodeOrLeaf) => {
    if (p > size(path) - 2) {
      if (pruneLeaf?.(nodeOrLeaf)) {
        mapSet(node, path[p]);
      }
      return nodeOrLeaf;
    }
    const leaf = visitTree(nodeOrLeaf, path, ensureLeaf, pruneLeaf, p + 1);
    if (collIsEmpty(nodeOrLeaf)) {
      mapSet(node, path[p]);
    }
    return leaf;
  }
), "visitTree");
var getCellOrValueType = /* @__PURE__ */ __name((cellOrValue) => {
  const type = getTypeOf(cellOrValue);
  return isTypeStringOrBoolean(type) || type == NUMBER && isFiniteNumber(cellOrValue) ? type : void 0;
}, "getCellOrValueType");
var isCellOrValueOrNullOrUndefined = /* @__PURE__ */ __name((cellOrValue) => isUndefined(cellOrValue) || !isUndefined(getCellOrValueType(cellOrValue)), "isCellOrValueOrNullOrUndefined");
var setOrDelCell = /* @__PURE__ */ __name((store, tableId, rowId, cellId, cell) => isUndefined(cell) ? store.delCell(tableId, rowId, cellId, true) : store.setCell(tableId, rowId, cellId, cell), "setOrDelCell");
var setOrDelValue = /* @__PURE__ */ __name((store, valueId, value) => isUndefined(value) ? store.delValue(valueId) : store.setValue(valueId, value), "setOrDelValue");
var setNew = /* @__PURE__ */ __name((entryOrEntries) => new Set(
  isArray(entryOrEntries) || isUndefined(entryOrEntries) ? entryOrEntries : [entryOrEntries]
), "setNew");
var setAdd = /* @__PURE__ */ __name((set, value) => set?.add(value), "setAdd");
var getDefinableFunctions = /* @__PURE__ */ __name((store, getDefaultThing, validateRowValue, addListener2, callListeners) => {
  const hasRow = store.hasRow;
  const tableIds = mapNew();
  const things = mapNew();
  const thingIdListeners = mapNew();
  const allRowValues = mapNew();
  const allSortKeys = mapNew();
  const storeListenerIds = mapNew();
  const getStore = /* @__PURE__ */ __name(() => store, "getStore");
  const getThingIds = /* @__PURE__ */ __name(() => mapKeys(tableIds), "getThingIds");
  const forEachThing = /* @__PURE__ */ __name((cb) => mapForEach(things, cb), "forEachThing");
  const hasThing = /* @__PURE__ */ __name((id2) => collHas(things, id2), "hasThing");
  const getTableId = /* @__PURE__ */ __name((id2) => mapGet(tableIds, id2), "getTableId");
  const getThing = /* @__PURE__ */ __name((id2) => mapGet(things, id2), "getThing");
  const setThing = /* @__PURE__ */ __name((id2, thing) => mapSet(things, id2, thing), "setThing");
  const addStoreListeners = /* @__PURE__ */ __name((id2, andCall, ...listenerIds) => {
    const set = mapEnsure(storeListenerIds, id2, setNew);
    arrayForEach(
      listenerIds,
      (listenerId) => setAdd(set, listenerId) && andCall && store.callListener(listenerId)
    );
    return listenerIds;
  }, "addStoreListeners");
  const delStoreListeners = /* @__PURE__ */ __name((id2, ...listenerIds) => ifNotUndefined(mapGet(storeListenerIds, id2), (allListenerIds) => {
    arrayForEach(
      arrayIsEmpty(listenerIds) ? collValues(allListenerIds) : listenerIds,
      (listenerId) => {
        store.delListener(listenerId);
        collDel(allListenerIds, listenerId);
      }
    );
    if (collIsEmpty(allListenerIds)) {
      mapSet(storeListenerIds, id2);
    }
  }), "delStoreListeners");
  const setDefinition = /* @__PURE__ */ __name((id2, tableId) => {
    mapSet(tableIds, id2, tableId);
    if (!collHas(things, id2)) {
      mapSet(things, id2, getDefaultThing());
      mapSet(allRowValues, id2, mapNew());
      mapSet(allSortKeys, id2, mapNew());
      callListeners(thingIdListeners);
    }
  }, "setDefinition");
  const setDefinitionAndListen = /* @__PURE__ */ __name((id2, tableId, onChanged, getRowValue, getSortKey) => {
    setDefinition(id2, tableId);
    const changedRowValues = mapNew();
    const changedSortKeys = mapNew();
    const rowValues = mapGet(allRowValues, id2);
    const sortKeys = mapGet(allSortKeys, id2);
    const processRow = /* @__PURE__ */ __name((rowId) => {
      const getCell = /* @__PURE__ */ __name((cellId) => store.getCell(tableId, rowId, cellId), "getCell");
      const oldRowValue = mapGet(rowValues, rowId);
      const newRowValue = hasRow(tableId, rowId) ? validateRowValue(getRowValue(getCell, rowId)) : void 0;
      if (!(oldRowValue === newRowValue || isArray(oldRowValue) && isArray(newRowValue) && arrayIsEqual(oldRowValue, newRowValue))) {
        mapSet(changedRowValues, rowId, [oldRowValue, newRowValue]);
      }
      if (!isUndefined(getSortKey)) {
        const oldSortKey = mapGet(sortKeys, rowId);
        const newSortKey = hasRow(tableId, rowId) ? getSortKey(getCell, rowId) : void 0;
        if (oldSortKey != newSortKey) {
          mapSet(changedSortKeys, rowId, newSortKey);
        }
      }
    }, "processRow");
    const processTable = /* @__PURE__ */ __name((force) => {
      onChanged(
        () => {
          collForEach(
            changedRowValues,
            ([, newRowValue], rowId) => mapSet(rowValues, rowId, newRowValue)
          );
          collForEach(
            changedSortKeys,
            (newSortKey, rowId) => mapSet(sortKeys, rowId, newSortKey)
          );
        },
        changedRowValues,
        changedSortKeys,
        rowValues,
        sortKeys,
        force
      );
      collClear(changedRowValues);
      collClear(changedSortKeys);
    }, "processTable");
    mapForEach(rowValues, processRow);
    if (store.hasTable(tableId)) {
      arrayForEach(store.getRowIds(tableId), (rowId) => {
        if (!collHas(rowValues, rowId)) {
          processRow(rowId);
        }
      });
    }
    processTable(true);
    delStoreListeners(id2);
    addStoreListeners(
      id2,
      0,
      store.addRowListener(
        tableId,
        null,
        (_store, _tableId, rowId) => processRow(rowId)
      ),
      store.addTableListener(tableId, () => processTable())
    );
  }, "setDefinitionAndListen");
  const delDefinition = /* @__PURE__ */ __name((id2) => {
    mapSet(tableIds, id2);
    mapSet(things, id2);
    mapSet(allRowValues, id2);
    mapSet(allSortKeys, id2);
    delStoreListeners(id2);
    callListeners(thingIdListeners);
  }, "delDefinition");
  const addThingIdsListener = /* @__PURE__ */ __name((listener) => addListener2(listener, thingIdListeners), "addThingIdsListener");
  const destroy = /* @__PURE__ */ __name(() => mapForEach(storeListenerIds, delDefinition), "destroy");
  return [
    getStore,
    getThingIds,
    forEachThing,
    hasThing,
    getTableId,
    getThing,
    setThing,
    setDefinition,
    setDefinitionAndListen,
    delDefinition,
    addThingIdsListener,
    destroy,
    addStoreListeners,
    delStoreListeners
  ];
}, "getDefinableFunctions");
var getRowCellFunction = /* @__PURE__ */ __name((getRowCell, defaultCellValue) => isString(getRowCell) ? (getCell) => getCell(getRowCell) : getRowCell ?? (() => defaultCellValue ?? EMPTY_STRING), "getRowCellFunction");
var getCreateFunction = /* @__PURE__ */ __name((getFunction, initFunction) => {
  const thingsByStore = /* @__PURE__ */ new WeakMap();
  return (store) => {
    if (!thingsByStore.has(store)) {
      thingsByStore.set(store, getFunction(store));
    }
    const thing = thingsByStore.get(store);
    initFunction?.(thing);
    return thing;
  };
}, "getCreateFunction");
var INTEGER = /^\d+$/;
var getPoolFunctions = /* @__PURE__ */ __name(() => {
  const pool = [];
  let nextId = 0;
  return [
    (reuse) => (reuse ? arrayShift(pool) : null) ?? EMPTY_STRING + nextId++,
    (id2) => {
      if (test(INTEGER, id2) && size(pool) < 1e3) {
        arrayPush(pool, id2);
      }
    }
  ];
}, "getPoolFunctions");
var getWildcardedLeaves = /* @__PURE__ */ __name((deepIdSet, path = [EMPTY_STRING]) => {
  const leaves = [];
  const deep = /* @__PURE__ */ __name((node, p) => p == size(path) ? arrayPush(leaves, node) : path[p] === null ? collForEach(node, (node2) => deep(node2, p + 1)) : arrayForEach([path[p], null], (id2) => deep(mapGet(node, id2), p + 1)), "deep");
  deep(deepIdSet, 0);
  return leaves;
}, "getWildcardedLeaves");
var getListenerFunctions = /* @__PURE__ */ __name((getThing) => {
  let thing;
  const [getId, releaseId] = getPoolFunctions();
  const allListeners = mapNew();
  const addListener2 = /* @__PURE__ */ __name((listener, idSetNode, path, pathGetters = [], extraArgsGetter = () => []) => {
    thing ??= getThing();
    const id2 = getId(1);
    mapSet(allListeners, id2, [
      listener,
      idSetNode,
      path,
      pathGetters,
      extraArgsGetter
    ]);
    setAdd(visitTree(idSetNode, path ?? [EMPTY_STRING], setNew), id2);
    return id2;
  }, "addListener");
  const callListeners = /* @__PURE__ */ __name((idSetNode, ids, ...extraArgs) => arrayForEach(
    getWildcardedLeaves(idSetNode, ids),
    (set) => collForEach(
      set,
      (id2) => mapGet(allListeners, id2)[0](thing, ...ids ?? [], ...extraArgs)
    )
  ), "callListeners");
  const delListener = /* @__PURE__ */ __name((id2) => ifNotUndefined(mapGet(allListeners, id2), ([, idSetNode, idOrNulls]) => {
    visitTree(idSetNode, idOrNulls ?? [EMPTY_STRING], void 0, (idSet) => {
      collDel(idSet, id2);
      return collIsEmpty(idSet) ? 1 : 0;
    });
    mapSet(allListeners, id2);
    releaseId(id2);
    return idOrNulls;
  }), "delListener");
  const callListener = /* @__PURE__ */ __name((id2) => ifNotUndefined(
    mapGet(allListeners, id2),
    ([listener, , path = [], pathGetters, extraArgsGetter]) => {
      const callWithIds = /* @__PURE__ */ __name((...ids) => {
        const index = size(ids);
        if (index == size(path)) {
          listener(thing, ...ids, ...extraArgsGetter(ids));
        } else if (isUndefined(path[index])) {
          arrayForEach(
            pathGetters[index]?.(...ids) ?? [],
            (id22) => callWithIds(...ids, id22)
          );
        } else {
          callWithIds(...ids, path[index]);
        }
      }, "callWithIds");
      callWithIds();
    }
  ), "callListener");
  return [addListener2, callListeners, delListener, callListener];
}, "getListenerFunctions");
var createCheckpoints = getCreateFunction(
  (store) => {
    let backwardIdsSize = 100;
    let currentId;
    let cellsDelta = mapNew();
    let valuesDelta = mapNew();
    let listening = 1;
    let nextCheckpointId;
    let checkpointsChanged;
    const checkpointIdsListeners = mapNew();
    const checkpointListeners = mapNew();
    const [addListener2, callListeners, delListenerImpl] = getListenerFunctions(
      () => checkpoints
    );
    const deltas = mapNew();
    const labels = mapNew();
    const backwardIds = [];
    const forwardIds = [];
    const updateStore = /* @__PURE__ */ __name((oldOrNew, checkpointId) => {
      listening = 0;
      store.transaction(() => {
        const [cellsDelta2, valuesDelta2] = mapGet(deltas, checkpointId);
        collForEach(
          cellsDelta2,
          (table3, tableId) => collForEach(
            table3,
            (row, rowId) => collForEach(
              row,
              (oldNew, cellId) => setOrDelCell(store, tableId, rowId, cellId, oldNew[oldOrNew])
            )
          )
        );
        collForEach(
          valuesDelta2,
          (oldNew, valueId) => setOrDelValue(store, valueId, oldNew[oldOrNew])
        );
      });
      listening = 1;
    }, "updateStore");
    const clearCheckpointId = /* @__PURE__ */ __name((checkpointId) => {
      mapSet(deltas, checkpointId);
      mapSet(labels, checkpointId);
      callListeners(checkpointListeners, [checkpointId]);
    }, "clearCheckpointId");
    const clearCheckpointIds = /* @__PURE__ */ __name((checkpointIds, to) => arrayForEach(
      arrayClear(checkpointIds, to ?? size(checkpointIds)),
      clearCheckpointId
    ), "clearCheckpointIds");
    const trimBackwardsIds = /* @__PURE__ */ __name(() => clearCheckpointIds(backwardIds, size(backwardIds) - backwardIdsSize), "trimBackwardsIds");
    const storeChanged = /* @__PURE__ */ __name(() => ifNotUndefined(currentId, () => {
      arrayPush(backwardIds, currentId);
      trimBackwardsIds();
      clearCheckpointIds(forwardIds);
      currentId = void 0;
      checkpointsChanged = 1;
    }), "storeChanged");
    const storeUnchanged = /* @__PURE__ */ __name(() => {
      currentId = arrayPop(backwardIds);
      checkpointsChanged = 1;
    }, "storeUnchanged");
    let cellListenerId;
    let valueListenerId;
    const addCheckpointImpl = /* @__PURE__ */ __name((label = EMPTY_STRING) => {
      if (isUndefined(currentId)) {
        currentId = EMPTY_STRING + nextCheckpointId++;
        mapSet(deltas, currentId, [cellsDelta, valuesDelta]);
        setCheckpoint(currentId, label);
        cellsDelta = mapNew();
        valuesDelta = mapNew();
        checkpointsChanged = 1;
      }
      return currentId;
    }, "addCheckpointImpl");
    const goBackwardImpl = /* @__PURE__ */ __name(() => {
      if (!arrayIsEmpty(backwardIds)) {
        arrayUnshift(forwardIds, addCheckpointImpl());
        updateStore(0, currentId);
        currentId = arrayPop(backwardIds);
        checkpointsChanged = 1;
      }
    }, "goBackwardImpl");
    const goForwardImpl = /* @__PURE__ */ __name(() => {
      if (!arrayIsEmpty(forwardIds)) {
        arrayPush(backwardIds, currentId);
        currentId = arrayShift(forwardIds);
        updateStore(1, currentId);
        checkpointsChanged = 1;
      }
    }, "goForwardImpl");
    const callListenersIfChanged = /* @__PURE__ */ __name(() => {
      if (checkpointsChanged) {
        callListeners(checkpointIdsListeners);
        checkpointsChanged = 0;
      }
    }, "callListenersIfChanged");
    const setSize = /* @__PURE__ */ __name((size22) => {
      backwardIdsSize = size22;
      trimBackwardsIds();
      return checkpoints;
    }, "setSize");
    const addCheckpoint = /* @__PURE__ */ __name((label) => {
      const id2 = addCheckpointImpl(label);
      callListenersIfChanged();
      return id2;
    }, "addCheckpoint");
    const setCheckpoint = /* @__PURE__ */ __name((checkpointId, label) => {
      if (hasCheckpoint(checkpointId) && mapGet(labels, checkpointId) !== label) {
        mapSet(labels, checkpointId, label);
        callListeners(checkpointListeners, [checkpointId]);
      }
      return checkpoints;
    }, "setCheckpoint");
    const getStore = /* @__PURE__ */ __name(() => store, "getStore");
    const getCheckpointIds = /* @__PURE__ */ __name(() => [
      [...backwardIds],
      currentId,
      [...forwardIds]
    ], "getCheckpointIds");
    const forEachCheckpoint = /* @__PURE__ */ __name((checkpointCallback) => mapForEach(labels, checkpointCallback), "forEachCheckpoint");
    const hasCheckpoint = /* @__PURE__ */ __name((checkpointId) => collHas(deltas, checkpointId), "hasCheckpoint");
    const getCheckpoint = /* @__PURE__ */ __name((checkpointId) => mapGet(labels, checkpointId), "getCheckpoint");
    const goBackward = /* @__PURE__ */ __name(() => {
      goBackwardImpl();
      callListenersIfChanged();
      return checkpoints;
    }, "goBackward");
    const goForward = /* @__PURE__ */ __name(() => {
      goForwardImpl();
      callListenersIfChanged();
      return checkpoints;
    }, "goForward");
    const goTo = /* @__PURE__ */ __name((checkpointId) => {
      const action = arrayHas(backwardIds, checkpointId) ? goBackwardImpl : arrayHas(forwardIds, checkpointId) ? goForwardImpl : null;
      while (!isUndefined(action) && checkpointId != currentId) {
        action();
      }
      callListenersIfChanged();
      return checkpoints;
    }, "goTo");
    const addCheckpointIdsListener = /* @__PURE__ */ __name((listener) => addListener2(listener, checkpointIdsListeners), "addCheckpointIdsListener");
    const addCheckpointListener = /* @__PURE__ */ __name((checkpointId, listener) => addListener2(listener, checkpointListeners, [checkpointId]), "addCheckpointListener");
    const delListener = /* @__PURE__ */ __name((listenerId) => {
      delListenerImpl(listenerId);
      return checkpoints;
    }, "delListener");
    const clear3 = /* @__PURE__ */ __name(() => {
      clearCheckpointIds(backwardIds);
      clearCheckpointIds(forwardIds);
      if (!isUndefined(currentId)) {
        clearCheckpointId(currentId);
      }
      currentId = void 0;
      nextCheckpointId = 0;
      addCheckpoint();
      return checkpoints;
    }, "clear");
    const clearForward = /* @__PURE__ */ __name(() => {
      if (!arrayIsEmpty(forwardIds)) {
        clearCheckpointIds(forwardIds);
        callListeners(checkpointIdsListeners);
      }
      return checkpoints;
    }, "clearForward");
    const destroy = /* @__PURE__ */ __name(() => {
      store.delListener(cellListenerId);
      store.delListener(valueListenerId);
    }, "destroy");
    const getListenerStats = /* @__PURE__ */ __name(() => ({
      checkpointIds: collSize2(checkpointIdsListeners),
      checkpoint: collSize2(checkpointListeners)
    }), "getListenerStats");
    const _registerListeners = /* @__PURE__ */ __name(() => {
      cellListenerId = store.addCellListener(
        null,
        null,
        null,
        (_store, tableId, rowId, cellId, newCell, oldCell) => {
          if (listening) {
            storeChanged();
            const table3 = mapEnsure(cellsDelta, tableId, mapNew);
            const row = mapEnsure(table3, rowId, mapNew);
            const oldNew = mapEnsure(row, cellId, () => [oldCell, void 0]);
            oldNew[1] = newCell;
            if (oldNew[0] === newCell && collIsEmpty(mapSet(row, cellId)) && collIsEmpty(mapSet(table3, rowId)) && collIsEmpty(mapSet(cellsDelta, tableId))) {
              storeUnchanged();
            }
            callListenersIfChanged();
          }
        }
      );
      valueListenerId = store.addValueListener(
        null,
        (_store, valueId, newValue, oldValue) => {
          if (listening) {
            storeChanged();
            const oldNew = mapEnsure(valuesDelta, valueId, () => [
              oldValue,
              void 0
            ]);
            oldNew[1] = newValue;
            if (oldNew[0] === newValue && collIsEmpty(mapSet(valuesDelta, valueId))) {
              storeUnchanged();
            }
            callListenersIfChanged();
          }
        }
      );
    }, "_registerListeners");
    const checkpoints = {
      setSize,
      addCheckpoint,
      setCheckpoint,
      getStore,
      getCheckpointIds,
      forEachCheckpoint,
      hasCheckpoint,
      getCheckpoint,
      goBackward,
      goForward,
      goTo,
      addCheckpointIdsListener,
      addCheckpointListener,
      delListener,
      clear: clear3,
      clearForward,
      destroy,
      getListenerStats,
      _registerListeners
    };
    return objFreeze(checkpoints.clear());
  },
  (checkpoints) => checkpoints._registerListeners()
);
var MASK6 = 63;
var ENCODE = /* @__PURE__ */ strSplit(
  "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"
);
var DECODE = /* @__PURE__ */ mapNew(
  /* @__PURE__ */ arrayMap(ENCODE, (char, index) => [char, index])
);
var encode = /* @__PURE__ */ __name((num) => ENCODE[num & MASK6], "encode");
var decode = /* @__PURE__ */ __name((str, pos) => mapGet(DECODE, str[pos]) ?? 0, "decode");
var getRandomValues = GLOBAL.crypto ? (array) => GLOBAL.crypto.getRandomValues(array) : (
  /* istanbul ignore next */
  (array) => arrayMap(array, () => mathFloor(math.random() * 256))
);
var defaultSorter = /* @__PURE__ */ __name((sortKey1, sortKey2) => (sortKey1 ?? 0) < (sortKey2 ?? 0) ? -1 : 1, "defaultSorter");
var getUniqueId = /* @__PURE__ */ __name((length = 16) => arrayReduce(
  getRandomValues(new Uint8Array(length)),
  (uniqueId, number) => uniqueId + encode(number),
  ""
), "getUniqueId");
var createIndexes = getCreateFunction((store) => {
  const sliceIdsListeners = mapNew();
  const sliceRowIdsListeners = mapNew();
  const [addListener2, callListeners, delListenerImpl] = getListenerFunctions(
    () => indexes
  );
  const [
    getStore,
    getIndexIds,
    forEachIndexImpl,
    hasIndex,
    getTableId,
    getIndex,
    setIndex,
    ,
    setDefinitionAndListen,
    delDefinition,
    addIndexIdsListener,
    destroy
  ] = getDefinableFunctions(
    store,
    mapNew,
    (value) => isUndefined(value) ? EMPTY_STRING : isArray(value) ? arrayMap(value, id) : id(value),
    addListener2,
    callListeners
  );
  const hasSlice = /* @__PURE__ */ __name((indexId, sliceId) => collHas(getIndex(indexId), sliceId), "hasSlice");
  const setIndexDefinition = /* @__PURE__ */ __name((indexId, tableId, getSliceIdOrIds, getSortKey, sliceIdSorter, rowIdSorter = defaultSorter) => {
    const sliceIdArraySorter = isUndefined(sliceIdSorter) ? void 0 : ([id1], [id2]) => sliceIdSorter(id1, id2);
    setDefinitionAndListen(
      indexId,
      tableId,
      (change, changedSliceIds, changedSortKeys, sliceIds, sortKeys, force) => {
        let sliceIdsChanged = 0;
        const changedSlices = setNew();
        const unsortedSlices = setNew();
        const index = getIndex(indexId);
        collForEach(
          changedSliceIds,
          ([oldSliceIdOrIds, newSliceIdOrIds], rowId) => {
            const oldSliceIds = setNew(oldSliceIdOrIds);
            const newSliceIds = setNew(newSliceIdOrIds);
            collForEach(
              oldSliceIds,
              (oldSliceId) => collDel(newSliceIds, oldSliceId) ? collDel(oldSliceIds, oldSliceId) : 0
            );
            collForEach(oldSliceIds, (oldSliceId) => {
              setAdd(changedSlices, oldSliceId);
              ifNotUndefined(mapGet(index, oldSliceId), (oldSlice) => {
                collDel(oldSlice, rowId);
                if (collIsEmpty(oldSlice)) {
                  mapSet(index, oldSliceId);
                  sliceIdsChanged = 1;
                }
              });
            });
            collForEach(newSliceIds, (newSliceId) => {
              setAdd(changedSlices, newSliceId);
              if (!collHas(index, newSliceId)) {
                mapSet(index, newSliceId, setNew());
                sliceIdsChanged = 1;
              }
              setAdd(mapGet(index, newSliceId), rowId);
              if (!isUndefined(getSortKey)) {
                setAdd(unsortedSlices, newSliceId);
              }
            });
          }
        );
        change();
        if (!collIsEmpty(sortKeys)) {
          if (force) {
            mapForEach(index, (sliceId) => setAdd(unsortedSlices, sliceId));
          } else {
            mapForEach(
              changedSortKeys,
              (rowId) => ifNotUndefined(
                mapGet(sliceIds, rowId),
                (sliceId) => setAdd(unsortedSlices, sliceId)
              )
            );
          }
          collForEach(unsortedSlices, (sliceId) => {
            const rowIdArraySorter = /* @__PURE__ */ __name((rowId1, rowId2) => rowIdSorter(
              mapGet(sortKeys, rowId1),
              mapGet(sortKeys, rowId2),
              sliceId
            ), "rowIdArraySorter");
            const sliceArray = [...mapGet(index, sliceId)];
            if (!arrayIsSorted(sliceArray, rowIdArraySorter)) {
              mapSet(
                index,
                sliceId,
                setNew(arraySort(sliceArray, rowIdArraySorter))
              );
              setAdd(changedSlices, sliceId);
            }
          });
        }
        if (sliceIdsChanged || force) {
          if (!isUndefined(sliceIdArraySorter)) {
            const indexArray = [...index];
            if (!arrayIsSorted(indexArray, sliceIdArraySorter)) {
              setIndex(
                indexId,
                mapNew(arraySort(indexArray, sliceIdArraySorter))
              );
              sliceIdsChanged = 1;
            }
          }
        }
        if (sliceIdsChanged) {
          callListeners(sliceIdsListeners, [indexId]);
        }
        collForEach(
          changedSlices,
          (sliceId) => callListeners(sliceRowIdsListeners, [indexId, sliceId])
        );
      },
      getRowCellFunction(getSliceIdOrIds),
      ifNotUndefined(getSortKey, getRowCellFunction)
    );
    return indexes;
  }, "setIndexDefinition");
  const forEachIndex = /* @__PURE__ */ __name((indexCallback) => forEachIndexImpl(
    (indexId, slices) => indexCallback(
      indexId,
      (sliceCallback) => forEachSliceImpl(indexId, sliceCallback, slices)
    )
  ), "forEachIndex");
  const forEachSlice = /* @__PURE__ */ __name((indexId, sliceCallback) => forEachSliceImpl(indexId, sliceCallback, getIndex(indexId)), "forEachSlice");
  const forEachSliceImpl = /* @__PURE__ */ __name((indexId, sliceCallback, slices) => {
    const tableId = getTableId(indexId);
    collForEach(
      slices,
      (rowIds, sliceId) => sliceCallback(
        sliceId,
        (rowCallback) => collForEach(
          rowIds,
          (rowId) => rowCallback(
            rowId,
            (cellCallback) => store.forEachCell(tableId, rowId, cellCallback)
          )
        )
      )
    );
  }, "forEachSliceImpl");
  const delIndexDefinition = /* @__PURE__ */ __name((indexId) => {
    delDefinition(indexId);
    return indexes;
  }, "delIndexDefinition");
  const getSliceIds = /* @__PURE__ */ __name((indexId) => mapKeys(getIndex(indexId)), "getSliceIds");
  const getSliceRowIds = /* @__PURE__ */ __name((indexId, sliceId) => collValues(mapGet(getIndex(indexId), sliceId)), "getSliceRowIds");
  const addSliceIdsListener = /* @__PURE__ */ __name((indexId, listener) => addListener2(listener, sliceIdsListeners, [indexId]), "addSliceIdsListener");
  const addSliceRowIdsListener = /* @__PURE__ */ __name((indexId, sliceId, listener) => addListener2(listener, sliceRowIdsListeners, [indexId, sliceId]), "addSliceRowIdsListener");
  const delListener = /* @__PURE__ */ __name((listenerId) => {
    delListenerImpl(listenerId);
    return indexes;
  }, "delListener");
  const getListenerStats = /* @__PURE__ */ __name(() => ({
    sliceIds: collSize2(sliceIdsListeners),
    sliceRowIds: collSize3(sliceRowIdsListeners)
  }), "getListenerStats");
  const indexes = {
    setIndexDefinition,
    delIndexDefinition,
    getStore,
    getIndexIds,
    forEachIndex,
    forEachSlice,
    hasIndex,
    hasSlice,
    getTableId,
    getSliceIds,
    getSliceRowIds,
    addIndexIdsListener,
    addSliceIdsListener,
    addSliceRowIdsListener,
    delListener,
    destroy,
    getListenerStats
  };
  return objFreeze(indexes);
});
var numericAggregators = /* @__PURE__ */ mapNew([
  [
    AVG,
    [
      (numbers, length) => arraySum(numbers) / length,
      (metric, add, length) => metric + (add - metric) / (length + 1),
      (metric, remove, length) => metric + (metric - remove) / (length - 1),
      (metric, add, remove, length) => metric + (add - remove) / length
    ]
  ],
  [
    MAX,
    [
      (numbers) => mathMax(...numbers),
      (metric, add) => mathMax(add, metric),
      (metric, remove) => remove == metric ? void 0 : metric,
      (metric, add, remove) => remove == metric ? void 0 : mathMax(add, metric)
    ]
  ],
  [
    MIN,
    [
      (numbers) => mathMin(...numbers),
      (metric, add) => mathMin(add, metric),
      (metric, remove) => remove == metric ? void 0 : metric,
      (metric, add, remove) => remove == metric ? void 0 : mathMin(add, metric)
    ]
  ],
  [
    SUM,
    [
      (numbers) => arraySum(numbers),
      (metric, add) => metric + add,
      (metric, remove) => metric - remove,
      (metric, add, remove) => metric - remove + add
    ]
  ]
]);
var getAggregateValue = /* @__PURE__ */ __name((aggregateValue, oldLength, newValues, changedValues, aggregators, force = false) => {
  if (collIsEmpty(newValues)) {
    return void 0;
  }
  const [aggregate, aggregateAdd, aggregateRemove, aggregateReplace] = aggregators;
  force ||= isUndefined(aggregateValue);
  collForEach(changedValues, ([oldValue, newValue]) => {
    if (!force) {
      aggregateValue = isUndefined(oldValue) ? aggregateAdd?.(aggregateValue, newValue, oldLength++) : isUndefined(newValue) ? aggregateRemove?.(aggregateValue, oldValue, oldLength--) : aggregateReplace?.(aggregateValue, newValue, oldValue, oldLength);
      force ||= isUndefined(aggregateValue);
    }
  });
  return force ? aggregate(collValues(newValues), collSize(newValues)) : aggregateValue;
}, "getAggregateValue");
var createMetrics = getCreateFunction((store) => {
  const metricListeners = mapNew();
  const [addListener2, callListeners, delListenerImpl] = getListenerFunctions(
    () => metrics
  );
  const [
    getStore,
    getMetricIds,
    forEachMetric,
    hasMetric,
    getTableId,
    getMetric,
    setMetric,
    ,
    setDefinitionAndListen,
    delDefinition,
    addMetricIdsListener,
    destroy
  ] = getDefinableFunctions(
    store,
    getUndefined,
    (value) => isNaN(value) || isUndefined(value) || value === true || value === false || value === EMPTY_STRING ? void 0 : value * 1,
    addListener2,
    callListeners
  );
  const setMetricDefinition = /* @__PURE__ */ __name((metricId, tableId, aggregate, getNumber, aggregateAdd, aggregateRemove, aggregateReplace) => {
    const aggregators = isFunction(aggregate) ? [aggregate, aggregateAdd, aggregateRemove, aggregateReplace] : mapGet(numericAggregators, aggregate) ?? mapGet(numericAggregators, SUM);
    setDefinitionAndListen(
      metricId,
      tableId,
      (change, changedNumbers, _changedSortKeys, numbers, _sortKeys, force) => {
        const oldMetric = getMetric(metricId);
        const oldLength = collSize(numbers);
        force ||= isUndefined(oldMetric);
        change();
        let newMetric = getAggregateValue(
          oldMetric,
          oldLength,
          numbers,
          changedNumbers,
          aggregators,
          force
        );
        if (!isFiniteNumber(newMetric)) {
          newMetric = void 0;
        }
        if (newMetric != oldMetric) {
          setMetric(metricId, newMetric);
          callListeners(metricListeners, [metricId], newMetric, oldMetric);
        }
      },
      getRowCellFunction(getNumber, 1)
    );
    return metrics;
  }, "setMetricDefinition");
  const delMetricDefinition = /* @__PURE__ */ __name((metricId) => {
    delDefinition(metricId);
    return metrics;
  }, "delMetricDefinition");
  const addMetricListener = /* @__PURE__ */ __name((metricId, listener) => addListener2(listener, metricListeners, [metricId]), "addMetricListener");
  const delListener = /* @__PURE__ */ __name((listenerId) => {
    delListenerImpl(listenerId);
    return metrics;
  }, "delListener");
  const getListenerStats = /* @__PURE__ */ __name(() => ({
    metric: collSize2(metricListeners)
  }), "getListenerStats");
  const metrics = {
    setMetricDefinition,
    delMetricDefinition,
    getStore,
    getMetricIds,
    forEachMetric,
    hasMetric,
    getTableId,
    getMetric,
    addMetricIdsListener,
    addMetricListener,
    delListener,
    destroy,
    getListenerStats
  };
  return objFreeze(metrics);
});
var createQueries = getCreateFunction((store) => {
  const createStore2 = store.createStore;
  const preStore = createStore2();
  const resultStore = createStore2();
  const preStoreListenerIds = mapNew();
  const {
    addListener: addListener2,
    callListeners,
    delListener: delListenerImpl
  } = resultStore;
  const [
    getStore,
    getQueryIds,
    forEachQuery,
    hasQuery,
    getTableId,
    ,
    ,
    setDefinition,
    ,
    delDefinition,
    addQueryIdsListenerImpl,
    destroy,
    addStoreListeners,
    delStoreListeners
  ] = getDefinableFunctions(
    store,
    () => true,
    getUndefined,
    addListener2,
    callListeners
  );
  const addPreStoreListener = /* @__PURE__ */ __name((preStore2, queryId, ...listenerIds) => arrayForEach(
    listenerIds,
    (listenerId) => setAdd(
      mapEnsure(
        mapEnsure(preStoreListenerIds, queryId, mapNew),
        preStore2,
        setNew
      ),
      listenerId
    )
  ), "addPreStoreListener");
  const resetPreStores = /* @__PURE__ */ __name((queryId) => {
    ifNotUndefined(
      mapGet(preStoreListenerIds, queryId),
      (queryPreStoreListenerIds) => {
        mapForEach(
          queryPreStoreListenerIds,
          (preStore2, listenerIds) => collForEach(
            listenerIds,
            (listenerId) => preStore2.delListener(listenerId)
          )
        );
        collClear(queryPreStoreListenerIds);
      }
    );
    arrayForEach([resultStore, preStore], (store2) => store2.delTable(queryId));
  }, "resetPreStores");
  const synchronizeTransactions = /* @__PURE__ */ __name((queryId, fromStore, toStore) => addPreStoreListener(
    fromStore,
    queryId,
    fromStore.addStartTransactionListener(toStore.startTransaction),
    fromStore.addDidFinishTransactionListener(
      () => toStore.finishTransaction()
    )
  ), "synchronizeTransactions");
  const setQueryDefinition = /* @__PURE__ */ __name((queryId, tableId, build) => {
    setDefinition(queryId, tableId);
    resetPreStores(queryId);
    const selectEntries = [];
    const joinEntries = [[null, [tableId, null, null, [], mapNew()]]];
    const wheres = [];
    const groupEntries = [];
    const havings = [];
    const select = /* @__PURE__ */ __name((arg1, arg2) => {
      const selectEntry = isFunction(arg1) ? [size(selectEntries) + EMPTY_STRING, arg1] : [
        isUndefined(arg2) ? arg1 : arg2,
        (getTableCell) => getTableCell(arg1, arg2)
      ];
      arrayPush(selectEntries, selectEntry);
      return { as: /* @__PURE__ */ __name((selectedCellId) => selectEntry[0] = selectedCellId, "as") };
    }, "select");
    const join = /* @__PURE__ */ __name((joinedTableId, arg1, arg2) => {
      const fromIntermediateJoinedTableId = isUndefined(arg2) || isFunction(arg1) ? null : arg1;
      const onArg = isUndefined(fromIntermediateJoinedTableId) ? arg1 : arg2;
      const joinEntry = [
        joinedTableId,
        [
          joinedTableId,
          fromIntermediateJoinedTableId,
          isFunction(onArg) ? onArg : (getCell) => getCell(onArg),
          [],
          mapNew()
        ]
      ];
      arrayPush(joinEntries, joinEntry);
      return { as: /* @__PURE__ */ __name((joinedTableId2) => joinEntry[0] = joinedTableId2, "as") };
    }, "join");
    const where = /* @__PURE__ */ __name((arg1, arg2, arg3) => arrayPush(
      wheres,
      isFunction(arg1) ? arg1 : isUndefined(arg3) ? (getTableCell) => getTableCell(arg1) === arg2 : (getTableCell) => getTableCell(arg1, arg2) === arg3
    ), "where");
    const group3 = /* @__PURE__ */ __name((selectedCellId, aggregate, aggregateAdd, aggregateRemove, aggregateReplace) => {
      const groupEntry = [
        selectedCellId,
        [
          selectedCellId,
          isFunction(aggregate) ? [aggregate, aggregateAdd, aggregateRemove, aggregateReplace] : mapGet(numericAggregators, aggregate) ?? [
            (_cells, length) => length
          ]
        ]
      ];
      arrayPush(groupEntries, groupEntry);
      return { as: /* @__PURE__ */ __name((groupedCellId) => groupEntry[0] = groupedCellId, "as") };
    }, "group");
    const having = /* @__PURE__ */ __name((arg1, arg2) => arrayPush(
      havings,
      isFunction(arg1) ? arg1 : (getSelectedOrGroupedCell) => getSelectedOrGroupedCell(arg1) === arg2
    ), "having");
    build({ select, join, where, group: group3, having });
    const selects = mapNew(selectEntries);
    if (collIsEmpty(selects)) {
      return queries;
    }
    const joins = mapNew(joinEntries);
    mapForEach(
      joins,
      (asTableId, [, fromAsTableId]) => ifNotUndefined(
        mapGet(joins, fromAsTableId),
        ({ 3: toAsTableIds }) => isUndefined(asTableId) ? 0 : arrayPush(toAsTableIds, asTableId)
      )
    );
    const groups = mapNew(groupEntries);
    let selectJoinWhereStore = preStore;
    if (collIsEmpty(groups) && arrayIsEmpty(havings)) {
      selectJoinWhereStore = resultStore;
    } else {
      synchronizeTransactions(queryId, selectJoinWhereStore, resultStore);
      const groupedSelectedCellIds = mapNew();
      mapForEach(
        groups,
        (groupedCellId, [selectedCellId, aggregators]) => setAdd(mapEnsure(groupedSelectedCellIds, selectedCellId, setNew), [
          groupedCellId,
          aggregators
        ])
      );
      const groupBySelectedCellIds = setNew();
      mapForEach(
        selects,
        (selectedCellId) => collHas(groupedSelectedCellIds, selectedCellId) ? 0 : setAdd(groupBySelectedCellIds, selectedCellId)
      );
      const tree = mapNew();
      const writeGroupRow = /* @__PURE__ */ __name((leaf, changedGroupedSelectedCells, selectedRowId, forceRemove) => ifNotUndefined(
        leaf,
        ([selectedCells, selectedRowIds, groupRowId, groupRow]) => {
          mapForEach(
            changedGroupedSelectedCells,
            (selectedCellId, [newCell]) => {
              const selectedCell = mapEnsure(
                selectedCells,
                selectedCellId,
                mapNew
              );
              const oldLeafCell = mapGet(selectedCell, selectedRowId);
              const newLeafCell = forceRemove ? void 0 : newCell;
              if (oldLeafCell !== newLeafCell) {
                const oldNewSet = setNew([[oldLeafCell, newLeafCell]]);
                const oldLength = collSize(selectedCell);
                mapSet(selectedCell, selectedRowId, newLeafCell);
                collForEach(
                  mapGet(groupedSelectedCellIds, selectedCellId),
                  ([groupedCellId, aggregators]) => {
                    const aggregateValue = getAggregateValue(
                      groupRow[groupedCellId],
                      oldLength,
                      selectedCell,
                      oldNewSet,
                      aggregators
                    );
                    groupRow[groupedCellId] = isUndefined(
                      getCellOrValueType(aggregateValue)
                    ) ? null : aggregateValue;
                  }
                );
              }
            }
          );
          if (collIsEmpty(selectedRowIds) || !arrayEvery(
            havings,
            (having2) => having2((cellId) => groupRow[cellId])
          )) {
            resultStore.delRow(queryId, groupRowId);
          } else if (isUndefined(groupRowId)) {
            leaf[2] = resultStore.addRow(queryId, groupRow);
          } else {
            resultStore.setRow(queryId, groupRowId, groupRow);
          }
        }
      ), "writeGroupRow");
      addPreStoreListener(
        selectJoinWhereStore,
        queryId,
        selectJoinWhereStore.addRowListener(
          queryId,
          null,
          (_store, _tableId, selectedRowId, getCellChange) => {
            const oldPath = [];
            const newPath = [];
            const changedGroupedSelectedCells = mapNew();
            const rowExists = selectJoinWhereStore.hasRow(
              queryId,
              selectedRowId
            );
            let changedLeaf = !rowExists;
            collForEach(groupBySelectedCellIds, (selectedCellId) => {
              const [changed, oldCell, newCell] = getCellChange(
                queryId,
                selectedRowId,
                selectedCellId
              );
              arrayPush(oldPath, oldCell);
              arrayPush(newPath, newCell);
              changedLeaf ||= changed;
            });
            mapForEach(groupedSelectedCellIds, (selectedCellId) => {
              const [changed, , newCell] = getCellChange(
                queryId,
                selectedRowId,
                selectedCellId
              );
              if (changedLeaf || changed) {
                mapSet(changedGroupedSelectedCells, selectedCellId, [newCell]);
              }
            });
            if (changedLeaf) {
              writeGroupRow(
                visitTree(tree, oldPath, void 0, ([, selectedRowIds]) => {
                  collDel(selectedRowIds, selectedRowId);
                  return collIsEmpty(selectedRowIds);
                }),
                changedGroupedSelectedCells,
                selectedRowId,
                1
              );
            }
            if (rowExists) {
              writeGroupRow(
                visitTree(
                  tree,
                  newPath,
                  () => {
                    const groupRow = {};
                    collForEach(
                      groupBySelectedCellIds,
                      (selectedCellId) => groupRow[selectedCellId] = selectJoinWhereStore.getCell(
                        queryId,
                        selectedRowId,
                        selectedCellId
                      )
                    );
                    return [mapNew(), setNew(), void 0, groupRow];
                  },
                  ([, selectedRowIds]) => {
                    setAdd(selectedRowIds, selectedRowId);
                  }
                ),
                changedGroupedSelectedCells,
                selectedRowId
              );
            }
          }
        )
      );
    }
    synchronizeTransactions(queryId, store, selectJoinWhereStore);
    const writeSelectRow = /* @__PURE__ */ __name((rootRowId) => {
      const getTableCell = /* @__PURE__ */ __name((arg1, arg2) => store.getCell(
        ...isUndefined(arg2) ? [tableId, rootRowId, arg1] : arg1 === tableId ? [tableId, rootRowId, arg2] : [
          mapGet(joins, arg1)?.[0],
          mapGet(mapGet(joins, arg1)?.[4], rootRowId)?.[0],
          arg2
        ]
      ), "getTableCell");
      selectJoinWhereStore.transaction(
        () => arrayEvery(wheres, (where2) => where2(getTableCell)) ? mapForEach(
          selects,
          (asCellId, tableCellGetter) => setOrDelCell(
            selectJoinWhereStore,
            queryId,
            rootRowId,
            asCellId,
            tableCellGetter(getTableCell, rootRowId)
          )
        ) : selectJoinWhereStore.delRow(queryId, rootRowId)
      );
    }, "writeSelectRow");
    const listenToTable = /* @__PURE__ */ __name((rootRowId, tableId2, rowId, joinedTableIds2) => {
      const getCell = /* @__PURE__ */ __name((cellId) => store.getCell(tableId2, rowId, cellId), "getCell");
      arrayForEach(joinedTableIds2, (remoteAsTableId) => {
        const [realJoinedTableId, , on2, nextJoinedTableIds, remoteIdPair] = mapGet(joins, remoteAsTableId);
        const remoteRowId = on2?.(getCell, rootRowId);
        const [previousRemoteRowId, previousRemoteListenerId] = mapGet(remoteIdPair, rootRowId) ?? [];
        if (remoteRowId != previousRemoteRowId) {
          if (!isUndefined(previousRemoteListenerId)) {
            delStoreListeners(queryId, previousRemoteListenerId);
          }
          mapSet(
            remoteIdPair,
            rootRowId,
            isUndefined(remoteRowId) ? null : [
              remoteRowId,
              ...addStoreListeners(
                queryId,
                1,
                store.addRowListener(
                  realJoinedTableId,
                  remoteRowId,
                  () => listenToTable(
                    rootRowId,
                    realJoinedTableId,
                    remoteRowId,
                    nextJoinedTableIds
                  )
                )
              )
            ]
          );
        }
      });
      writeSelectRow(rootRowId);
    }, "listenToTable");
    const { 3: joinedTableIds } = mapGet(joins, null);
    selectJoinWhereStore.transaction(
      () => addStoreListeners(
        queryId,
        1,
        store.addRowListener(tableId, null, (_store, _tableId, rootRowId) => {
          if (store.hasRow(tableId, rootRowId)) {
            listenToTable(rootRowId, tableId, rootRowId, joinedTableIds);
          } else {
            selectJoinWhereStore.delRow(queryId, rootRowId);
            collForEach(
              joins,
              ({ 4: idsByRootRowId }) => ifNotUndefined(
                mapGet(idsByRootRowId, rootRowId),
                ([, listenerId]) => {
                  delStoreListeners(queryId, listenerId);
                  mapSet(idsByRootRowId, rootRowId);
                }
              )
            );
          }
        })
      )
    );
    return queries;
  }, "setQueryDefinition");
  const delQueryDefinition = /* @__PURE__ */ __name((queryId) => {
    resetPreStores(queryId);
    delDefinition(queryId);
    return queries;
  }, "delQueryDefinition");
  const addQueryIdsListener = /* @__PURE__ */ __name((listener) => addQueryIdsListenerImpl(() => listener(queries)), "addQueryIdsListener");
  const delListener = /* @__PURE__ */ __name((listenerId) => {
    delListenerImpl(listenerId);
    return queries;
  }, "delListener");
  const getListenerStats = /* @__PURE__ */ __name(() => {
    const {
      tables: _1,
      tableIds: _2,
      transaction: _3,
      ...stats
    } = resultStore.getListenerStats();
    return stats;
  }, "getListenerStats");
  const queries = {
    setQueryDefinition,
    delQueryDefinition,
    getStore,
    getQueryIds,
    forEachQuery,
    hasQuery,
    getTableId,
    addQueryIdsListener,
    delListener,
    destroy,
    getListenerStats
  };
  objToArray(
    {
      [TABLE]: [1, 1],
      [TABLE + CELL_IDS]: [0, 1],
      [ROW_COUNT]: [0, 1],
      [ROW_IDS]: [0, 1],
      [SORTED_ROW_IDS]: [0, 5],
      [ROW]: [1, 2],
      [CELL_IDS]: [0, 2],
      [CELL]: [1, 3]
    },
    ([hasAndForEach, argumentCount], gettable) => {
      arrayForEach(
        hasAndForEach ? [GET, "has", "forEach"] : [GET],
        (prefix) => queries[prefix + RESULT + gettable] = (...args) => resultStore[prefix + gettable](...args)
      );
      queries[ADD + RESULT + gettable + LISTENER] = (...args) => resultStore[ADD + gettable + LISTENER](
        ...slice(args, 0, argumentCount),
        (_store, ...listenerArgs) => args[argumentCount](queries, ...listenerArgs),
        true
      );
    }
  );
  return objFreeze(queries);
});
var createRelationships = getCreateFunction((store) => {
  const remoteTableIds = mapNew();
  const remoteRowIdListeners = mapNew();
  const localRowIdsListeners = mapNew();
  const linkedRowIdsListeners = mapNew();
  const [addListener2, callListeners, delListenerImpl] = getListenerFunctions(
    () => relationships
  );
  const [
    getStore,
    getRelationshipIds,
    forEachRelationshipImpl,
    hasRelationship,
    getLocalTableId,
    getRelationship,
    ,
    ,
    setDefinitionAndListen,
    delDefinition,
    addRelationshipIdsListener,
    destroy
  ] = getDefinableFunctions(
    store,
    () => [mapNew(), mapNew(), mapNew(), mapNew()],
    (value) => isUndefined(value) ? void 0 : value + EMPTY_STRING,
    addListener2,
    callListeners
  );
  const getLinkedRowIdsCache = /* @__PURE__ */ __name((relationshipId, firstRowId, skipCache) => ifNotUndefined(
    getRelationship(relationshipId),
    ([remoteRows, , linkedRowsCache]) => {
      if (!collHas(linkedRowsCache, firstRowId)) {
        const linkedRows = setNew();
        if (getLocalTableId(relationshipId) != getRemoteTableId(relationshipId)) {
          setAdd(linkedRows, firstRowId);
        } else {
          let rowId = firstRowId;
          while (!isUndefined(rowId) && !collHas(linkedRows, rowId)) {
            setAdd(linkedRows, rowId);
            rowId = mapGet(remoteRows, rowId);
          }
        }
        if (skipCache) {
          return linkedRows;
        }
        mapSet(linkedRowsCache, firstRowId, linkedRows);
      }
      return mapGet(linkedRowsCache, firstRowId);
    }
  ), "getLinkedRowIdsCache");
  const delLinkedRowIdsCache = /* @__PURE__ */ __name((relationshipId, firstRowId) => ifNotUndefined(
    getRelationship(relationshipId),
    ([, , linkedRowsCache]) => mapSet(linkedRowsCache, firstRowId)
  ), "delLinkedRowIdsCache");
  const setRelationshipDefinition = /* @__PURE__ */ __name((relationshipId, localTableId, remoteTableId, getRemoteRowId2) => {
    mapSet(remoteTableIds, relationshipId, remoteTableId);
    setDefinitionAndListen(
      relationshipId,
      localTableId,
      (change, changedRemoteRowIds) => {
        const changedLocalRows = setNew();
        const changedRemoteRows = setNew();
        const changedLinkedRows = setNew();
        const [localRows, remoteRows] = getRelationship(relationshipId);
        collForEach(
          changedRemoteRowIds,
          ([oldRemoteRowId, newRemoteRowId], localRowId) => {
            if (!isUndefined(oldRemoteRowId)) {
              setAdd(changedRemoteRows, oldRemoteRowId);
              ifNotUndefined(
                mapGet(remoteRows, oldRemoteRowId),
                (oldRemoteRow) => {
                  collDel(oldRemoteRow, localRowId);
                  if (collIsEmpty(oldRemoteRow)) {
                    mapSet(remoteRows, oldRemoteRowId);
                  }
                }
              );
            }
            if (!isUndefined(newRemoteRowId)) {
              setAdd(changedRemoteRows, newRemoteRowId);
              if (!collHas(remoteRows, newRemoteRowId)) {
                mapSet(remoteRows, newRemoteRowId, setNew());
              }
              setAdd(mapGet(remoteRows, newRemoteRowId), localRowId);
            }
            setAdd(changedLocalRows, localRowId);
            mapSet(localRows, localRowId, newRemoteRowId);
            mapForEach(
              mapGet(linkedRowIdsListeners, relationshipId),
              (firstRowId) => {
                if (collHas(
                  getLinkedRowIdsCache(relationshipId, firstRowId),
                  localRowId
                )) {
                  setAdd(changedLinkedRows, firstRowId);
                }
              }
            );
          }
        );
        change();
        collForEach(
          changedLocalRows,
          (localRowId) => callListeners(remoteRowIdListeners, [relationshipId, localRowId])
        );
        collForEach(
          changedRemoteRows,
          (remoteRowId) => callListeners(localRowIdsListeners, [relationshipId, remoteRowId])
        );
        collForEach(changedLinkedRows, (firstRowId) => {
          delLinkedRowIdsCache(relationshipId, firstRowId);
          callListeners(linkedRowIdsListeners, [relationshipId, firstRowId]);
        });
      },
      getRowCellFunction(getRemoteRowId2)
    );
    return relationships;
  }, "setRelationshipDefinition");
  const forEachRelationship = /* @__PURE__ */ __name((relationshipCallback) => forEachRelationshipImpl(
    (relationshipId) => relationshipCallback(
      relationshipId,
      (rowCallback) => store.forEachRow(getLocalTableId(relationshipId), rowCallback)
    )
  ), "forEachRelationship");
  const delRelationshipDefinition = /* @__PURE__ */ __name((relationshipId) => {
    mapSet(remoteTableIds, relationshipId);
    delDefinition(relationshipId);
    return relationships;
  }, "delRelationshipDefinition");
  const getRemoteTableId = /* @__PURE__ */ __name((relationshipId) => mapGet(remoteTableIds, relationshipId), "getRemoteTableId");
  const getRemoteRowId = /* @__PURE__ */ __name((relationshipId, localRowId) => mapGet(getRelationship(relationshipId)?.[0], localRowId), "getRemoteRowId");
  const getLocalRowIds = /* @__PURE__ */ __name((relationshipId, remoteRowId) => collValues(mapGet(getRelationship(relationshipId)?.[1], remoteRowId)), "getLocalRowIds");
  const getLinkedRowIds = /* @__PURE__ */ __name((relationshipId, firstRowId) => isUndefined(getRelationship(relationshipId)) ? [firstRowId] : collValues(getLinkedRowIdsCache(relationshipId, firstRowId, true)), "getLinkedRowIds");
  const addRemoteRowIdListener = /* @__PURE__ */ __name((relationshipId, localRowId, listener) => addListener2(listener, remoteRowIdListeners, [relationshipId, localRowId]), "addRemoteRowIdListener");
  const addLocalRowIdsListener = /* @__PURE__ */ __name((relationshipId, remoteRowId, listener) => addListener2(listener, localRowIdsListeners, [relationshipId, remoteRowId]), "addLocalRowIdsListener");
  const addLinkedRowIdsListener = /* @__PURE__ */ __name((relationshipId, firstRowId, listener) => {
    getLinkedRowIdsCache(relationshipId, firstRowId);
    return addListener2(listener, linkedRowIdsListeners, [
      relationshipId,
      firstRowId
    ]);
  }, "addLinkedRowIdsListener");
  const delListener = /* @__PURE__ */ __name((listenerId) => {
    delLinkedRowIdsCache(...delListenerImpl(listenerId) ?? []);
    return relationships;
  }, "delListener");
  const getListenerStats = /* @__PURE__ */ __name(() => ({
    remoteRowId: collSize3(remoteRowIdListeners),
    localRowIds: collSize3(localRowIdsListeners),
    linkedRowIds: collSize3(linkedRowIdsListeners)
  }), "getListenerStats");
  const relationships = {
    setRelationshipDefinition,
    delRelationshipDefinition,
    getStore,
    getRelationshipIds,
    forEachRelationship,
    hasRelationship,
    getLocalTableId,
    getRemoteTableId,
    getRemoteRowId,
    getLocalRowIds,
    getLinkedRowIds,
    addRelationshipIdsListener,
    addRemoteRowIdListener,
    addLocalRowIdsListener,
    addLinkedRowIdsListener,
    delListener,
    destroy,
    getListenerStats
  };
  return objFreeze(relationships);
});
var textEncoder = /* @__PURE__ */ new GLOBAL.TextEncoder();
var getHash = /* @__PURE__ */ __name((value) => {
  let hash = 2166136261;
  arrayForEach(textEncoder.encode(value), (char) => {
    hash ^= char;
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  });
  return hash >>> 0;
}, "getHash");
var stampClone = /* @__PURE__ */ __name(([value, time3]) => stampNew(value, time3), "stampClone");
var stampCloneWithHash = /* @__PURE__ */ __name(([value, time3, hash]) => [value, time3, hash], "stampCloneWithHash");
var stampNew = /* @__PURE__ */ __name((value, time3) => time3 ? [value, time3] : [value], "stampNew");
var stampNewWithHash = /* @__PURE__ */ __name((value, time3, hash) => [value, time3, hash], "stampNewWithHash");
var getStampHash = /* @__PURE__ */ __name((stamp) => stamp[2], "getStampHash");
var hashIdAndHash = /* @__PURE__ */ __name((id2, hash) => getHash(id2 + ":" + hash), "hashIdAndHash");
var replaceTimeHash = /* @__PURE__ */ __name((oldTime, newTime) => newTime > oldTime ? (oldTime ? getHash(oldTime) : 0) ^ getHash(newTime) : 0, "replaceTimeHash");
var getLatestTime = /* @__PURE__ */ __name((time1, time22) => (
  /* istanbul ignore next */
  ((time1 ?? "") > (time22 ?? "") ? time1 : time22) ?? ""
), "getLatestTime");
var stampUpdate = /* @__PURE__ */ __name((stamp, time3, hash) => {
  if (time3 > stamp[1]) {
    stamp[1] = time3;
  }
  stamp[2] = hash >>> 0;
}, "stampUpdate");
var stampNewObj = /* @__PURE__ */ __name((time3 = EMPTY_STRING) => stampNew(objNew(), time3), "stampNewObj");
var stampNewMap = /* @__PURE__ */ __name((time3 = EMPTY_STRING) => [mapNew(), time3, 0], "stampNewMap");
var stampMapToObjWithHash = /* @__PURE__ */ __name(([map, time3, hash], mapper = stampCloneWithHash) => [mapToObj(map, mapper), time3, hash], "stampMapToObjWithHash");
var stampMapToObjWithoutHash = /* @__PURE__ */ __name(([map, time3], mapper = stampClone) => stampNew(mapToObj(map, mapper), time3), "stampMapToObjWithoutHash");
var stampValidate = /* @__PURE__ */ __name((stamp, validateThing) => isArray(stamp) && size(stamp) == 3 && isString(stamp[1]) && getTypeOf(stamp[2]) == NUMBER && isFiniteNumber(stamp[2]) && validateThing(stamp[0]), "stampValidate");
var pairNew = /* @__PURE__ */ __name((value) => [value, value], "pairNew");
var pairCollSize2 = /* @__PURE__ */ __name((pair, func = collSize2) => func(pair[0]) + func(pair[1]), "pairCollSize2");
var pairNewMap = /* @__PURE__ */ __name(() => [mapNew(), mapNew()], "pairNewMap");
var pairClone = /* @__PURE__ */ __name((array) => [...array], "pairClone");
var pairIsEqual = /* @__PURE__ */ __name(([entry1, entry2]) => entry1 === entry2, "pairIsEqual");
var jsonString = JSON.stringify;
var jsonParse = JSON.parse;
var jsonStringWithMap = /* @__PURE__ */ __name((obj) => jsonString(
  obj,
  (_key, value) => isInstanceOf(value, Map) ? object.fromEntries([...value]) : value
), "jsonStringWithMap");
var idsChanged = /* @__PURE__ */ __name((changedIds, id2, addedOrRemoved) => mapSet(
  changedIds,
  id2,
  mapGet(changedIds, id2) == -addedOrRemoved ? void 0 : addedOrRemoved
), "idsChanged");
var createStore = /* @__PURE__ */ __name(() => {
  let hasTablesSchema;
  let hasValuesSchema;
  let hadTables = false;
  let hadValues = false;
  let transactions = 0;
  let internalListeners = [];
  const changedTableIds = mapNew();
  const changedTableCellIds = mapNew();
  const changedRowCount = mapNew();
  const changedRowIds = mapNew();
  const changedCellIds = mapNew();
  const changedCells = mapNew();
  const changedValueIds = mapNew();
  const changedValues = mapNew();
  const invalidCells = mapNew();
  const invalidValues = mapNew();
  const tablesSchemaMap = mapNew();
  const tablesSchemaRowCache = mapNew();
  const valuesSchemaMap = mapNew();
  const valuesDefaulted = mapNew();
  const valuesNonDefaulted = setNew();
  const tablePoolFunctions = mapNew();
  const tableCellIds = mapNew();
  const tablesMap = mapNew();
  const valuesMap = mapNew();
  const hasTablesListeners = pairNewMap();
  const tablesListeners = pairNewMap();
  const tableIdsListeners = pairNewMap();
  const hasTableListeners = pairNewMap();
  const tableListeners = pairNewMap();
  const tableCellIdsListeners = pairNewMap();
  const hasTableCellListeners = pairNewMap();
  const rowCountListeners = pairNewMap();
  const rowIdsListeners = pairNewMap();
  const sortedRowIdsListeners = pairNewMap();
  const hasRowListeners = pairNewMap();
  const rowListeners = pairNewMap();
  const cellIdsListeners = pairNewMap();
  const hasCellListeners = pairNewMap();
  const cellListeners = pairNewMap();
  const invalidCellListeners = pairNewMap();
  const invalidValueListeners = pairNewMap();
  const hasValuesListeners = pairNewMap();
  const valuesListeners = pairNewMap();
  const valueIdsListeners = pairNewMap();
  const hasValueListeners = pairNewMap();
  const valueListeners = pairNewMap();
  const startTransactionListeners = mapNew();
  const finishTransactionListeners = pairNewMap();
  const [addListener2, callListeners, delListenerImpl, callListenerImpl] = getListenerFunctions(() => store);
  const validateTablesSchema = /* @__PURE__ */ __name((tableSchema) => objValidate(
    tableSchema,
    (tableSchema2) => objValidate(tableSchema2, validateCellOrValueSchema)
  ), "validateTablesSchema");
  const validateValuesSchema = /* @__PURE__ */ __name((valuesSchema) => objValidate(valuesSchema, validateCellOrValueSchema), "validateValuesSchema");
  const validateCellOrValueSchema = /* @__PURE__ */ __name((schema) => {
    if (!objValidate(schema, (_child, id2) => arrayHas([TYPE, DEFAULT], id2))) {
      return false;
    }
    const type = schema[TYPE];
    if (!isTypeStringOrBoolean(type) && type != NUMBER) {
      return false;
    }
    if (getCellOrValueType(schema[DEFAULT]) != type) {
      objDel(schema, DEFAULT);
    }
    return true;
  }, "validateCellOrValueSchema");
  const validateContent = isArray;
  const validateTables = /* @__PURE__ */ __name((tables) => objValidate(tables, validateTable, cellInvalid), "validateTables");
  const validateTable = /* @__PURE__ */ __name((table3, tableId) => (!hasTablesSchema || collHas(tablesSchemaMap, tableId) || /* istanbul ignore next */
  cellInvalid(tableId)) && objValidate(
    table3,
    (row, rowId) => validateRow(tableId, rowId, row),
    () => cellInvalid(tableId)
  ), "validateTable");
  const validateRow = /* @__PURE__ */ __name((tableId, rowId, row, skipDefaults) => objValidate(
    skipDefaults ? row : addDefaultsToRow(row, tableId, rowId),
    (cell, cellId) => ifNotUndefined(
      getValidatedCell(tableId, rowId, cellId, cell),
      (validCell) => {
        row[cellId] = validCell;
        return true;
      },
      () => false
    ),
    () => cellInvalid(tableId, rowId)
  ), "validateRow");
  const getValidatedCell = /* @__PURE__ */ __name((tableId, rowId, cellId, cell) => hasTablesSchema ? ifNotUndefined(
    mapGet(mapGet(tablesSchemaMap, tableId), cellId),
    (cellSchema) => getCellOrValueType(cell) != cellSchema[TYPE] ? cellInvalid(tableId, rowId, cellId, cell, cellSchema[DEFAULT]) : cell,
    () => cellInvalid(tableId, rowId, cellId, cell)
  ) : isUndefined(getCellOrValueType(cell)) ? cellInvalid(tableId, rowId, cellId, cell) : cell, "getValidatedCell");
  const validateValues = /* @__PURE__ */ __name((values, skipDefaults) => objValidate(
    skipDefaults ? values : addDefaultsToValues(values),
    (value, valueId) => ifNotUndefined(
      getValidatedValue(valueId, value),
      (validValue) => {
        values[valueId] = validValue;
        return true;
      },
      () => false
    ),
    () => valueInvalid()
  ), "validateValues");
  const getValidatedValue = /* @__PURE__ */ __name((valueId, value) => hasValuesSchema ? ifNotUndefined(
    mapGet(valuesSchemaMap, valueId),
    (valueSchema) => getCellOrValueType(value) != valueSchema[TYPE] ? valueInvalid(valueId, value, valueSchema[DEFAULT]) : value,
    () => valueInvalid(valueId, value)
  ) : isUndefined(getCellOrValueType(value)) ? valueInvalid(valueId, value) : value, "getValidatedValue");
  const addDefaultsToRow = /* @__PURE__ */ __name((row, tableId, rowId) => {
    ifNotUndefined(
      mapGet(tablesSchemaRowCache, tableId),
      ([rowDefaulted, rowNonDefaulted]) => {
        collForEach(rowDefaulted, (cell, cellId) => {
          if (!objHas(row, cellId)) {
            row[cellId] = cell;
          }
        });
        collForEach(rowNonDefaulted, (cellId) => {
          if (!objHas(row, cellId)) {
            cellInvalid(tableId, rowId, cellId);
          }
        });
      }
    );
    return row;
  }, "addDefaultsToRow");
  const addDefaultsToValues = /* @__PURE__ */ __name((values) => {
    if (hasValuesSchema) {
      collForEach(valuesDefaulted, (value, valueId) => {
        if (!objHas(values, valueId)) {
          values[valueId] = value;
        }
      });
      collForEach(valuesNonDefaulted, (valueId) => {
        if (!objHas(values, valueId)) {
          valueInvalid(valueId);
        }
      });
    }
    return values;
  }, "addDefaultsToValues");
  const setValidTablesSchema = /* @__PURE__ */ __name((tablesSchema) => mapMatch(
    tablesSchemaMap,
    tablesSchema,
    (_tablesSchema, tableId, tableSchema) => {
      const rowDefaulted = mapNew();
      const rowNonDefaulted = setNew();
      mapMatch(
        mapEnsure(tablesSchemaMap, tableId, mapNew),
        tableSchema,
        (tableSchemaMap, cellId, cellSchema) => {
          mapSet(tableSchemaMap, cellId, cellSchema);
          ifNotUndefined(
            cellSchema[DEFAULT],
            (def) => mapSet(rowDefaulted, cellId, def),
            () => setAdd(rowNonDefaulted, cellId)
          );
        }
      );
      mapSet(tablesSchemaRowCache, tableId, [rowDefaulted, rowNonDefaulted]);
    },
    (_tablesSchema, tableId) => {
      mapSet(tablesSchemaMap, tableId);
      mapSet(tablesSchemaRowCache, tableId);
    }
  ), "setValidTablesSchema");
  const setValidValuesSchema = /* @__PURE__ */ __name((valuesSchema) => mapMatch(
    valuesSchemaMap,
    valuesSchema,
    (_valuesSchema, valueId, valueSchema) => {
      mapSet(valuesSchemaMap, valueId, valueSchema);
      ifNotUndefined(
        valueSchema[DEFAULT],
        (def) => mapSet(valuesDefaulted, valueId, def),
        () => setAdd(valuesNonDefaulted, valueId)
      );
    },
    (_valuesSchema, valueId) => {
      mapSet(valuesSchemaMap, valueId);
      mapSet(valuesDefaulted, valueId);
      collDel(valuesNonDefaulted, valueId);
    }
  ), "setValidValuesSchema");
  const setOrDelTables = /* @__PURE__ */ __name((tables) => objIsEmpty(tables) ? delTables() : setTables(tables), "setOrDelTables");
  const setValidContent = /* @__PURE__ */ __name(([tables, values]) => {
    (objIsEmpty(tables) ? delTables : setTables)(tables);
    (objIsEmpty(values) ? delValues : setValues)(values);
  }, "setValidContent");
  const setValidTables = /* @__PURE__ */ __name((tables) => mapMatch(
    tablesMap,
    tables,
    (_tables, tableId, table3) => setValidTable(tableId, table3),
    (_tables, tableId) => delValidTable(tableId)
  ), "setValidTables");
  const setValidTable = /* @__PURE__ */ __name((tableId, table3) => mapMatch(
    mapEnsure(tablesMap, tableId, () => {
      tableIdsChanged(tableId, 1);
      mapSet(tablePoolFunctions, tableId, getPoolFunctions());
      mapSet(tableCellIds, tableId, mapNew());
      return mapNew();
    }),
    table3,
    (tableMap, rowId, row) => setValidRow(tableId, tableMap, rowId, row),
    (tableMap, rowId) => delValidRow(tableId, tableMap, rowId)
  ), "setValidTable");
  const setValidRow = /* @__PURE__ */ __name((tableId, tableMap, rowId, row, forceDel) => mapMatch(
    mapEnsure(tableMap, rowId, () => {
      rowIdsChanged(tableId, rowId, 1);
      return mapNew();
    }),
    row,
    (rowMap, cellId, cell) => setValidCell(tableId, rowId, rowMap, cellId, cell),
    (rowMap, cellId) => delValidCell(tableId, tableMap, rowId, rowMap, cellId, forceDel)
  ), "setValidRow");
  const setValidCell = /* @__PURE__ */ __name((tableId, rowId, rowMap, cellId, cell) => {
    if (!collHas(rowMap, cellId)) {
      cellIdsChanged(tableId, rowId, cellId, 1);
    }
    const oldCell = mapGet(rowMap, cellId);
    if (cell !== oldCell) {
      cellChanged(tableId, rowId, cellId, oldCell, cell);
      mapSet(rowMap, cellId, cell);
    }
  }, "setValidCell");
  const setCellIntoDefaultRow = /* @__PURE__ */ __name((tableId, tableMap, rowId, cellId, validCell) => ifNotUndefined(
    mapGet(tableMap, rowId),
    (rowMap) => setValidCell(tableId, rowId, rowMap, cellId, validCell),
    () => setValidRow(
      tableId,
      tableMap,
      rowId,
      addDefaultsToRow({ [cellId]: validCell }, tableId, rowId)
    )
  ), "setCellIntoDefaultRow");
  const setOrDelValues = /* @__PURE__ */ __name((values) => objIsEmpty(values) ? delValues() : setValues(values), "setOrDelValues");
  const setValidValues = /* @__PURE__ */ __name((values) => mapMatch(
    valuesMap,
    values,
    (_valuesMap, valueId, value) => setValidValue(valueId, value),
    (_valuesMap, valueId) => delValidValue(valueId)
  ), "setValidValues");
  const setValidValue = /* @__PURE__ */ __name((valueId, value) => {
    if (!collHas(valuesMap, valueId)) {
      valueIdsChanged(valueId, 1);
    }
    const oldValue = mapGet(valuesMap, valueId);
    if (value !== oldValue) {
      valueChanged(valueId, oldValue, value);
      mapSet(valuesMap, valueId, value);
    }
  }, "setValidValue");
  const getNewRowId = /* @__PURE__ */ __name((tableId, reuse) => {
    const [getId] = mapGet(tablePoolFunctions, tableId);
    let rowId;
    do {
      rowId = getId(reuse);
    } while (collHas(mapGet(tablesMap, tableId), rowId));
    return rowId;
  }, "getNewRowId");
  const getOrCreateTable = /* @__PURE__ */ __name((tableId) => mapGet(tablesMap, tableId) ?? setValidTable(tableId, {}), "getOrCreateTable");
  const delValidTable = /* @__PURE__ */ __name((tableId) => setValidTable(tableId, {}), "delValidTable");
  const delValidRow = /* @__PURE__ */ __name((tableId, tableMap, rowId) => {
    const [, releaseId] = mapGet(tablePoolFunctions, tableId);
    releaseId(rowId);
    setValidRow(tableId, tableMap, rowId, {}, true);
  }, "delValidRow");
  const delValidCell = /* @__PURE__ */ __name((tableId, table3, rowId, row, cellId, forceDel) => {
    const defaultCell = mapGet(
      mapGet(tablesSchemaRowCache, tableId)?.[0],
      cellId
    );
    if (!isUndefined(defaultCell) && !forceDel) {
      return setValidCell(tableId, rowId, row, cellId, defaultCell);
    }
    const delCell2 = /* @__PURE__ */ __name((cellId2) => {
      cellChanged(tableId, rowId, cellId2, mapGet(row, cellId2));
      cellIdsChanged(tableId, rowId, cellId2, -1);
      mapSet(row, cellId2);
    }, "delCell2");
    if (isUndefined(defaultCell)) {
      delCell2(cellId);
    } else {
      mapForEach(row, delCell2);
    }
    if (collIsEmpty(row)) {
      rowIdsChanged(tableId, rowId, -1);
      if (collIsEmpty(mapSet(table3, rowId))) {
        tableIdsChanged(tableId, -1);
        mapSet(tablesMap, tableId);
        mapSet(tablePoolFunctions, tableId);
        mapSet(tableCellIds, tableId);
      }
    }
  }, "delValidCell");
  const delValidValue = /* @__PURE__ */ __name((valueId) => {
    const defaultValue = mapGet(valuesDefaulted, valueId);
    if (!isUndefined(defaultValue)) {
      return setValidValue(valueId, defaultValue);
    }
    valueChanged(valueId, mapGet(valuesMap, valueId));
    valueIdsChanged(valueId, -1);
    mapSet(valuesMap, valueId);
  }, "delValidValue");
  const tableIdsChanged = /* @__PURE__ */ __name((tableId, addedOrRemoved) => idsChanged(changedTableIds, tableId, addedOrRemoved), "tableIdsChanged");
  const rowIdsChanged = /* @__PURE__ */ __name((tableId, rowId, addedOrRemoved) => idsChanged(
    mapEnsure(changedRowIds, tableId, mapNew),
    rowId,
    addedOrRemoved
  ) && mapSet(
    changedRowCount,
    tableId,
    mapEnsure(changedRowCount, tableId, () => 0) + addedOrRemoved
  ), "rowIdsChanged");
  const cellIdsChanged = /* @__PURE__ */ __name((tableId, rowId, cellId, addedOrRemoved) => {
    const cellIds = mapGet(tableCellIds, tableId);
    const count3 = mapGet(cellIds, cellId) ?? 0;
    if (count3 == 0 && addedOrRemoved == 1 || count3 == 1 && addedOrRemoved == -1) {
      idsChanged(
        mapEnsure(changedTableCellIds, tableId, mapNew),
        cellId,
        addedOrRemoved
      );
    }
    mapSet(
      cellIds,
      cellId,
      count3 != -addedOrRemoved ? count3 + addedOrRemoved : null
    );
    idsChanged(
      mapEnsure(mapEnsure(changedCellIds, tableId, mapNew), rowId, mapNew),
      cellId,
      addedOrRemoved
    );
  }, "cellIdsChanged");
  const cellChanged = /* @__PURE__ */ __name((tableId, rowId, cellId, oldCell, newCell) => {
    mapEnsure(
      mapEnsure(mapEnsure(changedCells, tableId, mapNew), rowId, mapNew),
      cellId,
      () => [oldCell, 0]
    )[1] = newCell;
    internalListeners[3]?.(tableId, rowId, cellId, newCell);
  }, "cellChanged");
  const valueIdsChanged = /* @__PURE__ */ __name((valueId, addedOrRemoved) => idsChanged(changedValueIds, valueId, addedOrRemoved), "valueIdsChanged");
  const valueChanged = /* @__PURE__ */ __name((valueId, oldValue, newValue) => {
    mapEnsure(changedValues, valueId, () => [oldValue, 0])[1] = newValue;
    internalListeners[4]?.(valueId, newValue);
  }, "valueChanged");
  const cellInvalid = /* @__PURE__ */ __name((tableId, rowId, cellId, invalidCell, defaultedCell) => {
    arrayPush(
      mapEnsure(
        mapEnsure(mapEnsure(invalidCells, tableId, mapNew), rowId, mapNew),
        cellId,
        () => []
      ),
      invalidCell
    );
    return defaultedCell;
  }, "cellInvalid");
  const valueInvalid = /* @__PURE__ */ __name((valueId, invalidValue, defaultedValue) => {
    arrayPush(
      mapEnsure(invalidValues, valueId, () => []),
      invalidValue
    );
    return defaultedValue;
  }, "valueInvalid");
  const getCellChange = /* @__PURE__ */ __name((tableId, rowId, cellId) => ifNotUndefined(
    mapGet(mapGet(mapGet(changedCells, tableId), rowId), cellId),
    ([oldCell, newCell]) => [true, oldCell, newCell],
    () => [false, ...pairNew(getCell(tableId, rowId, cellId))]
  ), "getCellChange");
  const getValueChange = /* @__PURE__ */ __name((valueId) => ifNotUndefined(
    mapGet(changedValues, valueId),
    ([oldValue, newValue]) => [true, oldValue, newValue],
    () => [false, ...pairNew(getValue(valueId))]
  ), "getValueChange");
  const callInvalidCellListeners = /* @__PURE__ */ __name((mutator) => !collIsEmpty(invalidCells) && !collIsEmpty(invalidCellListeners[mutator]) ? collForEach(
    mutator ? mapClone3(invalidCells) : invalidCells,
    (rows, tableId) => collForEach(
      rows,
      (cells, rowId) => collForEach(
        cells,
        (invalidCell, cellId) => callListeners(
          invalidCellListeners[mutator],
          [tableId, rowId, cellId],
          invalidCell
        )
      )
    )
  ) : 0, "callInvalidCellListeners");
  const callInvalidValueListeners = /* @__PURE__ */ __name((mutator) => !collIsEmpty(invalidValues) && !collIsEmpty(invalidValueListeners[mutator]) ? collForEach(
    mutator ? mapClone(invalidValues) : invalidValues,
    (invalidValue, valueId) => callListeners(
      invalidValueListeners[mutator],
      [valueId],
      invalidValue
    )
  ) : 0, "callInvalidValueListeners");
  const callIdsAndHasListenersIfChanged = /* @__PURE__ */ __name((changedIds, idListeners, hasListeners, ids) => {
    if (!collIsEmpty(changedIds)) {
      callListeners(idListeners, ids, () => mapToObj(changedIds));
      mapForEach(
        changedIds,
        (changedId, changed) => callListeners(hasListeners, [...ids ?? [], changedId], changed == 1)
      );
      return 1;
    }
  }, "callIdsAndHasListenersIfChanged");
  const callTabularListenersForChanges = /* @__PURE__ */ __name((mutator) => {
    const hasTablesNow = hasTables();
    if (hasTablesNow != hadTables) {
      callListeners(hasTablesListeners[mutator], void 0, hasTablesNow);
    }
    const emptySortedRowIdListeners = collIsEmpty(
      sortedRowIdsListeners[mutator]
    );
    const emptyIdAndHasListeners = collIsEmpty(cellIdsListeners[mutator]) && collIsEmpty(hasCellListeners[mutator]) && collIsEmpty(rowIdsListeners[mutator]) && collIsEmpty(hasRowListeners[mutator]) && collIsEmpty(tableCellIdsListeners[mutator]) && collIsEmpty(hasTableCellListeners[mutator]) && collIsEmpty(rowCountListeners[mutator]) && emptySortedRowIdListeners && collIsEmpty(tableIdsListeners[mutator]) && collIsEmpty(hasTableListeners[mutator]);
    const emptyOtherListeners = collIsEmpty(cellListeners[mutator]) && collIsEmpty(rowListeners[mutator]) && collIsEmpty(tableListeners[mutator]) && collIsEmpty(tablesListeners[mutator]);
    if (!emptyIdAndHasListeners || !emptyOtherListeners) {
      const changes = mutator ? [
        mapClone(changedTableIds),
        mapClone2(changedTableCellIds),
        mapClone(changedRowCount),
        mapClone2(changedRowIds),
        mapClone3(changedCellIds),
        mapClone3(changedCells)
      ] : [
        changedTableIds,
        changedTableCellIds,
        changedRowCount,
        changedRowIds,
        changedCellIds,
        changedCells
      ];
      if (!emptyIdAndHasListeners) {
        callIdsAndHasListenersIfChanged(
          changes[0],
          tableIdsListeners[mutator],
          hasTableListeners[mutator]
        );
        collForEach(
          changes[1],
          (changedIds, tableId) => callIdsAndHasListenersIfChanged(
            changedIds,
            tableCellIdsListeners[mutator],
            hasTableCellListeners[mutator],
            [tableId]
          )
        );
        collForEach(changes[2], (changedCount, tableId) => {
          if (changedCount != 0) {
            callListeners(
              rowCountListeners[mutator],
              [tableId],
              getRowCount(tableId)
            );
          }
        });
        const calledSortableTableIds = setNew();
        collForEach(changes[3], (changedIds, tableId) => {
          if (callIdsAndHasListenersIfChanged(
            changedIds,
            rowIdsListeners[mutator],
            hasRowListeners[mutator],
            [tableId]
          ) && !emptySortedRowIdListeners) {
            callListeners(sortedRowIdsListeners[mutator], [tableId, null]);
            setAdd(calledSortableTableIds, tableId);
          }
        });
        if (!emptySortedRowIdListeners) {
          collForEach(changes[5], (rows, tableId) => {
            if (!collHas(calledSortableTableIds, tableId)) {
              const sortableCellIds = setNew();
              collForEach(
                rows,
                (cells) => collForEach(
                  cells,
                  ([oldCell, newCell], cellId) => newCell !== oldCell ? setAdd(sortableCellIds, cellId) : collDel(cells, cellId)
                )
              );
              collForEach(
                sortableCellIds,
                (cellId) => callListeners(sortedRowIdsListeners[mutator], [
                  tableId,
                  cellId
                ])
              );
            }
          });
        }
        collForEach(
          changes[4],
          (rowCellIds, tableId) => collForEach(
            rowCellIds,
            (changedIds, rowId) => callIdsAndHasListenersIfChanged(
              changedIds,
              cellIdsListeners[mutator],
              hasCellListeners[mutator],
              [tableId, rowId]
            )
          )
        );
      }
      if (!emptyOtherListeners) {
        let tablesChanged;
        collForEach(changes[5], (rows, tableId) => {
          let tableChanged;
          collForEach(rows, (cells, rowId) => {
            let rowChanged;
            collForEach(cells, ([oldCell, newCell], cellId) => {
              if (newCell !== oldCell) {
                callListeners(
                  cellListeners[mutator],
                  [tableId, rowId, cellId],
                  newCell,
                  oldCell,
                  getCellChange
                );
                tablesChanged = tableChanged = rowChanged = 1;
              }
            });
            if (rowChanged) {
              callListeners(
                rowListeners[mutator],
                [tableId, rowId],
                getCellChange
              );
            }
          });
          if (tableChanged) {
            callListeners(tableListeners[mutator], [tableId], getCellChange);
          }
        });
        if (tablesChanged) {
          callListeners(tablesListeners[mutator], void 0, getCellChange);
        }
      }
    }
  }, "callTabularListenersForChanges");
  const callValuesListenersForChanges = /* @__PURE__ */ __name((mutator) => {
    const hasValuesNow = hasValues();
    if (hasValuesNow != hadValues) {
      callListeners(hasValuesListeners[mutator], void 0, hasValuesNow);
    }
    const emptyIdAndHasListeners = collIsEmpty(valueIdsListeners[mutator]) && collIsEmpty(hasValueListeners[mutator]);
    const emptyOtherListeners = collIsEmpty(valueListeners[mutator]) && collIsEmpty(valuesListeners[mutator]);
    if (!emptyIdAndHasListeners || !emptyOtherListeners) {
      const changes = mutator ? [mapClone(changedValueIds), mapClone(changedValues)] : [changedValueIds, changedValues];
      if (!emptyIdAndHasListeners) {
        callIdsAndHasListenersIfChanged(
          changes[0],
          valueIdsListeners[mutator],
          hasValueListeners[mutator]
        );
      }
      if (!emptyOtherListeners) {
        let valuesChanged;
        collForEach(changes[1], ([oldValue, newValue], valueId) => {
          if (newValue !== oldValue) {
            callListeners(
              valueListeners[mutator],
              [valueId],
              newValue,
              oldValue,
              getValueChange
            );
            valuesChanged = 1;
          }
        });
        if (valuesChanged) {
          callListeners(valuesListeners[mutator], void 0, getValueChange);
        }
      }
    }
  }, "callValuesListenersForChanges");
  const fluentTransaction = /* @__PURE__ */ __name((actions, ...args) => {
    transaction(() => actions(...arrayMap(args, id)));
    return store;
  }, "fluentTransaction");
  const getContent = /* @__PURE__ */ __name(() => [getTables(), getValues()], "getContent");
  const getTables = /* @__PURE__ */ __name(() => mapToObj3(tablesMap), "getTables");
  const getTableIds = /* @__PURE__ */ __name(() => mapKeys(tablesMap), "getTableIds");
  const getTable = /* @__PURE__ */ __name((tableId) => mapToObj2(mapGet(tablesMap, id(tableId))), "getTable");
  const getTableCellIds = /* @__PURE__ */ __name((tableId) => mapKeys(mapGet(tableCellIds, id(tableId))), "getTableCellIds");
  const getRowCount = /* @__PURE__ */ __name((tableId) => collSize(mapGet(tablesMap, id(tableId))), "getRowCount");
  const getRowIds = /* @__PURE__ */ __name((tableId) => mapKeys(mapGet(tablesMap, id(tableId))), "getRowIds");
  const getSortedRowIds = /* @__PURE__ */ __name((tableId, cellId, descending, offset = 0, limit) => arrayMap(
    slice(
      arraySort(
        mapMap(mapGet(tablesMap, id(tableId)), (row, rowId) => [
          isUndefined(cellId) ? rowId : mapGet(row, id(cellId)),
          rowId
        ]),
        ([cell1], [cell2]) => defaultSorter(cell1, cell2) * (descending ? -1 : 1)
      ),
      offset,
      isUndefined(limit) ? limit : offset + limit
    ),
    ([, rowId]) => rowId
  ), "getSortedRowIds");
  const getRow = /* @__PURE__ */ __name((tableId, rowId) => mapToObj(mapGet(mapGet(tablesMap, id(tableId)), id(rowId))), "getRow");
  const getCellIds = /* @__PURE__ */ __name((tableId, rowId) => mapKeys(mapGet(mapGet(tablesMap, id(tableId)), id(rowId))), "getCellIds");
  const getCell = /* @__PURE__ */ __name((tableId, rowId, cellId) => mapGet(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), id(cellId)), "getCell");
  const getValues = /* @__PURE__ */ __name(() => mapToObj(valuesMap), "getValues");
  const getValueIds = /* @__PURE__ */ __name(() => mapKeys(valuesMap), "getValueIds");
  const getValue = /* @__PURE__ */ __name((valueId) => mapGet(valuesMap, id(valueId)), "getValue");
  const hasTables = /* @__PURE__ */ __name(() => !collIsEmpty(tablesMap), "hasTables");
  const hasTable = /* @__PURE__ */ __name((tableId) => collHas(tablesMap, id(tableId)), "hasTable");
  const hasTableCell = /* @__PURE__ */ __name((tableId, cellId) => collHas(mapGet(tableCellIds, id(tableId)), id(cellId)), "hasTableCell");
  const hasRow = /* @__PURE__ */ __name((tableId, rowId) => collHas(mapGet(tablesMap, id(tableId)), id(rowId)), "hasRow");
  const hasCell = /* @__PURE__ */ __name((tableId, rowId, cellId) => collHas(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), id(cellId)), "hasCell");
  const hasValues = /* @__PURE__ */ __name(() => !collIsEmpty(valuesMap), "hasValues");
  const hasValue = /* @__PURE__ */ __name((valueId) => collHas(valuesMap, id(valueId)), "hasValue");
  const getTablesJson = /* @__PURE__ */ __name(() => jsonStringWithMap(tablesMap), "getTablesJson");
  const getValuesJson = /* @__PURE__ */ __name(() => jsonStringWithMap(valuesMap), "getValuesJson");
  const getJson = /* @__PURE__ */ __name(() => jsonStringWithMap([tablesMap, valuesMap]), "getJson");
  const getTablesSchemaJson = /* @__PURE__ */ __name(() => jsonStringWithMap(tablesSchemaMap), "getTablesSchemaJson");
  const getValuesSchemaJson = /* @__PURE__ */ __name(() => jsonStringWithMap(valuesSchemaMap), "getValuesSchemaJson");
  const getSchemaJson = /* @__PURE__ */ __name(() => jsonStringWithMap([tablesSchemaMap, valuesSchemaMap]), "getSchemaJson");
  const setContent = /* @__PURE__ */ __name((content) => fluentTransaction(() => {
    const content2 = isFunction(content) ? content() : content;
    if (validateContent(content2)) {
      setValidContent(content2);
    }
  }), "setContent");
  const setTables = /* @__PURE__ */ __name((tables) => fluentTransaction(
    () => validateTables(tables) ? setValidTables(tables) : 0
  ), "setTables");
  const setTable = /* @__PURE__ */ __name((tableId, table3) => fluentTransaction(
    (tableId2) => validateTable(table3, tableId2) ? setValidTable(tableId2, table3) : 0,
    tableId
  ), "setTable");
  const setRow = /* @__PURE__ */ __name((tableId, rowId, row) => fluentTransaction(
    (tableId2, rowId2) => validateRow(tableId2, rowId2, row) ? setValidRow(tableId2, getOrCreateTable(tableId2), rowId2, row) : 0,
    tableId,
    rowId
  ), "setRow");
  const addRow = /* @__PURE__ */ __name((tableId, row, reuseRowIds = true) => transaction(() => {
    let rowId = void 0;
    if (validateRow(tableId, rowId, row)) {
      tableId = id(tableId);
      setValidRow(
        tableId,
        getOrCreateTable(tableId),
        rowId = getNewRowId(tableId, reuseRowIds ? 1 : 0),
        row
      );
    }
    return rowId;
  }), "addRow");
  const setPartialRow = /* @__PURE__ */ __name((tableId, rowId, partialRow) => fluentTransaction(
    (tableId2, rowId2) => {
      if (validateRow(tableId2, rowId2, partialRow, 1)) {
        const table3 = getOrCreateTable(tableId2);
        objToArray(
          partialRow,
          (cell, cellId) => setCellIntoDefaultRow(tableId2, table3, rowId2, cellId, cell)
        );
      }
    },
    tableId,
    rowId
  ), "setPartialRow");
  const setCell = /* @__PURE__ */ __name((tableId, rowId, cellId, cell) => fluentTransaction(
    (tableId2, rowId2, cellId2) => ifNotUndefined(
      getValidatedCell(
        tableId2,
        rowId2,
        cellId2,
        isFunction(cell) ? cell(getCell(tableId2, rowId2, cellId2)) : cell
      ),
      (validCell) => setCellIntoDefaultRow(
        tableId2,
        getOrCreateTable(tableId2),
        rowId2,
        cellId2,
        validCell
      )
    ),
    tableId,
    rowId,
    cellId
  ), "setCell");
  const setValues = /* @__PURE__ */ __name((values) => fluentTransaction(
    () => validateValues(values) ? setValidValues(values) : 0
  ), "setValues");
  const setPartialValues = /* @__PURE__ */ __name((partialValues) => fluentTransaction(
    () => validateValues(partialValues, 1) ? objToArray(
      partialValues,
      (value, valueId) => setValidValue(valueId, value)
    ) : 0
  ), "setPartialValues");
  const setValue = /* @__PURE__ */ __name((valueId, value) => fluentTransaction(
    (valueId2) => ifNotUndefined(
      getValidatedValue(
        valueId2,
        isFunction(value) ? value(getValue(valueId2)) : value
      ),
      (validValue) => setValidValue(valueId2, validValue)
    ),
    valueId
  ), "setValue");
  const applyChanges = /* @__PURE__ */ __name((changes) => fluentTransaction(() => {
    objToArray(
      changes[0],
      (table3, tableId) => isUndefined(table3) ? delTable(tableId) : objToArray(
        table3,
        (row, rowId) => isUndefined(row) ? delRow(tableId, rowId) : objToArray(
          row,
          (cell, cellId) => setOrDelCell(store, tableId, rowId, cellId, cell)
        )
      )
    );
    objToArray(
      changes[1],
      (value, valueId) => setOrDelValue(store, valueId, value)
    );
  }), "applyChanges");
  const setTablesJson = /* @__PURE__ */ __name((tablesJson) => {
    try {
      setOrDelTables(jsonParse(tablesJson));
    } catch {
    }
    return store;
  }, "setTablesJson");
  const setValuesJson = /* @__PURE__ */ __name((valuesJson) => {
    try {
      setOrDelValues(jsonParse(valuesJson));
    } catch {
    }
    return store;
  }, "setValuesJson");
  const setJson = /* @__PURE__ */ __name((tablesAndValuesJson) => fluentTransaction(() => {
    try {
      const [tables, values] = jsonParse(tablesAndValuesJson);
      setOrDelTables(tables);
      setOrDelValues(values);
    } catch {
      setTablesJson(tablesAndValuesJson);
    }
  }), "setJson");
  const setTablesSchema = /* @__PURE__ */ __name((tablesSchema) => fluentTransaction(() => {
    if (hasTablesSchema = validateTablesSchema(tablesSchema)) {
      setValidTablesSchema(tablesSchema);
      if (!collIsEmpty(tablesMap)) {
        const tables = getTables();
        delTables();
        setTables(tables);
      }
    }
  }), "setTablesSchema");
  const setValuesSchema = /* @__PURE__ */ __name((valuesSchema) => fluentTransaction(() => {
    if (hasValuesSchema = validateValuesSchema(valuesSchema)) {
      const values = getValues();
      delValuesSchema();
      delValues();
      hasValuesSchema = true;
      setValidValuesSchema(valuesSchema);
      setValues(values);
    }
  }), "setValuesSchema");
  const setSchema = /* @__PURE__ */ __name((tablesSchema, valuesSchema) => fluentTransaction(() => {
    setTablesSchema(tablesSchema);
    setValuesSchema(valuesSchema);
  }), "setSchema");
  const delTables = /* @__PURE__ */ __name(() => fluentTransaction(() => setValidTables({})), "delTables");
  const delTable = /* @__PURE__ */ __name((tableId) => fluentTransaction(
    (tableId2) => collHas(tablesMap, tableId2) ? delValidTable(tableId2) : 0,
    tableId
  ), "delTable");
  const delRow = /* @__PURE__ */ __name((tableId, rowId) => fluentTransaction(
    (tableId2, rowId2) => ifNotUndefined(
      mapGet(tablesMap, tableId2),
      (tableMap) => collHas(tableMap, rowId2) ? delValidRow(tableId2, tableMap, rowId2) : 0
    ),
    tableId,
    rowId
  ), "delRow");
  const delCell = /* @__PURE__ */ __name((tableId, rowId, cellId, forceDel) => fluentTransaction(
    (tableId2, rowId2, cellId2) => ifNotUndefined(
      mapGet(tablesMap, tableId2),
      (tableMap) => ifNotUndefined(
        mapGet(tableMap, rowId2),
        (rowMap) => collHas(rowMap, cellId2) ? delValidCell(
          tableId2,
          tableMap,
          rowId2,
          rowMap,
          cellId2,
          forceDel
        ) : 0
      )
    ),
    tableId,
    rowId,
    cellId
  ), "delCell");
  const delValues = /* @__PURE__ */ __name(() => fluentTransaction(() => setValidValues({})), "delValues");
  const delValue = /* @__PURE__ */ __name((valueId) => fluentTransaction(
    (valueId2) => collHas(valuesMap, valueId2) ? delValidValue(valueId2) : 0,
    valueId
  ), "delValue");
  const delTablesSchema = /* @__PURE__ */ __name(() => fluentTransaction(() => {
    setValidTablesSchema({});
    hasTablesSchema = false;
  }), "delTablesSchema");
  const delValuesSchema = /* @__PURE__ */ __name(() => fluentTransaction(() => {
    setValidValuesSchema({});
    hasValuesSchema = false;
  }), "delValuesSchema");
  const delSchema = /* @__PURE__ */ __name(() => fluentTransaction(() => {
    delTablesSchema();
    delValuesSchema();
  }), "delSchema");
  const transaction = /* @__PURE__ */ __name((actions, doRollback) => {
    if (transactions != -1) {
      startTransaction();
      const result = actions();
      finishTransaction(doRollback);
      return result;
    }
  }, "transaction");
  const startTransaction = /* @__PURE__ */ __name(() => {
    if (transactions != -1) {
      transactions++;
    }
    if (transactions == 1) {
      internalListeners[0]?.();
      callListeners(startTransactionListeners);
    }
    return store;
  }, "startTransaction");
  const getTransactionChanges = /* @__PURE__ */ __name(() => [
    mapToObj(
      changedCells,
      (table3, tableId) => mapGet(changedTableIds, tableId) === -1 ? void 0 : mapToObj(
        table3,
        (row, rowId) => mapGet(mapGet(changedRowIds, tableId), rowId) === -1 ? void 0 : mapToObj(
          row,
          ([, newCell]) => newCell,
          (changedCell) => pairIsEqual(changedCell)
        ),
        collIsEmpty,
        objIsEmpty
      ),
      collIsEmpty,
      objIsEmpty
    ),
    mapToObj(
      changedValues,
      ([, newValue]) => newValue,
      (changedValue) => pairIsEqual(changedValue)
    ),
    1
  ], "getTransactionChanges");
  const getTransactionLog = /* @__PURE__ */ __name(() => [
    !collIsEmpty(changedCells),
    !collIsEmpty(changedValues),
    mapToObj3(changedCells, pairClone, pairIsEqual),
    mapToObj3(invalidCells),
    mapToObj(changedValues, pairClone, pairIsEqual),
    mapToObj(invalidValues),
    mapToObj(changedTableIds),
    mapToObj2(changedRowIds),
    mapToObj3(changedCellIds),
    mapToObj(changedValueIds)
  ], "getTransactionLog");
  const finishTransaction = /* @__PURE__ */ __name((doRollback) => {
    if (transactions > 0) {
      transactions--;
      if (transactions == 0) {
        transactions = 1;
        callInvalidCellListeners(1);
        if (!collIsEmpty(changedCells)) {
          callTabularListenersForChanges(1);
        }
        callInvalidValueListeners(1);
        if (!collIsEmpty(changedValues)) {
          callValuesListenersForChanges(1);
        }
        if (doRollback?.(store)) {
          collForEach(
            changedCells,
            (table3, tableId) => collForEach(
              table3,
              (row, rowId) => collForEach(
                row,
                ([oldCell], cellId) => setOrDelCell(store, tableId, rowId, cellId, oldCell)
              )
            )
          );
          collClear(changedCells);
          collForEach(
            changedValues,
            ([oldValue], valueId) => setOrDelValue(store, valueId, oldValue)
          );
          collClear(changedValues);
        }
        callListeners(finishTransactionListeners[0], void 0);
        transactions = -1;
        callInvalidCellListeners(0);
        if (!collIsEmpty(changedCells)) {
          callTabularListenersForChanges(0);
        }
        callInvalidValueListeners(0);
        if (!collIsEmpty(changedValues)) {
          callValuesListenersForChanges(0);
        }
        internalListeners[1]?.();
        callListeners(finishTransactionListeners[1], void 0);
        internalListeners[2]?.();
        transactions = 0;
        hadTables = hasTables();
        hadValues = hasValues();
        arrayForEach(
          [
            changedTableIds,
            changedTableCellIds,
            changedRowCount,
            changedRowIds,
            changedCellIds,
            changedCells,
            invalidCells,
            changedValueIds,
            changedValues,
            invalidValues
          ],
          collClear
        );
      }
    }
    return store;
  }, "finishTransaction");
  const forEachTable = /* @__PURE__ */ __name((tableCallback) => collForEach(
    tablesMap,
    (tableMap, tableId) => tableCallback(
      tableId,
      (rowCallback) => collForEach(
        tableMap,
        (rowMap, rowId) => rowCallback(
          rowId,
          (cellCallback) => mapForEach(rowMap, cellCallback)
        )
      )
    )
  ), "forEachTable");
  const forEachTableCell = /* @__PURE__ */ __name((tableId, tableCellCallback) => mapForEach(mapGet(tableCellIds, id(tableId)), tableCellCallback), "forEachTableCell");
  const forEachRow = /* @__PURE__ */ __name((tableId, rowCallback) => collForEach(
    mapGet(tablesMap, id(tableId)),
    (rowMap, rowId) => rowCallback(rowId, (cellCallback) => mapForEach(rowMap, cellCallback))
  ), "forEachRow");
  const forEachCell = /* @__PURE__ */ __name((tableId, rowId, cellCallback) => mapForEach(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), cellCallback), "forEachCell");
  const forEachValue = /* @__PURE__ */ __name((valueCallback) => mapForEach(valuesMap, valueCallback), "forEachValue");
  const addSortedRowIdsListener = /* @__PURE__ */ __name((tableId, cellId, descending, offset, limit, listener, mutator) => {
    let sortedRowIds = getSortedRowIds(
      tableId,
      cellId,
      descending,
      offset,
      limit
    );
    return addListener2(
      () => {
        const newSortedRowIds = getSortedRowIds(
          tableId,
          cellId,
          descending,
          offset,
          limit
        );
        if (!arrayIsEqual(newSortedRowIds, sortedRowIds)) {
          sortedRowIds = newSortedRowIds;
          listener(
            store,
            tableId,
            cellId,
            descending,
            offset,
            limit,
            sortedRowIds
          );
        }
      },
      sortedRowIdsListeners[mutator ? 1 : 0],
      [tableId, cellId],
      [getTableIds]
    );
  }, "addSortedRowIdsListener");
  const addStartTransactionListener = /* @__PURE__ */ __name((listener) => addListener2(listener, startTransactionListeners), "addStartTransactionListener");
  const addWillFinishTransactionListener = /* @__PURE__ */ __name((listener) => addListener2(listener, finishTransactionListeners[0]), "addWillFinishTransactionListener");
  const addDidFinishTransactionListener = /* @__PURE__ */ __name((listener) => addListener2(listener, finishTransactionListeners[1]), "addDidFinishTransactionListener");
  const callListener = /* @__PURE__ */ __name((listenerId) => {
    callListenerImpl(listenerId);
    return store;
  }, "callListener");
  const delListener = /* @__PURE__ */ __name((listenerId) => {
    delListenerImpl(listenerId);
    return store;
  }, "delListener");
  const getListenerStats = /* @__PURE__ */ __name(() => ({
    hasTables: pairCollSize2(hasTablesListeners),
    tables: pairCollSize2(tablesListeners),
    tableIds: pairCollSize2(tableIdsListeners),
    hasTable: pairCollSize2(hasTableListeners),
    table: pairCollSize2(tableListeners),
    tableCellIds: pairCollSize2(tableCellIdsListeners),
    hasTableCell: pairCollSize2(hasTableCellListeners, collSize3),
    rowCount: pairCollSize2(rowCountListeners),
    rowIds: pairCollSize2(rowIdsListeners),
    sortedRowIds: pairCollSize2(sortedRowIdsListeners),
    hasRow: pairCollSize2(hasRowListeners, collSize3),
    row: pairCollSize2(rowListeners, collSize3),
    cellIds: pairCollSize2(cellIdsListeners, collSize3),
    hasCell: pairCollSize2(hasCellListeners, collSize4),
    cell: pairCollSize2(cellListeners, collSize4),
    invalidCell: pairCollSize2(invalidCellListeners, collSize4),
    hasValues: pairCollSize2(hasValuesListeners),
    values: pairCollSize2(valuesListeners),
    valueIds: pairCollSize2(valueIdsListeners),
    hasValue: pairCollSize2(hasValueListeners),
    value: pairCollSize2(valueListeners),
    invalidValue: pairCollSize2(invalidValueListeners),
    transaction: collSize2(startTransactionListeners) + pairCollSize2(finishTransactionListeners)
  }), "getListenerStats");
  const setInternalListeners = /* @__PURE__ */ __name((preStartTransaction, preFinishTransaction, postFinishTransaction, cellChanged2, valueChanged2) => internalListeners = [
    preStartTransaction,
    preFinishTransaction,
    postFinishTransaction,
    cellChanged2,
    valueChanged2
  ], "setInternalListeners");
  const store = {
    getContent,
    getTables,
    getTableIds,
    getTable,
    getTableCellIds,
    getRowCount,
    getRowIds,
    getSortedRowIds,
    getRow,
    getCellIds,
    getCell,
    getValues,
    getValueIds,
    getValue,
    hasTables,
    hasTable,
    hasTableCell,
    hasRow,
    hasCell,
    hasValues,
    hasValue,
    getTablesJson,
    getValuesJson,
    getJson,
    getTablesSchemaJson,
    getValuesSchemaJson,
    getSchemaJson,
    hasTablesSchema: /* @__PURE__ */ __name(() => hasTablesSchema, "hasTablesSchema"),
    hasValuesSchema: /* @__PURE__ */ __name(() => hasValuesSchema, "hasValuesSchema"),
    setContent,
    setTables,
    setTable,
    setRow,
    addRow,
    setPartialRow,
    setCell,
    setValues,
    setPartialValues,
    setValue,
    applyChanges,
    setTablesJson,
    setValuesJson,
    setJson,
    setTablesSchema,
    setValuesSchema,
    setSchema,
    delTables,
    delTable,
    delRow,
    delCell,
    delValues,
    delValue,
    delTablesSchema,
    delValuesSchema,
    delSchema,
    transaction,
    startTransaction,
    getTransactionChanges,
    getTransactionLog,
    finishTransaction,
    forEachTable,
    forEachTableCell,
    forEachRow,
    forEachCell,
    forEachValue,
    addSortedRowIdsListener,
    addStartTransactionListener,
    addWillFinishTransactionListener,
    addDidFinishTransactionListener,
    callListener,
    delListener,
    getListenerStats,
    isMergeable: /* @__PURE__ */ __name(() => false, "isMergeable"),
    // only used internally by other modules
    createStore,
    addListener: addListener2,
    callListeners,
    setInternalListeners
  };
  objToArray(
    {
      [HAS + TABLES]: [0, hasTablesListeners, [], () => [hasTables()]],
      [TABLES]: [0, tablesListeners],
      [TABLE_IDS]: [0, tableIdsListeners],
      [HAS + TABLE]: [
        1,
        hasTableListeners,
        [getTableIds],
        (ids) => [hasTable(...ids)]
      ],
      [TABLE]: [1, tableListeners, [getTableIds]],
      [TABLE + CELL_IDS]: [1, tableCellIdsListeners, [getTableIds]],
      [HAS + TABLE + CELL]: [
        2,
        hasTableCellListeners,
        [getTableIds, getTableCellIds],
        (ids) => [hasTableCell(...ids)]
      ],
      [ROW_COUNT]: [1, rowCountListeners, [getTableIds]],
      [ROW_IDS]: [1, rowIdsListeners, [getTableIds]],
      [HAS + ROW]: [
        2,
        hasRowListeners,
        [getTableIds, getRowIds],
        (ids) => [hasRow(...ids)]
      ],
      [ROW]: [2, rowListeners, [getTableIds, getRowIds]],
      [CELL_IDS]: [2, cellIdsListeners, [getTableIds, getRowIds]],
      [HAS + CELL]: [
        3,
        hasCellListeners,
        [getTableIds, getRowIds, getCellIds],
        (ids) => [hasCell(...ids)]
      ],
      [CELL]: [
        3,
        cellListeners,
        [getTableIds, getRowIds, getCellIds],
        (ids) => pairNew(getCell(...ids))
      ],
      InvalidCell: [3, invalidCellListeners],
      [HAS + VALUES]: [0, hasValuesListeners, [], () => [hasValues()]],
      [VALUES]: [0, valuesListeners],
      [VALUE_IDS]: [0, valueIdsListeners],
      [HAS + VALUE]: [
        1,
        hasValueListeners,
        [getValueIds],
        (ids) => [hasValue(...ids)]
      ],
      [VALUE]: [
        1,
        valueListeners,
        [getValueIds],
        (ids) => pairNew(getValue(ids[0]))
      ],
      InvalidValue: [1, invalidValueListeners]
    },
    ([argumentCount, idSetNode, pathGetters, extraArgsGetter], listenable) => {
      store[ADD + listenable + LISTENER] = (...args) => addListener2(
        args[argumentCount],
        idSetNode[args[argumentCount + 1] ? 1 : 0],
        argumentCount > 0 ? slice(args, 0, argumentCount) : void 0,
        pathGetters,
        extraArgsGetter
      );
    }
  );
  return objFreeze(store);
}, "createStore");
var SHIFT36 = 2 ** 36;
var SHIFT30 = 2 ** 30;
var SHIFT24 = 2 ** 24;
var SHIFT18 = 2 ** 18;
var SHIFT12 = 2 ** 12;
var SHIFT6 = 2 ** 6;
var encodeTimeAndCounter = /* @__PURE__ */ __name((logicalTime42, counter24) => encode(logicalTime42 / SHIFT36) + encode(logicalTime42 / SHIFT30) + encode(logicalTime42 / SHIFT24) + encode(logicalTime42 / SHIFT18) + encode(logicalTime42 / SHIFT12) + encode(logicalTime42 / SHIFT6) + encode(logicalTime42) + encode(counter24 / SHIFT18) + encode(counter24 / SHIFT12) + encode(counter24 / SHIFT6) + encode(counter24), "encodeTimeAndCounter");
var decodeTimeAndCounter = /* @__PURE__ */ __name((hlc16) => [
  decode(hlc16, 0) * SHIFT36 + decode(hlc16, 1) * SHIFT30 + decode(hlc16, 2) * SHIFT24 + decode(hlc16, 3) * SHIFT18 + decode(hlc16, 4) * SHIFT12 + decode(hlc16, 5) * SHIFT6 + decode(hlc16, 6),
  decode(hlc16, 7) * SHIFT18 + decode(hlc16, 8) * SHIFT12 + decode(hlc16, 9) * SHIFT6 + decode(hlc16, 10)
], "decodeTimeAndCounter");
var getHlcFunctions = /* @__PURE__ */ __name((uniqueId) => {
  let logicalTime = 0;
  let lastCounter = -1;
  const clientPart = ifNotUndefined(
    uniqueId,
    (uniqueId2) => {
      const clientHash30 = getHash(uniqueId2);
      return encode(clientHash30 / SHIFT24) + encode(clientHash30 / SHIFT18) + encode(clientHash30 / SHIFT12) + encode(clientHash30 / SHIFT6) + encode(clientHash30);
    },
    () => getUniqueId(5)
  );
  const getHlc = /* @__PURE__ */ __name(() => {
    seenHlc();
    return encodeTimeAndCounter(logicalTime, ++lastCounter) + clientPart;
  }, "getHlc");
  const seenHlc = /* @__PURE__ */ __name((hlc) => {
    const previousLogicalTime = logicalTime;
    const [remoteLogicalTime, remoteCounter] = isUndefined(hlc) || hlc == "" ? [0, 0] : decodeTimeAndCounter(hlc);
    logicalTime = mathMax(
      previousLogicalTime,
      remoteLogicalTime,
      GLOBAL.HLC_TIME ?? Date.now()
    );
    lastCounter = logicalTime == previousLogicalTime ? logicalTime == remoteLogicalTime ? mathMax(lastCounter, remoteCounter) : lastCounter : logicalTime == remoteLogicalTime ? remoteCounter : -1;
  }, "seenHlc");
  return [getHlc, seenHlc];
}, "getHlcFunctions");
var LISTENER_ARGS = {
  HasTable: 1,
  Table: 1,
  TableCellIds: 1,
  HasTableCell: 2,
  RowCount: 1,
  RowIds: 1,
  SortedRowIds: 5,
  HasRow: 2,
  Row: 2,
  CellIds: 2,
  HasCell: 3,
  Cell: 3,
  HasValue: 1,
  Value: 1,
  InvalidCell: 3,
  InvalidValue: 1
};
var newContentStampMap = /* @__PURE__ */ __name((time3 = EMPTY_STRING) => [
  stampNewMap(time3),
  stampNewMap(time3)
], "newContentStampMap");
var validateMergeableContent = /* @__PURE__ */ __name((mergeableContent) => isArray(mergeableContent) && size(mergeableContent) == 2 && stampValidate(
  mergeableContent[0],
  (tableStamps) => objValidate(
    tableStamps,
    (tableStamp) => stampValidate(
      tableStamp,
      (rowStamps) => objValidate(
        rowStamps,
        (rowStamp) => stampValidate(
          rowStamp,
          (cellStamps) => objValidate(
            cellStamps,
            (cellStamp) => stampValidate(cellStamp, isCellOrValueOrNullOrUndefined),
            void 0,
            1
          )
        ),
        void 0,
        1
      )
    ),
    void 0,
    1
  )
) && stampValidate(
  mergeableContent[1],
  (values) => objValidate(
    values,
    (value) => stampValidate(value, isCellOrValueOrNullOrUndefined),
    void 0,
    1
  )
), "validateMergeableContent");
var createMergeableStore = /* @__PURE__ */ __name((uniqueId) => {
  let listeningToRawStoreChanges = 1;
  let contentStampMap = newContentStampMap();
  let defaultingContent = 0;
  const touchedCells = mapNew();
  const touchedValues = setNew();
  const [getHlc, seenHlc] = getHlcFunctions(uniqueId);
  const store = createStore();
  const disableListeningToRawStoreChanges = /* @__PURE__ */ __name((actions) => {
    const wasListening = listeningToRawStoreChanges;
    listeningToRawStoreChanges = 0;
    actions();
    listeningToRawStoreChanges = wasListening;
    return mergeableStore;
  }, "disableListeningToRawStoreChanges");
  const mergeContentOrChanges = /* @__PURE__ */ __name((contentOrChanges, isContent = 0) => {
    const tablesChanges = {};
    const valuesChanges = {};
    const [
      [tablesObj, incomingTablesTime = EMPTY_STRING, incomingTablesHash = 0],
      values
    ] = contentOrChanges;
    const [tablesStampMap, valuesStampMap] = contentStampMap;
    const [tableStampMaps, oldTablesTime, oldTablesHash] = tablesStampMap;
    let tablesHash = isContent ? incomingTablesHash : oldTablesHash;
    let tablesTime = incomingTablesTime;
    objForEach(
      tablesObj,
      ([rowsObj, incomingTableTime = EMPTY_STRING, incomingTableHash = 0], tableId) => {
        const tableStampMap = mapEnsure(tableStampMaps, tableId, stampNewMap);
        const [rowStampMaps, oldTableTime, oldTableHash] = tableStampMap;
        let tableHash = isContent ? incomingTableHash : oldTableHash;
        let tableTime = incomingTableTime;
        objForEach(rowsObj, (row, rowId) => {
          const [rowTime, oldRowHash, rowHash] = mergeCellsOrValues(
            row,
            mapEnsure(rowStampMaps, rowId, stampNewMap),
            objEnsure(objEnsure(tablesChanges, tableId, objNew), rowId, objNew),
            isContent
          );
          tableHash ^= isContent ? 0 : (oldRowHash ? hashIdAndHash(rowId, oldRowHash) : 0) ^ hashIdAndHash(rowId, rowHash);
          tableTime = getLatestTime(tableTime, rowTime);
        });
        tableHash ^= isContent ? 0 : replaceTimeHash(oldTableTime, incomingTableTime);
        stampUpdate(tableStampMap, incomingTableTime, tableHash);
        tablesHash ^= isContent ? 0 : (oldTableHash ? hashIdAndHash(tableId, oldTableHash) : 0) ^ hashIdAndHash(tableId, tableStampMap[2]);
        tablesTime = getLatestTime(tablesTime, tableTime);
      }
    );
    tablesHash ^= isContent ? 0 : replaceTimeHash(oldTablesTime, incomingTablesTime);
    stampUpdate(tablesStampMap, incomingTablesTime, tablesHash);
    const [valuesTime] = mergeCellsOrValues(
      values,
      valuesStampMap,
      valuesChanges,
      isContent
    );
    seenHlc(getLatestTime(tablesTime, valuesTime));
    return [tablesChanges, valuesChanges, 1];
  }, "mergeContentOrChanges");
  const mergeCellsOrValues = /* @__PURE__ */ __name((things, thingsStampMap, thingsChanges, isContent) => {
    const [
      thingsObj,
      incomingThingsTime = EMPTY_STRING,
      incomingThingsHash = 0
    ] = things;
    const [thingStampMaps, oldThingsTime, oldThingsHash] = thingsStampMap;
    let thingsTime = incomingThingsTime;
    let thingsHash = isContent ? incomingThingsHash : oldThingsHash;
    objForEach(
      thingsObj,
      ([thing, thingTime, incomingThingHash = 0], thingId) => {
        const thingStampMap = mapEnsure(thingStampMaps, thingId, () => [
          void 0,
          EMPTY_STRING,
          0
        ]);
        const [, oldThingTime, oldThingHash] = thingStampMap;
        if (!oldThingTime || thingTime > oldThingTime) {
          stampUpdate(
            thingStampMap,
            thingTime,
            isContent ? incomingThingHash : getHash(jsonStringWithMap(thing ?? null) + ":" + thingTime)
          );
          thingStampMap[0] = thing;
          thingsChanges[thingId] = thing;
          thingsHash ^= isContent ? 0 : hashIdAndHash(thingId, oldThingHash) ^ hashIdAndHash(thingId, thingStampMap[2]);
          thingsTime = getLatestTime(thingsTime, thingTime);
        }
      }
    );
    thingsHash ^= isContent ? 0 : replaceTimeHash(oldThingsTime, incomingThingsTime);
    stampUpdate(thingsStampMap, incomingThingsTime, thingsHash);
    return [thingsTime, oldThingsHash, thingsStampMap[2]];
  }, "mergeCellsOrValues");
  const preStartTransaction = /* @__PURE__ */ __name(() => {
  }, "preStartTransaction");
  const preFinishTransaction = /* @__PURE__ */ __name(() => {
  }, "preFinishTransaction");
  const postFinishTransaction = /* @__PURE__ */ __name(() => {
    collClear(touchedCells);
    collClear(touchedValues);
  }, "postFinishTransaction");
  const cellChanged = /* @__PURE__ */ __name((tableId, rowId, cellId, newCell) => {
    setAdd(
      mapEnsure(mapEnsure(touchedCells, tableId, mapNew), rowId, setNew),
      cellId
    );
    if (listeningToRawStoreChanges) {
      mergeContentOrChanges([
        [
          {
            [tableId]: [
              {
                [rowId]: [
                  {
                    [cellId]: [
                      newCell,
                      defaultingContent ? EMPTY_STRING : getHlc()
                    ]
                  }
                ]
              }
            ]
          }
        ],
        [{}],
        1
      ]);
    }
  }, "cellChanged");
  const valueChanged = /* @__PURE__ */ __name((valueId, newValue) => {
    setAdd(touchedValues, valueId);
    if (listeningToRawStoreChanges) {
      mergeContentOrChanges([
        [{}],
        [{ [valueId]: [newValue, defaultingContent ? EMPTY_STRING : getHlc()] }],
        1
      ]);
    }
  }, "valueChanged");
  const getMergeableContent = /* @__PURE__ */ __name(() => [
    stampMapToObjWithHash(
      contentStampMap[0],
      (tableStampMap) => stampMapToObjWithHash(
        tableStampMap,
        (rowStampMap) => stampMapToObjWithHash(rowStampMap)
      )
    ),
    stampMapToObjWithHash(contentStampMap[1])
  ], "getMergeableContent");
  const getMergeableContentHashes = /* @__PURE__ */ __name(() => [
    contentStampMap[0][2],
    contentStampMap[1][2]
  ], "getMergeableContentHashes");
  const getMergeableTableHashes = /* @__PURE__ */ __name(() => mapToObj(contentStampMap[0][0], getStampHash), "getMergeableTableHashes");
  const getMergeableTableDiff = /* @__PURE__ */ __name((otherTableHashes) => {
    const newTables = stampNewObj(contentStampMap[0][1]);
    const differingTableHashes = {};
    mapForEach(
      contentStampMap[0][0],
      (tableId, [tableStampMap, tableTime, hash]) => objHas(otherTableHashes, tableId) ? hash != otherTableHashes[tableId] ? differingTableHashes[tableId] = hash : 0 : newTables[0][tableId] = stampMapToObjWithoutHash(
        [tableStampMap, tableTime],
        (rowStampMap) => stampMapToObjWithoutHash(rowStampMap)
      )
    );
    return [newTables, differingTableHashes];
  }, "getMergeableTableDiff");
  const getMergeableRowHashes = /* @__PURE__ */ __name((otherTableHashes) => {
    const rowHashes = {};
    objForEach(
      otherTableHashes,
      (otherTableHash, tableId) => ifNotUndefined(
        mapGet(contentStampMap[0][0], tableId),
        ([rowStampMaps, , tableHash]) => tableHash != otherTableHash ? mapForEach(
          rowStampMaps,
          (rowId, [, , rowHash]) => objEnsure(rowHashes, tableId, objNew)[rowId] = rowHash
        ) : 0
      )
    );
    return rowHashes;
  }, "getMergeableRowHashes");
  const getMergeableRowDiff = /* @__PURE__ */ __name((otherTableRowHashes) => {
    const newRows = stampNewObj(contentStampMap[0][1]);
    const differingRowHashes = {};
    objForEach(
      otherTableRowHashes,
      (otherRowHashes, tableId) => mapForEach(
        mapGet(contentStampMap[0][0], tableId)?.[0],
        (rowId, [rowStampMap, rowTime, hash]) => objHas(otherRowHashes, rowId) ? hash !== otherRowHashes[rowId] ? objEnsure(differingRowHashes, tableId, objNew)[rowId] = hash : 0 : objEnsure(newRows[0], tableId, stampNewObj)[0][rowId] = stampMapToObjWithoutHash([rowStampMap, rowTime])
      )
    );
    return [newRows, differingRowHashes];
  }, "getMergeableRowDiff");
  const getMergeableCellHashes = /* @__PURE__ */ __name((otherTableRowHashes) => {
    const cellHashes = {};
    objForEach(
      otherTableRowHashes,
      (otherRowHashes, tableId) => ifNotUndefined(
        mapGet(contentStampMap[0][0], tableId),
        ([rowStampMaps]) => objForEach(
          otherRowHashes,
          (otherRowHash, rowId) => ifNotUndefined(
            mapGet(rowStampMaps, rowId),
            ([cellStampMaps, , rowHash]) => rowHash !== otherRowHash ? mapForEach(
              cellStampMaps,
              (cellId, [, , cellHash]) => objEnsure(
                objEnsure(cellHashes, tableId, objNew),
                rowId,
                objNew
              )[cellId] = cellHash
            ) : 0
          )
        )
      )
    );
    return cellHashes;
  }, "getMergeableCellHashes");
  const getMergeableCellDiff = /* @__PURE__ */ __name((otherTableRowCellHashes) => {
    const [[tableStampMaps, tablesTime]] = contentStampMap;
    const tablesObj = {};
    objForEach(
      otherTableRowCellHashes,
      (otherRowCellHashes, tableId) => objForEach(
        otherRowCellHashes,
        (otherCellHashes, rowId) => ifNotUndefined(
          mapGet(tableStampMaps, tableId),
          ([rowStampMaps, tableTime]) => ifNotUndefined(
            mapGet(rowStampMaps, rowId),
            ([cellStampMaps, rowTime]) => mapForEach(
              cellStampMaps,
              (cellId, [cell, cellTime, hash]) => hash !== otherCellHashes[cellId] ? objEnsure(
                objEnsure(
                  tablesObj,
                  tableId,
                  () => stampNewObj(tableTime)
                )[0],
                rowId,
                () => stampNewObj(rowTime)
              )[0][cellId] = [cell, cellTime] : 0
            )
          )
        )
      )
    );
    return stampNew(tablesObj, tablesTime);
  }, "getMergeableCellDiff");
  const getMergeableValueHashes = /* @__PURE__ */ __name(() => mapToObj(contentStampMap[1][0], getStampHash), "getMergeableValueHashes");
  const getMergeableValueDiff = /* @__PURE__ */ __name((otherValueHashes) => {
    const [, [valueStampMaps, valuesTime]] = contentStampMap;
    const values = mapToObj(
      valueStampMaps,
      stampClone,
      ([, , hash], valueId) => hash == otherValueHashes?.[valueId]
    );
    return stampNew(values, valuesTime);
  }, "getMergeableValueDiff");
  const setMergeableContent = /* @__PURE__ */ __name((mergeableContent) => disableListeningToRawStoreChanges(
    () => validateMergeableContent(mergeableContent) ? store.transaction(() => {
      store.delTables().delValues();
      contentStampMap = newContentStampMap();
      store.applyChanges(mergeContentOrChanges(mergeableContent, 1));
    }) : 0
  ), "setMergeableContent");
  const setDefaultContent = /* @__PURE__ */ __name((content) => {
    store.transaction(() => {
      defaultingContent = 1;
      store.setContent(content);
      defaultingContent = 0;
    });
    return mergeableStore;
  }, "setDefaultContent");
  const getTransactionMergeableChanges = /* @__PURE__ */ __name((withHashes = false) => {
    const [
      [tableStampMaps, tablesTime, tablesHash],
      [valueStampMaps, valuesTime, valuesHash]
    ] = contentStampMap;
    const newStamp = withHashes ? stampNewWithHash : stampNew;
    const tablesObj = {};
    collForEach(
      touchedCells,
      (touchedTable, tableId) => ifNotUndefined(
        mapGet(tableStampMaps, tableId),
        ([rowStampMaps, tableTime, tableHash]) => {
          const tableObj = {};
          collForEach(
            touchedTable,
            (touchedRow, rowId) => ifNotUndefined(
              mapGet(rowStampMaps, rowId),
              ([cellStampMaps, rowTime, rowHash]) => {
                const rowObj = {};
                collForEach(touchedRow, (cellId) => {
                  ifNotUndefined(
                    mapGet(cellStampMaps, cellId),
                    ([cell, time3, hash]) => rowObj[cellId] = newStamp(cell, time3, hash)
                  );
                });
                tableObj[rowId] = newStamp(rowObj, rowTime, rowHash);
              }
            )
          );
          tablesObj[tableId] = newStamp(tableObj, tableTime, tableHash);
        }
      )
    );
    const valuesObj = {};
    collForEach(
      touchedValues,
      (valueId) => ifNotUndefined(
        mapGet(valueStampMaps, valueId),
        ([value, time3, hash]) => valuesObj[valueId] = newStamp(value, time3, hash)
      )
    );
    return [
      newStamp(tablesObj, tablesTime, tablesHash),
      newStamp(valuesObj, valuesTime, valuesHash),
      1
    ];
  }, "getTransactionMergeableChanges");
  const applyMergeableChanges = /* @__PURE__ */ __name((mergeableChanges) => disableListeningToRawStoreChanges(
    () => store.applyChanges(mergeContentOrChanges(mergeableChanges))
  ), "applyMergeableChanges");
  const merge = /* @__PURE__ */ __name((mergeableStore2) => {
    const mergeableChanges = getMergeableContent();
    const mergeableChanges2 = mergeableStore2.getMergeableContent();
    mergeableStore2.applyMergeableChanges(mergeableChanges);
    return applyMergeableChanges(mergeableChanges2);
  }, "merge");
  const mergeableStore = {
    getMergeableContent,
    getMergeableContentHashes,
    getMergeableTableHashes,
    getMergeableTableDiff,
    getMergeableRowHashes,
    getMergeableRowDiff,
    getMergeableCellHashes,
    getMergeableCellDiff,
    getMergeableValueHashes,
    getMergeableValueDiff,
    setMergeableContent,
    setDefaultContent,
    getTransactionMergeableChanges,
    applyMergeableChanges,
    merge
  };
  store.setInternalListeners(
    preStartTransaction,
    preFinishTransaction,
    postFinishTransaction,
    cellChanged,
    valueChanged
  );
  objToArray(
    store,
    (method, name) => mergeableStore[name] = // fluent methods
    strStartsWith(name, SET) || strStartsWith(name, DEL) || strStartsWith(name, "apply") || strEndsWith(name, TRANSACTION) || name == "call" + LISTENER ? (...args) => {
      method(...args);
      return mergeableStore;
    } : strStartsWith(name, ADD) && strEndsWith(name, LISTENER) ? (...args) => {
      const listenerArg = LISTENER_ARGS[slice(name, 3, -8)] ?? 0;
      const listener = args[listenerArg];
      args[listenerArg] = (_store, ...args2) => listener(mergeableStore, ...args2);
      return method(...args);
    } : name == "isMergeable" ? () => true : method
  );
  return objFreeze(mergeableStore);
}, "createMergeableStore");

// node_modules/tinybase/persisters/persister-durable-object-storage/index.js
var EMPTY_STRING2 = "";
var T = "t";
var V = "v";
var UNDEFINED = "\uFFFC";
var strStartsWith2 = /* @__PURE__ */ __name((str, prefix) => str.startsWith(prefix), "strStartsWith");
var isUndefined2 = /* @__PURE__ */ __name((thing) => thing == void 0, "isUndefined");
var ifNotUndefined2 = /* @__PURE__ */ __name((value, then, otherwise) => isUndefined2(value) ? otherwise?.() : then(value), "ifNotUndefined");
var isArray2 = /* @__PURE__ */ __name((thing) => Array.isArray(thing), "isArray");
var slice2 = /* @__PURE__ */ __name((arrayOrString, start, end) => arrayOrString.slice(start, end), "slice");
var size2 = /* @__PURE__ */ __name((arrayOrString) => arrayOrString.length, "size");
var test2 = /* @__PURE__ */ __name((regex, subject) => regex.test(subject), "test");
var errorNew = /* @__PURE__ */ __name((message) => {
  throw new Error(message);
}, "errorNew");
var arrayForEach2 = /* @__PURE__ */ __name((array, cb) => array.forEach(cb), "arrayForEach");
var arrayClear2 = /* @__PURE__ */ __name((array, to) => array.splice(0, to), "arrayClear");
var arrayPush2 = /* @__PURE__ */ __name((array, ...values) => array.push(...values), "arrayPush");
var arrayShift2 = /* @__PURE__ */ __name((array) => array.shift(), "arrayShift");
var object2 = Object;
var getPrototypeOf2 = /* @__PURE__ */ __name((obj) => object2.getPrototypeOf(obj), "getPrototypeOf");
var objEntries2 = object2.entries;
var isObject2 = /* @__PURE__ */ __name((obj) => !isUndefined2(obj) && ifNotUndefined2(
  getPrototypeOf2(obj),
  (objPrototype) => objPrototype == object2.prototype || isUndefined2(getPrototypeOf2(objPrototype)),
  /* istanbul ignore next */
  () => true
), "isObject");
var objIds2 = object2.keys;
var objFreeze2 = object2.freeze;
var objHas2 = /* @__PURE__ */ __name((obj, id2) => id2 in obj, "objHas");
var objForEach2 = /* @__PURE__ */ __name((obj, cb) => arrayForEach2(objEntries2(obj), ([id2, value]) => cb(value, id2)), "objForEach");
var objSize2 = /* @__PURE__ */ __name((obj) => size2(objIds2(obj)), "objSize");
var objIsEmpty2 = /* @__PURE__ */ __name((obj) => isObject2(obj) && objSize2(obj) == 0, "objIsEmpty");
var objEnsure2 = /* @__PURE__ */ __name((obj, id2, getDefaultValue) => {
  if (!objHas2(obj, id2)) {
    obj[id2] = getDefaultValue();
  }
  return obj[id2];
}, "objEnsure");
var collSize5 = /* @__PURE__ */ __name((coll) => coll?.size ?? 0, "collSize");
var collHas2 = /* @__PURE__ */ __name((coll, keyOrValue) => coll?.has(keyOrValue) ?? false, "collHas");
var collIsEmpty2 = /* @__PURE__ */ __name((coll) => isUndefined2(coll) || collSize5(coll) == 0, "collIsEmpty");
var collForEach2 = /* @__PURE__ */ __name((coll, cb) => coll?.forEach(cb), "collForEach");
var collDel2 = /* @__PURE__ */ __name((coll, keyOrValue) => coll?.delete(keyOrValue), "collDel");
var mapNew2 = /* @__PURE__ */ __name((entries) => new Map(entries), "mapNew");
var mapGet2 = /* @__PURE__ */ __name((map, key) => map?.get(key), "mapGet");
var mapSet2 = /* @__PURE__ */ __name((map, key, value) => isUndefined2(value) ? (collDel2(map, key), map) : map?.set(key, value), "mapSet");
var mapEnsure2 = /* @__PURE__ */ __name((map, key, getDefaultValue, hadExistingValue) => {
  if (!collHas2(map, key)) {
    mapSet2(map, key, getDefaultValue());
  } else {
    hadExistingValue?.(mapGet2(map, key));
  }
  return mapGet2(map, key);
}, "mapEnsure");
var mapToObj4 = /* @__PURE__ */ __name((map, valueMapper, excludeMapValue, excludeObjValue) => {
  const obj = {};
  collForEach2(map, (mapValue, id2) => {
    {
      const objValue = mapValue;
      {
        obj[id2] = objValue;
      }
    }
  });
  return obj;
}, "mapToObj");
var visitTree2 = /* @__PURE__ */ __name((node, path, ensureLeaf, pruneLeaf, p = 0) => ifNotUndefined2(
  (ensureLeaf ? mapEnsure2 : mapGet2)(
    node,
    path[p],
    p > size2(path) - 2 ? ensureLeaf : mapNew2
  ),
  (nodeOrLeaf) => {
    if (p > size2(path) - 2) {
      if (pruneLeaf?.(nodeOrLeaf)) {
        mapSet2(node, path[p]);
      }
      return nodeOrLeaf;
    }
    const leaf = visitTree2(nodeOrLeaf, path, ensureLeaf, pruneLeaf, p + 1);
    if (collIsEmpty2(nodeOrLeaf)) {
      mapSet2(node, path[p]);
    }
    return leaf;
  }
), "visitTree");
var stampNewWithHash2 = /* @__PURE__ */ __name((value, time3, hash) => [value, time3, hash], "stampNewWithHash");
var stampUpdate2 = /* @__PURE__ */ __name((stamp, time3, hash) => {
  if (time3 > stamp[1]) {
    stamp[1] = time3;
  }
  stamp[2] = hash >>> 0;
}, "stampUpdate");
var setNew2 = /* @__PURE__ */ __name((entryOrEntries) => new Set(
  isArray2(entryOrEntries) || isUndefined2(entryOrEntries) ? entryOrEntries : [entryOrEntries]
), "setNew");
var setAdd2 = /* @__PURE__ */ __name((set, value) => set?.add(value), "setAdd");
var INTEGER2 = /^\d+$/;
var getPoolFunctions2 = /* @__PURE__ */ __name(() => {
  const pool = [];
  let nextId = 0;
  return [
    (reuse) => (reuse ? arrayShift2(pool) : null) ?? EMPTY_STRING2 + nextId++,
    (id2) => {
      if (test2(INTEGER2, id2) && size2(pool) < 1e3) {
        arrayPush2(pool, id2);
      }
    }
  ];
}, "getPoolFunctions");
var getWildcardedLeaves2 = /* @__PURE__ */ __name((deepIdSet, path = [EMPTY_STRING2]) => {
  const leaves = [];
  const deep = /* @__PURE__ */ __name((node, p) => p == size2(path) ? arrayPush2(leaves, node) : path[p] === null ? collForEach2(node, (node2) => deep(node2, p + 1)) : arrayForEach2([path[p], null], (id2) => deep(mapGet2(node, id2), p + 1)), "deep");
  deep(deepIdSet, 0);
  return leaves;
}, "getWildcardedLeaves");
var getListenerFunctions2 = /* @__PURE__ */ __name((getThing) => {
  let thing;
  const [getId, releaseId] = getPoolFunctions2();
  const allListeners = mapNew2();
  const addListener2 = /* @__PURE__ */ __name((listener, idSetNode, path, pathGetters = [], extraArgsGetter = () => []) => {
    thing ??= getThing();
    const id2 = getId(1);
    mapSet2(allListeners, id2, [
      listener,
      idSetNode,
      path,
      pathGetters,
      extraArgsGetter
    ]);
    setAdd2(visitTree2(idSetNode, path ?? [EMPTY_STRING2], setNew2), id2);
    return id2;
  }, "addListener");
  const callListeners = /* @__PURE__ */ __name((idSetNode, ids, ...extraArgs) => arrayForEach2(
    getWildcardedLeaves2(idSetNode, ids),
    (set) => collForEach2(
      set,
      (id2) => mapGet2(allListeners, id2)[0](thing, ...ids ?? [], ...extraArgs)
    )
  ), "callListeners");
  const delListener = /* @__PURE__ */ __name((id2) => ifNotUndefined2(mapGet2(allListeners, id2), ([, idSetNode, idOrNulls]) => {
    visitTree2(idSetNode, idOrNulls ?? [EMPTY_STRING2], void 0, (idSet) => {
      collDel2(idSet, id2);
      return collIsEmpty2(idSet) ? 1 : 0;
    });
    mapSet2(allListeners, id2);
    releaseId(id2);
    return idOrNulls;
  }), "delListener");
  const callListener = /* @__PURE__ */ __name((id2) => ifNotUndefined2(
    mapGet2(allListeners, id2),
    ([listener, , path = [], pathGetters, extraArgsGetter]) => {
      const callWithIds = /* @__PURE__ */ __name((...ids) => {
        const index = size2(ids);
        if (index == size2(path)) {
          listener(thing, ...ids, ...extraArgsGetter(ids));
        } else if (isUndefined2(path[index])) {
          arrayForEach2(
            pathGetters[index]?.(...ids) ?? [],
            (id22) => callWithIds(...ids, id22)
          );
        } else {
          callWithIds(...ids, path[index]);
        }
      }, "callWithIds");
      callWithIds();
    }
  ), "callListener");
  return [addListener2, callListeners, delListener, callListener];
}, "getListenerFunctions");
var scheduleRunning = mapNew2();
var scheduleActions = mapNew2();
var getStoreFunctions = /* @__PURE__ */ __name((persist = 1, store, isSynchronizer) => persist != 1 && store.isMergeable() ? [
  1,
  store.getMergeableContent,
  () => store.getTransactionMergeableChanges(!isSynchronizer),
  ([[changedTables], [changedValues]]) => !objIsEmpty2(changedTables) || !objIsEmpty2(changedValues),
  store.setDefaultContent
] : persist != 2 ? [
  0,
  store.getContent,
  store.getTransactionChanges,
  ([changedTables, changedValues]) => !objIsEmpty2(changedTables) || !objIsEmpty2(changedValues),
  store.setContent
] : errorNew("Store type not supported by this Persister"), "getStoreFunctions");
var createCustomPersister = /* @__PURE__ */ __name((store, getPersisted, setPersisted, addPersisterListener, delPersisterListener, onIgnoredError, persist, extra = {}, isSynchronizer = 0, scheduleId = []) => {
  let status = 0;
  let loads = 0;
  let saves = 0;
  let action;
  let autoLoadHandle;
  let autoSaveListenerId;
  mapEnsure2(scheduleRunning, scheduleId, () => 0);
  mapEnsure2(scheduleActions, scheduleId, () => []);
  const statusListeners = mapNew2();
  const [
    isMergeableStore,
    getContent,
    getChanges,
    hasChanges,
    setDefaultContent
  ] = getStoreFunctions(persist, store, isSynchronizer);
  const [addListener2, callListeners, delListenerImpl] = getListenerFunctions2(
    () => persister
  );
  const setStatus = /* @__PURE__ */ __name((newStatus) => {
    if (newStatus != status) {
      status = newStatus;
      callListeners(statusListeners, void 0, status);
    }
  }, "setStatus");
  const run = /* @__PURE__ */ __name(async () => {
    if (!mapGet2(scheduleRunning, scheduleId)) {
      mapSet2(scheduleRunning, scheduleId, 1);
      while (!isUndefined2(action = arrayShift2(mapGet2(scheduleActions, scheduleId)))) {
        try {
          await action();
        } catch (error3) {
          onIgnoredError?.(error3);
        }
      }
      mapSet2(scheduleRunning, scheduleId, 0);
    }
  }, "run");
  const setContentOrChanges = /* @__PURE__ */ __name((contentOrChanges) => {
    (isMergeableStore && isArray2(contentOrChanges?.[0]) ? contentOrChanges?.[2] === 1 ? store.applyMergeableChanges : store.setMergeableContent : contentOrChanges?.[2] === 1 ? store.applyChanges : store.setContent)(contentOrChanges);
  }, "setContentOrChanges");
  const load = /* @__PURE__ */ __name(async (initialContent) => {
    if (status != 2) {
      setStatus(
        1
        /* Loading */
      );
      loads++;
      await schedule(async () => {
        try {
          const content = await getPersisted();
          if (isArray2(content)) {
            setContentOrChanges(content);
          } else if (initialContent) {
            setDefaultContent(initialContent);
          } else {
            errorNew(`Content is not an array: ${content}`);
          }
        } catch (error3) {
          onIgnoredError?.(error3);
          if (initialContent) {
            setDefaultContent(initialContent);
          }
        }
        setStatus(
          0
          /* Idle */
        );
      });
    }
    return persister;
  }, "load");
  const startAutoLoad = /* @__PURE__ */ __name(async (initialContent) => {
    stopAutoLoad();
    await load(initialContent);
    try {
      autoLoadHandle = await addPersisterListener(async (content, changes) => {
        if (changes || content) {
          if (status != 2) {
            setStatus(
              1
              /* Loading */
            );
            loads++;
            setContentOrChanges(changes ?? content);
            setStatus(
              0
              /* Idle */
            );
          }
        } else {
          await load();
        }
      });
    } catch (error3) {
      onIgnoredError?.(error3);
    }
    return persister;
  }, "startAutoLoad");
  const stopAutoLoad = /* @__PURE__ */ __name(() => {
    if (autoLoadHandle) {
      autoLoadHandle = void 0;
    }
    return persister;
  }, "stopAutoLoad");
  const isAutoLoading = /* @__PURE__ */ __name(() => !isUndefined2(autoLoadHandle), "isAutoLoading");
  const save = /* @__PURE__ */ __name(async (changes) => {
    if (status != 1) {
      setStatus(
        2
        /* Saving */
      );
      saves++;
      await schedule(async () => {
        try {
          await setPersisted(getContent, changes);
        } catch (error3) {
          onIgnoredError?.(error3);
        }
        setStatus(
          0
          /* Idle */
        );
      });
    }
    return persister;
  }, "save");
  const startAutoSave = /* @__PURE__ */ __name(async () => {
    stopAutoSave();
    await save();
    autoSaveListenerId = store.addDidFinishTransactionListener(() => {
      const changes = getChanges();
      if (hasChanges(changes)) {
        save(changes);
      }
    });
    return persister;
  }, "startAutoSave");
  const stopAutoSave = /* @__PURE__ */ __name(() => {
    if (autoSaveListenerId) {
      store.delListener(autoSaveListenerId);
      autoSaveListenerId = void 0;
    }
    return persister;
  }, "stopAutoSave");
  const isAutoSaving = /* @__PURE__ */ __name(() => !isUndefined2(autoSaveListenerId), "isAutoSaving");
  const getStatus = /* @__PURE__ */ __name(() => status, "getStatus");
  const addStatusListener = /* @__PURE__ */ __name((listener) => addListener2(listener, statusListeners), "addStatusListener");
  const delListener = /* @__PURE__ */ __name((listenerId) => {
    delListenerImpl(listenerId);
    return store;
  }, "delListener");
  const schedule = /* @__PURE__ */ __name(async (...actions) => {
    arrayPush2(mapGet2(scheduleActions, scheduleId), ...actions);
    await run();
    return persister;
  }, "schedule");
  const getStore = /* @__PURE__ */ __name(() => store, "getStore");
  const destroy = /* @__PURE__ */ __name(() => {
    arrayClear2(mapGet2(scheduleActions, scheduleId));
    return stopAutoLoad().stopAutoSave();
  }, "destroy");
  const getStats = /* @__PURE__ */ __name(() => ({ loads, saves }), "getStats");
  const persister = {
    load,
    startAutoLoad,
    stopAutoLoad,
    isAutoLoading,
    save,
    startAutoSave,
    stopAutoSave,
    isAutoSaving,
    getStatus,
    addStatusListener,
    delListener,
    schedule,
    getStore,
    destroy,
    getStats,
    ...extra
  };
  return objFreeze2(persister);
}, "createCustomPersister");
var jsonString2 = JSON.stringify;
var jsonStringWithUndefined = /* @__PURE__ */ __name((obj) => jsonString2(obj, (_key, value) => value === void 0 ? UNDEFINED : value), "jsonStringWithUndefined");
var stampNewObjectWithHash = /* @__PURE__ */ __name(() => stampNewWithHash2({}, EMPTY_STRING2, 0), "stampNewObjectWithHash");
var createDurableObjectStoragePersister = /* @__PURE__ */ __name((store, storage, storagePrefix = EMPTY_STRING2, onIgnoredError) => {
  const constructKey = /* @__PURE__ */ __name((type, ...ids) => storagePrefix + type + slice2(jsonStringWithUndefined(ids), 1, -1), "constructKey");
  const deconstructKey = /* @__PURE__ */ __name((key) => {
    if (strStartsWith2(key, storagePrefix)) {
      const type = slice2(key, storagePrefix.length, 1);
      return type == T || type == V ? [
        type,
        ...JSON.parse("[" + slice2(key, storagePrefix.length + 1) + "]")
      ] : void 0;
    }
  }, "deconstructKey");
  const getPersisted = /* @__PURE__ */ __name(async () => {
    const tables = stampNewObjectWithHash();
    const values = stampNewObjectWithHash();
    (await storage.list({ prefix: storagePrefix })).forEach(
      async ([zeroOrCellOrValue, time3, hash], key) => ifNotUndefined2(
        deconstructKey(key),
        ([type, ...ids]) => type == T ? ifNotUndefined2(
          ids[0],
          (tableId) => {
            const table3 = objEnsure2(
              tables[0],
              tableId,
              stampNewObjectWithHash
            );
            ifNotUndefined2(
              ids[1],
              (rowId) => {
                const row = objEnsure2(
                  table3[0],
                  rowId,
                  stampNewObjectWithHash
                );
                ifNotUndefined2(
                  ids[2],
                  (cellId) => row[0][cellId] = [zeroOrCellOrValue, time3, hash],
                  () => stampUpdate2(row, time3, hash)
                );
              },
              () => stampUpdate2(table3, time3, hash)
            );
          },
          () => stampUpdate2(tables, time3, hash)
        ) : type == V ? ifNotUndefined2(
          ids[0],
          (valueId) => values[0][valueId] = [zeroOrCellOrValue, time3, hash],
          () => stampUpdate2(values, time3, hash)
        ) : 0
      )
    );
    return [tables, values];
  }, "getPersisted");
  const setPersisted = /* @__PURE__ */ __name(async (getContent, [
    [tablesObj, tablesTime, tablesHash],
    [valuesObj, valuesTime, valuesHash]
  ] = getContent()) => {
    const keysToSet = mapNew2();
    mapSet2(keysToSet, constructKey(T), [0, tablesTime, tablesHash]);
    objForEach2(tablesObj, ([tableObj, tableTime, tableHash], tableId) => {
      mapSet2(keysToSet, constructKey(T, tableId), [0, tableTime, tableHash]);
      objForEach2(tableObj, ([rowObj, rowTime, rowHash], rowId) => {
        mapSet2(keysToSet, constructKey(T, tableId, rowId), [
          0,
          rowTime,
          rowHash
        ]);
        objForEach2(
          rowObj,
          (cellStamp, cellId) => mapSet2(keysToSet, constructKey(T, tableId, rowId, cellId), cellStamp)
        );
      });
    });
    mapSet2(keysToSet, constructKey(V), [0, valuesTime, valuesHash]);
    objForEach2(
      valuesObj,
      (valueStamp, valueId) => mapSet2(keysToSet, constructKey(V, valueId), valueStamp)
    );
    await storage.put(mapToObj4(keysToSet));
  }, "setPersisted");
  const addPersisterListener = /* @__PURE__ */ __name(() => {
  }, "addPersisterListener");
  const delPersisterListener = /* @__PURE__ */ __name(() => {
  }, "delPersisterListener");
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    2,
    // MergeableStoreOnly,
    { getStorage: /* @__PURE__ */ __name(() => storage, "getStorage") }
  );
}, "createDurableObjectStoragePersister");

// node_modules/tinybase/synchronizers/synchronizer-ws-server-durable-object/index.js
import { DurableObject } from "cloudflare:workers";
var EMPTY_STRING3 = "";
var UNDEFINED2 = "\uFFFC";
var strMatch = /* @__PURE__ */ __name((str, regex) => str?.match(regex), "strMatch");
var strSplit2 = /* @__PURE__ */ __name((str, separator = EMPTY_STRING3, limit) => str.split(separator, limit), "strSplit");
var promise = Promise;
var GLOBAL2 = globalThis;
var THOUSAND = 1e3;
var startTimeout = /* @__PURE__ */ __name((callback, sec = 0) => setTimeout(callback, sec * THOUSAND), "startTimeout");
var math2 = Math;
var mathFloor2 = math2.floor;
var isUndefined3 = /* @__PURE__ */ __name((thing) => thing == void 0, "isUndefined");
var ifNotUndefined3 = /* @__PURE__ */ __name((value, then, otherwise) => isUndefined3(value) ? otherwise?.() : then(value), "ifNotUndefined");
var isArray3 = /* @__PURE__ */ __name((thing) => Array.isArray(thing), "isArray");
var slice3 = /* @__PURE__ */ __name((arrayOrString, start, end) => arrayOrString.slice(start, end), "slice");
var size3 = /* @__PURE__ */ __name((arrayOrString) => arrayOrString.length, "size");
var test3 = /* @__PURE__ */ __name((regex, subject) => regex.test(subject), "test");
var promiseNew = /* @__PURE__ */ __name((resolver) => new promise(resolver), "promiseNew");
var errorNew2 = /* @__PURE__ */ __name((message) => {
  throw new Error(message);
}, "errorNew");
var arrayForEach3 = /* @__PURE__ */ __name((array, cb) => array.forEach(cb), "arrayForEach");
var arrayMap2 = /* @__PURE__ */ __name((array, cb) => array.map(cb), "arrayMap");
var arrayIsEmpty2 = /* @__PURE__ */ __name((array) => size3(array) == 0, "arrayIsEmpty");
var arrayReduce2 = /* @__PURE__ */ __name((array, cb, initial) => array.reduce(cb, initial), "arrayReduce");
var arrayClear3 = /* @__PURE__ */ __name((array, to) => array.splice(0, to), "arrayClear");
var arrayPush3 = /* @__PURE__ */ __name((array, ...values) => array.push(...values), "arrayPush");
var arrayShift3 = /* @__PURE__ */ __name((array) => array.shift(), "arrayShift");
var object3 = Object;
var getPrototypeOf3 = /* @__PURE__ */ __name((obj) => object3.getPrototypeOf(obj), "getPrototypeOf");
var objEntries3 = object3.entries;
var isObject3 = /* @__PURE__ */ __name((obj) => !isUndefined3(obj) && ifNotUndefined3(
  getPrototypeOf3(obj),
  (objPrototype) => objPrototype == object3.prototype || isUndefined3(getPrototypeOf3(objPrototype)),
  /* istanbul ignore next */
  () => true
), "isObject");
var objIds3 = object3.keys;
var objFreeze3 = object3.freeze;
var objNew2 = /* @__PURE__ */ __name((entries = []) => object3.fromEntries(entries), "objNew");
var objHas3 = /* @__PURE__ */ __name((obj, id2) => id2 in obj, "objHas");
var objForEach3 = /* @__PURE__ */ __name((obj, cb) => arrayForEach3(objEntries3(obj), ([id2, value]) => cb(value, id2)), "objForEach");
var objValues = /* @__PURE__ */ __name((obj) => object3.values(obj), "objValues");
var objSize3 = /* @__PURE__ */ __name((obj) => size3(objIds3(obj)), "objSize");
var objIsEmpty3 = /* @__PURE__ */ __name((obj) => isObject3(obj) && objSize3(obj) == 0, "objIsEmpty");
var objEnsure3 = /* @__PURE__ */ __name((obj, id2, getDefaultValue) => {
  if (!objHas3(obj, id2)) {
    obj[id2] = getDefaultValue();
  }
  return obj[id2];
}, "objEnsure");
var jsonString3 = JSON.stringify;
var jsonParse2 = JSON.parse;
var jsonStringWithUndefined2 = /* @__PURE__ */ __name((obj) => jsonString3(obj, (_key, value) => value === void 0 ? UNDEFINED2 : value), "jsonStringWithUndefined");
var jsonParseWithUndefined = /* @__PURE__ */ __name((str) => jsonParse2(str, (_key, value) => value === UNDEFINED2 ? void 0 : value), "jsonParseWithUndefined");
var MESSAGE_SEPARATOR = "\n";
var ifPayloadValid = /* @__PURE__ */ __name((payload, then) => {
  const splitAt = payload.indexOf(MESSAGE_SEPARATOR);
  if (splitAt !== -1) {
    then(slice3(payload, 0, splitAt), slice3(payload, splitAt + 1));
  }
}, "ifPayloadValid");
var receivePayload = /* @__PURE__ */ __name((payload, receive) => ifPayloadValid(
  payload,
  (fromClientId, remainder) => receive(fromClientId, ...jsonParseWithUndefined(remainder))
), "receivePayload");
var createPayload = /* @__PURE__ */ __name((toClientId, ...args) => createRawPayload(toClientId ?? EMPTY_STRING3, jsonStringWithUndefined2(args)), "createPayload");
var createRawPayload = /* @__PURE__ */ __name((clientId, remainder) => clientId + MESSAGE_SEPARATOR + remainder, "createRawPayload");
var collSize6 = /* @__PURE__ */ __name((coll) => coll?.size ?? 0, "collSize");
var collHas3 = /* @__PURE__ */ __name((coll, keyOrValue) => coll?.has(keyOrValue) ?? false, "collHas");
var collIsEmpty3 = /* @__PURE__ */ __name((coll) => isUndefined3(coll) || collSize6(coll) == 0, "collIsEmpty");
var collForEach3 = /* @__PURE__ */ __name((coll, cb) => coll?.forEach(cb), "collForEach");
var collDel3 = /* @__PURE__ */ __name((coll, keyOrValue) => coll?.delete(keyOrValue), "collDel");
var mapNew3 = /* @__PURE__ */ __name((entries) => new Map(entries), "mapNew");
var mapGet3 = /* @__PURE__ */ __name((map, key) => map?.get(key), "mapGet");
var mapSet3 = /* @__PURE__ */ __name((map, key, value) => isUndefined3(value) ? (collDel3(map, key), map) : map?.set(key, value), "mapSet");
var mapEnsure3 = /* @__PURE__ */ __name((map, key, getDefaultValue, hadExistingValue) => {
  if (!collHas3(map, key)) {
    mapSet3(map, key, getDefaultValue());
  } else {
    hadExistingValue?.(mapGet3(map, key));
  }
  return mapGet3(map, key);
}, "mapEnsure");
var visitTree3 = /* @__PURE__ */ __name((node, path, ensureLeaf, pruneLeaf, p = 0) => ifNotUndefined3(
  (ensureLeaf ? mapEnsure3 : mapGet3)(
    node,
    path[p],
    p > size3(path) - 2 ? ensureLeaf : mapNew3
  ),
  (nodeOrLeaf) => {
    if (p > size3(path) - 2) {
      if (pruneLeaf?.(nodeOrLeaf)) {
        mapSet3(node, path[p]);
      }
      return nodeOrLeaf;
    }
    const leaf = visitTree3(nodeOrLeaf, path, ensureLeaf, pruneLeaf, p + 1);
    if (collIsEmpty3(nodeOrLeaf)) {
      mapSet3(node, path[p]);
    }
    return leaf;
  }
), "visitTree");
var stampNew2 = /* @__PURE__ */ __name((value, time3) => time3 ? [value, time3] : [value], "stampNew");
var getLatestTime2 = /* @__PURE__ */ __name((time1, time22) => (
  /* istanbul ignore next */
  ((time1 ?? "") > (time22 ?? "") ? time1 : time22) ?? ""
), "getLatestTime");
var stampNewObj2 = /* @__PURE__ */ __name((time3 = EMPTY_STRING3) => stampNew2(objNew2(), time3), "stampNewObj");
var setNew3 = /* @__PURE__ */ __name((entryOrEntries) => new Set(
  isArray3(entryOrEntries) || isUndefined3(entryOrEntries) ? entryOrEntries : [entryOrEntries]
), "setNew");
var setAdd3 = /* @__PURE__ */ __name((set, value) => set?.add(value), "setAdd");
var INTEGER3 = /^\d+$/;
var getPoolFunctions3 = /* @__PURE__ */ __name(() => {
  const pool = [];
  let nextId = 0;
  return [
    (reuse) => (reuse ? arrayShift3(pool) : null) ?? EMPTY_STRING3 + nextId++,
    (id2) => {
      if (test3(INTEGER3, id2) && size3(pool) < 1e3) {
        arrayPush3(pool, id2);
      }
    }
  ];
}, "getPoolFunctions");
var getWildcardedLeaves3 = /* @__PURE__ */ __name((deepIdSet, path = [EMPTY_STRING3]) => {
  const leaves = [];
  const deep = /* @__PURE__ */ __name((node, p) => p == size3(path) ? arrayPush3(leaves, node) : path[p] === null ? collForEach3(node, (node2) => deep(node2, p + 1)) : arrayForEach3([path[p], null], (id2) => deep(mapGet3(node, id2), p + 1)), "deep");
  deep(deepIdSet, 0);
  return leaves;
}, "getWildcardedLeaves");
var getListenerFunctions3 = /* @__PURE__ */ __name((getThing) => {
  let thing;
  const [getId, releaseId] = getPoolFunctions3();
  const allListeners = mapNew3();
  const addListener2 = /* @__PURE__ */ __name((listener, idSetNode, path, pathGetters = [], extraArgsGetter = () => []) => {
    thing ??= getThing();
    const id2 = getId(1);
    mapSet3(allListeners, id2, [
      listener,
      idSetNode,
      path,
      pathGetters,
      extraArgsGetter
    ]);
    setAdd3(visitTree3(idSetNode, path ?? [EMPTY_STRING3], setNew3), id2);
    return id2;
  }, "addListener");
  const callListeners = /* @__PURE__ */ __name((idSetNode, ids, ...extraArgs) => arrayForEach3(
    getWildcardedLeaves3(idSetNode, ids),
    (set) => collForEach3(
      set,
      (id2) => mapGet3(allListeners, id2)[0](thing, ...ids ?? [], ...extraArgs)
    )
  ), "callListeners");
  const delListener = /* @__PURE__ */ __name((id2) => ifNotUndefined3(mapGet3(allListeners, id2), ([, idSetNode, idOrNulls]) => {
    visitTree3(idSetNode, idOrNulls ?? [EMPTY_STRING3], void 0, (idSet) => {
      collDel3(idSet, id2);
      return collIsEmpty3(idSet) ? 1 : 0;
    });
    mapSet3(allListeners, id2);
    releaseId(id2);
    return idOrNulls;
  }), "delListener");
  const callListener = /* @__PURE__ */ __name((id2) => ifNotUndefined3(
    mapGet3(allListeners, id2),
    ([listener, , path = [], pathGetters, extraArgsGetter]) => {
      const callWithIds = /* @__PURE__ */ __name((...ids) => {
        const index = size3(ids);
        if (index == size3(path)) {
          listener(thing, ...ids, ...extraArgsGetter(ids));
        } else if (isUndefined3(path[index])) {
          arrayForEach3(
            pathGetters[index]?.(...ids) ?? [],
            (id22) => callWithIds(...ids, id22)
          );
        } else {
          callWithIds(...ids, path[index]);
        }
      }, "callWithIds");
      callWithIds();
    }
  ), "callListener");
  return [addListener2, callListeners, delListener, callListener];
}, "getListenerFunctions");
var scheduleRunning2 = mapNew3();
var scheduleActions2 = mapNew3();
var getStoreFunctions2 = /* @__PURE__ */ __name((persist = 1, store, isSynchronizer) => persist != 1 && store.isMergeable() ? [
  1,
  store.getMergeableContent,
  () => store.getTransactionMergeableChanges(!isSynchronizer),
  ([[changedTables], [changedValues]]) => !objIsEmpty3(changedTables) || !objIsEmpty3(changedValues),
  store.setDefaultContent
] : persist != 2 ? [
  0,
  store.getContent,
  store.getTransactionChanges,
  ([changedTables, changedValues]) => !objIsEmpty3(changedTables) || !objIsEmpty3(changedValues),
  store.setContent
] : errorNew2("Store type not supported by this Persister"), "getStoreFunctions");
var createCustomPersister2 = /* @__PURE__ */ __name((store, getPersisted, setPersisted, addPersisterListener, delPersisterListener, onIgnoredError, persist, extra = {}, isSynchronizer = 0, scheduleId = []) => {
  let status = 0;
  let loads = 0;
  let saves = 0;
  let action;
  let autoLoadHandle;
  let autoSaveListenerId;
  mapEnsure3(scheduleRunning2, scheduleId, () => 0);
  mapEnsure3(scheduleActions2, scheduleId, () => []);
  const statusListeners = mapNew3();
  const [
    isMergeableStore,
    getContent,
    getChanges,
    hasChanges,
    setDefaultContent
  ] = getStoreFunctions2(persist, store, isSynchronizer);
  const [addListener2, callListeners, delListenerImpl] = getListenerFunctions3(
    () => persister
  );
  const setStatus = /* @__PURE__ */ __name((newStatus) => {
    if (newStatus != status) {
      status = newStatus;
      callListeners(statusListeners, void 0, status);
    }
  }, "setStatus");
  const run = /* @__PURE__ */ __name(async () => {
    if (!mapGet3(scheduleRunning2, scheduleId)) {
      mapSet3(scheduleRunning2, scheduleId, 1);
      while (!isUndefined3(action = arrayShift3(mapGet3(scheduleActions2, scheduleId)))) {
        try {
          await action();
        } catch (error3) {
        }
      }
      mapSet3(scheduleRunning2, scheduleId, 0);
    }
  }, "run");
  const setContentOrChanges = /* @__PURE__ */ __name((contentOrChanges) => {
    (isMergeableStore && isArray3(contentOrChanges?.[0]) ? contentOrChanges?.[2] === 1 ? store.applyMergeableChanges : store.setMergeableContent : contentOrChanges?.[2] === 1 ? store.applyChanges : store.setContent)(contentOrChanges);
  }, "setContentOrChanges");
  const load = /* @__PURE__ */ __name(async (initialContent) => {
    if (status != 2) {
      setStatus(
        1
        /* Loading */
      );
      loads++;
      await schedule(async () => {
        try {
          const content = await getPersisted();
          if (isArray3(content)) {
            setContentOrChanges(content);
          } else if (initialContent) {
            setDefaultContent(initialContent);
          } else {
            errorNew2(`Content is not an array: ${content}`);
          }
        } catch (error3) {
          if (initialContent) {
            setDefaultContent(initialContent);
          }
        }
        setStatus(
          0
          /* Idle */
        );
      });
    }
    return persister;
  }, "load");
  const startAutoLoad = /* @__PURE__ */ __name(async (initialContent) => {
    stopAutoLoad();
    await load(initialContent);
    try {
      autoLoadHandle = await addPersisterListener(async (content, changes) => {
        if (changes || content) {
          if (status != 2) {
            setStatus(
              1
              /* Loading */
            );
            loads++;
            setContentOrChanges(changes ?? content);
            setStatus(
              0
              /* Idle */
            );
          }
        } else {
          await load();
        }
      });
    } catch (error3) {
    }
    return persister;
  }, "startAutoLoad");
  const stopAutoLoad = /* @__PURE__ */ __name(() => {
    if (autoLoadHandle) {
      delPersisterListener(autoLoadHandle);
      autoLoadHandle = void 0;
    }
    return persister;
  }, "stopAutoLoad");
  const isAutoLoading = /* @__PURE__ */ __name(() => !isUndefined3(autoLoadHandle), "isAutoLoading");
  const save = /* @__PURE__ */ __name(async (changes) => {
    if (status != 1) {
      setStatus(
        2
        /* Saving */
      );
      saves++;
      await schedule(async () => {
        try {
          await setPersisted(getContent, changes);
        } catch (error3) {
        }
        setStatus(
          0
          /* Idle */
        );
      });
    }
    return persister;
  }, "save");
  const startAutoSave = /* @__PURE__ */ __name(async () => {
    stopAutoSave();
    await save();
    autoSaveListenerId = store.addDidFinishTransactionListener(() => {
      const changes = getChanges();
      if (hasChanges(changes)) {
        save(changes);
      }
    });
    return persister;
  }, "startAutoSave");
  const stopAutoSave = /* @__PURE__ */ __name(() => {
    if (autoSaveListenerId) {
      store.delListener(autoSaveListenerId);
      autoSaveListenerId = void 0;
    }
    return persister;
  }, "stopAutoSave");
  const isAutoSaving = /* @__PURE__ */ __name(() => !isUndefined3(autoSaveListenerId), "isAutoSaving");
  const getStatus = /* @__PURE__ */ __name(() => status, "getStatus");
  const addStatusListener = /* @__PURE__ */ __name((listener) => addListener2(listener, statusListeners), "addStatusListener");
  const delListener = /* @__PURE__ */ __name((listenerId) => {
    delListenerImpl(listenerId);
    return store;
  }, "delListener");
  const schedule = /* @__PURE__ */ __name(async (...actions) => {
    arrayPush3(mapGet3(scheduleActions2, scheduleId), ...actions);
    await run();
    return persister;
  }, "schedule");
  const getStore = /* @__PURE__ */ __name(() => store, "getStore");
  const destroy = /* @__PURE__ */ __name(() => {
    arrayClear3(mapGet3(scheduleActions2, scheduleId));
    return stopAutoLoad().stopAutoSave();
  }, "destroy");
  const getStats = /* @__PURE__ */ __name(() => ({ loads, saves }), "getStats");
  const persister = {
    load,
    startAutoLoad,
    stopAutoLoad,
    isAutoLoading,
    save,
    startAutoSave,
    stopAutoSave,
    isAutoSaving,
    getStatus,
    addStatusListener,
    delListener,
    schedule,
    getStore,
    destroy,
    getStats,
    ...extra
  };
  return objFreeze3(persister);
}, "createCustomPersister");
var MASK62 = 63;
var ENCODE2 = /* @__PURE__ */ strSplit2(
  "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"
);
var encode2 = /* @__PURE__ */ __name((num) => ENCODE2[num & MASK62], "encode");
var getRandomValues2 = GLOBAL2.crypto ? (array) => GLOBAL2.crypto.getRandomValues(array) : (
  /* istanbul ignore next */
  (array) => arrayMap2(array, () => mathFloor2(math2.random() * 256))
);
var getUniqueId2 = /* @__PURE__ */ __name((length = 16) => arrayReduce2(
  getRandomValues2(new Uint8Array(length)),
  (uniqueId, number) => uniqueId + encode2(number),
  ""
), "getUniqueId");
var createCustomSynchronizer = /* @__PURE__ */ __name((store, send2, registerReceive, destroyImpl, requestTimeoutSeconds, onSend, onReceive, onIgnoredError, extra = {}) => {
  let syncing = 0;
  let persisterListener;
  let sends = 0;
  let receives = 0;
  const pendingRequests = mapNew3();
  const getTransactionId = /* @__PURE__ */ __name(() => getUniqueId2(11), "getTransactionId");
  const sendImpl = /* @__PURE__ */ __name((toClientId, requestId, message, body) => {
    sends++;
    send2(toClientId, requestId, message, body);
  }, "sendImpl");
  const request = /* @__PURE__ */ __name(async (toClientId, message, body, transactionId) => promiseNew((resolve, reject) => {
    const requestId = transactionId + "." + getUniqueId2(4);
    const timeout = startTimeout(() => {
      collDel3(pendingRequests, requestId);
      reject(
        `No response from ${toClientId ?? "anyone"} to ${requestId}, ` + message
      );
    }, requestTimeoutSeconds);
    mapSet3(pendingRequests, requestId, [
      toClientId,
      (response, fromClientId) => {
        clearTimeout(timeout);
        collDel3(pendingRequests, requestId);
        resolve([response, fromClientId, transactionId]);
      }
    ]);
    sendImpl(toClientId, requestId, message, body);
  }), "request");
  const mergeTablesStamps = /* @__PURE__ */ __name((tablesStamp, [tableStamps2, tablesTime2]) => {
    objForEach3(tableStamps2, ([rowStamps2, tableTime2], tableId) => {
      const tableStamp = objEnsure3(tablesStamp[0], tableId, stampNewObj2);
      objForEach3(rowStamps2, ([cellStamps2, rowTime2], rowId) => {
        const rowStamp = objEnsure3(tableStamp[0], rowId, stampNewObj2);
        objForEach3(
          cellStamps2,
          ([cell2, cellTime2], cellId) => rowStamp[0][cellId] = stampNew2(cell2, cellTime2)
        );
        rowStamp[1] = getLatestTime2(rowStamp[1], rowTime2);
      });
      tableStamp[1] = getLatestTime2(tableStamp[1], tableTime2);
    });
    tablesStamp[1] = getLatestTime2(tablesStamp[1], tablesTime2);
  }, "mergeTablesStamps");
  const getChangesFromOtherStore = /* @__PURE__ */ __name(async (otherClientId = null, otherContentHashes, transactionId = getTransactionId()) => {
    try {
      if (isUndefined3(otherContentHashes)) {
        [otherContentHashes, otherClientId, transactionId] = await request(
          null,
          1,
          EMPTY_STRING3,
          transactionId
        );
      }
      const [otherTablesHash, otherValuesHash] = otherContentHashes;
      const [tablesHash, valuesHash] = store.getMergeableContentHashes();
      let tablesChanges = stampNewObj2();
      if (tablesHash != otherTablesHash) {
        const [newTables, differentTableHashes] = (await request(
          otherClientId,
          4,
          store.getMergeableTableHashes(),
          transactionId
        ))[0];
        tablesChanges = newTables;
        if (!objIsEmpty3(differentTableHashes)) {
          const [newRows, differentRowHashes] = (await request(
            otherClientId,
            5,
            store.getMergeableRowHashes(differentTableHashes),
            transactionId
          ))[0];
          mergeTablesStamps(tablesChanges, newRows);
          if (!objIsEmpty3(differentRowHashes)) {
            const newCells = (await request(
              otherClientId,
              6,
              store.getMergeableCellHashes(differentRowHashes),
              transactionId
            ))[0];
            mergeTablesStamps(tablesChanges, newCells);
          }
        }
      }
      return [
        tablesChanges,
        valuesHash == otherValuesHash ? stampNewObj2() : (await request(
          otherClientId,
          7,
          store.getMergeableValueHashes(),
          transactionId
        ))[0],
        1
      ];
    } catch (error3) {
    }
  }, "getChangesFromOtherStore");
  const getPersisted = /* @__PURE__ */ __name(async () => {
    const changes = await getChangesFromOtherStore();
    return changes && (!objIsEmpty3(changes[0][0]) || !objIsEmpty3(changes[1][0])) ? changes : void 0;
  }, "getPersisted");
  const setPersisted = /* @__PURE__ */ __name(async (_getContent, changes) => changes ? sendImpl(null, getTransactionId(), 3, changes) : sendImpl(
    null,
    getTransactionId(),
    2,
    store.getMergeableContentHashes()
  ), "setPersisted");
  const addPersisterListener = /* @__PURE__ */ __name((listener) => persisterListener = listener, "addPersisterListener");
  const delPersisterListener = /* @__PURE__ */ __name(() => persisterListener = void 0, "delPersisterListener");
  const startSync = /* @__PURE__ */ __name(async (initialContent) => {
    syncing = 1;
    return await (await persister.startAutoLoad(initialContent)).startAutoSave();
  }, "startSync");
  const stopSync = /* @__PURE__ */ __name(() => {
    syncing = 0;
    return persister.stopAutoLoad().stopAutoSave();
  }, "stopSync");
  const destroy = /* @__PURE__ */ __name(() => {
    return persister.stopSync();
  }, "destroy");
  const getSynchronizerStats = /* @__PURE__ */ __name(() => ({ sends, receives }), "getSynchronizerStats");
  const persister = createCustomPersister2(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    2,
    // MergeableStoreOnly
    { startSync, stopSync, destroy, getSynchronizerStats, ...extra },
    1
  );
  registerReceive((fromClientId, transactionOrRequestId, message, body) => {
    const isAutoLoading = syncing || persister.isAutoLoading();
    receives++;
    if (message == 0) {
      ifNotUndefined3(
        mapGet3(pendingRequests, transactionOrRequestId),
        ([toClientId, handleResponse]) => isUndefined3(toClientId) || toClientId == fromClientId ? handleResponse(body, fromClientId) : (
          /* istanbul ignore next */
          0
        )
      );
    } else if (message == 2 && isAutoLoading) {
      getChangesFromOtherStore(
        fromClientId,
        body,
        transactionOrRequestId ?? void 0
      ).then((changes) => {
        persisterListener?.(void 0, changes);
      }).catch(onIgnoredError);
    } else if (message == 3 && isAutoLoading) {
      persisterListener?.(void 0, body);
    } else {
      ifNotUndefined3(
        message == 1 && (syncing || persister.isAutoSaving()) ? store.getMergeableContentHashes() : message == 4 ? store.getMergeableTableDiff(body) : message == 5 ? store.getMergeableRowDiff(body) : message == 6 ? store.getMergeableCellDiff(body) : message == 7 ? store.getMergeableValueDiff(body) : void 0,
        (response) => {
          sendImpl(
            fromClientId,
            transactionOrRequestId,
            0,
            response
          );
        }
      );
    }
  });
  return persister;
}, "createCustomSynchronizer");
var PATH_REGEX = /\/([^?]*)/;
var SERVER_CLIENT_ID = "S";
var getPathId = /* @__PURE__ */ __name((request) => strMatch(new URL(request.url).pathname, PATH_REGEX)?.[1] ?? EMPTY_STRING3, "getPathId");
var getClientId = /* @__PURE__ */ __name((request) => request.headers.get("upgrade")?.toLowerCase() == "websocket" ? request.headers.get("sec-websocket-key") : null, "getClientId");
var createResponse = /* @__PURE__ */ __name((status, webSocket = null, body = null) => new Response(body, { status, webSocket }), "createResponse");
var createUpgradeRequiredResponse = /* @__PURE__ */ __name(() => createResponse(426, null, "Upgrade required"), "createUpgradeRequiredResponse");
var WsServerDurableObject = class extends DurableObject {
  static {
    __name(this, "WsServerDurableObject");
  }
  // @ts-expect-error See blockConcurrencyWhile
  #serverClientSend;
  constructor(ctx, env2) {
    super(ctx, env2);
    this.ctx.blockConcurrencyWhile(
      async () => await ifNotUndefined3(
        await this.createPersister(),
        async (persister) => {
          const synchronizer = createCustomSynchronizer(
            persister.getStore(),
            (toClientId, requestId, message, body) => this.#handleMessage(
              SERVER_CLIENT_ID,
              createPayload(toClientId, requestId, message, body)
            ),
            (receive) => this.#serverClientSend = (payload) => receivePayload(payload, receive),
            () => {
            },
            1
          );
          await persister.load();
          await persister.startAutoSave();
          startTimeout(synchronizer.startSync);
        }
      )
    );
  }
  fetch(request) {
    const pathId = getPathId(request);
    return ifNotUndefined3(
      getClientId(request),
      (clientId) => {
        const [webSocket, client] = objValues(new WebSocketPair());
        if (arrayIsEmpty2(this.#getClients())) {
          this.onPathId(pathId, 1);
        }
        this.ctx.acceptWebSocket(client, [clientId, pathId]);
        this.onClientId(pathId, clientId, 1);
        client.send(createPayload(SERVER_CLIENT_ID, null, 1, EMPTY_STRING3));
        return createResponse(101, webSocket);
      },
      createUpgradeRequiredResponse
    );
  }
  webSocketMessage(client, message) {
    ifNotUndefined3(
      this.ctx.getTags(client)[0],
      (clientId) => this.#handleMessage(clientId, message.toString(), client)
    );
  }
  webSocketClose(client) {
    const [clientId, pathId] = this.ctx.getTags(client);
    this.onClientId(pathId, clientId, -1);
    if (size3(this.#getClients()) == 1) {
      this.onPathId(pathId, -1);
    }
  }
  // --
  #handleMessage(fromClientId, message, fromClient) {
    ifPayloadValid(message.toString(), (toClientId, remainder) => {
      const forwardedPayload = createRawPayload(fromClientId, remainder);
      this.onMessage(fromClientId, toClientId, remainder);
      if (toClientId == EMPTY_STRING3) {
        if (fromClientId != SERVER_CLIENT_ID) {
          this.#serverClientSend?.(forwardedPayload);
        }
        arrayForEach3(this.#getClients(), (otherClient) => {
          if (otherClient != fromClient) {
            otherClient.send(forwardedPayload);
          }
        });
      } else if (toClientId == SERVER_CLIENT_ID) {
        this.#serverClientSend?.(forwardedPayload);
      } else if (toClientId != fromClientId) {
        this.#getClients(toClientId)[0]?.send(forwardedPayload);
      }
    });
  }
  #getClients(tag) {
    return this.ctx.getWebSockets(tag);
  }
  // --
  createPersister() {
    return void 0;
  }
  getPathId() {
    return this.ctx.getTags(this.#getClients()[0])?.[1];
  }
  getClientIds() {
    return arrayMap2(
      this.#getClients(),
      (client) => this.ctx.getTags(client)[0]
    );
  }
  onPathId(_pathId, _addedOrRemoved) {
  }
  onClientId(_pathId, _clientId, _addedOrRemoved) {
  }
  onMessage(_fromClientId, _toClientId, _remainder) {
  }
};

// index.ts
var GroceriesDurableObject = class extends WsServerDurableObject {
  static {
    __name(this, "GroceriesDurableObject");
  }
  // menyimpan persister DO
  constructor(ctx, env2) {
    super(ctx, env2);
    this.store = createMergeableStore();
    this.persister = createDurableObjectStoragePersister(this.store, this.ctx.storage);
    this.init();
  }
  async init() {
    await this.persister.load();
    this.persister.startAutoSave();
  }
  createPersister() {
    return this.persister;
  }
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname.endsWith("/index-data")) {
      await this.persister.load();
      const tables = this.store.getTables();
      const values = this.store.getValues();
      return new Response(JSON.stringify({ tables, values }), {
        headers: { "content-type": "application/json" }
      });
    }
    if (url.pathname.endsWith("/debug")) {
      await this.persister.load();
      const tables = this.store.getTables();
      const lists = tables["lists"] ?? {};
      const products = tables["products"] ?? {};
      const values = tables["values"] ?? {};
      const usersMap = {};
      if (products.collaborators && typeof products.collaborators === "object") {
        for (const userId of Object.keys(products.collaborators)) {
          usersMap[userId] = { userId, emailOrNick: products.collaborators[userId]?.nickname ?? "-" };
        }
      }
      for (const [prodId, prod] of Object.entries(products)) {
        if (prodId === "collaborators") continue;
        const createdBy = prod.createdBy ?? null;
        if (createdBy && !usersMap[createdBy]) {
          usersMap[createdBy] = { userId: createdBy, emailOrNick: "-" };
        }
      }
      if (tables["users"]) {
        for (const [uId, uRow] of Object.entries(tables["users"])) {
          usersMap[uId] = { userId: uId, emailOrNick: uRow.email ?? uRow.nickname ?? "-" };
        }
      }
      const shoppingLists = [];
      for (const [listId, listRow] of Object.entries(lists)) {
        let listMetadata = {};
        let listCollaborators = {};
        let listName = "-";
        let listOwner = "unknown";
        try {
          if (listRow.valuesCopy) {
            const parsedCopy = JSON.parse(listRow.valuesCopy);
            listMetadata = parsedCopy.values || {};
            listCollaborators = parsedCopy.tables?.collaborators || {};
          }
        } catch (e) {
          listMetadata = listRow;
          listCollaborators = listRow.collaborators || {};
        }
        listName = listMetadata.name ?? listRow.name ?? "-";
        listOwner = listMetadata.createdBy ?? listMetadata.userId ?? Object.keys(listCollaborators)[0] ?? "unknown";
        for (const [collabId, collabData] of Object.entries(listCollaborators)) {
          if (!usersMap[collabId]) {
            usersMap[collabId] = { userId: collabId, emailOrNick: collabData.nickname ?? "-" };
          }
        }
        if (listOwner && !usersMap[listOwner]) usersMap[listOwner] = { userId: listOwner, emailOrNick: "-" };
        shoppingLists.push({
          listId,
          userId: listOwner,
          name: listName,
          createdAt: listMetadata.createdAt ?? listRow.createdAt ?? null,
          updatedAt: listMetadata.updatedAt ?? listRow.updatedAt ?? null,
          collaborators: listCollaborators
        });
      }
      for (const [vId, vRow] of Object.entries(values)) {
        const listId = vRow.listId ?? vRow.id ?? null;
        if (listId && !shoppingLists.find((l) => l.listId === listId)) {
          const owner = vRow.createdBy ?? vRow.userId ?? Object.keys(vRow.collaborators ?? {})[0] ?? "unknown";
          if (owner && !usersMap[owner]) usersMap[owner] = { userId: owner, emailOrNick: "-" };
          shoppingLists.push({
            listId,
            userId: owner,
            name: vRow.name ?? "-",
            createdAt: vRow.createdAt ?? null,
            updatedAt: vRow.updatedAt ?? null,
            collaborators: vRow.collaborators ?? {}
          });
        }
      }
      const items = [];
      const ownerToFirstListId = {};
      for (const l of shoppingLists) {
        if (l.userId && !ownerToFirstListId[l.userId]) ownerToFirstListId[l.userId] = l.listId;
      }
      const valuesFallbackListId = values.listId ?? null;
      for (const [itemId, itemRow] of Object.entries(products)) {
        if (itemId === "collaborators") continue;
        let listId = itemRow.listId ?? itemRow.shoppingListId ?? null;
        if (!listId && valuesFallbackListId) listId = valuesFallbackListId;
        const createdBy = itemRow.createdBy ?? null;
        if (!listId && createdBy && ownerToFirstListId[createdBy]) {
          listId = ownerToFirstListId[createdBy];
        }
        if (createdBy && !usersMap[createdBy]) usersMap[createdBy] = { userId: createdBy, emailOrNick: "-" };
        items.push({
          itemId,
          listId,
          name: itemRow.name ?? itemRow.title ?? "-",
          isPurchased: !!itemRow.isPurchased,
          createdBy,
          createdAt: itemRow.createdAt ?? null,
          updatedAt: itemRow.updatedAt ?? null,
          quantity: itemRow.quantity ?? null,
          units: itemRow.units ?? null,
          notes: itemRow.notes ?? "",
          category: itemRow.category ?? ""
        });
      }
      let html = `
            <html>
                <head>
                    <title>Debug TinyBase - Tables</title>
                    <style>
                        body { font-family: system-ui; padding: 20px; line-height: 1.4; }
                        table { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
                        td, th { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
                        th { background: #f6f6f6; text-align: left; }
                        caption { font-weight: bold; margin-bottom: 6px; text-align: left; }
                        pre { white-space: pre-wrap; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <h1>\u{1F4E6} TinyBase Debug View (Tabel)</h1>
            `;
      html += `<table aria-label="ShoppingList"><caption>ShoppingList</caption><thead><tr><th>listId</th><th>userId (owner)</th><th>name</th><th>collaborators</th><th>createdAt / updatedAt</th></tr></thead><tbody>`;
      if (shoppingLists.length === 0) {
        html += `<tr><td colspan="5"><em>kosong</em></td></tr>`;
      } else {
        for (const l of shoppingLists) {
          const collabText = l.collaborators && Object.keys(l.collaborators).length > 0 ? `<pre>${JSON.stringify(l.collaborators, null, 2)}</pre>` : `<em>-</em>`;
          html += `
                    <tr>
                      <td>${l.listId}</td>
                      <td>${l.userId}</td>
                      <td>${l.name}</td>
                      <td>${collabText}</td>
                      <td>${l.createdAt ?? "-"}<br/>${l.updatedAt ?? "-"}</td>
                    </tr>`;
        }
      }
      html += `</tbody></table>`;
      html += `<table aria-label="Items"><caption>Items (Products)</caption><thead><tr><th>itemId</th><th>listId</th><th>name</th><th>isPurchased</th><th>createdBy</th><th>qty / units</th><th>notes / category</th></tr></thead><tbody>`;
      if (items.length === 0) {
        html += `<tr><td colspan="7"><em>kosong</em></td></tr>`;
      } else {
        for (const it of items) {
          html += `
                    <tr>
                      <td>${it.itemId}</td>
                      <td>${it.listId ?? ""}</td>
                      <td>${it.name}</td>
                      <td>${it.isPurchased}</td>
                      <td>${it.createdBy ?? "-"}</td>
                      <td>${it.quantity ?? "-"} ${it.units ?? ""}</td>
                      <td><pre>${JSON.stringify({ notes: it.notes, category: it.category }, null, 2)}</pre></td>
                    </tr>`;
        }
      }
      html += `</tbody></table>`;
      html += `<table aria-label="Users"><caption>Users</caption><thead><tr><th>userId</th><th>email / nickname</th></tr></thead><tbody>`;
      const usersArr = Object.values(usersMap);
      if (usersArr.length === 0) {
        html += `<tr><td colspan="2"><em>kosong</em></td></tr>`;
      } else {
        for (const u of usersArr) {
          html += `
                    <tr>
                      <td>${u.userId}</td>
                      <td>${u.emailOrNick}</td>
                    </tr>`;
        }
      }
      html += `</tbody></table>`;
      const tableNames = Object.keys(tables || {});
      for (const name of tableNames) {
        const rows = tables[name];
        const entries = Object.entries(rows ?? {});
        html += `<h3>Raw Table: ${name}</h3><table><thead><tr><th>ID</th><th>Data</th></tr></thead><tbody>`;
        if (entries.length === 0) {
          html += `<tr><td colspan="2"><em>kosong</em></td></tr>`;
        } else {
          for (const [id2, value] of entries) {
            html += `
                        <tr>
                          <td>${id2}</td>
                          <td><pre>${JSON.stringify(value, null, 2)}</pre></td>
                        </tr>`;
          }
        }
        htmlHtml += `</tbody></table>`;
      }
      html += `</body></html>`;
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }
    return super.fetch(request);
  }
};
var index_default = {
  async fetch(request, env2, ctx) {
    const url = new URL(request.url);
    const upgrade = request.headers.get("Upgrade");
    const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
    function formatToYMD_GMT7(iso) {
      if (!iso) return "-";
      const ms = Date.parse(iso);
      if (isNaN(ms)) return "-";
      const d = new Date(ms + 7 * 3600 * 1e3);
      const y = d.getUTCFullYear();
      const m = pad(d.getUTCMonth() + 1);
      const dd = pad(d.getUTCDate());
      return `${y}/${m}/${dd} GMT+7`;
    }
    __name(formatToYMD_GMT7, "formatToYMD_GMT7");
    function prettyPrintTopLevel(obj2) {
      const keys = Object.keys(obj2);
      if (keys.length === 0) return "{\n\n}";
      const parts = keys.map((k) => {
        const v = obj2[k];
        const vStr = JSON.stringify(v, null, 2);
        const indented = vStr.split("\n").map((line) => "  " + line).join("\n");
        return `  "${k}": ${indented.replace(/^  /, "")}`;
      });
      return `{
${parts.join(",\n\n")}
}`;
    }
    __name(prettyPrintTopLevel, "prettyPrintTopLevel");
    if (url.pathname === "/debug") {
      const INDEX_STORE_ID = "main";
      const indexObj = env2.GroceriesDurableObjects.get(
        env2.GroceriesDurableObjects.idFromName(INDEX_STORE_ID)
      );
      const indexResponse = await indexObj.fetch(
        new Request(url.origin + "/main/index-data")
      );
      if (!indexResponse.ok) {
        return new Response(
          "\u274C Gagal mengambil List Index dari Store 'main'.",
          { status: 500 }
        );
      }
      const indexData = await indexResponse.json();
      const listsTable = indexData.tables?.lists || {};
      const listIds = Object.keys(listsTable);
      const allUsersMap = {};
      const allShoppingLists = [];
      const allItems = [];
      const allRawTables = { users: {}, shoppinglist: {}, items: {} };
      for (const listId of listIds) {
        if (listId.startsWith("shoppingListsStore-")) continue;
        const listObj = env2.GroceriesDurableObjects.get(
          env2.GroceriesDurableObjects.idFromName(listId)
        );
        const listResponse = await listObj.fetch(
          new Request(url.origin + `/${listId}/index-data`)
        );
        if (!listResponse.ok) continue;
        const listData = await listResponse.json();
        const rawString = listsTable[listId]?.valuesCopy || "{}";
        let parsedMetadata = {};
        try {
          parsedMetadata = JSON.parse(rawString);
        } catch (e) {
          parsedMetadata = {};
        }
        const collaborators = parsedMetadata?.tables?.collaborators || {};
        const products = parsedMetadata?.tables?.products || {};
        const listName = parsedMetadata?.values?.name ?? "Tanpa Nama";
        const ownerId = Object.keys(collaborators)[0] || "unknown";
        allShoppingLists.push({
          listId,
          name: listName,
          ownerId,
          collaborators,
          createdAt: parsedMetadata?.values?.createdAt,
          updatedAt: parsedMetadata?.values?.updatedAt
        });
        for (const [uid, data] of Object.entries(collaborators)) {
          if (!allUsersMap[uid]) {
            allUsersMap[uid] = {
              userId: uid,
              nickname: data.nickname ?? "Unknown"
            };
          }
          allRawTables.users[uid] = data;
        }
        for (const [itemId, item] of Object.entries(products)) {
          const it = item;
          allItems.push({
            listId,
            listName,
            itemId,
            name: it.name ?? "",
            isPurchased: it.isPurchased ?? false,
            createdBy: it.createdBy ?? "-",
            quantity: it.quantity ?? "-",
            units: it.units ?? "",
            notes: it.notes ?? "",
            category: it.category ?? "",
            createdAt: it.createdAt,
            updatedAt: it.updatedAt
          });
        }
        allRawTables.shoppinglist[listId] = parsedMetadata;
        allRawTables.items[listId] = products;
      }
      const style = `
        body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 18px; color: #111; }
        h1 { border-bottom: 2px solid #e6e6e6; padding-bottom: 8px; margin-bottom: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
        th, td { border: 1px solid #e8e8e8; padding: 8px 10px; vertical-align: top; }
        th { background: #fbfbfb; text-align: left; font-weight: 700; }
        tr:nth-child(even) td { background: #fbfcfd; }
        pre { background: #f7f7f8; padding: 10px; border-radius: 6px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace; font-size: 13px; margin:0;}
        .section { margin-top: 18px; margin-bottom: 8px; }
        .muted { color: #666; font-size: 13px; }
      `;
      let htmlBody = `<h1>\u{1F4CA} GLOBAL DEBUG TINYBASE</h1>`;
      htmlBody += `<div class="section"><h2>USERS</h2></div>`;
      htmlBody += `
        <table aria-label="Users">
          <thead><tr><th>User ID</th><th>Nickname</th></tr></thead>
          <tbody>
      `;
      const usersArr = Object.values(allUsersMap);
      if (!usersArr.length) {
        htmlBody += `<tr><td colspan="2" class="muted"><em>kosong</em></td></tr>`;
      } else {
        for (const u of usersArr) {
          htmlBody += `<tr><td>${u.userId}</td><td>${u.nickname}</td></tr>`;
        }
      }
      htmlBody += `</tbody></table>`;
      htmlBody += `<div class="section"><h2>SHOPPING LIST</h2></div>`;
      htmlBody += `
        <table aria-label="ShoppingList">
          <thead>
            <tr>
              <th>List ID</th>
              <th>Nama</th>
              <th>Owner</th>
              <th>Collaborators</th>
              <th>Created / Updated</th>
            </tr>
          </thead>
          <tbody>
      `;
      if (!allShoppingLists.length) {
        htmlBody += `<tr><td colspan="5" class="muted"><em>kosong</em></td></tr>`;
      } else {
        for (const l of allShoppingLists) {
          const ownerNick = allUsersMap[l.ownerId]?.nickname ?? l.ownerId;
          const ownerDisplay = `${ownerNick} (${l.ownerId})`;
          const collabIds = Object.keys(l.collaborators || {});
          const collabsDisplay = collabIds.length === 0 ? "-" : collabIds.map((id3) => allUsersMap[id3]?.nickname ?? id3).join(", ");
          const createdFmt = formatToYMD_GMT7(l.createdAt);
          const updatedFmt = formatToYMD_GMT7(l.updatedAt);
          htmlBody += `
            <tr>
              <td>${l.listId}</td>
              <td><strong>${l.name}</strong></td>
              <td>${ownerDisplay}</td>
              <td>${collabsDisplay}</td>
              <td>${createdFmt}<br/>${updatedFmt}</td>
            </tr>
          `;
        }
      }
      htmlBody += `</tbody></table>`;
      htmlBody += `<div class="section"><h2>ITEMS PER LIST</h2></div>`;
      const grouped = {};
      for (const l of allShoppingLists) {
        grouped[l.listId] = { listName: l.name, ownerId: l.ownerId, items: [] };
      }
      for (const it of allItems) {
        if (!grouped[it.listId]) {
          grouped[it.listId] = { listName: it.listName ?? it.listId, ownerId: "unknown", items: [] };
        }
        grouped[it.listId].items.push(it);
      }
      for (const listId of Object.keys(grouped)) {
        const grp = grouped[listId];
        const items = grp.items;
        if (!items || items.length === 0) {
          htmlBody += `<h3>${grp.listName} (${listId}) \u2014 <span class="muted">no items</span></h3>`;
          continue;
        }
        htmlBody += `<h3>${grp.listName}</h3>`;
        htmlBody += `
          <table aria-label="Items-${listId}">
            <thead>
              <tr>
                <th>Owner</th>
                <th>List ID</th>
                <th>Item ID</th>
                <th>Name</th>
                <th>Purchased</th>
                <th>Qty / Units</th>
                <th>Notes / Category</th>
              </tr>
            </thead>
            <tbody>
        `;
        const ownerNick = allUsersMap[grp.ownerId]?.nickname ?? grp.ownerId;
        const ownerDisplay = `${ownerNick} (${grp.ownerId})`;
        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          const purchased = it.isPurchased === true || it.isPurchased === "true" ? "\u2705" : "\u274C";
          const notesCategoryObj = {
            notes: it.notes ?? "",
            category: it.category ?? ""
          };
          const notesCategoryCompact = JSON.stringify(notesCategoryObj);
          htmlBody += `<tr>`;
          if (i === 0) {
            htmlBody += `<td rowspan="${items.length}">${ownerDisplay}</td>`;
            htmlBody += `<td rowspan="${items.length}">${listId}</td>`;
          }
          htmlBody += `
              <td>${it.itemId}</td>
              <td><strong>${it.name}</strong></td>
              <td>${purchased}</td>
              <td>${it.quantity ?? "-"} ${it.units ?? ""}</td>
              <td><pre style="margin:0;">${notesCategoryCompact}</pre></td>
          </tr>`;
        }
        htmlBody += `</tbody></table>`;
      }
      htmlBody += `<div class="section"><h2>RAW PARSED JSON</h2></div>`;
      htmlBody += `<h3>Users</h3><pre>${prettyPrintTopLevel(
        allRawTables.users
      )}</pre>`;
      htmlBody += `<h3>Shopping Lists</h3><pre>${prettyPrintTopLevel(
        allRawTables.shoppinglist
      )}</pre>`;
      htmlBody += `<h3>Items</h3><pre>${prettyPrintTopLevel(
        allRawTables.items
      )}</pre>`;
      const finalHtml = `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Debug TinyBase - Global View</title>
            <style>${style}</style>
          </head>
          <body>
            ${htmlBody}
          </body>
        </html>`;
      return new Response(finalHtml, {
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }
    const pathSegments = url.pathname.split("/").filter(Boolean);
    let storeId = "main";
    if (pathSegments.length > 0) {
      const last = pathSegments.at(-1);
      storeId = last === "index-data" || last === "debug" ? pathSegments.at(-2) ?? "main" : last;
    }
    const id2 = env2.GroceriesDurableObjects.idFromName(storeId);
    const obj = env2.GroceriesDurableObjects.get(id2);
    if (url.pathname.endsWith("/debug") || url.pathname.endsWith("/index-data")) {
      return obj.fetch(request);
    }
    if (upgrade?.toLowerCase() === "websocket") {
      return obj.fetch(request);
    }
    return new Response("TinyBase WebSocket server running...", {
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }
};
export {
  GroceriesDurableObject,
  index_default as default
};
//# sourceMappingURL=index.js.map
