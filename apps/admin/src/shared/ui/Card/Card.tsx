import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`w-full bg-white rounded-xl border border-slate-200/90 shadow-xs transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between px-5 pt-5 pb-2">
      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 tracking-tight">{title}</h3>
        {subtitle ? <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
