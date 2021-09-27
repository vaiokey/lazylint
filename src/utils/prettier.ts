import { writeFile } from 'fs/promises'
import { format, Options, resolveConfig } from 'prettier'

export const prettierOptions: Options = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  endOfLine: 'lf',
  parser: 'typescript',
}

export async function applyPrettier(
  filePath: string,
  file: string,
): Promise<void> {
  const formattedCode = await resolveConfig(file).then(async () => {
    return format(file, prettierOptions)
  })

  if (formattedCode !== '') {
    writeFile(filePath, formattedCode)
  }
}
