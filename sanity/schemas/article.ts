import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: '기사',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL 슬러그',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '요약',
      type: 'text',
      rows: 3,
      description: '기사 목록/SNS 공유 시 표시되는 짧은 요약문',
    }),
    defineField({
      name: 'coverImage',
      title: '대표 이미지',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'author',
      title: '필진',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: '발행일',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: '주요 기사 (메인 노출)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: '본문',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: '이미지 설명',
            },
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: '발행일 (최신순)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, author, media }: { title: string; author?: string; media?: any }) {
      return {
        title,
        subtitle: author ? `by ${author}` : '필진 미지정',
        media,
      }
    },
  },
})
