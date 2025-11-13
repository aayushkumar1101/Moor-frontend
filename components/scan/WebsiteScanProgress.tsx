"use client";

import { useEffect, useMemo, useState } from "react";

import { SCAN_STORAGE_KEY } from "@/lib/constants";
import {
  ComprehensiveAnalysisResponse,
  StoredAnalysisData,
} from "@/types/analysis";

import AIReadinessReport from "./AIReadinessReport";

interface WebsiteScanProgressProps {
  url: string;
}

type ScanLifecycleStatus = "pending" | "in_progress" | "completed" | "failed" | string;

interface StatusCard {
  title: string;
  description: string;
  bgColor: string;
  icon: JSX.Element;
}

const STATUS_CARDS: StatusCard[] = [
  {
    title: "Tech Stack",
    description: "Detecting your tech stack...",
    bgColor: "bg-green-100",
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
    title: "API Footprint",
    description: "Fingerprinting available APIs...",
    bgColor: "bg-purple-100",
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
    title: "Data Signals",
    description: "Scanning structured data & analytics...",
    bgColor: "bg-red-100",
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

const STATUS_LABELS: Record<ScanLifecycleStatus, string> = {
  pending: "Queued for analysis...",
  in_progress: "Analysis in progress...",
  completed: "Analysis complete",
  failed: "Analysis failed",
};

const MIN_PROGRESS_ACTIVE = 40;
const MAX_PROGRESS_ACTIVE = 60;

function getStatusLabel(status: ScanLifecycleStatus): string {
  return STATUS_LABELS[status] ?? status.replace(/_/g, " ");
}

export default function WebsiteScanProgress({ url: initialUrl }: WebsiteScanProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [storedScan, setStoredScan] = useState<StoredAnalysisData | null>(null);
  const [analysis, setAnalysis] = useState<ComprehensiveAnalysisResponse | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanLifecycleStatus>("pending");
  const [displayUrl, setDisplayUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

  const activeScanId = useMemo(() => {
    return analysis?.scan_id ?? storedScan?.scan_id ?? null;
  }, [analysis?.scan_id, storedScan?.scan_id]);

  // Initialise from localStorage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = localStorage.getItem(SCAN_STORAGE_KEY);
      if (!raw) {
        setDisplayUrl(initialUrl);
        return;
      }

      const parsed: StoredAnalysisData = JSON.parse(raw);
      setStoredScan(parsed);
      setScanStatus(parsed.status);
      setDisplayUrl(parsed.url || initialUrl);

      if (parsed.status === "completed") {
        setProgress(100);
      } else {
        setProgress((prev) => (prev > MIN_PROGRESS_ACTIVE ? prev : 35));
      }
    } catch (storageError) {
      console.error("Failed to parse stored analysis data:", storageError);
      setError("We couldn't read the previous scan details. Please start a new scan.");
    } finally {
      setStorageChecked(true);
    }
  }, [initialUrl]);

  // Keep URL in sync with API payloads
  useEffect(() => {
    if (analysis?.url) {
      setDisplayUrl(analysis.url);
    }
  }, [analysis?.url]);

  // Auto-rotate cards on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % STATUS_CARDS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Poll backend for scan progress
  useEffect(() => {
    if (!activeScanId) {
      return;
    }
    if (!API_BASE_URL) {
      setError("API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL.");
      return;
    }

    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const updateActiveProgress = () => {
      setProgress((prev) => {
        if (prev < MIN_PROGRESS_ACTIVE) {
          return MIN_PROGRESS_ACTIVE;
        }

        const jitter = Math.random() * 5;
        const next = Math.min(MAX_PROGRESS_ACTIVE, prev + jitter);
        return Math.max(MIN_PROGRESS_ACTIVE, next);
      });
    };

    const fetchStatus = async () => {
      try {
        setIsPolling(true);

        const response = await fetch(`${API_BASE_URL}/api/analyze/${activeScanId}`);
        const data: ComprehensiveAnalysisResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error_message || (data as { detail?: string })?.detail || "Unable to fetch analysis status."
          );
        }

        if (cancelled) {
          return;
        }

        setAnalysis(data);
        setScanStatus(data.status);

        if (typeof window !== "undefined") {
          localStorage.setItem(
            SCAN_STORAGE_KEY,
            JSON.stringify({
              ...data,
              saved_at: new Date().toISOString(),
            })
          );
        }

        if (data.status === "completed") {
          setProgress(100);
          if (intervalId) {
            clearInterval(intervalId);
          }
        } else if (data.status === "failed") {
          setError(data.error_message || "The analysis failed. Please try again.");
          if (intervalId) {
            clearInterval(intervalId);
          }
        } else {
          updateActiveProgress();
        }
      } catch (fetchError) {
        if (cancelled) {
          return;
        }
        console.error("Error fetching analysis status:", fetchError);
        if (intervalId) {
          clearInterval(intervalId);
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Something went wrong while checking the analysis progress."
        );
      } finally {
        if (!cancelled) {
          setIsPolling(false);
        }
      }
    };

    void fetchStatus();
    intervalId = setInterval(fetchStatus, 5000);

    return () => {
      cancelled = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeScanId, API_BASE_URL]);

  const isCompleted = analysis?.status === "completed";

  if (isCompleted && analysis) {
    return (
      <div className="animate-fade-in">
        <AIReadinessReport url={analysis.url || displayUrl} analysis={analysis} />
      </div>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-white px-6 py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <circle cx="12" cy="16" r="1" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">We hit a snag</h1>
          <p className="text-sm text-[#4c4c6d]">
            {error}
            {API_BASE_URL ? "" : " Update your environment configuration and try again."}
          </p>
          <p className="text-sm text-[#4c4c6d]">
            Please return to the home page and start a fresh scan once the issue is resolved.
          </p>
        </div>
      </main>
    );
  }

  if (storageChecked && !activeScanId) {
    return (
      <main className="flex-1 bg-white px-6 py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#00a7e6]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">Start a new scan</h1>
          <p className="text-sm text-[#4c4c6d]">
            We couldn&apos;t find an active analysis. Head back to the homepage, enter a URL, and launch a fresh scan.
          </p>
        </div>
      </main>
    );
  }

  const statusLabel = getStatusLabel(scanStatus);

  return (
    <div className="transition-opacity duration-500">
      <main className="flex-1 bg-white px-6 py-20">
        <div className="mx-auto w-full max-w-[1240px]">
          {/* Centered Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-100 bg-white shadow-xl">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="animate-pulse">
                <circle cx="12" cy="12" r="10" stroke="#00a7e6" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="4" fill="#00a7e6" />
                <line x1="12" y1="16" x2="12" y2="20" stroke="#00a7e6" strokeWidth="2" />
              </svg>
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00a7e6] animate-spin"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-[#1a1a1a]">Website&apos;s scan in progress</h1>
            <p className="text-lg text-[#4c4c6d]">
              We&apos;re analyzing the website to uncover its technological DNA.{" "}
              <span className="font-semibold text-[#00a7e6]">Hang tight!</span>
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[2px] text-[#8989a0]">
              {isPolling ? "Updating status..." : statusLabel}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mx-auto mb-16 max-w-3xl">
            <div className="relative h-3 overflow-hidden rounded-full bg-gray-200 shadow-inner">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-[#00a7e6] to-[#0096d1] transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between px-1">
              <span className="text-sm font-medium text-[#4c4c6d]">Scanning Website...</span>
              <span className="text-sm font-bold text-[#1a1a1a]">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Status Cards - Mobile: Single Card Carousel, Desktop: Grid */}
          <div className="mx-auto max-w-4xl">
            <div className="sm:hidden">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
                >
                  {STATUS_CARDS.map((card, index) => (
                    <div key={card.title} className="min-w-full px-2">
                      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${card.bgColor}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              {card.icon}
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-1 text-lg font-semibold text-[#1a1a1a]">{card.title}</h3>
                            <p className="text-sm text-[#4c4c6d]">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {STATUS_CARDS.map((card, index) => (
                  <button
                    key={card.title}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentCardIndex ? "w-8 bg-[#00a7e6]" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden gap-6 sm:grid sm:grid-cols-2">
              {STATUS_CARDS.map((card, index) => (
                <div
                  key={card.title}
                  className="group animate-fade-in-up rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${card.bgColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        {card.icon}
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-[#1a1a1a]">{card.title}</h3>
                      <p className="text-sm text-[#4c4c6d]">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scanning URL Display */}
          {displayUrl && (
            <div className="mx-auto mt-8 max-w-4xl text-center">
              <p className="text-sm text-[#4c4c6d]">
                Scanning: <span className="font-semibold text-[#1a1a1a]">{displayUrl}</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

