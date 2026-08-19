import { Card, CardHeader } from '@/shared/ui';

interface DataPoint {
  label: string;
  values: number[]; // [buses, flights, trains]
}

interface RevenueChartProps {
  data: DataPoint[];
  series: { name: string; color: string; fillColor: string }[];
}

function buildSmoothPath(
  points: { x: number; y: number }[],
  bottomY: number,
): { linePath: string; areaPath: string } {
  if (points.length === 0) return { linePath: '', areaPath: '' };

  const first = points[0];
  if (!first) return { linePath: '', areaPath: '' };

  let linePath = `M ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    if (!prev || !curr) continue;
    const cpx1 = prev.x + (curr.x - prev.x) / 2;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (curr.x - prev.x) / 2;
    const cpy2 = curr.y;
    linePath += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`;
  }

  const last = points[points.length - 1];
  if (!last) return { linePath: '', areaPath: '' };
  const areaPath = `${linePath} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;

  return { linePath, areaPath };
}

export function RevenueChart({ data, series }: RevenueChartProps) {
  const width = 760;
  const height = 260;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const bottomY = height - paddingBottom;

  const yMax = 150000;
  const yLabels = [
    { value: 140000, label: '$140k' },
    { value: 100000, label: '$100k' },
    { value: 50000, label: '$50k' },
    { value: 10000, label: '$10k' },
    { value: 0, label: '$0k' },
  ];

  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader
        title="Revenue by transport mode"
        subtitle="Monthly ticket revenue, last 8 months"
      />

      <div className="w-full px-4 sm:px-5 pb-4 pt-1 flex-1 flex flex-col justify-between">
        <div className="w-full overflow-hidden flex-1 flex items-center">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full block max-h-[260px]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="rev-grad-flights" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="rev-grad-trains" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="rev-grad-buses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines and Y-axis labels */}
            {yLabels.map((item) => {
              const y = bottomY - (item.value / yMax) * chartHeight;
              return (
                <g key={item.label}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#e8ecf2"
                    strokeWidth="1"
                    strokeDasharray={item.value === 0 ? '0' : '3 3'}
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
                    {item.label}
                  </text>
                </g>
              );
            })}

            {/* X-axis labels */}
            {data.map((d, i) => {
              const x = paddingLeft + (i * chartWidth) / (data.length - 1);
              return (
                <text
                  key={d.label}
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                  fontFamily="Inter, sans-serif"
                >
                  {d.label}
                </text>
              );
            })}

            {/* Series curves (Rendered back to front) */}
            {series.map((s, seriesIdx) => {
              const points = data.map((d, i) => {
                const val = d.values[seriesIdx] ?? 0;
                const x = paddingLeft + (i * chartWidth) / (data.length - 1);
                const y = bottomY - (val / yMax) * chartHeight;
                return { x, y };
              });

              const { linePath, areaPath } = buildSmoothPath(points, bottomY);

              return (
                <g key={s.name}>
                  <path d={areaPath} fill={s.fillColor} />
                  <path
                    d={linePath}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100/80">
          {series.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-[11px] font-medium text-slate-600">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
