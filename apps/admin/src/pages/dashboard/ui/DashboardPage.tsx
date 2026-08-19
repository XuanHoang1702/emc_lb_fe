import { StatCards, type StatItem } from '@/widgets/stat-cards';
import { RevenueChart } from '@/widgets/revenue-chart';
import { TopProducts } from '@/widgets/top-products';
import { OrdersByDay } from '@/widgets/orders-by-day';
import { SalesByCategory } from '@/widgets/sales-by-category';
import { RecentOrders } from '@/widgets/recent-orders';

// ─── Data from Reference Screenshot ─────────────────────────

const statItems: StatItem[] = [
  {
    label: 'TOTAL REVENUE',
    value: '$284,320',
    change: '+12.4%',
    changeType: 'positive',
  },
  {
    label: 'TICKETS SOLD',
    value: '18,492',
    change: '+8.1%',
    changeType: 'positive',
  },
  {
    label: 'ACTIVE BOOKINGS',
    value: '2,340',
    change: '-2.3%',
    changeType: 'negative',
  },
  {
    label: 'AVG. TICKET PRICE',
    value: '$153.75',
    change: '+4.6%',
    changeType: 'positive',
  },
];

const revenueData = {
  data: [
    { label: 'Sep', values: [24000, 95000, 52000] },
    { label: 'Oct', values: [28000, 102000, 58000] },
    { label: 'Nov', values: [31000, 118000, 62000] },
    { label: 'Dec', values: [35000, 125000, 68000] },
    { label: 'Jan', values: [29000, 108000, 59000] },
    { label: 'Feb', values: [33000, 114000, 63000] },
    { label: 'Mar', values: [38000, 128000, 71000] },
    { label: 'Apr', values: [42000, 136000, 78000] },
  ],
  series: [
    {
      name: 'Buses',
      color: '#f59e0b',
      fillColor: 'url(#rev-grad-buses)',
    },
    {
      name: 'Flights',
      color: '#2563eb',
      fillColor: 'url(#rev-grad-flights)',
    },
    {
      name: 'Trains',
      color: '#06b6d4',
      fillColor: 'url(#rev-grad-trains)',
    },
  ],
};

const popularRoutes = [
  { id: '1', from: 'New York', to: 'London', tickets: 2184 },
  { id: '2', from: 'Paris', to: 'Amsterdam', tickets: 1862 },
  { id: '3', from: 'Los Angeles', to: 'Tokyo', tickets: 945 },
  { id: '4', from: 'Berlin', to: 'Prague', tickets: 822 },
  { id: '5', from: 'Madrid', to: 'Barcelona', tickets: 764 },
  { id: '6', from: 'Chicago', to: 'Miami', tickets: 598 },
];

const weekdayOrders = [
  { day: 'Mon', orders: 1100 },
  { day: 'Tue', orders: 1020 },
  { day: 'Wed', orders: 1280 },
  { day: 'Thu', orders: 1450 },
  { day: 'Fri', orders: 2350 },
  { day: 'Sat', orders: 1420 },
  { day: 'Sun', orders: 880 },
];

const salesByMode = {
  data: [
    { name: 'Buses', value: 4120, color: '#f59e0b' },
    { name: 'Flights', value: 10872, color: '#0284c7' },
    { name: 'Trains', value: 3500, color: '#06b6d4' },
  ],
  total: 18492,
};

const recentBookings = [
  {
    id: 'TX-38412',
    customer: 'Elena Fischer',
    route: 'New York → London',
    mode: 'Flight',
    date: 'Apr 8, 2026',
    status: 'confirmed' as const,
    amount: '$480.00',
  },
  {
    id: 'TX-38411',
    customer: 'Marcus Chen',
    route: 'Paris → Amsterdam',
    mode: 'Train',
    date: 'Apr 8, 2026',
    status: 'confirmed' as const,
    amount: '$56.50',
  },
  {
    id: 'TX-38410',
    customer: 'Sofia Rossi',
    route: 'Berlin → Prague',
    mode: 'Bus',
    date: 'Apr 7, 2026',
    status: 'pending' as const,
    amount: '$32.00',
  },
  {
    id: 'TX-38409',
    customer: 'James Butler',
    route: 'Los Angeles → Tokyo',
    mode: 'Flight',
    date: 'Apr 7, 2026',
    status: 'confirmed' as const,
    amount: '$812.25',
  },
  {
    id: 'TX-38408',
    customer: 'Amelia Novak',
    route: 'Madrid → Barcelona',
    mode: 'Train',
    date: 'Apr 6, 2026',
    status: 'cancelled' as const,
    amount: '$62.75',
  },
  {
    id: 'TX-38407',
    customer: 'Daniel Kim',
    route: 'Chicago → Miami',
    mode: 'Flight',
    date: 'Apr 6, 2026',
    status: 'confirmed' as const,
    amount: '$274.00',
  },
  {
    id: 'TX-38406',
    customer: 'Lucia Morales',
    route: 'Lisbon → Porto',
    mode: 'Train',
    date: 'Apr 5, 2026',
    status: 'pending' as const,
    amount: '$41.20',
  },
];

// ─── Dashboard Page Component ────────────────────────────────

export function DashboardPage() {
  return (
    <div className="w-full space-y-5">
      {/* Row 1: 4 Equal Metric Stat Cards (25% each on desktop) */}
      <StatCards items={statItems} />

      {/* Row 2: Revenue Chart (66.7%) + Popular Routes (33.3%) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col h-full">
          <RevenueChart data={revenueData.data} series={revenueData.series} />
        </div>
        <div className="lg:col-span-4 flex flex-col h-full">
          <TopProducts items={popularRoutes} />
        </div>
      </div>

      {/* Row 3: Tickets by Weekday (66.7%) + Sales by Mode (33.3%) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col h-full">
          <OrdersByDay data={weekdayOrders} />
        </div>
        <div className="lg:col-span-4 flex flex-col h-full">
          <SalesByCategory data={salesByMode.data} total={salesByMode.total} />
        </div>
      </div>

      {/* Row 4: Recent Bookings Table (100% Full Width) */}
      <div className="w-full">
        <RecentOrders orders={recentBookings} />
      </div>
    </div>
  );
}
