import { client } from '@/sanity/client'
import { latestArticlesQuery, featuredArticleQuery, categoriesQuery } from '@/sanity/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import FeaturedArticle from '@/components/FeaturedArticle'

type Article = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: unknown
  publishedAt?: string
  featured?: boolean
  category?: { name: string; slug: { current: string } }
  author?: { name: string; role?: string }
}

type Category = { _id: string; name: string; slug: { current: string } }

export default async function HomePage() {
  const [featured, articles, categories] = await Promise.all([
    client.fetch<Article | null>(featuredArticleQuery),
    client.fetch<Article[]>(latestArticlesQuery),
    client.fetch<Category[]>(categoriesQuery),
  ])

  const regularArticles = featured
    ? articles.filter(a => a._id !== featured._id)
    : articles

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {featured && <FeaturedArticle article={featured} />}

        <section className="mt-10">
          <h2 className="text-lg font-extrabold border-l-4 border-[#0a2463] pl-3 mb-6 text-[#0a2463]">
            최신 기사
          </h2>
          {regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map(article => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">아직 게시된 기사가 없습니다.</p>
              <p className="text-sm mt-2">Sanity 편집실에서 첫 기사를 작성해보세요.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
