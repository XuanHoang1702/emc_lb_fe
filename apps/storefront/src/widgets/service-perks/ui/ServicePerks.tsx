'use client';

import React from 'react';
import { Truck, Gem, RefreshCw, Sparkles } from 'lucide-react';

const PERKS = [
  {
    icon: Truck,
    title: 'Giao Hàng & Thử Đồ Tận Nhà',
    description: 'Miễn phí giao hỏa tốc 2H & thử trực tiếp sản phẩm tại nhà',
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
  {
    icon: Gem,
    title: '100% Trang Sức & Da Thật',
    description: 'Bảo hành kiểm định 24 tháng, cam kết hoàn tiền 200% nếu giả',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    icon: RefreshCw,
    title: 'Đổi Size & Mẫu Trong 30 Ngày',
    description: 'Dễ dàng 1 đổi 1 tận nơi nếu không vừa vặn hoặc muốn đổi phong cách',
    color: 'text-teal-600 bg-teal-50 border-teal-200',
  },
  {
    icon: Sparkles,
    title: 'Tư Vấn Styling Chuẩn 1:1',
    description: 'Chuyên gia tư vấn phối đồ và chọn size phù hợp theo vóc dáng 24/7',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
];

export function ServicePerks() {
  return (
    <section className="w-full bg-slate-50 py-10 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-200 transition-all duration-300 flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${perk.color}`}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-bold text-slate-900">{perk.title}</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">{perk.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
