import { graphql } from '@/gql'
import type { HelloQuery, HelloQueryVariables } from '@/gql/graphql'
import { graphqlFetcher } from '@/shared/lib'

const HELLO_QUERY = graphql(`
  query Hello {
    hello
  }
`)

/**
 * サーバーサイドで hello を取得する関数
 * Server Components から呼び出される
 */
export async function getHello(): Promise<HelloQuery> {
  return graphqlFetcher<HelloQuery, HelloQueryVariables>(HELLO_QUERY)
}
