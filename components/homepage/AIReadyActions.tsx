"use client";

import Image from "next/image";
import { useState } from "react";

export function AIReadyActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const actionFeatures = [
    {
      title: "Comprehensive Metrics",
      description:
        "Forget manual checks or outdated audits. Simply enter your URL for instant, accurate scores on API presence, auth maturity, infrastructure scalability, and integration readiness—guiding your path to AI optimization.",
    },
    {
      title: "Endpoint AI Readiness",
      description:
        "See which endpoints are primed for AI agents, identify security vulnerabilities or auth weaknesses, and discover where enhancements can enable seamless AI connections and automation.",
    },
    {
      title: "Historical AI Analysis",
      description:
        "Track your tech stack’s AI evolution over time, uncovering trends and patterns to make informed decisions that accelerate your transition to a full AI enterprise.",
    },
    {
      title: "Instant AI Roadmaps",
      description:
        "Complex tech data transformed into concise, readable summaries and personalized recommendations you can act on at a glance—empowering your team to build an AI-ready stack.",
    },
    {
      title: "Capability Inference",
      description:
        "Based on your detected tech (e.g., Shopify, Next.js), we infer API capabilities, auth modes, and ecosystem maturity to provide tailored insights for AI adoption.",
    },
  ];

  const description =
    "Unlock your tech stack’s full AI potential—instantly. Assess APIs, infrastructure, and integrations to spot gaps, act on actionable recommendations, and pave the way for your company to become a fully AI-powered enterprise—without complex audits or guesswork.";
  const summary = "Unlock your tech stack’s full AI potential with instant, actionable recommendations.";

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-6 shadow-sm">
      <div className="mx-auto w-full max-w-8xl px-4 md:px-16 md:py-8">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">AI ready actions</h2>
          <p className="text-sm leading-relaxed text-gray-600 md:hidden">{isExpanded ? description : summary}</p>
          <p className="hidden text-base leading-relaxed text-gray-600 md:block">{description}</p>
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out md:mt-12 md:max-h-none md:overflow-visible ${
            isExpanded ? "mt-6 max-h-[4000px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="space-y-8 lg:w-1/2">
              {actionFeatures.map((feature) => (
                <div key={feature.title} className="space-y-2">
                  <h4 className="text-lg font-semibold text-[#1A1A1A]">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:w-1/2 lg:justify-end">
              <div className="relative w-full max-w-md">
                <Image
                  src="/assets/Group 1000016181.png"
                  alt="AI readiness dashboards"
                  width={640}
                  height={820}
                  className="h-auto w-full rounded-2xl object-cover shadow-lg"
                  priority
                />
              </div>
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

