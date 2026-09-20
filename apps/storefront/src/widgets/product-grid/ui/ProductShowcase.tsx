'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Sparkles, Star, Tag, ArrowRight, Layers } from 'lucide-react';
import { MOCK_PRODUCTS, ProductCard, type ProductFilterTab } from '@/entities/product';

const TABS: { id: ProductFilterTab; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Tất Cả Sản Phẩm', icon: Layers },
  { id: 'best-seller', label: 'Bán Chạy Nhất', icon: Flame },
  { id: 'newest', label: 'Sản Phẩm Mới', icon: Sparkles },
  { id: 'top-rated', label: 'Đánh Giá Cao', icon: Star },
  { id: 'discount', label: 'Khuyến Mãi Khủng', icon: Tag },
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<ProductFilterTab>('all');

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (activeTab === 'best-seller')
      return product.isHot || (product.soldCount && product.soldCount > 100);
    if (activeTab === 'newest') return product.isNew;
    if (activeTab === 'top-rated') return product.rating >= 4.9;
    if (activeTab === 'discount') return product.discountPercent && product.discountPercent >= 15;
    return true;
  });

  return (
    <section className="w-full py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Gợi Ý Dành Cho Bạn
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              SẢN PHẨM CÔNG NGHỆ NỔI BẬT
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/20 scale-102'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Load More Button */}
        <div className="text-center pt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 py-3.5 px-8 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/35 text-xs sm:text-sm transition-all transform hover:-translate-y-0.5"
          >
            Khám Phá Toàn Bộ {MOCK_PRODUCTS.length * 10}+ Sản Phẩm{' '}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
