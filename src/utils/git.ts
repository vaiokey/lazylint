import { execSync } from 'child_process'

export function getGitRootDir() {
  const gitRootDir = execSync('git rev-parse --show-toplevel', {
    cwd: process.cwd(),
  })
    .toString()
    .trim()
  return gitRootDir
}
