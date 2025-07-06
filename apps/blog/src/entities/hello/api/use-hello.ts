'use client'

import useSWR from 'swr'
import { graphql } from '@/gql'
import type { HelloQuery, HelloQueryVariables } from '@/gql/graphql'
import { clientGraphqlFetcher } from '@/shared/lib'

const HELLO_QUERY = graphql(`
  query Hello {
    hello
  }
`)

export function useHello() {
  return useSWR<HelloQuery>('Hello', () =>
    clientGraphqlFetcher<HelloQuery, HelloQueryVariables>(HELLO_QUERY),
  )
}
