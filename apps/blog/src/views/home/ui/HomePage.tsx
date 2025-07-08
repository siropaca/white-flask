'use client'

import { useHello } from '@/entities/hello'

export function HomePage() {
  const { data, error, isLoading } = useHello()

  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div>
        <p>NEXT_PUBLIC_GRAPHQL_ENDPOINT: {process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}</p>
        <div>Error: {error.message}</div>
      </div>
    )

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <p>GraphQL からの応答: {data?.hello}</p>
      <p>ここにコンテンツ</p>
    </div>
  )
}
