'use client'

import { useState } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sendDefault: (options: Record<string, any>) => void
      }
    }
  }
}

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY

type Props = {
  url: string
  title: string
  imageUrl?: string
}

export default function ShareButtons({ url, title, imageUrl }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleKakaoLoad = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY!)
    }
  }

  const handleKakao = () => {
    if (!window.Kakao) return
    if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_KEY!)
    if (imageUrl) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          imageUrl,
          link: { mobileWebUrl: url, webUrl: url },
        },
      })
    } else {
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text: title,
        link: { mobileWebUrl: url, webUrl: url },
      })
    }
  }

  const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

  return (
    <>
      {KAKAO_KEY && (
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
          onLoad={handleKakaoLoad}
        />
      )}
      <div className="flex items-center gap-3 mt-10 pt-8 border-t border-gray-200">
        <span className="text-sm text-gray-500 font-medium mr-1">공유</span>
        {KAKAO_KEY && (
          <button
            onClick={handleKakao}
            className="px-4 py-2 rounded-full bg-[#FEE500] text-black text-sm font-medium hover:bg-yellow-300 transition-colors"
          >
            카카오톡
          </button>
        )}
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          X
        </a>
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {copied ? '✓ 복사됨' : '링크 복사'}
        </button>
      </div>
    </>
  )
}
