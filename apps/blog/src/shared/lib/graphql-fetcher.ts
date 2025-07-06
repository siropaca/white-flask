import { request } from 'graphql-request'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql'
import { getEnv } from './env'

const env = getEnv()

export const graphqlFetcher = <
  T = unknown,
  V extends Record<string, unknown> = Record<string, unknown>,
>(
  query: string | TypedDocumentNode<T, V>,
  variables?: V,
): Promise<T> => {
  const queryString = typeof query === 'string' ? query : print(query)
  return request(
    env.GRAPHQL_ENDPOINT,
    queryString,
    variables as Record<string, unknown> | undefined,
  )
}
