interface Env {
  GRAPHQL_ENDPOINT: string
}

/**
 * 環境変数を安全に取得するユーティリティ関数
 * 必要な環境変数が設定されていない場合はエラーを投げる
 */
export function getEnv(): Env {
  const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

  if (!graphqlEndpoint) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT environment variable is required')
  }

  return {
    GRAPHQL_ENDPOINT: graphqlEndpoint,
  }
}
