import Link from 'next/link';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-blue-700 tracking-tight">
            EMC
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/products" className="hover:text-blue-700 transition-colors">
              Sản phẩm
            </Link>
            <Link href="/cart" className="hover:text-blue-700 transition-colors">
              Giỏ hàng
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">EMC E-Commerce</h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Nền tảng thương mại điện tử được xây dựng theo kiến trúc Feature-Sliced Design
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              React 19
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              TypeScript
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
              Tailwind CSS
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              FSD
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
