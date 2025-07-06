import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../../generated/graphql/schema.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        useTypeImports: true,
      },
    },
  },
}

export default config
