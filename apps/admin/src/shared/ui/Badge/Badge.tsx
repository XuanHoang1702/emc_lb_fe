type BadgeVariant = 'confirmed' | 'pending' | 'cancelled';

interface BadgeProps {
  variant: BadgeVariant;
  children: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200/60',
  cancelled: 'bg-rose-50 text-rose-700 border border-rose-200/60',
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
