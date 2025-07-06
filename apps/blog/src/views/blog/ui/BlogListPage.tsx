import { getHello } from '@/entities/hello'

export async function BlogListPage() {
  // サーバーサイドで hello クエリをフェッチ
  const data = await getHello()

  return (
    <div>
      <h1>Blog</h1>
      <p>サーバーサイドでデータを取得しました</p>
      <p>GraphQL からの応答: {data?.hello}</p>
      <p>ここにコンテンツ</p>
    </div>
  )
}
