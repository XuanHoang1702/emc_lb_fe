import { useState, type ReactNode } from 'react';
import { Sidebar } from '@/widgets/sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f4f6fa] text-slate-900">
      {/* 100% Fixed Sidebar on Left */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area - Left Padded on Desktop by 240px (w-60) */}
      <div className="flex flex-col min-h-screen w-full lg:pl-60 transition-all duration-300">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 h-16 w-full bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2 text-slate-700">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="text-slate-400"
              >
                <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5" />
                <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5" />
                <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5" />
                <rect x="11" y="11" width="6.5" height="6.5" rx="1.5" />
              </svg>
              <h1 className="text-sm sm:text-base font-semibold text-slate-900">Overview</h1>
            </div>
          </div>

          {/* Right Header: Search & Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="relative w-36 sm:w-64 md:w-80">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M12.5 12.5L17 17" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search bookings, routes..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            {/* Quick action Clock button */}
            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
              aria-label="Clock"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="10" cy="10" r="7" />
                <path d="M10 6v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
