"use client";

import Image from "next/image";
import { useState } from "react";

export function WebsiteAIInsights() {
  const [isExpanded, setIsExpanded] = useState(false);
  const stats = [
    { value: "10+", label: "Integrations" },
    { value: "50k+", label: "Data Points Processed" },
    { value: "200+", label: "Beta Users" },
    { value: "<3s", label: "Response Time" },
  ];

  const highlights = [
    {
      title: "Ask in natural language.",
      description:
        "Forget complex dashboards or SQL queries. Simply type or speak your question, and get instant, accurate insights from your API data in plain English.",
    },
    {
      title: "Real-Time Metrics.",
      description:
        "Stay on top of your API performance with live monitoring. Track response times, error rates, and uptime as they happen.",
    },
    {
      title: "Actionable Answers.",
      description:
        "Stop sifting through endless logs. Receive concise summaries, visual breakdowns, and actionable recommendations you can trust.",
    },
  ];

  const description =
    "Assess, analyze, and optimize your tech stack for full AI readiness. No setup. No guesswork. Evaluate your APIs, infrastructure, and integrations to ensure your entire tech stack is structured, secure, and prepared for seamless AI adoption — transforming your company into a fully AI-powered enterprise.";
  const summary =
    "Assess, analyze, and optimize your tech stack for full AI readiness — all without the guesswork.";

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-6 shadow-sm">
      <div className="mx-auto w-full max-w-8xl px-4 md:px-16 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="text-3xl font-bold text-[#1A1A1A] md:max-w-sm">Website AI Insights</h2>
          <div className="md:max-w-2xl">
            <p className="text-sm leading-relaxed text-gray-600 md:hidden">{isExpanded ? description : summary}</p>
            <p className="hidden text-base leading-relaxed text-gray-600 md:block">{description}</p>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out md:mt-10 md:max-h-none md:overflow-visible ${
            isExpanded ? "mt-6 max-h-[4000px]" : "max-h-0"
          }`}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <h3 className="text-3xl font-semibold text-[#1A1A1A]">{item.value}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-10 grid items-start gap-12 lg:mt-16 lg:grid-cols-2">
            <div className="flex w-full justify-center lg:justify-start">
              <Image
                src="/assets/stack1.svg"
                alt="Website AI insights visualization"
                width={569}
                height={535}
                className="h-auto w-full max-w-[420px] lg:max-w-[480px]"
                priority
              />
            </div>

            <div className="relative flex flex-col gap-8">
              <span className="pointer-events-none absolute -left-5 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent lg:block" />
              <ol className="space-y-8">
                {highlights.map((item, index) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white shadow-sm shadow-black/10">
                        {index + 1}
                      </span>
                      {index < highlights.length - 1 && (
                        <span className="mt-2 h-16 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-80" />
                      )}
                    </div>
                    <div className="space-y-2 pt-1">
                      <h3 className="text-lg font-semibold text-[#1A1A1A]">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] underline underline-offset-4 md:hidden"
        >
          {isExpanded ? "Less" : "More"}
        </button>
      </div>
    </section>
  );
}

