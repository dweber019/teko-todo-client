declare module ngLogger {
  interface ILogger {
    getInstance(namespace: string): ILogger;
    trace<T>(...T): void;
    debug<T>(...T): void;
    log<T>(...T): void;
    info<T>(...T): void;
    warn<T>(...T): void;
    error<T>(...T): void;
  }

  interface ILoggerProvider {
    prefixPattern: string;
    datetimePattern: string;
    logLevels: { [key: string]: number }
  }


}