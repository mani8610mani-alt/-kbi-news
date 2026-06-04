export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-extrabold text-xl">KBI</span>
              <span className="text-yellow-400 font-bold text-xl">News</span>
            </div>
            <p className="text-sm mt-1">K-Business & Industry — 기업과 산업을 깊이 읽다</p>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} KBI News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
