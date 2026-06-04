import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: '필진',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '이름',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL 슬러그',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'role',
      title: '역할/직함',
      type: 'string',
      description: '예: 편집장, 산업팀 기자, 외부 칼럼니스트',
    }),
    defineField({
      name: 'bio',
      title: '소개',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: '프로필 사진',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
