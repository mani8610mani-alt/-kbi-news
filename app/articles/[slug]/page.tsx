export const revalidate = 60

import { client, urlFor } from '@/sanity/client'
import { articleBySlugQuery, categoriesQuery } from '@/sanity/queries'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Category = { _id: string; name: string; slug: { current: string } }
type Article = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: unknown
  publishedAt?: string
  body?: unknown[]
  category?: { name: string; slug: { current: string } }
  author?: { name: string; role?: string; bio?: string; image?: unknown }
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: unknown; caption?: string } }) => {
      if (!value?.asset) return null
      return (
        <figure>
          <div className="relative w-full h-72">
            <Image
              src={urlFor(value as Parameters<typeof urlFor>[0]).width(800).url()}
              alt={value.caption || ''}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await client.fetch<Article | null>(articleBySlugQuery, { slug })
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [article, categories] = await Promise.all([
    client.fetch<Article | null>(articleBySlugQuery, { slug }),
    client.fetch<Category[]>(categoriesQuery),
  ])

  if (!article) notFound()

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-3xl mx-auto px-4 py-10 flex-1 w-full">
        {article.category && (
          <Link
            href={`/category/${article.category.slug.current}`}
            className="text-xs font-bold text-[#0a2463] uppercase tracking-widest hover:underline"
          >
            {article.category.name}
          </Link>
        )}
        <h1 className="text-2xl md:text-3xl font-extrabold mt-2 mb-4 leading-tight">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-gray-500 text-base mb-4 leading-relaxed">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-3 text-sm text-gray-400 pb-6 border-b border-gray-200 mb-6">
          {article.author && <span className="font-medium text-gray-700">{article.author.name}</span>}
          {article.author?.role && <span className="text-gray-400">{article.author.role}</span>}
          {article.publishedAt && (
            <time dateTime={article.publishedAt} className="ml-auto">
              {new Date(article.publishedAt).toLocaleDateString('ko-KR', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
          )}
        </div>
        {article.coverImage != null && (
          <div className="relative w-full h-64 md:h-80 mb-8">
            <Image
              src={urlFor(article.coverImage).width(800).url()}
              alt={article.title}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        )}
        {article.body && (
          <div className="prose">
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
