import './globals.css'
import { Metadata } from 'next'
import { PT_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ascension Tecnologias',
  description: 'Soluções Digitais e Marketing para seu Negócio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png.png" />
      </head>
      <body className={`${ptSans.className} bg-white min-h-screen`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
