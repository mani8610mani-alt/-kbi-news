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

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug.current}`} className="group block">
      <article className="relative w-full h-72 md:h-[460px] rounded-xl overflow-hidden shadow-lg">
        {article.coverImage ? (
          <Image
            src={urlFor(article.coverImage as Parameters<typeof urlFor>[0]).width(1200).height(460).url()}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0a2463] to-blue-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {article.category && (
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-yellow-500 px-2 py-1 rounded mb-2">
              {article.category.name}
            </span>
          )}
          <h2 className="text-xl md:text-3xl font-extrabold leading-tight group-hover:text-yellow-300 transition-colors">
            {article.title}
          </h2>
          {article.excerpt && (
            <p className="text-sm text-gray-200 mt-2 line-clamp-2 hidden md:block">{article.excerpt}</p>
          )}
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-300">
            {article.author && <span>{article.author.name}</span>}
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
