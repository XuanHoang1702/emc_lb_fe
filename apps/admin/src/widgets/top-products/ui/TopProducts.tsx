import { Card, CardHeader } from '@/shared/ui';

interface RouteItem {
  id: string;
  from: string;
  to: string;
  tickets: number;
}

interface TopProductsProps {
  items: RouteItem[];
}

export function TopProducts({ items }: TopProductsProps) {
  const maxTickets = Math.max(...items.map((i) => i.tickets));

  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader title="Popular routes" subtitle="Top sellers this month" />

      <div className="w-full px-5 pb-5 pt-2 flex-1 flex flex-col justify-between gap-3.5">
        {items.map((item) => {
          const widthPercent = (item.tickets / maxTickets) * 100;
          return (
            <div key={item.id} className="w-full flex flex-col gap-1.5">
              {/* Route Label & Ticket Count */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <span className="text-slate-400 text-xs font-normal">→</span>
                  <span>
                    {item.from} → {item.to}
                  </span>
                </div>
                <span className="font-semibold text-slate-700 tabular-nums text-[11px]">
                  {item.tickets.toLocaleString()}{' '}
                  <span className="font-normal text-slate-400">tickets</span>
                </span>
              </div>

              {/* Solid Blue Progress Line Bar */}
              <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export type { RouteItem };
