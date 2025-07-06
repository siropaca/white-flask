import js from '@eslint/js'
import globals from 'globals'
import tseslint, { type ConfigArray } from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

const config: ConfigArray = tseslint.config(
  {
    name: 'backend/files',
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    name: 'backend/ignores',
    ignores: ['node_modules/', 'dist/', 'build/', '.turbo/', 'drizzle/'],
  },
  {
    name: 'backend/javascript',
    ...js.configs.recommended,
  },
  ...tseslint.configs.recommended,
  {
    name: 'backend/typescript',
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
      'no-console': 'off',
      'no-debugger': 'error',
      'no-alert': 'error',

      // TypeScript 関連
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',

      // コード品質
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',

      // スタイルルール
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
  {
    name: 'backend/prettier',
    ...eslintConfigPrettier,
  },
)

export default config
