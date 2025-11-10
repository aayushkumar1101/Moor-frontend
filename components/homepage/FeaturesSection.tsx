"use client";

import Image from "next/image";
import { useState } from "react";

export function FeaturesSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const stats = [
    { value: "10+", label: "Integrations" },
    { value: "50k+", label: "Data Points Processed" },
    { value: "200+", label: "Beta Users" },
    { value: "<3s", label: "Response Time" },
  ];

  const features = [
    {
      number: 1,
      title: "Ask in natural language.",
      description:
        "Forget complex dashboards or SQL queries. Simply type or speak your question, and get instant, accurate insights from your API data in plain English.",
    },
    {
      number: 2,
      title: "Real-Time Metrics",
      description:
        "Stay on top of your API performance with live monitoring. Track response times, error rates, and uptime as they happen.",
    },
    {
      number: 3,
      title: "Actionable Answers",
      description:
        "Stop sifting through endless logs. Receive concise summaries, visual breakdowns, and actionable recommendations you can trust.",
    },
  ];

  return (
    <section className={`relative bg-white transition-all ${isExpanded ? "py-12 sm:py-16 md:py-20" : "py-8 md:py-20"} -mt-32 sm:-mt-48 md:-mt-56 z-10`}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Mobile Header with Icon and Toggle */}
        <div className={`md:hidden ${isExpanded ? "mb-8" : "mb-0"}`}>
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#1a1a1a]">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] font-bold leading-tight text-[#1a1a1a] sm:text-[32px]">
                Website AI Insights
              </h2>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[#4c4c6d] sm:text-base">
            Assess, analyze, and optimize your tech stack for full AI readiness. No guesswork.
          </p>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#00a7e6] hover:text-[#0096d1]"
          >
            <span>{isExpanded ? "Less" : "More"}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            >
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Desktop: Left-Right Layout */}
        <div className="hidden md:grid md:grid-cols-[350px,1fr] md:gap-12 lg:grid-cols-[400px,1fr] lg:gap-16">
          {/* Left Column: Title */}
          <div className="flex items-start gap-3">
            <h2 className="text-[32px] font-bold leading-tight text-[#1a1a1a] lg:text-[40px]">
              Website AI Insights
            </h2>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-12 lg:space-y-16">
            {/* Header Description */}
            <div className="flex flex-col justify-center gap-6 text-base font-medium leading-[28px] text-[#4c4c6d]">
              <p>
                Assess, analyze, and optimize your tech stack for full AI readiness. No setup. No guesswork.
              </p>
              <p>
                Evaluate your APIs, infrastructure, and integrations to ensure your entire tech stack is structured, secure, and prepared for seamless AI adoption—transforming your company into a fully AI-powered enterprise.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#e9e9e9] bg-white p-6 lg:p-8"
                >
                  <div className="mb-1 text-[40px] font-bold leading-tight text-[#1a1a1a] lg:text-[48px]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-normal text-[#4c4c6d] lg:text-base">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Section - Image Left, Text Right */}
            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              {/* Left: Phone + Laptop Group Image */}
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/Group 1000016173.png"
                  alt="Mobile and laptop analytics dashboard"
                  width={350}
                  height={325}
                  className="h-auto w-full max-w-[350px] object-contain"
                />
              </div>

              {/* Right: Features Text */}
              <div className="flex flex-col justify-center space-y-10 lg:space-y-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4 lg:gap-6">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-semibold ${
                        index === 0
                          ? "bg-[#1a1a1a] text-white"
                          : "bg-[#f6f6f6] text-[#1a1a1a]"
                      }`}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {feature.number}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold leading-tight text-[#1a1a1a] lg:text-xl">
                        {feature.title}
                      </h3>
                      <p className="text-base font-normal leading-[28px] text-[#4c4c6d]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Expandable Content */}
        <div className={`md:hidden space-y-8 ${!isExpanded ? "hidden" : ""}`}>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#e9e9e9] bg-white p-4 sm:p-6"
              >
                <div className="mb-1 text-[32px] font-bold leading-tight text-[#1a1a1a] sm:text-[40px]">
                  {stat.value}
                </div>
                <div className="text-xs font-normal text-[#4c4c6d] sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mobile Extended Description */}
          <div className="space-y-4 text-sm leading-relaxed text-[#4c4c6d] sm:text-base">
            <p>
              Evaluate your APIs, infrastructure, and integrations to ensure your entire tech stack is structured, secure, and prepared for seamless AI adoption—transforming your company into a fully AI-powered enterprise.
            </p>
          </div>

          {/* Features Section - Image Left, Text Right */}
          <div className="grid gap-8">
            {/* Left: Phone + Laptop Group Image */}
            <div className="flex items-center justify-center">
              <Image
                src="/assets/Group 1000016173.png"
                alt="Mobile and laptop analytics dashboard"
                width={350}
                height={325}
                className="h-auto w-full max-w-[280px] sm:max-w-[350px] object-contain"
              />
            </div>

            {/* Right: Features Text */}
            <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full text-lg sm:text-xl font-semibold ${
                      index === 0
                        ? "bg-[#1a1a1a] text-white"
                        : "bg-[#f6f6f6] text-[#1a1a1a]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {feature.number}
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-base font-semibold leading-tight text-[#1a1a1a] sm:text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-[#4c4c6d] sm:text-base sm:leading-[28px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}