export interface NodePackageManager {
  rootPath: string
  lockfile?: string
  isInstalled(): boolean
}
