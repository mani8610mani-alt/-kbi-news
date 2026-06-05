'use client'

import Link from 'next/link'
import { useState } from 'react'

type Category = {
  _id: string
  name: string
  slug: { current: string }
  parent?: { _id: string; name: string; slug: { current: string } }
}

export default function NavMenu({ categories }: { categories: Category[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const mainCategories = categories.filter(c => !c.parent)
  const subCategories = categories.filter(c => !!c.parent)

  const getSubCategories = (parentId: string) =>
    subCategories.filter(c => c.parent?._id === parentId)

  return (
    <nav className="flex border-t border-blue-800">
      <Link
        href="/"
        className="px-3 py-2.5 text-sm whitespace-nowrap hover:bg-blue-800 hover:text-yellow-400 transition-colors"
      >
        전체
      </Link>
      {mainCategories.map(cat => {
        const subs = getSubCategories(cat._id)
        return (
          <div
            key={cat._id}
            className="relative"
            onMouseEnter={() => setOpenMenu(cat._id)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              href={`/category/${cat.slug.current}`}
              className="flex items-center gap-1 px-3 py-2.5 text-sm whitespace-nowrap hover:bg-blue-800 hover:text-yellow-400 transition-colors"
            >
              {cat.name}
              {subs.length > 0 && (
                <span className="text-xs text-blue-400">▾</span>
              )}
            </Link>
            {subs.length > 0 && openMenu === cat._id && (
              <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-b-lg min-w-36 z-50 py-1">
                {subs.map(sub => (
                  <Link
                    key={sub._id}
                    href={`/category/${sub.slug.current}`}
                    className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-[#0a2463] whitespace-nowrap"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
