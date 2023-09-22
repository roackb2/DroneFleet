import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextJS Trial',
  applicationName: 'NextJS Trial',
  description: 'An trial app to try out features of NextJS',
  authors: [{
    name: 'Jay /Fienna Liang',
    url: 'https://github.com/roackb2'
  }],
  keywords: ['NextJS', 'React', 'sample app'],
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }
  ],
  colorScheme: 'light',
  viewport: 'width=device-width, initial-scale=1'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
