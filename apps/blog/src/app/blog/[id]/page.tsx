import { BlogDetailPage } from '@/views/blog'

interface Props {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  return <BlogDetailPage id={params.id} />
}
