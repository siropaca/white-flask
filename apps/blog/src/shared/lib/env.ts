interface Env {
  GRAPHQL_ENDPOINT: string
}

/**
 * 環境変数を安全に取得するユーティリティ関数
 * 必要な環境変数が設定されていない場合はエラーを投げる
 *
 * サーバーサイドでは内部ネットワーク用の URL を使用し、
 * クライアントサイドでは外部アクセス用の URL を使用する
 */
export function getEnv(): Env {
  // サーバーサイドでの実行かどうかを判定
  const isServerSide = typeof window === 'undefined'

  let graphqlEndpoint: string | undefined

  if (isServerSide) {
    // サーバーサイドでは内部ネットワーク用の URL を使用
    graphqlEndpoint = process.env.INTERNAL_GRAPHQL_ENDPOINT
  } else {
    // クライアントサイドでは外部アクセス用の URL を使用
    graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
  }

  if (!graphqlEndpoint) {
    const requiredVar = isServerSide ? 'INTERNAL_GRAPHQL_ENDPOINT' : 'NEXT_PUBLIC_GRAPHQL_ENDPOINT'
    throw new Error(`${requiredVar} environment variable is required`)
  }

  return {
    GRAPHQL_ENDPOINT: graphqlEndpoint,
  }
}
