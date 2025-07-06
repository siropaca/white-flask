import js from '@eslint/js'
import globals from 'globals'
import tseslint, { type ConfigArray } from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

const config: ConfigArray = tseslint.config(
  {
    name: 'blog/files',
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
  },
  {
    name: 'blog/ignores',
    ignores: ['.next/', 'node_modules/', 'dist/', 'build/', '.turbo/', 'src/gql/'],
  },
  {
    name: 'blog/javascript',
    ...js.configs.recommended,
  },
  ...tseslint.configs.recommended,
  {
    name: 'blog/typescript',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
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
    name: 'blog/react',
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    name: 'blog/prettier',
    ...eslintConfigPrettier,
  },
)

export default config
