"use client";

type InsightItem = {
  title: string;
  percentage: number;
  change: number;
  details: string[];
};

type FindingsInsightsProps = {
  title: string;
  insights: InsightItem[];
};

export function FindingsInsights({ title, insights }: FindingsInsightsProps) {
  return (
    <div className="rounded-xl bg-white p-6">
      <h3 className="mb-6 text-base font-semibold text-neutral-900">{title}</h3>

      <div className="grid grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-lg border border-neutral-200 p-4"
          >
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-neutral-600"
                >
                  <path
                    d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-neutral-900">
                  {insight.title}
                </h4>
                <span
                  className={`text-sm font-medium ${
                    insight.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {insight.change >= 0 ? "↑" : "↓"} {Math.abs(insight.change)}%
                </span>
              </div>

              <ul className="space-y-1">
                {insight.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

