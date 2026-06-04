import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'KBI News — K-Business & Industry',
    template: '%s | KBI News',
  },
  description: '기업과 산업을 깊이 읽다. 주식투자자를 위한 기업·산업 분석 미디어',
  openGraph: {
    siteName: 'KBI News',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
