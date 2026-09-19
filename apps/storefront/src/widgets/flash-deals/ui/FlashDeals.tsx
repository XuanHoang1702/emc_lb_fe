'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, Flame } from 'lucide-react';
import { MOCK_FLASH_DEALS, ProductCard } from '@/entities/product';

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="w-full py-12 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Countdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  FLASH SALE HÔM NAY
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-slate-200">
                  <Flame className="w-3.5 h-3.5 text-slate-600 fill-current" /> Sắp hết giờ
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Cơ hội sở hữu sản phẩm cao cấp với giá ưu đãi đặc biệt lên tới 50%!
              </p>
            </div>
          </div>

          {/* Realtime Countdown Timer Boxes */}
          <div className="flex items-center gap-2 bg-slate-900 text-white p-2.5 rounded-2xl shadow-xs border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 pl-1 uppercase tracking-wider">
              Kết thúc sau:
            </span>
            <div className="flex items-center gap-1 font-extrabold text-sm">
              <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-slate-400 font-bold">:</span>
              <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-slate-400 font-bold">:</span>
              <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-200">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {MOCK_FLASH_DEALS.map((product) => {
            const percentageSold = Math.round(
              ((product.soldCount ?? 0) / (product.totalStock ?? 100)) * 100,
            );
            return (
              <div key={product.id} className="flex flex-col">
                <ProductCard product={product} />

                {/* Stock Level Progress Bar */}
                <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-semibold">
                    <span className="text-slate-800 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-current text-slate-600" /> Đã bán{' '}
                      {product.soldCount}
                    </span>
                    <span className="text-slate-400">
                      Còn {(product.totalStock ?? 100) - (product.soldCount ?? 0)} suất
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentageSold}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center pt-10">
          <Link
            href="/flash-sale"
            className="inline-flex items-center gap-2 py-3 px-8 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl shadow-xs text-xs sm:text-sm transition-all hover:border-slate-300"
          >
            Xem Tất Cả Flash Sale ({MOCK_FLASH_DEALS.length * 3}+ Sản Phẩm){' '}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
