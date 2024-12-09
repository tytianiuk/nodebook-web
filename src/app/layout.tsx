import type { Metadata } from 'next'
import '../theme/globals.css'
import { Inter } from 'next/font/google'

import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'

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
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className='flex-grow container mx-auto px-4 py-8'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
