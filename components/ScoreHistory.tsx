"use client";

type ScoreMetric = {
  value: string;
  change: number;
  period: string;
};

type ScoreHistoryProps = {
  title: string;
  metrics: ScoreMetric[];
};

export function ScoreHistory({ title, metrics }: ScoreHistoryProps) {
  const chartData = [
    { x: 0, y: 50.84 },
    { x: 1, y: 50.84 },
    { x: 2, y: 50.84 },
    { x: 3, y: 52.0 },
    { x: 4, y: 52.5 },
    { x: 5, y: 52.5 },
    { x: 6, y: 52.5 },
    { x: 7, y: 52.5 },
    { x: 8, y: 51.5 },
    { x: 9, y: 50.0 },
    { x: 10, y: 51.0 },
    { x: 11, y: 50.84 },
    { x: 12, y: 50.84 },
  ];

  const xLabels = ["Sep 31", "Oct 20", "Oct 30", "Nov 10", "Nov 30"];

  const maxY = 55;
  const minY = 48;
  const height = 200;
  const width = 660;
  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;

  const points = chartData.map((point, i) => {
    const x = padding.left + (i / (chartData.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((point.y - minY) / (maxY - minY)) * chartHeight;
    return { x, y };
  });

  const pathD = points.reduce((path, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`;
  }, "");

  return (
    <div className="rounded-xl bg-white p-6">
      <h3 className="mb-6 text-base font-semibold text-neutral-900">{title}</h3>

      {/* Timeline Chart */}
      <div className="mb-8">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ maxWidth: "100%" }}
        >
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => {
            const y = padding.top + (chartHeight / 4) * i;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e5e5e5"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* X-axis labels */}
          {xLabels.map((label, i) => {
            const x = padding.left + (i / (xLabels.length - 1)) * chartWidth;
            return (
              <text
                key={i}
                x={x}
                y={height - padding.bottom + 25}
                textAnchor="middle"
                className="fill-neutral-500 text-xs"
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
        </svg>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="rounded-lg border border-neutral-200 p-4">
            <div className="mb-1 text-2xl font-bold text-neutral-900">{metric.value}</div>
            <div
              className={`mb-2 text-sm font-medium ${
                metric.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {metric.change >= 0 ? "↑" : "↓"} {Math.abs(metric.change)}%
            </div>
            <div className="text-xs text-neutral-500">{metric.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

