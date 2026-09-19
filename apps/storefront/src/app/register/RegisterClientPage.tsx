'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { RegisterShowcaseCard } from '@/widgets/auth';

export function RegisterClientPage() {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-teal-500 selection:text-white flex flex-col relative overflow-hidden">
      {/* Background Glowing Teal Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="w-full relative z-20 border-b border-teal-500/15 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-100/80 hover:text-white text-xs font-semibold transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Trở về trang chủ</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 text-lg font-black text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-transparent">
              EMC E-Commerce
            </span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Kết nối mã hóa SSL
            </span>
            <Link
              href="/login"
              className="text-teal-100/80 hover:text-white transition-colors font-medium"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <RegisterShowcaseCard />
      </main>
    </div>
  );
}
