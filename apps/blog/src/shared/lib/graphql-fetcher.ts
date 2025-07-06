import { request } from 'graphql-request'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql'
import { getClientEnv, getServerEnv } from './env'

export const clientGraphqlFetcher = <
  T = unknown,
  V extends Record<string, unknown> = Record<string, unknown>,
>(
  query: string | TypedDocumentNode<T, V>,
  variables?: V,
): Promise<T> => {
  const queryString = typeof query === 'string' ? query : print(query)
  const env = getClientEnv()

  return request(
    env.GRAPHQL_ENDPOINT,
    queryString,
    variables as Record<string, unknown> | undefined,
  )
}

export const serverGraphqlFetcher = <
  T = unknown,
  V extends Record<string, unknown> = Record<string, unknown>,
>(
  query: string | TypedDocumentNode<T, V>,
  variables?: V,
): Promise<T> => {
  const queryString = typeof query === 'string' ? query : print(query)
  const env = getServerEnv()

  return request(
    env.GRAPHQL_ENDPOINT,
    queryString,
    variables as Record<string, unknown> | undefined,
  )
}
