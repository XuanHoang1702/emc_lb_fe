'use client';

import React from 'react';
import { Award } from 'lucide-react';

const BRANDS = [
  { name: 'Chanel', tag: 'Haute Couture' },
  { name: 'Gucci', tag: 'Luxury Fashion' },
  { name: 'Dior', tag: 'High Fashion' },
  { name: 'Louis Vuitton', tag: 'Leather Goods' },
  { name: 'Rolex', tag: 'Swiss Timepieces' },
  { name: 'Pandora', tag: 'Fine Jewelry' },
  { name: 'PNJ Luxury', tag: 'Trang Sức Vàng' },
  { name: 'Swarovski', tag: 'Crystal Jewelry' },
];

export function BrandPartners() {
  return (
    <section className="w-full py-10 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-8">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Thương Hiệu Thời Trang & Trang Sức Đỉnh Cao
          </span>
          <h2 className="text-xl font-extrabold text-slate-800">
            Đối Tác Phân Phối Chính Hãng Từ Các Nhà Mốt Hàng Đầu
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRANDS.map((brand, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-amber-300 hover:shadow-md transition-all duration-300 text-center space-y-1 group cursor-pointer"
            >
              <div className="text-base font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                {brand.name}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold truncate">{brand.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
