'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Mail, Sparkles, RefreshCw } from 'lucide-react';
import type { RegisterFormData } from '../model/registerSchema';

interface RegistrationSuccessModalProps {
  formData: RegisterFormData;
  onClose: () => void;
}

export function RegistrationSuccessModal({ formData, onClose }: RegistrationSuccessModalProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendNotice, setResendNotice] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all duration-300 scale-100">
        {/* Top Decorative Teal Gradient Banner */}
        <div className="h-28 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 relative overflow-hidden flex items-center justify-center">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-300/20 rounded-full blur-xl" />

          <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-emerald-600 z-10 border border-white">
            {isVerified ? (
              <Sparkles className="w-9 h-9 animate-bounce text-amber-500" />
            ) : (
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 text-center space-y-6">
          {!isVerified ? (
            <>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Tạo tài khoản thành công
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Chào mừng, {formData.fullName}!
                </h3>
                <p className="text-sm text-slate-600 mt-1.5">
                  Mã xác thực OTP gồm 6 chữ số đã được gửi đến email:
                </p>
                <p className="text-sm font-semibold text-teal-700 mt-0.5 flex items-center justify-center gap-1.5">
                  <Mail className="w-4 h-4" /> {formData.email}
                </p>
              </div>

              {/* OTP Input Form */}
              <form onSubmit={handleVerify} className="space-y-5">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-11 h-12 text-center text-xl font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="•"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                  <span>Chưa nhận được mã?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setResendNotice(true);
                      setTimeout(() => setResendNotice(false), 3000);
                    }}
                    className="text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Gửi lại mã
                  </button>
                </div>

                {resendNotice && (
                  <p className="text-xs text-emerald-600 font-semibold animate-fade-in text-center">
                    ✓ Mã OTP mới đã được gửi thành công đến email của bạn!
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isVerifying || otp.some((d) => !d)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Đang xác thực...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Xác nhận OTP & Kích hoạt <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Verified Success State */
            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Tài Khoản Đã Được Kích Hoạt! 🎉
                </h3>
                <p className="text-sm text-slate-600">
                  Chúc mừng bạn đã trở thành thành viên chính thức của EMC E-Commerce. Nhận ngay
                  Voucher 500k trong ví quà tặng!
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Họ và tên:</span>
                  <span className="font-semibold text-slate-800">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-800">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-semibold text-slate-800">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Loại tài khoản:</span>
                  <span className="font-semibold text-teal-600 capitalize">
                    {formData.accountType === 'personal' ? 'Cá nhân' : 'Doanh nghiệp'}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-all cursor-pointer"
                >
                  Đóng
                </button>
                <Link
                  href="/"
                  className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                >
                  Khám phá ngay <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
