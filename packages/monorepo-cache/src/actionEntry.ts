import {logger} from '@svaj/actions-logger'
import * as core from '@actions/core'

export const run = async (): Promise<void> => {
  try {
    logger.warn('Action net yet implemented!')
  } catch (error) {
    core.setFailed(error.message)
  }
}
