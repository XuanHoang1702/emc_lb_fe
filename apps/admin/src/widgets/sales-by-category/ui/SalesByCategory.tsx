import { Card, CardHeader } from '@/shared/ui';

interface ModeData {
  name: string;
  value: number;
  color: string;
}

interface SalesByCategoryProps {
  data: ModeData[];
  total: number;
}

export function SalesByCategory({ data, total }: SalesByCategoryProps) {
  const size = 170;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativeLength = 0;

  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader
        title="Sales by transport mode"
        subtitle="Ticket share this month"
      />

      <div className="w-full px-5 pb-4 pt-1 flex-1 flex flex-col items-center justify-between">
        {/* Donut Chart Container */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 my-auto flex items-center justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full transform -rotate-90"
          >
            {/* Background Ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {data.map((segment) => {
              const segLength = (segment.value / total) * circumference;
              const offset = cumulativeLength;
              cumulativeLength += segLength;

              return (
                <circle
                  key={segment.name}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${segLength} ${circumference - segLength}`}
                  strokeDashoffset={-offset}
                  className="transition-all duration-700 ease-out hover:opacity-90"
                />
              );
            })}
          </svg>

          {/* Centered Total Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              {total.toLocaleString()}
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              Tickets
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full flex items-center justify-center gap-5 pt-3 border-t border-slate-100/80">
          {data.map((segment) => (
            <div key={segment.name} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-[11px] font-medium text-slate-600">
                {segment.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export type { ModeData };
