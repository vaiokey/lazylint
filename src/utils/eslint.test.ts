import { readFile, unlink, writeFile } from "fs/promises"
import {applyEslint} from './eslint'

const testFilePath = `${process.cwd()}/src/utils/test.js`
const unlintedFile = `function add(){}`
const lintedFile = `function add() {}
`

describe("prettier", () => {
  it("applyPrettier", async () => {
    await writeFile(testFilePath, unlintedFile)
    await applyEslint(testFilePath, unlintedFile)
    const result = await readFile(testFilePath, "utf8") 
    expect(result).toBe(lintedFile)
    await unlink(testFilePath)
  })
})