// method that usually prints to stdout or stderr
export type logMethod = (message: string, details: object) => void

/**
 * Action logger type, default propers and unknown props.
 */
export type ActionLogger = {
  debug: logMethod
  info: logMethod
  log: logMethod
  warn: logMethod
  warning: logMethod
  error: logMethod & {
    [prop: string]: logMethod
  }
}
