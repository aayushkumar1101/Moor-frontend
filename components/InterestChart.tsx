"use client";

type DataPoint = {
  x: number;
  y: number;
  label?: string;
};

type InterestChartProps = {
  title: string;
  data: DataPoint[];
  xLabels: string[];
};

export function InterestChart({ title, data, xLabels }: InterestChartProps) {
  const maxY = 100;
  const height = 300;
  const width = 600;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;

  // Calculate points for the line
  const points = data.map((point, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (point.y / maxY) * chartHeight;
    return { x, y };
  });

  const pathD = points.reduce((path, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`;
  }, "");

  return (
    <div className="rounded-xl bg-white p-6">
      <h3 className="mb-6 text-base font-semibold text-neutral-900">{title}</h3>
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ maxWidth: "100%" }}
        >
          {/* Grid lines */}
          {[0, 20, 40, 60, 80].map((value) => {
            const y = padding.top + chartHeight - (value / maxY) * chartHeight;
            return (
              <g key={value}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#e5e5e5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="fill-neutral-500 text-xs"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {xLabels.map((label, i) => {
            const x = padding.left + (i / (xLabels.length - 1)) * chartWidth;
            return (
              <text
                key={i}
                x={x}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                className="fill-neutral-600 text-xs"
              >
                {label}
              </text>
            );
          })}

          {/* Line path */}
          <path
            d={pathD}
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#000"
              className="cursor-pointer transition-all hover:r-6"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

