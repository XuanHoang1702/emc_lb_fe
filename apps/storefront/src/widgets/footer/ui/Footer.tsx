'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Send, Phone, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="w-full bg-slate-950 text-white relative overflow-hidden pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Newsletter Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 mb-16 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-slate-300" /> Nhận Voucher 500.000đ
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Đăng Ký Nhận Tin Ưu Đãi Độc Quyền
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Nhận thông báo mã giảm giá hot, sự kiện Flash Sale và bộ sưu tập mới nhất hàng tuần.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Đã đăng ký thành công! Voucher đã gửi tới
                email.
              </div>
            ) : (
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ Email của bạn..."
                  className="w-full pl-11 pr-28 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-slate-600 outline-none transition-all"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  Đăng Ký <Send className="w-3 h-3" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 2. Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-xs">
          {/* Col 1: Brand Info (2 cols wide on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                EMC <span className="text-teal-400">Store</span>
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed pr-4">
              EMC E-Commerce là hệ thống bán lẻ các sản phẩm thiết bị công nghệ, điện thoại, laptop
              và phụ kiện cao cấp hàng đầu Việt Nam. Cam kết 100% hàng chính hãng và dịch vụ hậu mãi
              xuất sắc.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Tòa nhà EMC Tower, Số 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  Hotline: <strong className="text-white">1900 8888</strong> (8h00 - 21h30 Hằng
                  ngày)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Email hỗ trợ: support@emc.example.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: About EMC */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Về EMC Store
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Giới thiệu công ty
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Hệ thống 50+ cửa hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Tuyển dụng nhân tài
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Tin tức công nghệ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Liên hệ hợp tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Hướng dẫn đặt hàng online
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Chính sách bảo hành 24T
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Chính sách đổi trả 30 ngày
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Phương thức thanh toán
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-300 transition-colors">
                  Tra cứu hóa đơn điện tử
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Payments & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Thanh Toán & Bảo Mật
            </h4>
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg font-bold">
                Visa
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg font-bold">
                Mastercard
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg font-bold">
                MoMo
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg font-bold">
                VNPay
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg font-bold">
                ZaloPay
              </span>
            </div>

            <div className="pt-3 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Chứng nhận an toàn:
              </span>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" /> Đã đăng ký Bộ Công Thương
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>
            © 2026 EMC E-Commerce System. Tất cả quyền được bảo lưu. Phát triển trên nền tảng
            Next.js & FSD Architecture.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
