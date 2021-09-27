import { readFile, unlink, writeFile } from "fs/promises"
import {applyPrettier} from './prettier'

const testFilePath = `${process.cwd()}/src/utils/test.js`
const unformattedFile = `const foo = "foo";`
const formattedFile = `const foo = 'foo'
`

describe("prettier", () => {
  it("applyPrettier", async () => {
    await writeFile(testFilePath, unformattedFile)
    await applyPrettier(testFilePath, unformattedFile)
    const result = await readFile(testFilePath, "utf8") 
    expect(result).toBe(formattedFile)
    await unlink(testFilePath)
  })
})