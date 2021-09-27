import {getGitRootDir} from './git'

describe("git", () => {
  it("getGitRootDir", () => {
    const result = getGitRootDir()
    const expected = process.cwd()
    expect(result).toBe(expected)
  })
})