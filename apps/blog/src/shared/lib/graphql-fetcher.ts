import { request } from 'graphql-request'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql'
import { getClientEnv, getServerEnv } from './env'

/**
 * GraphQL fetcher の共通実装
 * hydration エラーを避けるため、環境変数取得関数を外から注入する
 */
function createGraphqlFetcher(getEnv: () => { GRAPHQL_ENDPOINT: string }) {
  return <T = unknown, V extends Record<string, unknown> = Record<string, unknown>>(
    query: string | TypedDocumentNode<T, V>,
    variables?: V,
  ): Promise<T> => {
    const queryString = typeof query === 'string' ? query : print(query)
    const env = getEnv()

    return request(
      env.GRAPHQL_ENDPOINT,
      queryString,
      variables as Record<string, unknown> | undefined,
    )
  }
}

/**
 * クライアントサイド専用 GraphQL fetcher
 */
export const clientGraphqlFetcher = createGraphqlFetcher(getClientEnv)

/**
 * サーバーサイド専用 GraphQL fetcher
 */
export const serverGraphqlFetcher = createGraphqlFetcher(getServerEnv)
