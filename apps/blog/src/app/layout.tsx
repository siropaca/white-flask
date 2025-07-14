import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { SITE_META } from '@/shared/config'

import '@/styles/globals.css'

interface Props {
  children: React.ReactNode
}

export const metadata = {
  title: {
    template: `%s | ${SITE_META.name}`,
    default: SITE_META.name,
  },
  description: SITE_META.description,
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
