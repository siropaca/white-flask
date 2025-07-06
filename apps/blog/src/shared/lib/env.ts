interface Env {
  GRAPHQL_ENDPOINT: string
}

/**
 * クライアントサイド専用の環境変数取得関数
 * hydration エラーを回避するため、クライアントサイドでのみ使用
 */
export function getClientEnv(): Env {
  const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

  if (!graphqlEndpoint) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT environment variable is required')
  }

  return {
    GRAPHQL_ENDPOINT: graphqlEndpoint,
  }
}

/**
 * サーバーサイド専用の環境変数取得関数
 * 内部ネットワーク用の URL を使用
 */
export function getServerEnv(): Env {
  const graphqlEndpoint = process.env.INTERNAL_GRAPHQL_ENDPOINT

  if (!graphqlEndpoint) {
    throw new Error('INTERNAL_GRAPHQL_ENDPOINT environment variable is required')
  }

  return {
    GRAPHQL_ENDPOINT: graphqlEndpoint,
  }
}
