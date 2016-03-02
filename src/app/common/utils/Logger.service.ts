import moment = require('moment');

export enum LogLevels {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR
}

export default class Logger {

  private static logLevel: LogLevels = LogLevels.INFO;

  constructor(private className: string) {
    this.log('info', 'Logger instanciated');
  }

  public trace(message: string, ...args): void {
    if (Logger.logLevel <= LogLevels.TRACE) {
      this.log('trace', message, ...args);
    }
  }

  public debug(message: string, ...args): void {
    if (Logger.logLevel <= LogLevels.DEBUG) {
      this.log('log', message, ...args);
    }
  }

  public info(message: string, ...args): void {
    if (Logger.logLevel <= LogLevels.INFO) {
      this.log('info', message, ...args);
    }
  }

  public warn(message: string, ...args): void {
    if (Logger.logLevel <= LogLevels.WARN) {
      this.log('warn', message, ...args);
    }
  }

  public error(message: string, ...args): void {
    if (Logger.logLevel <= LogLevels.ERROR) {
      this.log('error', message, ...args);
    }
  }

  public static setLogLevel(logLevel: LogLevels): void {
    Logger.logLevel = logLevel;
  }

  private log(type: string, message: string, ...args): void {
    console[type](this.formatter(message), ...args);
  }

  private formatter(message: string): string {
    return `[${moment().format('YYYY-MM-DD HH:MM:SS:SSS')} - ${this.className}]: ${message}`;
  }

}
