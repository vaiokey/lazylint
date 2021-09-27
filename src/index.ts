import fg from 'fast-glob'
import { readFile } from 'fs/promises'

import { applyEslint } from './utils/eslint'
import { applyPrettier } from './utils/prettier'

;(async () => {
  const targetDir = process.argv[2]
  const filePaths = fg.sync(targetDir ?? 'src/**/*.{js,jsx,ts,tsx}', {
    absolute: true,
  })

  filePaths.flatMap(async (filePath) => {
    const file = await readFile(filePath, 'utf8')
    await applyEslint(filePath, file)
    await applyPrettier(filePath, file)
  })
})()
