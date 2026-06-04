import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'

type Article = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: unknown
  publishedAt?: string
  category?: { name: string; slug: { current: string } }
  author?: { name: string; role?: string }
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug.current}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        {article.coverImage ? (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={urlFor(article.coverImage as Parameters<typeof urlFor>[0]).width(480).height(270).url()}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="text-blue-300 text-sm font-medium">KBI News</span>
          </div>
        )}
        <div className="p-4 flex flex-col flex-1">
          {article.category && (
            <span className="text-xs font-bold text-[#0a2463] uppercase tracking-wide">
              {article.category.name}
            </span>
          )}
          <h3 className="font-bold text-gray-900 mt-1 leading-snug group-hover:text-[#0a2463] transition-colors line-clamp-2 flex-1">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
          )}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
            <span>{article.author?.name ?? ''}</span>
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('ko-KR')}
              </time>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
