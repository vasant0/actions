import { NodePackageManager } from "./types"
import { logger } from "@svaj/actions-logger"


export const cleanStr = (inputStr:string=''):string => {
  return inputStr.trim().toLowerCase()
}

export const isValidPackageManager = (packageManager:string):Boolean => {
  const cleanedPackageManager = cleanStr(packageManager)
  if Object.values(NodePackageManager)
}

export const getPackageManager = (rootPath:string='.', packageManager:string):NodePackageManager|null =>{
  // if user provided a package manager, validate it and use if valid
  if (packageManager && isValidPackageManager(packageManager)) {
    return cleanStr(packageManager) as NodePackageManager
  }
  // need to try to detect the package manager
  return detectPackageManager(rootPath)



}

}
export const detectPackageManager = (rootPath:string='.'):NodePackageManager|null =>{

  // check for yarn.lock
  const yarnLockFile=path.join(rootPath, YARN_LOCKFILE)
  if(fs.exists(yarnLockFile))

  // check for package-lock.json

  // couldn't determine package manager!
  logger.warn("Couldn't determine pacakge manager given", {rootPath, packageManager});
  return detectedPackageManager
}


