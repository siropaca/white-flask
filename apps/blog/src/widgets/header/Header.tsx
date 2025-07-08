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
        <Link href={ROUTES.home}>
          <Logo />
        </Link>
      </div>

      <nav>
        <Link href={ROUTES.home}>Home</Link>
        {' | '}
        <Link href={ROUTES.blog.index}>Blog</Link>
        {' | '}
        <Link href={ROUTES.works}>Works</Link>
        {' | '}
        <Link href={ROUTES.about}>About</Link>
        {' | '}
        <Link href={ROUTES.contact}>Contact</Link>
      </nav>
    </header>
  )
}
