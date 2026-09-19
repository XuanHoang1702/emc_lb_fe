'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { calculatePasswordStrength, PASSWORD_REQUIREMENTS } from '../model/registerSchema';

interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = '' }: PasswordStrengthMeterProps) {
  const strength = calculatePasswordStrength(password);

  if (!password) {
    return (
      <div className="mt-2 text-xs text-slate-500">
        Mật khẩu phải chứa ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 backdrop-blur-xs">
      <div className="flex justify-between items-center text-xs font-medium">
        <span className="text-slate-600">Độ mạnh mật khẩu:</span>
        <span
          className={`font-semibold ${
            strength.score >= 3
              ? 'text-emerald-600'
              : strength.score === 2
                ? 'text-amber-600'
                : 'text-red-500'
          }`}
        >
          {strength.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden flex gap-1 p-0.5">
        {[1, 2, 3, 4].map((step) => {
          const isFilled = strength.score >= step;
          let stepBg = 'bg-slate-200';
          if (isFilled) {
            if (strength.score <= 1) stepBg = 'bg-red-500';
            else if (strength.score === 2) stepBg = 'bg-amber-500';
            else if (strength.score === 3) stepBg = 'bg-blue-500';
            else stepBg = 'bg-emerald-500';
          }
          return (
            <div
              key={step}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${stepBg}`}
            />
          );
        })}
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {PASSWORD_REQUIREMENTS.map((req) => {
          const isMet = req.test(password);
          return (
            <div
              key={req.id}
              className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                isMet ? 'text-emerald-700 font-medium' : 'text-slate-500'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                  isMet ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isMet ? (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                ) : (
                  <X className="w-2.5 h-2.5" />
                )}
              </div>
              <span>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
