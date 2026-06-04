import Link from 'next/link'

type Category = { _id: string; name: string; slug: { current: string } }

export default function Header({ categories }: { categories: Category[] }) {
  return (
    <header className="bg-[#0a2463] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold tracking-tight">KBI</span>
            <span className="text-xl font-bold text-yellow-400">News</span>
            <span className="text-xs text-blue-300 hidden sm:block ml-1">K-Business & Industry</span>
          </Link>
          <div className="text-xs text-blue-300 hidden md:block">기업과 산업을 깊이 읽다</div>
        </div>
        <nav className="flex gap-1 border-t border-blue-800 overflow-x-auto">
          <Link
            href="/"
            className="px-3 py-2.5 text-sm whitespace-nowrap hover:bg-blue-800 hover:text-yellow-400 transition-colors"
          >
            전체
          </Link>
          {categories.map(cat => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug.current}`}
              className="px-3 py-2.5 text-sm whitespace-nowrap hover:bg-blue-800 hover:text-yellow-400 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
