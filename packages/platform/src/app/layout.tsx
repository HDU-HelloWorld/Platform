import type { Metadata } from 'next'

import './globals.css'
import LayoutProvider from './layout.client'

export const metadata: Metadata = {
  title: 'HelloWorld',
  description: '致力于开发和分享前端技术',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/favicon.ico" type="image/x-icon" />
      </head>
      <body className="h-dvh flex flex-col  items-center">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
