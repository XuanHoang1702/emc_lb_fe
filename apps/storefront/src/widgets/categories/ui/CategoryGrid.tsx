'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/entities/product';

export function CategoryGrid() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Khám Phá Theo Danh Mục
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              DANH MỤC NỔI BẬT <Sparkles className="w-5 h-5 text-amber-500" />
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1 transition-colors"
          >
            Tất cả danh mục <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 pt-8">
          {MOCK_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between bg-slate-50 p-4 text-center"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-white">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
                  {category.itemCount}+ sản phẩm
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
