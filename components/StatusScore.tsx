"use client";

type StatusScoreProps = {
  score: number;
  status: "High Risk" | "Moderate" | "Good";
  description: string;
};

export function StatusScore({ score, status, description }: StatusScoreProps) {
  const getStatusColor = () => {
    if (score < 50) return "text-red-600";
    if (score < 90) return "text-yellow-600";
    return "text-green-600";
  };

  const getStrokeColor = () => {
    if (score < 50) return "#dc2626";
    if (score < 90) return "#ca8a04";
    return "#16a34a";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-start gap-6">
      {/* Circular Chart */}
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="#e5e5e5"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={getStrokeColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-neutral-900">{score}</span>
        </div>
      </div>

      {/* Status Info */}
      <div className="flex-1">
        <h2 className="mb-2 text-lg font-semibold text-neutral-900">
          Status: <span className={getStatusColor()}>{status}</span>
        </h2>
        <p className="mb-3 text-sm text-neutral-600">{description}</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-neutral-900" />
            <span className="text-neutral-600">0 - 49 (Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-neutral-400" />
            <span className="text-neutral-600">50 - 89 (Moderate)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-neutral-300" />
            <span className="text-neutral-600">90 - 100 (Good)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

