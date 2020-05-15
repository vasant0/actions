import fs from 'fs'
import path from 'path'
import { YARN_LOCK_FILE } from './constants';

export const isDetected = (rootPath: string = '.') => {
    // if a v1 lockfile (json) exists, return true
    if (Yarn1Utils.hasValidLockFile(rootPath)) {
      return true;
    }
    if (Yarn1Utils.hasValidEnginesEntry(rootPath)) {
      return true
    }
    if (Yarn1Utils.isValidBinary()) {
      return true
    }
    return false
  }

  export const  hasValidLockFile(rootPath:string=''):Boolean {
    // read first 2 lines of file
    // if LOCKFILE_V1_STRING found, true
  }

  // checks package.json.engines for yarn version
  export const  hasValidEnginesEntry(rootPath: string=''): Boolean {

  }

  // call `yarn -v` to check version
  export const  isValidBinary():Boolean {

  }


export class Yarn1PackageManager implements NodePackageManager {
  rootPath=''
  lockfile=YARN_LOCK_FILE
  isInstalled():boolean {
    return isDetected(this.rootPath)
  }
  
}

export default Yarn1PackageManager
