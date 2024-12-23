import type { Metadata } from 'next'
import '../theme/globals.css'
import { Inter } from 'next/font/google'

import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Providers from '@/lib/providers'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Nodebook',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ua'>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col `}
      >
        <Providers>
          <Header />
          <main className='flex-grow max-w-screen-2xl w-full mx-auto mt-4 px-4 sm:px-6 lg:px-8'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
