import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { sitemapQuery } from '@/sanity/queries'

export const revalidate = 3600

const BASE_URL = 'https://kbi-news.vercel.app'

type SitemapData = {
  articles: { slug: string; publishedAt: string | null }[]
  categories: { slug: string }[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, categories } = await client.fetch<SitemapData>(sitemapQuery)

  const articleEntries: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${BASE_URL}/category/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...articleEntries,
    ...categoryEntries,
  ]
}
