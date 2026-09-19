'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  ShoppingCart,
  Heart,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { MOCK_CATEGORIES } from '@/entities/product';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="w-full bg-slate-900 text-white text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-md font-semibold text-[11px] border border-teal-500/30 shrink-0">
              <Sparkles className="w-3 h-3 text-amber-300" /> KM HOT
            </span>
            <p className="truncate text-slate-300 text-[11px] sm:text-xs">
              Đăng ký thành viên nhận ngay{' '}
              <span className="text-teal-300 font-bold">Voucher 500.000đ</span> + Miễn phí vận
              chuyển hỏa tốc 2H!
            </p>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] text-slate-300 font-medium">
            <span className="flex items-center gap-1 text-teal-300">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Chính Hãng
            </span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-teal-400" /> Hotline:{' '}
              <strong className="text-white">1900 8888</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
              EMC <span className="text-teal-600">Store</span>
            </span>
            <span className="text-[9px] font-semibold text-slate-400 tracking-widest uppercase">
              E-Commerce
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm Áo Vest Nam, Đầm Lụa Nữ, Mặt Dây Chuyền Kim Cương, Túi Da..."
              className="w-full pl-11 pr-24 py-2.5 bg-slate-100/90 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-teal-600 hover:bg-teal-50 flex items-center gap-1.5 transition-all cursor-pointer relative"
          >
            <Heart className="w-5 h-5" />
            <span className="hidden lg:inline text-xs font-semibold">Yêu thích</span>
          </Link>

          {/* Cart Badge */}
          <Link
            href="/cart"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-teal-600 hover:bg-teal-50 flex items-center gap-1.5 transition-all cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                3
              </span>
            </div>
            <span className="hidden lg:inline text-xs font-semibold">Giỏ hàng</span>
          </Link>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Auth Links */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/login"
              className="py-2 px-3.5 text-xs font-bold text-slate-700 hover:text-teal-600 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg transition-all"
            >
              Đăng ký ngay
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Bottom Category & Main Navigation */}
      <div className="hidden md:block w-full border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-700">
          {/* Categories Button Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="py-2.5 px-4 bg-teal-600 text-white font-bold rounded-t-xl flex items-center gap-2 hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>DANH MỤC SẢN PHẨM</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoriesOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-b-2xl shadow-xl py-2 z-50 animate-fade-in">
                {MOCK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                      {cat.itemCount}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Main Links */}
          <nav className="flex items-center gap-8 py-2.5">
            <Link href="/" className="text-teal-600 font-extrabold flex items-center gap-1">
              Trang Chủ
            </Link>
            <Link href="/products" className="hover:text-teal-600 transition-colors">
              Sản Phẩm
            </Link>
            <Link
              href="/flash-sale"
              className="hover:text-teal-600 transition-colors flex items-center gap-1 text-rose-600 font-extrabold"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> Flash Sale
            </Link>
            <Link href="/best-sellers" className="hover:text-teal-600 transition-colors">
              Bán Chạy
            </Link>
            <Link href="/news" className="hover:text-teal-600 transition-colors">
              Tin Công Nghệ
            </Link>
            <Link href="/contact" className="hover:text-teal-600 transition-colors">
              Liên Hệ
            </Link>
          </nav>

          {/* Quick Perks */}
          <div className="flex items-center gap-2 text-teal-700 bg-teal-50 px-3 py-1 rounded-full text-[11px] font-semibold border border-teal-100">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" /> Giao 2H miễn phí
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-900 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-2 text-xs font-semibold text-slate-800">
            <Link href="/" className="py-2 px-3 rounded-lg bg-teal-50 text-teal-700 font-bold">
              Trang Chủ
            </Link>
            <Link href="/products" className="py-2 px-3 hover:bg-slate-50 rounded-lg">
              Sản Phẩm
            </Link>
            <Link
              href="/flash-sale"
              className="py-2 px-3 hover:bg-slate-50 rounded-lg text-rose-600 font-bold flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> Flash Sale
            </Link>
            <Link href="/categories" className="py-2 px-3 hover:bg-slate-50 rounded-lg">
              Danh Mục Sản Phẩm
            </Link>
            <Link
              href="/register"
              className="py-2 px-3 bg-teal-600 text-white rounded-lg text-center font-bold"
            >
              Đăng Ký Tài Khoản
            </Link>
            <Link
              href="/login"
              className="py-2 px-3 border border-slate-200 text-center rounded-lg font-bold"
            >
              Đăng Nhập
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
