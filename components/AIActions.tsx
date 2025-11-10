import Image from "next/image";

export type AIActionsProps = {
  title: string;
  description: string;
  actions: {
    icon: string;
    title: string;
    description: string;
  }[];
  charts: {
    interestOverTime: string;
    peakUsageHeatmap: string;
    remixPageRank: {
      score: number;
      label: string;
    };
  };
};

const iconMap: Record<string, string> = {
  chart: "📊",
  endpoint: "🔌",
  history: "📈",
  roadmap: "🗺️",
  capability: "💡",
};

export function AIActions({ title, description, actions, charts }: AIActionsProps) {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="mb-4 text-4xl font-bold text-neutral-900 md:text-5xl">
            {title}
          </h2>
          <p className="max-w-4xl text-base leading-relaxed text-neutral-600">
            {description}
          </p>
        </div>

        {/* Actions Grid and Charts */}
        <div className="grid gap-12 lg:grid-cols-[1fr,400px]">
          {/* Actions List */}
          <div className="space-y-8">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-2xl">
                  {iconMap[action.icon] || "⚙️"}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                    {action.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Sidebar */}
          <div className="space-y-6">
            {/* Interest Over Time Chart */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-sm font-semibold text-neutral-900">
                Interest over time
              </h4>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-50">
                <Image
                  src={charts.interestOverTime}
                  alt="Interest over time chart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Peak Usage Heatmap */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-sm font-semibold text-neutral-900">
                Peak usage heatmap
              </h4>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-50">
                <Image
                  src={charts.peakUsageHeatmap}
                  alt="Peak usage heatmap"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Remix Page Rank */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
              <div className="mb-4 flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full -rotate-90 transform">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e5e5"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#ef4444"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(charts.remixPageRank.score / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-neutral-900">
                      {charts.remixPageRank.score}
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-neutral-900">
                {charts.remixPageRank.label}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

