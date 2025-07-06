import { GraphQLClient } from 'graphql-request'
import { getEnv } from '@/shared/lib'

const env = getEnv()

export const graphqlClient = new GraphQLClient(env.GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
})
