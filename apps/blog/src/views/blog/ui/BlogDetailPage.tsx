interface Props {
  id: string
}

export function BlogDetailPage({ id }: Props) {
  return (
    <div>
      <h1>ブログ記事 ID: {id}</h1>
      <p>ここにコンテンツ</p>
    </div>
  )
}
