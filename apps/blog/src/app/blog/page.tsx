import { BlogListPage } from '@/views/blog'

export const metadata = {
  title: 'Blog',
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <BlogListPage />
}
