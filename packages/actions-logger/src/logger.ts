import core from '@actions/core'

export const TAB_WIDTH = 2

export const niceLog = (level: string, message: string, ...params: any[]): void => {
  core[level](JSON.stringify({message, details: {...params}}, null, TAB_WIDTH))
}
export const niceLogForLevel = (level: string) => (...params: any[]) => niceLog(level, ...params)

export const DEFAULT_LEVELS = ['info', 'debug', 'warn', 'error']

export const Logger = (levels: string[] = DEFAULT_LEVELS): object =>
  levels.reduce(
    (logger, level) => ({
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
