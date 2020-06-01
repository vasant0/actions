import {logger} from '@svaj/actions-logger'
import * as core from '@actions/core'

export const run = async (): Promise<void> => {
  try {
    // detect package manager if not supplied

    // detect monorepo type if not supplied

    // for each project, get dirs to include - nodemodules,etc
    logger.warn('Action net yet implemented!')
  } catch (error) {
    core.setFailed(error.message)
  }
}
