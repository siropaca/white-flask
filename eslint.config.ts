import * as js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import type { ConfigArray } from 'typescript-eslint'

const config: ConfigArray = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    rules: {
      // TypeScript関連
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      // 一般的なルール（コード品質）
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // バレルファイル（index ファイル）からの import を禁止
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                './*/index',
                './*/index.ts',
                './*/index.js',
                '../*/index',
                '../*/index.ts',
                '../*/index.js',
              ],
              message:
                'Barrel exports (index files) are not allowed. Import directly from the source file.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.test.cjs'],
    languageOptions: {
      globals: {
        require: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mts',
      '*.config.cts',
      '.next/**',
      '.svelte-kit/**',
      'apps/blog/.next/**',
      'apps/admin/.svelte-kit/**',
      'apps/admin/build/**',
      'apps/backend/dist/**',
      '**/*.svelte',
    ],
  },
  // Prettier と競合するルールを無効化
  eslintConfigPrettier,
)

export default config
