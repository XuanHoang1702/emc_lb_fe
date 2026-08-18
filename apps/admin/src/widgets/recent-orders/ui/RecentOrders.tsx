import { Card, CardHeader, Badge } from '@/shared/ui';

interface BookingRow {
  id: string;
  customer: string;
  route: string;
  mode: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: string;
}

interface RecentOrdersProps {
  orders: BookingRow[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card className="w-full">
      <CardHeader
        title="Recent bookings"
        subtitle="Latest ticket purchases across all modes"
        action={
          <button className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-lg transition-colors shadow-2xs">
            View all
          </button>
        }
      />

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/40">
              <th className="py-3 px-5">Ticket</th>
              <th className="py-3 px-5">Customer</th>
              <th className="py-3 px-5">Route</th>
              <th className="py-3 px-5">Mode</th>
              <th className="py-3 px-5">Date</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {orders.map((order) => {
              const initials = order.customer
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);

              return (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/70 transition-colors duration-150"
                >
                  {/* Ticket ID */}
                  <td className="py-3.5 px-5 font-mono text-[11px] text-slate-500 font-medium">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-[10px] font-semibold text-slate-600 shrink-0">
                        {initials}
                      </div>
                      <span className="font-medium text-slate-900 truncate">
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="py-3.5 px-5 text-slate-600 font-medium">
                    {order.route}
                  </td>

                  {/* Mode */}
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
                      {order.mode}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-5 text-slate-500 text-[11px] tabular-nums">
                    {order.date}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-5">
                    <Badge variant={order.status}>
                      {order.status === 'cancelled' ? 'refunded' : order.status}
                    </Badge>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-5 text-right font-bold text-slate-900 tabular-nums">
                    {order.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export type { BookingRow };
