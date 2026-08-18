interface StatItem {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface StatCardsProps {
  items: StatItem[];
}

export function StatCards({ items }: StatCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {items.map((item) => {
        const isPositive = item.changeType === 'positive';
        return (
          <div
            key={item.label}
            className="w-full bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between"
          >
            {/* Top Label */}
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              {item.label}
            </span>

            {/* Big Stat Value */}
            <div className="my-2">
              <span className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-none">
                {item.value}
              </span>
            </div>

            {/* Bottom Change Badge */}
            <div className="flex items-center gap-1.5 pt-1">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium leading-none ${
                  isPositive
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60'
                    : 'text-rose-700 bg-rose-50 border border-rose-200/60'
                }`}
              >
                {isPositive ? '↗' : '↘'} {item.change}
              </span>
              <span className="text-[11px] text-slate-400">vs. last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export type { StatItem };
