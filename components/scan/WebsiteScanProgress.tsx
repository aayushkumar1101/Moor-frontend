"use client";

import { useState, useEffect } from "react";
import AIReadinessReport from "./AIReadinessReport";

interface WebsiteScanProgressProps {
  url: string;
}

export default function WebsiteScanProgress({ url }: WebsiteScanProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Card data
  const cards = [
    {
      title: "Tech Stack",
      description: "Detecting your tech stack...",
      bgColor: "bg-green-100",
      iconColor: "#16a34a",
      icon: (
        <path
          d="M3 7L12 3L21 7M3 7L12 11M3 7V17L12 21M21 7L12 11M21 7V17L12 21M12 11V21"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
    {
      title: "Frameworks",
      description: "Identifying your framework...",
      bgColor: "bg-yellow-100",
      iconColor: "#ca8a04",
      icon: (
        <>
          <path
            d="M12 3L3 9L12 15L21 9L12 3Z"
            stroke="#ca8a04"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 15L12 21L21 15"
            stroke="#ca8a04"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ),
    },
    {
      title: "Multiple API's",
      description: "Fingerprinting your API's...",
      bgColor: "bg-purple-100",
      iconColor: "#9333ea",
      icon: (
        <>
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
        </>
      ),
    },
    {
      title: "Data",
      description: "Scanning your data...",
      bgColor: "bg-red-100",
      iconColor: "#dc2626",
      icon: (
        <>
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
        </>
      ),
    },
  ];

  useEffect(() => {
    // Animate progress from 0 to 100 over 5 seconds
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // Update every 50ms
    const incrementValue = (100 / duration) * intervalTime;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + incrementValue;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate cards on mobile
  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 2000); // Change card every 2 seconds

    return () => clearInterval(cardInterval);
  }, [cards.length]);

  // Show AI Readiness Report when complete
  if (isComplete) {
    return (
      <div className="animate-fade-in">
        <AIReadinessReport url={url} />
      </div>
    );
  }

  // Show Progress Screen
  return (
    <div className={`transition-opacity duration-500 ${progress >= 100 ? "opacity-0" : "opacity-100"}`}>
      <main className="flex-1 flex items-center justify-center bg-white px-6 py-20">
        <div className="w-full max-w-[1240px] mx-auto">
          {/* Centered Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-gray-100">
              {/* Animated Pin Icon */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="animate-pulse"
              >
                <circle cx="12" cy="12" r="10" stroke="#00a7e6" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="4" fill="#00a7e6" />
                <line x1="12" y1="16" x2="12" y2="20" stroke="#00a7e6" strokeWidth="2" />
              </svg>
              {/* Spinning ring effect */}
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00a7e6] animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Website&apos;s scan in progress
            </h1>
            <p className="text-lg text-[#4c4c6d]">
              We&apos;re analyzing the website to uncover its technological DNA.{" "}
              <span className="text-[#00a7e6] font-semibold">Hang tight!</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute h-full bg-gradient-to-r from-[#00a7e6] to-[#0096d1] rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 px-1">
              <span className="text-sm font-medium text-[#4c4c6d]">Scanning Website...</span>
              <span className="text-sm font-bold text-[#1a1a1a]">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Status Cards - Mobile: Single Card Carousel, Desktop: Grid */}
          <div className="max-w-4xl mx-auto">
            {/* Mobile: Single Card View with Carousel */}
            <div className="sm:hidden">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
                >
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="min-w-full px-2"
                    >
                      <div className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              {card.icon}
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">{card.title}</h3>
                            <p className="text-sm text-[#4c4c6d]">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentCardIndex
                        ? "w-8 bg-[#00a7e6]"
                        : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Grid View */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        {card.icon}
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">{card.title}</h3>
                      <p className="text-sm text-[#4c4c6d]">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scanning URL Display */}
          {url && (
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <p className="text-sm text-[#4c4c6d]">
                Scanning: <span className="font-semibold text-[#1a1a1a]">{url}</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

