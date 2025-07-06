import js from '@eslint/js'
import globals from 'globals'
import tseslint, { type ConfigArray } from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

const config: ConfigArray = tseslint.config(
  {
    name: 'root/files',
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
  },
  {
    name: 'root/ignores',
    ignores: ['apps/', 'node_modules/', 'dist/', 'build/', '.turbo/', 'generated/', 'scripts/'],
  },
  {
    name: 'root/javascript',
    ...js.configs.recommended,
  },
  ...tseslint.configs.recommended,
  {
    name: 'root/typescript',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // 基本的なルール
      'no-console': 'error',
      'no-debugger': 'error',

      // TypeScript 関連
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',

      // コード品質
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    name: 'root/prettier',
    ...eslintConfigPrettier,
  },
)

export default config
