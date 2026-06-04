import { groq } from 'next-sanity'

export const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id, name, slug, description
  }
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id, name, slug, description
  }
`

export const featuredArticleQuery = groq`
  *[_type == "article" && featured == true] | order(publishedAt desc)[0] {
    _id, title, slug, excerpt, coverImage, publishedAt,
    category->{name, slug},
    author->{name, role}
  }
`

export const latestArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[0...12] {
    _id, title, slug, excerpt, coverImage, publishedAt, featured,
    category->{name, slug},
    author->{name, role}
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, excerpt, coverImage, publishedAt, body,
    category->{name, slug},
    author->{name, role, bio, image}
  }
`

export const articlesByCategoryQuery = groq`
  *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
    _id, title, slug, excerpt, coverImage, publishedAt,
    category->{name, slug},
    author->{name, role}
  }
`
