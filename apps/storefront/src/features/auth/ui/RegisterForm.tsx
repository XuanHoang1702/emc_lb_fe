'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building2,
  UserCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { registerSchema, type RegisterFormData } from '../model/registerSchema';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { SocialAuthButtons } from './SocialAuthButtons';
import { RegistrationSuccessModal } from './RegistrationSuccessModal';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegisterFormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'personal',
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      newsletter: true,
    },
  });

  const watchPassword = watch('password');
  const watchAccountType = watch('accountType');

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate API registration delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Account Type Toggle Pills */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Loại tài khoản
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/70">
            <button
              type="button"
              onClick={() => setValue('accountType', 'personal')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                watchAccountType === 'personal'
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Cá nhân
            </button>
            <button
              type="button"
              onClick={() => setValue('accountType', 'business')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                watchAccountType === 'business'
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Doanh nghiệp
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              {...register('fullName')}
              type="text"
              placeholder="Nguyễn Văn A"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-900 text-sm rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all ${
                errors.fullName
                  ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                  : 'border-slate-200 focus:border-teal-500'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-900 text-sm rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all ${
                  errors.email
                    ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                {...register('phone')}
                type="tel"
                placeholder="0912345678"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-900 text-sm rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all ${
                  errors.phone
                    ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                    : 'border-slate-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border text-slate-900 text-sm rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all ${
                errors.password
                  ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                  : 'border-slate-200 focus:border-teal-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.password.message}
            </p>
          )}

          {/* Password Strength Visualizer */}
          <PasswordStrengthMeter password={watchPassword} />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border text-slate-900 text-sm rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition-all ${
                errors.confirmPassword
                  ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                  : 'border-slate-200 focus:border-teal-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-2.5 pt-1">
          {/* Agree Terms */}
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register('agreeTerms')}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20 accent-teal-600 cursor-pointer"
            />
            <span>
              Tôi đồng ý với{' '}
              <a href="#" className="text-teal-600 hover:underline font-semibold">
                Điều khoản dịch vụ
              </a>{' '}
              &{' '}
              <a href="#" className="text-teal-600 hover:underline font-semibold">
                Chính sách bảo mật
              </a>{' '}
              của EMC E-Commerce.
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.agreeTerms.message}
            </p>
          )}

          {/* Newsletter */}
          <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register('newsletter')}
              className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20 accent-teal-600 cursor-pointer"
            />
            <span>Nhận thông tin ưu đãi độc quyền & tin tức qua Email / SMS</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:via-emerald-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/35 transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide active:scale-98 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Đang tạo tài khoản...
            </>
          ) : (
            <>
              Tạo Tài Khoản Ngay <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Social Buttons */}
        <SocialAuthButtons />
      </form>

      {/* Success Modal */}
      {submittedData && (
        <RegistrationSuccessModal formData={submittedData} onClose={() => setSubmittedData(null)} />
      )}
    </>
  );
}
