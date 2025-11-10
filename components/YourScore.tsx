"use client";

type YourScoreProps = {
  score: number;
  description: string;
};

export function YourScore({ score, description }: YourScoreProps) {
  return (
    <div className="rounded-xl bg-white p-6">
      <h3 className="mb-1 text-sm font-medium text-neutral-700">Your Score:</h3>
      <div className="mb-3 text-5xl font-bold text-neutral-900">{score}</div>
      <p className="mb-2 text-sm text-neutral-600">{description}</p>
      <button className="text-sm font-medium text-neutral-900 underline hover:text-neutral-700">
        Learn More.
      </button>
    </div>
  );
}

