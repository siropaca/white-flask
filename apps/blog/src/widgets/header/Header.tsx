import Link from 'next/link'
import { ROUTES } from '@/shared/config'

export const Header = () => {
  return (
    <header>
      <nav>
        <Link href={ROUTES.home}>ホーム</Link>
        {' | '}
        <Link href={ROUTES.blog.index}>ブログ</Link>
        {' | '}
        <Link href={ROUTES.works}>開発実績</Link>
        {' | '}
        <Link href={ROUTES.about}>プロフィール</Link>
        {' | '}
        <Link href={ROUTES.contact}>問い合わせ</Link>
      </nav>
    </header>
  )
}
