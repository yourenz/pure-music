import dayjs from 'dayjs'

enum LogLevel {
  Log,
  Warning,
  Error,
}

const Styles = ['color: green;', 'color: orange;', 'color: red;']
const Methods = ['info', 'warn', 'error'] as const

class Logger {
  private namespace: string

  constructor(namespace = 'logger') {
    this.namespace = namespace
  }

  private _log(level: LogLevel, args: unknown[]) {
    if (import.meta.env.PROD)
      return
    console[Methods[level]](`%c${this.namespace}`, Styles[level], dayjs().format('YYYY-MM-DD HH:mm:ss'), ...args)
  }

  public info(...args: unknown[]) {
    this._log(LogLevel.Log, args)
    return this
  }

  public warn(...args: unknown[]) {
    this._log(LogLevel.Warning, args)
    return this
  }

  public error(...args: unknown[]) {
    this._log(LogLevel.Error, args)
    return this
  }
}

export default new Logger()
