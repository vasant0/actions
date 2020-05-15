import {MonoRepoType} from './types'
import {NodePackageManager} from '../packageManagers/types'
import {DEFAULT_ROOT_PATH} from './constants'

export interface PackageOutput {
  package: string
  path: string
  output: string
  exitCode: number
}

export interface MonoRepo {
  rootPath: string
  packages: string[]
  type: MonoRepoType
  packageManager: NodePackageManager
  runInAllPackages(command: string): PackageOutput[]
  runInPackages(command: string, packages: string[]): PackageOutput[]
  runInPackage(command: string, pkg: string): PackageOutput
}

export type MonoRepoCreator = new (options: MonoRepoCreatorOptions) => MonoRepo

export interface MonoRepoCreatorOptions {
  rootPath?: string
  packageManager?: NodePackageManager
}
export const MonoRepoCreatorOptionsDefault = {
  rootPath: DEFAULT_ROOT_PATH,
}

/**
 * Creates an instance of a MonoRep Object.
 *
 * @param cons - monorepo Class
 * @param options - constructor options
 * @returns The created MonoRepo object
 */
export const createMonoRepo = (
  cons: MonoRepoCreator,
  options: MonoRepoCreatorOptions = MonoRepoCreatorOptionsDefault,
): MonoRepo => {
  return new cons(options)
}
