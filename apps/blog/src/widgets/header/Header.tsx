import Link from 'next/link'
import { ROUTES } from '@/shared/config'
import { Logo } from '@/shared/ui'

export function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <div>
        <Link href={ROUTES.home} style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>
      </div>
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
