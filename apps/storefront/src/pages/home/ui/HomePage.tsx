export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          EMC E-Commerce
        </h1>
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
    </div>
  );
}
