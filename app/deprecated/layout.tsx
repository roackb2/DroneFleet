import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DroneFleet',
  applicationName: 'DroneFleet',
  description: 'Drone fleet ground control station',
  authors: [{
    name: 'Jay / Fienna Liang',
    url: 'https://github.com/roackb2'
  }],
  keywords: ['DroneFleet', 'Drone', 'UAV', 'GCS', 'Ground control station'],
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
