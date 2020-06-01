import {existsSync, readFileSync} from 'fs'
import path from 'path'
import {execFileSync} from 'child_process'
import {maxSatisfying, satisfies} from 'semver'
import readline from 'n-readlines'
import {NodePackageManager} from './nodePackageManager'
import {YARN_LOCK_FILE} from './constants'

export const YARN_BIN_PATH_CMD = 'yarn bin'
export const YARN_VERSION_RANGE = '>=1.0.0 <2.0.0'
export const LOCKFILE_V1_STRING = 'yarn lockfile v1'

export const hasValidLockFile = (rootPath = ''): boolean => {
  // read first 2 lines of file
  // if LOCKFILE_V1_STRING found, true
  const yarnLock = path.join(rootPath, YARN_LOCK_FILE)
  if (!existsSync(yarnLock)) {
    return false
  }
  const reader = new readline(yarnLock)
  reader.next()
  const line2 = reader.next()
  if (line2.indexOf(LOCKFILE_V1_STRING) > -1) {
    return true
  }
  return false
}

// checks package.json.engines for yarn version
export const hasValidEnginesEntry = (rootPath = ''): boolean => {
  const packageJson = path.join(rootPath, 'package.json')
  if (!existsSync(packageJson)) {
    return false
  }
  const parsedPackage = JSON.parse(readFileSync(packageJson).toString())
  if (!parsedPackage.engines) {
    return false
  }
  const {engines} = parsedPackage
  if (!engines.yarn) {
    return false
  }
  const rangeToCheck = engines.yarn
  if (satisfies(maxSatisfying(rangeToCheck), YARN_VERSION_RANGE)) {
    return true
  }
  return false
}

// call `yarn -v` to check version
export const isValidBinary = (): boolean => {
  const version = execFileSync('yarn', ['--version']).slice(0, 1)
  return satisfies(version, YARN_VERSION_RANGE)
}

export const isDetected = (rootPath = '.'): boolean => {
  // if a v1 lockfile (json) exists, return true
  if (hasValidLockFile(rootPath)) {
    return true
  }
  if (hasValidEnginesEntry(rootPath)) {
    return true
  }
  if (isValidBinary()) {
    return true
  }
  return false
}

export class Yarn1PackageManager implements NodePackageManager {
  rootPath = ''
  lockfile = YARN_LOCK_FILE
  isInstalled(): boolean {
    return isDetected(this.rootPath)
  }

  getDependencyBinaryCmd(dependencyBinary: string): string {
    // run yarn bin <cmd>
    return execFileSync('yarn', ['bin', dependencyBinary]).toString()
  }
}

export default Yarn1PackageManager
1
