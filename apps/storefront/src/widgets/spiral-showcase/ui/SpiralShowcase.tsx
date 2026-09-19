'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { InfiniteSpiral, type SpiralItem } from '@/shared/ui';

const SPIRAL_FASHION_IMAGES: SpiralItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
    alt: 'Mặt dây chuyền kim cương',
    title: 'Kim Cương 18K',
  },
  {
    src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    alt: 'Túi xách da thật',
    title: 'Túi Da Crafted',
  },
  {
    src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
    alt: 'Đồng hồ Thụy Sĩ',
    title: 'Swiss Automatic',
  },
  {
    src: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80',
    alt: 'Đầm lụa dạ hội',
    title: 'Đầm Lụa Merlot',
  },
  {
    src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
    alt: 'Áo vest blazer nam',
    title: 'Suit Tailored Ý',
  },
  {
    src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
    alt: 'Nhẫn đá sapphire',
    title: 'Sapphire Royal',
  },
  {
    src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80',
    alt: 'Kính mát polarized',
    title: 'Kính Acetate',
  },
  {
    src: 'https://images.unsplash.com/photo-1611591475179-42dd31190587?w=400&q=80',
    alt: 'Vòng tay phong thủy',
    title: 'Thạch Anh Tóc Vàng',
  },
];

export function SpiralShowcase() {
  return (
    <section className="w-full py-16 bg-stone-50/70 text-slate-900 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Description Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-200/70 text-slate-700 border border-slate-300 uppercase tracking-wider">
              <Compass
                className="w-3.5 h-3.5 text-slate-600 animate-spin"
                style={{ animationDuration: '12s' }}
              />
              TRẢI NGHIỆM KHÔNG GIAN 3D
            </span>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
                Sàn Khấu Thời Trang & Phụ Kiện Vô Tận
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Chiêm ngưỡng bộ sưu tập trang sức cao cấp, túi da thủ công và trang phục dạ hội qua
                hiệu ứng xoắn ốc 3D (Infinite 3D Spiral). Đặt chuột vào để tạm dừng xem từng thiết
                kế.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/categories/trang-suc-vang-bac"
                className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs text-xs sm:text-sm transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                Khám Phá Phụ Kiện Luxury <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-slate-400" /> Tự động xoay 360°
              </div>
            </div>
          </div>

          {/* Right 3D Infinite Spiral Interactive Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="w-full h-[520px] rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <InfiniteSpiral
                items={SPIRAL_FASHION_IMAGES}
                animationMode="auto"
                speed={0.45}
                radius={180}
                cardWidth={120}
                cardHeight={120}
                verticalSpacing={70}
                perspective={1000}
                cardRadius={16}
                centerScale={1.3}
                edgeBlur={4}
                cardsPerTurn={6}
                pauseOnHover
                direction="up"
                edgeFade={0.4}
                grayscale={0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
