import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: '카테고리',
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
