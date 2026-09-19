'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Gift,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Crown,
} from 'lucide-react';

interface HeroSlideItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  price: string;
  originalPrice: string;
  image: string;
  link: string;
  bgGradient: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 1,
    title: 'Bộ Sưu Tập Thời Trang Thu Đông 2026',
    subtitle:
      'Định hình phong cách đẳng cấp với các thiết kế Tailored Blazer & Đầm Lụa Satin cao cấp.',
    badge: 'BST Mới Xuất Hiện',
    price: '3.890.000đ',
    originalPrice: '4.890.000đ',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
    link: '/categories/thoi-trang-nam',
    bgGradient: 'from-slate-950 via-rose-950 to-slate-900',
  },
  {
    id: 2,
    title: 'Trang Sức Kim Cương & Vàng 18K High Jewelry',
    subtitle: 'Tỏa sáng kiêu sa trong mọi khoảnh khắc. Giảm đến 20% + Tặng Hộp Đựng Da Cao Cấp.',
    badge: 'Đặc Quyền Thượng Lưu',
    price: '18.900.000đ',
    originalPrice: '21.900.000đ',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80',
    link: '/categories/trang-suc-vang-bac',
    bgGradient: 'from-slate-950 via-amber-950 to-slate-900',
  },
  {
    id: 3,
    title: 'Túi Xách & Phụ Kiện Da Thật Thủ Công Handcrafted',
    subtitle:
      'Chế tác tỉ mỉ từ chất liệu Da Bò Hạt Full Grain cao cấp. Nhận Voucher 500k cho đơn đầu tiên.',
    badge: 'Khuyến Mãi Khủng',
    price: '3.250.000đ',
    originalPrice: '3.950.000đ',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80',
    link: '/categories/tui-xach-vi-da',
    bgGradient: 'from-slate-950 via-teal-950 to-slate-900',
  },
];

const DEFAULT_SLIDE: HeroSlideItem = {
  id: 1,
  title: 'Bộ Sưu Tập Thời Trang Thu Đông 2026',
  subtitle:
    'Định hình phong cách đẳng cấp với các thiết kế Tailored Blazer & Đầm Lụa Satin cao cấp.',
  badge: 'BST Mới Xuất Hiện',
  price: '3.890.000đ',
  originalPrice: '4.890.000đ',
  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
  link: '/categories/thoi-trang-nam',
  bgGradient: 'from-slate-950 via-rose-950 to-slate-900',
};

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide: HeroSlideItem = HERO_SLIDES[currentSlide] ?? DEFAULT_SLIDE;

  return (
    <section className="w-full bg-slate-50/60 text-slate-900 relative overflow-hidden py-6 lg:py-10 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Main Carousel (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 text-white min-h-[460px] flex flex-col justify-between p-6 sm:p-10 shadow-lg transition-all">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover object-center opacity-30 mix-blend-overlay scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80" />
            </div>

            {/* Top Slide Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/20 backdrop-blur-md">
                <Crown className="w-3.5 h-3.5 text-slate-300" /> {slide.badge}
              </span>

              {/* Slider Dots */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content Body */}
            <div className="relative z-10 my-6 space-y-4 max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {slide.price}
                </span>
                <span className="text-sm text-slate-400 line-through">{slide.originalPrice}</span>
              </div>
            </div>

            {/* Bottom Actions & Controls */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/15">
              <div className="flex items-center gap-3">
                <Link
                  href={slide.link}
                  className="py-3 px-6 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl shadow-xs text-xs sm:text-sm transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  Khám Phá Bộ Sưu Tập <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="hidden sm:inline-flex py-3 px-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all backdrop-blur-md"
                >
                  Đăng ký nhận Voucher 500k 🎁
                </Link>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Secondary Banners (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Upper Promo Card */}
            <div className="flex-1 rounded-3xl p-6 bg-white border border-slate-200 text-slate-900 relative overflow-hidden flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  <Gift className="w-3.5 h-3.5 text-slate-600" /> Quà Tặng Thời Trang
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Tặng Voucher 500.000đ Cho Đơn Hàng Đầu Tiên
                </h3>
                <p className="text-xs text-slate-500">
                  Đăng ký tài khoản ngay hôm nay để trải nghiệm thời trang & trang sức đẳng cấp.
                </p>
              </div>

              <Link
                href="/register"
                className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl text-center transition-all block"
              >
                Nhận Voucher Ngay →
              </Link>
            </div>

            {/* Lower Promo Card */}
            <div className="flex-1 rounded-3xl p-6 bg-white border border-slate-200 text-slate-900 relative overflow-hidden flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-slate-600" /> Thử Đồ Tại Nhà 2H
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Giao Hàng & Thử Trực Tiếp Tận Nhà Miễn Phí
                </h3>
                <p className="text-xs text-slate-500">
                  Hỗ trợ 1 đổi 1 trong 30 ngày nếu không vừa size hoặc không ưng ý.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                <span>Cam kết 100% Chất liệu chuẩn kiểm định</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
