import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

import '@/styles/globals.css'

interface Props {
  children: React.ReactNode
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
