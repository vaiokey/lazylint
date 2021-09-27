import { log } from "console";
import { ESLint, Linter } from "eslint";
import { writeFile } from "fs/promises";

import { hasNext, hasReact } from "./configs";

const react = hasReact();
const next = hasNext();

const reactSettings = react
  ? {
      react: {
        version: "detect",
      },
    }
  : [];

const reactRules: Linter.RulesRecord = {
  "react/react-in-jsx-scope": "off",
};

const rules: Linter.RulesRecord = {
  "simple-import-sort/imports": "error",
  "simple-import-sort/exports": "error",
  ...reactRules,
};

const eslintOptions: ESLint.Options = {
  baseConfig: {
    parser: "@typescript-eslint/parser",
    plugins: ["simple-import-sort"],
    extends: [
      "standard-with-typescript",
      next ? "next/core-web-vitals" : react ? "standard-react" : "",
      "plugin:prettier/recommended",
      "plugin:promise/recommended",
      "prettier",
    ],
    settings: {
      ...reactSettings,
    },
    rules,
  },
  fix: true,
};

const cli = new ESLint(eslintOptions);

async function formatCode(code: string): Promise<ESLint.LintResult[]> {
  const formattedCode = await cli.lintText(code);
  return formattedCode;
}

async function logMessages(
  filePath: string,
  messages: Linter.LintMessage[]
): Promise<void> {
  messages.flatMap((message) => {
    log(
      `${filePath}:${message.line}:${message.column} - ${message.message} (${message.ruleId})`
    );
  });
}

export async function applyEslint(
  filePath: string,
  file: string
): Promise<void> {
  const results = await formatCode(file);

  results.flatMap((result) => {
    const { messages, output } = result;

    if (messages.length > 0) {
      logMessages(filePath, messages);
    }

    if (output) {
      writeFile(filePath, output);
    }
  });
}
