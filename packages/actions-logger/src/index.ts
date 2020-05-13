import {warning, info, debug, error} from '@actions/core'
import {logMethod, ActionLogger} from './types'

export const TAB_WIDTH = 2

export const niceLog = (level: string, message = '', ...params: object[]): void => {
  let fn
  switch (level) {
    default:
    case 'log':
    case 'info':
      fn = info
      break
    case 'debug':
      fn = debug
      break
    case 'error':
      fn = error
      break
    case 'warn':
    case 'warning':
      fn = warning
      break
  }
  fn(JSON.stringify({message, details: {...params}}, null, TAB_WIDTH))
}
export const niceLogForLevel = (level: string): logMethod => (message = '', ...params: object[]): void =>
  niceLog(level, message, ...params)

export const DEFAULT_LEVELS = ['info', 'log', 'debug', 'warn', 'warning', 'error']

export const ALLOWED_LEVELS = [...DEFAULT_LEVELS]

export const Logger = (levels: string[] = DEFAULT_LEVELS): ActionLogger =>
  levels
    .filter(level => level in ALLOWED_LEVELS)
    .reduce(
      (logger, level): ActionLogger => ({
        ...logger,
        [level]: niceLogForLevel(level),
      }),
      {},
    )

export const logger = Logger()

export default {
  Logger,
  DEFAULT_LEVELS,
  niceLog,
  logger,
}
