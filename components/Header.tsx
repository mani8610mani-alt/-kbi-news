import Link from 'next/link'
import NavMenu from './NavMenu'

type Category = {
  _id: string
  name: string
  slug: { current: string }
  parent?: { _id: string; name: string; slug: { current: string } }
}

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
        <NavMenu categories={categories} />
      </div>
    </header>
  )
}
