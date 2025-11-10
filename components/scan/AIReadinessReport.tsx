"use client";

import { useState } from "react";
import { InputError } from "@/components/ui/ErrorMessage";
import Toast from "@/components/ui/Toast";
import useFormValidation from "@/hooks/useFormValidation";

interface AIReadinessReportProps {
  url: string;
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  score: number;
  maxScore: number;
  items: string[];
  bgColor: string;
  delay: number;
}

function MetricCard({ icon, title, score, maxScore, items, bgColor, delay }: MetricCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in-up hover:scale-[1.02]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-[#1a1a1a]">{title}</h3>
        </div>
        <div className="text-2xl font-bold text-[#1a1a1a]">
          {score}
          <span className="text-base text-[#4c4c6d] font-normal">/{maxScore}</span>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[#4c4c6d]">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AIReadinessReport({ url }: AIReadinessReportProps) {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success">("error");
  
  const { errors, validate, clearError, getError } = useFormValidation();

  const scanDate = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing
    if (getError("email")) {
      clearError("email");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const isValid = validate("email", email, {
      required: true,
      email: true,
    });

    if (!isValid) {
      setToastMessage("Please enter a valid email address");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Submit email to API
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setToastMessage("This email is already on the waitlist");
        } else {
          setToastMessage(data.error || "Failed to join waitlist. Please try again.");
        }
        setToastType("error");
        setShowToast(true);
        return;
      }
      
      // Success
      setIsSubmitted(true);
      setToastMessage("Successfully joined the waitlist!");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      setToastMessage("Failed to join waitlist. Please try again.");
      setToastType("error");
      setShowToast(true);
    }
  };

  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <main className="flex-1 bg-white px-6 py-12">
        <div className="w-full max-w-[1200px] mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-6">AI Readiness report</h1>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#4c4c6d] mb-12 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span>Scanned URL:</span>
            <a href={url} className="text-[#00a7e6] hover:underline font-medium">
              {url || "example.com"}
            </a>
          </div>
          <span className="text-gray-300">|</span>
          <div>
            <span>Scanned Duration: </span>
            <span className="font-medium text-[#1a1a1a]">&lt;6 sec</span>
          </div>
          <span className="text-gray-300">|</span>
          <div>
            <span>Date: </span>
            <span className="font-medium text-[#1a1a1a]">{scanDate}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Score Circle */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              {/* Circular Chart */}
              <div className="flex justify-center mb-6">
                <div className="relative w-52 h-52">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    {/* Background Circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="18"
                    />
                    {/* Red segment (Risk) - 0 to 50 */}
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="18"
                      strokeDasharray={`${(50 / 100) * 534.07} 534.07`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Yellow segment (Moderate) - 50 to 75 */}
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="18"
                      strokeDasharray={`${(25 / 100) * 534.07} 534.07`}
                      strokeDashoffset={`-${(50 / 100) * 534.07}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Green segment (Success) - 75 to 100 */}
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="18"
                      strokeDasharray={`${(25 / 100) * 534.07} 534.07`}
                      strokeDashoffset={`-${(75 / 100) * 534.07}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-[#1a1a1a]">54</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Status: High Risk</h3>
                <p className="text-sm text-[#4c4c6d]">
                  Your website&apos;s AI readiness score is a measure of its compatibility with
                  modern AI systems.
                </p>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-[#4c4c6d]">0 - 50 (Risk)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <span className="text-[#4c4c6d]">49-75 (Moderate)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-[#4c4c6d]">49-75 (Success)</span>
                </div>
              </div>
            </div>

            {/* Mobile CTA Button - Right below Status Score */}
            <div className="mt-6 lg:hidden">
              {isSubmitted ? (
                <div className="flex flex-col gap-3 bg-green-50 border-2 border-green-500 rounded-lg px-6 py-4 animate-fade-in">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-semibold text-[#1a1a1a]">WAITLIST JOINED</span>
                  </div>
                  <div className="text-center text-sm text-[#4c4c6d]">{email}</div>
                </div>
              ) : !showEmailInput ? (
                <button
                  onClick={() => setShowEmailInput(true)}
                  className="w-full bg-[#00a7e6] hover:bg-[#0096d1] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  See Full Insights
                </button>
              ) : (
                <div className="w-full animate-fade-in">
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        autoFocus
                        className={`w-full px-6 py-4 pr-16 border-2 rounded-lg focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder-gray-400 transition-all duration-300 ${
                          getError("email")
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-[#00a7e6] focus:ring-[#00a7e6] focus:border-transparent"
                        }`}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-600 transition-all hover:bg-gray-300"
                        aria-label="Submit"
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <InputError message={getError("email")} />
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Metric Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Architecture Card */}
            <MetricCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 7L12 3L21 7M3 7L12 11M3 7V17L12 21M21 7L12 11M21 7V17L12 21M12 11V21"
                    stroke="#16a34a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Architecture"
              score={85}
              maxScore={100}
              items={[
                "Modern tech stack detected.",
                "API availability is good.",
                "API availability is good.",
              ]}
              bgColor="bg-green-100"
              delay={0}
            />

            {/* Security Card */}
            <MetricCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                    stroke="#ca8a04"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Security"
              score={60}
              maxScore={100}
              items={[
                "Structured data (Schema.org) is well implemented.",
                "API availability is good.",
                "API availability is good.",
              ]}
              bgColor="bg-yellow-100"
              delay={100}
            />

            {/* AI Integration Card */}
            <MetricCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="#9333ea" strokeWidth="2" />
                  <path
                    d="M12 1V4M12 20V23M23 12H20M4 12H1"
                    stroke="#9333ea"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.36 5.64L16.24 7.76M7.76 16.24L5.64 18.36M18.36 18.36L16.24 16.24M7.76 7.76L5.64 5.64"
                    stroke="#9333ea"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="AI Integration"
              score={60}
              maxScore={100}
              items={[
                "Potential for chatbot integration.",
                "API availability is good.",
                "API ready for integration.",
              ]}
              bgColor="bg-purple-100"
              delay={200}
            />

            {/* Data Card */}
            <MetricCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#dc2626" strokeWidth="2" />
                  <path
                    d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6"
                    stroke="#dc2626"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12"
                    stroke="#dc2626"
                    strokeWidth="2"
                  />
                </svg>
              }
              title="Data"
              score={91}
              maxScore={100}
              items={[
                "Structured data (Schema.org) is well implemented.",
                "Content is machine readable.",
                "API ready for integration.",
              ]}
              bgColor="bg-red-100"
              delay={300}
            />
          </div>
        </div>

        {/* Desktop CTA Button / Email Input / Success Message - Hidden on mobile */}
        <div className="hidden sm:flex justify-center lg:justify-end">
          {isSubmitted ? (
            <div className="flex items-center gap-3 bg-green-50 border-2 border-green-500 rounded-lg px-6 py-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-[#1a1a1a]">{email}</span>
                <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold whitespace-nowrap">WAITLIST JOINED</span>
                </div>
              </div>
            </div>
          ) : !showEmailInput ? (
            <button
              onClick={() => setShowEmailInput(true)}
              className="w-full sm:w-auto bg-[#00a7e6] hover:bg-[#0096d1] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              JOIN THE WAITLIST FOR FULL INSIGHTS
            </button>
          ) : (
            <div className="w-full sm:w-auto animate-fade-in">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    autoFocus
                    className={`w-full sm:min-w-[320px] px-6 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder-gray-400 transition-all duration-300 ${
                      getError("email")
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-[#00a7e6] focus:ring-[#00a7e6] focus:border-transparent"
                    }`}
                  />
                  <InputError message={getError("email")} />
                </div>
                <button
                  type="submit"
                  className="bg-[#00a7e6] hover:bg-[#0096d1] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
        </div>
      </main>
    </>
  );
}

