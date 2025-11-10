"use client";

type BarChartData = {
  label: string;
  observed: number;
  given: number;
  combined: number;
};

type RadarChartData = {
  label: string;
  value: number;
};

type MetricsChartsProps = {
  barData: BarChartData[];
  radarData: RadarChartData[];
};

export function MetricsCharts({ barData, radarData }: MetricsChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-neutral-900" />
            <span className="text-neutral-600">Observed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-neutral-400" />
            <span className="text-neutral-600">Given</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-neutral-300" />
            <span className="text-neutral-600">Combined</span>
          </div>
        </div>

        <div className="relative h-64">
          <svg viewBox="0 0 400 240" className="h-full w-full">
            {/* Y-axis grid lines */}
            {[0, 20, 40, 60, 80].map((value) => {
              const y = 220 - (value / 80) * 200;
              return (
                <g key={value}>
                  <line
                    x1={40}
                    y1={y}
                    x2={380}
                    y2={y}
                    stroke="#e5e5e5"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={30}
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

            {/* Bars */}
            {barData.map((item, i) => {
              const x = 60 + i * 80;
              const barWidth = 15;
              const spacing = 2;

              return (
                <g key={i}>
                  {/* Observed bar */}
                  <rect
                    x={x}
                    y={220 - (item.observed / 80) * 200}
                    width={barWidth}
                    height={(item.observed / 80) * 200}
                    fill="#171717"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={215 - (item.observed / 80) * 200}
                    textAnchor="middle"
                    className="fill-neutral-900 text-xs font-medium"
                  >
                    {item.observed}
                  </text>

                  {/* Given bar */}
                  <rect
                    x={x + barWidth + spacing}
                    y={220 - (item.given / 80) * 200}
                    width={barWidth}
                    height={(item.given / 80) * 200}
                    fill="#a3a3a3"
                  />
                  <text
                    x={x + barWidth + spacing + barWidth / 2}
                    y={215 - (item.given / 80) * 200}
                    textAnchor="middle"
                    className="fill-neutral-900 text-xs font-medium"
                  >
                    {item.given}
                  </text>

                  {/* Combined bar */}
                  <rect
                    x={x + (barWidth + spacing) * 2}
                    y={220 - (item.combined / 80) * 200}
                    width={barWidth}
                    height={(item.combined / 80) * 200}
                    fill="#d4d4d4"
                  />
                  <text
                    x={x + (barWidth + spacing) * 2 + barWidth / 2}
                    y={215 - (item.combined / 80) * 200}
                    textAnchor="middle"
                    className="fill-neutral-900 text-xs font-medium"
                  >
                    {item.combined}
                  </text>

                  {/* Label */}
                  <text
                    x={x + barWidth * 1.5 + spacing}
                    y={235}
                    textAnchor="middle"
                    className="fill-neutral-600 text-[10px]"
                  >
                    {item.label.split(" ")[0]}
                  </text>
                  <text
                    x={x + barWidth * 1.5 + spacing}
                    y={245}
                    textAnchor="middle"
                    className="fill-neutral-600 text-[10px]"
                  >
                    {item.label.split(" ")[1]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="rounded-xl bg-white p-6">
        <div className="relative flex h-64 items-center justify-center">
          <svg viewBox="0 0 300 300" className="h-full w-full">
            {/* Background circles */}
            {[20, 40, 60, 80].map((value) => (
              <circle
                key={value}
                cx="150"
                cy="150"
                r={value}
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Axes */}
            {radarData.map((_, i) => {
              const angle = (i * 2 * Math.PI) / radarData.length - Math.PI / 2;
              const x = 150 + Math.cos(angle) * 80;
              const y = 150 + Math.sin(angle) * 80;
              return (
                <line
                  key={i}
                  x1="150"
                  y1="150"
                  x2={x}
                  y2={y}
                  stroke="#e5e5e5"
                  strokeWidth="1"
                />
              );
            })}

            {/* Data polygon */}
            <polygon
              points={radarData
                .map((item, i) => {
                  const angle = (i * 2 * Math.PI) / radarData.length - Math.PI / 2;
                  const radius = (item.value / 100) * 80;
                  const x = 150 + Math.cos(angle) * radius;
                  const y = 150 + Math.sin(angle) * radius;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="rgba(0,0,0,0.1)"
              stroke="#000"
              strokeWidth="2"
            />

            {/* Labels */}
            {radarData.map((item, i) => {
              const angle = (i * 2 * Math.PI) / radarData.length - Math.PI / 2;
              const x = 150 + Math.cos(angle) * 100;
              const y = 150 + Math.sin(angle) * 100;
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="fill-neutral-600 text-[10px]"
                >
                  {item.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

