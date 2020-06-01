export interface NodePackageManager {
  rootPath: string
  lockfile?: string
  isInstalled(): boolean
  getDependencyBinaryCmd(dependencyBinary: string): string
}
