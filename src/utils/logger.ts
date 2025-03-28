import { EXTENSION_NAME } from "@/config/constants";

export enum LogLevel {
  ERROR,
  WARNING,
  INFO,
  VERBOSE,
}

function wrap(fn: (...args: any[]) => void) {
  return (modName?: string, ...args: any[]) => {
    const d = new Date();
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    const s = d.getSeconds().toString().padStart(2, "0");
    const ms = d.getMilliseconds().toString().padStart(3, "0");

    const parts = [`[${EXTENSION_NAME}]`];

    if (modName !== undefined) {
      parts.push(`[${modName}]`);
    }
    parts.push(`[${h}:${m}:${s}::${ms}]`);

    fn(parts.join(" "), ...args);
  };
}

export default class Logger {
  name?: string;
  logLevel: LogLevel;

  constructor(name?: string, level?: LogLevel) {
    this.name = name;
    this.logLevel = level ?? LogLevel.INFO;
  }

  setLevel(level: LogLevel) {
    this.logLevel = level;
  }

  private logMessage(
    level: LogLevel,
    consoleFn: (...args: any[]) => void,
    ...args: any[]
  ) {
    if (this.logLevel < level) return;

    const wrapped = wrap(consoleFn);
    wrapped(this.name, ...args);
  }

  error(...args: any[]) {
    this.logMessage(LogLevel.ERROR, console.error, ...args);
  }

  warn(...args: any[]) {
    this.logMessage(LogLevel.WARNING, console.warn, ...args);
  }

  info(...args: any[]) {
    this.logMessage(LogLevel.INFO, console.info, ...args);
  }

  log(...args: any[]) {
    this.logMessage(LogLevel.INFO, console.log, ...args);
  }

  dir(...args: any[]) {
    this.logMessage(LogLevel.INFO, console.dir, ...args);
  }

  trace(...args: any[]) {
    this.logMessage(LogLevel.INFO, console.trace, ...args);
  }

  debug(...args: any[]) {
    this.logMessage(LogLevel.VERBOSE, console.debug, ...args);
  }
}
