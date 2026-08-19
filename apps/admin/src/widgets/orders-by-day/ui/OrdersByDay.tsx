import { Card, CardHeader } from '@/shared/ui';

interface DayData {
  day: string;
  orders: number;
}

interface OrdersByDayProps {
  data: DayData[];
}

export function OrdersByDay({ data }: OrdersByDayProps) {
  const yMax = 3000;
  const width = 760;
  const height = 260;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const bottomY = height - paddingBottom;

  const yTicks = [
    { value: 2500, label: '2500' },
    { value: 2000, label: '2000' },
    { value: 1500, label: '1500' },
    { value: 1000, label: '1000' },
    { value: 500, label: '500' },
    { value: 0, label: '0' },
  ];

  const totalBars = data.length;
  const barGapRatio = 0.4;
  const barWidth = chartWidth / (totalBars + (totalBars - 1) * barGapRatio);
  const barGap = barWidth * barGapRatio;

  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader title="Tickets sold by weekday" subtitle="Current week performance" />

      <div className="w-full px-4 sm:px-5 pb-4 pt-1 flex-1 flex flex-col justify-between">
        <div className="w-full overflow-hidden flex-1 flex items-center">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full block max-h-[260px]"
            preserveAspectRatio="none"
          >
            {/* Grid lines and Y-axis labels */}
            {yTicks.map((tick) => {
              const y = bottomY - (tick.value / yMax) * chartHeight;
              return (
                <g key={tick.label}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#e8ecf2"
                    strokeWidth="1"
                    strokeDasharray={tick.value === 0 ? '0' : '3 3'}
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 3.5}
                    textAnchor="end"
                    fill="#94a3b8"
                    fontSize="10"
                    fontWeight="500"
                    fontFamily="Inter, sans-serif"
                  >
                    {tick.label}
                  </text>
                </g>
              );
            })}

            {/* Bars */}
            {data.map((d, i) => {
              const barH = (d.orders / yMax) * chartHeight;
              const x = paddingLeft + i * (barWidth + barGap);
              const y = bottomY - barH;

              return (
                <g key={d.day}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barH}
                    rx={4}
                    fill="#0284c7"
                    className="hover:fill-blue-600 transition-colors duration-200 cursor-pointer"
                  />

                  {/* Day label */}
                  <text
                    x={x + barWidth / 2}
                    y={height - 10}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="11"
                    fontWeight="500"
                    fontFamily="Inter, sans-serif"
                  >
                    {d.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </Card>
  );
}

export type { DayData };
