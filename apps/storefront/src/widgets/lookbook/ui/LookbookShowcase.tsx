'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Crown, LayoutGrid, Rows } from 'lucide-react';
import { AccordionGallery, type AccordionItem, Masonry, type MasonryItem } from '@/shared/ui';

const ACCORDION_ITEMS: AccordionItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&q=80',
    label: 'Thời Trang Nam Lịch Lãm',
    sublabel: 'Gentleman Tailored Suits',
    link: '/categories/thoi-trang-nam',
  },
  {
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&q=80',
    label: 'Đầm Lụa Dạ Hội Nữ Quyến Rũ',
    sublabel: 'Silk Evening Gowns',
    link: '/categories/thoi-trang-nu',
  },
  {
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80',
    label: 'Trang Sức Kim Cương & Vàng 18K',
    sublabel: 'Fine Jewelry & Diamonds',
    link: '/categories/trang-suc-vang-bac',
  },
  {
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80',
    label: 'Túi Xách Da Thật Thủ Công',
    sublabel: 'Handcrafted Leather Bags',
    link: '/categories/tui-xach-vi-da',
  },
  {
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80',
    label: 'Đồng Hồ Thụy Sĩ & Phụ Kiện',
    sublabel: 'Swiss Watches & Eyewear',
    link: '/categories/dong-ho-kinh-mat',
  },
];

const MASONRY_ITEMS: MasonryItem[] = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    url: '/categories/thoi-trang-nam',
    height: 400,
    title: 'Gentleman Tailored Suits',
    category: 'Thời Trang Nam',
    sublabel: 'Phong cách quý ông lịch lãm',
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
    url: '/categories/thoi-trang-nu',
    height: 280,
    title: 'Silk Evening Gowns',
    category: 'Thời Trang Nữ',
    sublabel: 'Đầm lụa dạ hội quyến rũ',
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    url: '/categories/trang-suc-vang-bac',
    height: 500,
    title: 'Fine Jewelry & Diamonds',
    category: 'Trang Sức',
    sublabel: 'Kim cương & Vàng 18K chế tác tinh xảo',
  },
  {
    id: '4',
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    url: '/categories/tui-xach-vi-da',
    height: 320,
    title: 'Handcrafted Leather Bags',
    category: 'Phụ Kiện',
    sublabel: 'Túi xách da thật cao cấp',
  },
  {
    id: '5',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    url: '/categories/dong-ho-kinh-mat',
    height: 440,
    title: 'Swiss Watches & Eyewear',
    category: 'Đồng Hồ',
    sublabel: 'Bộ sưu tập Thụy Sĩ sang trọng',
  },
  {
    id: '6',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    url: '/categories/thoi-trang-nu',
    height: 360,
    title: 'Minimalist Autumn Fashion',
    category: 'Bộ Sưu Tập Mới',
    sublabel: 'Phong cách mùa thu tối giản',
  },
];

export function LookbookShowcase() {
  const [viewMode, setViewMode] = useState<'masonry' | 'accordion'>('masonry');

  return (
    <section className="w-full py-16 bg-white text-slate-900 border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest mb-2">
              <Crown className="w-3.5 h-3.5 text-slate-600" /> LOOKBOOK 2026
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              BỘ SƯU TẬP THỜI TRANG ĐẲNG CẤP <Sparkles className="w-5 h-5 text-slate-400" />
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('masonry')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'masonry'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Masonry
              </button>
              <button
                onClick={() => setViewMode('accordion')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'accordion'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Rows className="w-3.5 h-3.5" /> Accordion
              </button>
            </div>

            <Link
              href="/categories"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              Khám phá tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === 'masonry' ? (
          <Masonry
            items={MASONRY_ITEMS}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
            colorShiftOnHover={false}
          />
        ) : (
          <AccordionGallery
            items={ACCORDION_ITEMS}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#000000"
            overlayColor="rgba(0, 0, 0, 0.4)"
            textColor="#ffffff"
            grayscale
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={480}
            gap={14}
            radius={20}
            orientation="horizontal"
          />
        )}
      </div>
    </section>
  );
}
