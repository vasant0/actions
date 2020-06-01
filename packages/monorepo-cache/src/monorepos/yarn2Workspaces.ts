import path from 'path'
import fs from 'fs'
import {MonoRepoCreatorOptions, PackageOutput, MonoRepoCreatorOptionsDefault} from './monorepo'
import {MonoRepo, MonoRepoType} from './types'
import {DEFAULT_ROOT_PATH} from './constants'
import {logger} from '@svaj/actions-logger'
import {NodePackageManager} from 'src/packagemanagers/types'

export class Yarn2Workspaces implements MonoRepo {
  rootPath = DEFAULT_ROOT_PATH
  packages = []
  type = MonoRepoType.yarn2
  packageManager = NodePackageManager.yarn2
  projectPaths = []

  runInAllPackages(command: string): PackageOutput[] {
    // const commandPrefix = 'yarn workspaces run'
    logger.info('running command in all packages', {command})
    const output = ''
    const pkgPath = path.join(this.rootPath, this.projectPaths[0])
    const exitCode = 0
    return [{package: this.packages[0], output, path: pkgPath, exitCode}]
  }

  runInPackages(command: string, packages: string[]): PackageOutput[] {
    logger.info('running command in packages', {command, packages})

    const output = ''
    const pkgPath = path.join(this.rootPath, packages[0])
    const exitCode = 0
    return [{package: packages[0], output, path: pkgPath, exitCode}]
  }

  runInPackage(command: string, pkg: string): PackageOutput {
    logger.info('running command in package', {command, package: pkg})

    const output = ''
    const pkgPath = path.join(this.rootPath, pkg)
    const exitCode = 0
    return {package: pkg, output, path: pkgPath, exitCode}
  }

  constructor(options: MonoRepoCreatorOptions = MonoRepoCreatorOptionsDefault) {
    if (options.rootPath && fs.existsSync(options.rootPath)) {
      this.rootPath = options.rootPath
    }
  }
}
