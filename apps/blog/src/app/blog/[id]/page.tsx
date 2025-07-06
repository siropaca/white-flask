import { BlogDetailPage } from '@/views/blog'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <BlogDetailPage id={id} />
}
