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
      name: 'parent',
      title: '상위 카테고리 (소분류인 경우만 선택)',
      type: 'reference',
      to: [{ type: 'category' }],
      description: '대분류는 비워두세요. 소분류일 때만 상위 카테고리를 선택하세요.',
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      parent: 'parent.name',
    },
    prepare({ title, parent }: { title: string; parent?: string }) {
      return {
        title,
        subtitle: parent ? `▸ ${parent}` : '대분류',
      }
    },
  },
})
