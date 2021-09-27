import { getGitRootDir } from './git'

export const rootDir = getGitRootDir()

const packages = require(`${rootDir}/package.json`)
const dependencies: Record<string, string> = packages.dependencies
const devDependencies: Record<string, string> = packages.devDependencies

export function hasReact() {
  let react
  if (dependencies) {
    react = dependencies?.react
  }
  if (react === undefined && devDependencies) {
    react = devDependencies?.react
  }
  return !!react
}

export function hasNext() {
  let next
  if (dependencies) {
    next = dependencies?.next
  }
  if (next === undefined && devDependencies) {
    next = devDependencies?.next
  }
  return !!next
}
