'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, Zap, Award, Sparkles, Star, CheckCircle } from 'lucide-react';
import { RegisterForm } from '@/features/auth';

export function RegisterShowcaseCard() {
  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-teal-950/20 border border-teal-100 overflow-hidden my-8 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left Column: Brand Showcase Panel (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-teal-700 via-emerald-700 to-cyan-800 p-8 lg:p-10 text-white relative overflow-hidden flex flex-col justify-between">
          {/* Ambient Decorative Glow Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-20 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Logo & Tagline */}
          <div className="relative z-10 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-white group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span className="bg-gradient-to-r from-white via-teal-100 to-emerald-100 bg-clip-text text-transparent">
                EMC Store
              </span>
            </Link>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-teal-100 border border-white/15 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Đặc quyền xanh ngọc 2026
              </span>
              <h2 className="text-3xl font-black leading-tight tracking-tight mt-3">
                Trải Nhiệm Mua Sắm Đột Phá Cùng EMC
              </h2>
              <p className="text-teal-100/85 text-sm mt-2 font-normal leading-relaxed">
                Đăng ký ngay hôm nay để nhận trọn bộ đặc quyền cao cấp và mua sắm sản phẩm chính
                hãng với giá tốt nhất.
              </p>
            </div>
          </div>

          {/* Middle Perks List */}
          <div className="relative z-10 space-y-3.5 my-8">
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Voucher 500.000đ
                </h4>
                <p className="text-xs text-teal-100/80">
                  Tặng ngay vào ví quà tặng khi hoàn tất tạo tài khoản
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/20 text-cyan-200 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Giao Hàng Hỏa Tốc 2H
                </h4>
                <p className="text-xs text-teal-100/80">
                  Miễn phí vận chuyển cho tất cả đơn hàng đầu tiên
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-200 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Tích Điểm 5% Mọi Đơn
                </h4>
                <p className="text-xs text-teal-100/80">
                  Quy đổi điểm thưởng trực tiếp thành tiền mặt khi thanh toán
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Floating Social Proof Card */}
          <div className="relative z-10 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-teal-100 font-medium">Hơn 50,000+ thành viên</span>
            </div>
            <p className="text-xs italic text-teal-50/95 leading-relaxed">
              &quot;Trải nghiệm mua sắm mượt mà, giao hàng siêu nhanh và ưu đãi cực tốt!&quot;
            </p>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-900 font-extrabold text-[10px] flex items-center justify-center">
                TN
              </div>
              <span className="text-xs font-medium text-white">Thảo Nguyên</span>
              <span className="text-[10px] text-emerald-300 flex items-center gap-0.5">
                <CheckCircle className="w-3 h-3" /> Đã xác thực
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form Panel (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            {/* Header section */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Tạo Tài Khoản Mới
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Điền thông tin bên dưới để khởi tạo tài khoản EMC E-Commerce
                </p>
              </div>

              <div className="text-right text-xs">
                <span className="text-slate-500 block">Đã có tài khoản?</span>
                <Link
                  href="/login"
                  className="font-bold text-teal-600 hover:text-teal-700 hover:underline transition-colors"
                >
                  Đăng nhập ngay →
                </Link>
              </div>
            </div>

            {/* Form */}
            <RegisterForm />
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            © 2026 EMC E-Commerce. Bảo lưu mọi quyền. Hệ thống bảo mật 256-bit SSL.
          </div>
        </div>
      </div>
    </div>
  );
}
