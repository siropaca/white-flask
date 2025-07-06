'use client'

import { useHello } from '@/entities/hello'

export function HomePage() {
  const { data, error, isLoading } = useHello()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>トップページ</h1>
      <p>GraphQL からの応答: {data?.hello}</p>
      <p>ここにコンテンツ</p>
    </div>
  )
}
