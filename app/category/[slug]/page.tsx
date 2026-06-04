import { client } from '@/sanity/client'
import { articlesByCategoryQuery, categoryBySlugQuery, categoriesQuery } from '@/sanity/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Category = { _id: string; name: string; slug: { current: string }; description?: string }
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await client.fetch<Category | null>(categoryBySlugQuery, { slug })
  if (!category) return {}
  return { title: category.name, description: category.description }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [category, articles, categories] = await Promise.all([
    client.fetch<Category | null>(categoryBySlugQuery, { slug }),
    client.fetch<Article[]>(articlesByCategoryQuery, { slug }),
    client.fetch<Category[]>(categoriesQuery),
  ])

  if (!category) notFound()

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="border-b border-gray-200 pb-5 mb-8">
          <h1 className="text-2xl font-extrabold text-[#0a2463]">{category.name}</h1>
          {category.description && (
            <p className="text-gray-500 mt-2">{category.description}</p>
          )}
        </div>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p>이 카테고리에 아직 기사가 없습니다.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
