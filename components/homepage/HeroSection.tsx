"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

import { InputError } from "@/components/ui/ErrorMessage";
import Toast from "@/components/ui/Toast";
import useFormValidation from "@/hooks/useFormValidation";
import { SCAN_STORAGE_KEY } from "@/lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success">("error");

  const { validate, clearError, getError } = useFormValidation();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);

    if (getError("url")) {
      clearError("url");
    }
  };

  const validateUrl = (value: string): boolean => {
    try {
      let formatted = value.trim();
      if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
        formatted = `https://${formatted}`;
      }
      new URL(formatted);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    const isValid = validate("url", url, {
      required: true,
      custom: validateUrl,
      customMessage: "Please enter a valid website URL",
    });

    if (!isValid) {
      setToastMessage("Please enter a valid website URL");
      setToastType("error");
      setShowToast(true);
      return;
    }

    if (!API_BASE_URL) {
      setToastMessage("API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    const trimmed = url.trim();
    const formattedUrl = trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: formattedUrl,
          deep_scan: true,
          enable_headless: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Failed to start analysis. Please try again.");
      }

      if (typeof window !== "undefined") {
        const payload = {
          ...data,
          url: formattedUrl,
          saved_at: new Date().toISOString(),
        };
        localStorage.setItem(SCAN_STORAGE_KEY, JSON.stringify(payload));
      }

      setToastMessage("Scan started successfully.");
      setToastType("success");
      setShowToast(true);

      router.push(`/scan?url=${encodeURIComponent(formattedUrl)}`);
    } catch (error) {
      console.error("Error starting analysis:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while starting the analysis. Please try again.";
      setToastMessage(message);
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
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
      <section className="w-full overflow-hidden bg-white px-6 py-6 shadow-none md:shadow-xl">
        <div
          className="relative mx-auto max-w-8xl isolate overflow-hidden bg-black bg-[url('/assets/BG-Hero.png')] bg-cover bg-center bg-no-repeat"
        >
          <div className="pointer-events-none absolute inset-0 bg-black/70 md:hidden" />
          <div className="pointer-events-none absolute inset-0 bg-[url('/assets/crystal-hero.png')] bg-contain bg-right-bottom bg-no-repeat opacity-80 md:hidden" />

          <div className="relative px-6 py-16 md:px-16 md:py-24">
            <div className="flex flex-col-reverse items-center gap-12 text-center md:flex-row md:items-center md:justify-between md:gap-16 md:text-left">
              <div className="flex max-w-2xl flex-col items-center gap-6 md:items-start">
                <motion.h1
                  {...fadeUp}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-4xl font-bold text-white md:text-[52px] md:leading-tight"
                >
                  Making the Website <span className="text-white">AI-Ready</span>
                </motion.h1>

                <motion.form
                  onSubmit={handleSubmit}
                  {...fadeUp}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                  className="w-full"
                >
                  <div className="space-y-2">
                    <div className="relative md:hidden">
                      <input
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        disabled={isSubmitting}
                        placeholder="Enter a webpage URL"
                        className={`h-12 w-full rounded-lg border bg-white pl-4 pr-12 text-sm text-neutral-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
                          getError("url")
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                            : "border-gray-300 focus:border-[#00a7e6] focus:ring-[#00a7e6]/50"
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 text-gray-600 transition-all hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300"
                        aria-label="Submit"
                      >
                        {isSubmitting ? (
                          <svg
                            className="h-4 w-4 animate-spin text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M2 8H14M14 8L8 2M14 8L8 14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="hidden md:flex md:gap-3">
                      <input
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        disabled={isSubmitting}
                        placeholder="Enter a webpage URL"
                        className={`h-14 flex-1 rounded-lg border bg-white px-6 text-base text-neutral-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
                          getError("url")
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                            : "border-[#26262c] focus:border-[#00a7e6] focus:ring-[#00a7e6]/50"
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 whitespace-nowrap rounded-lg bg-[#00a7e6] px-5 text-xs font-bold uppercase tracking-[1.8px] text-white transition-colors hover:bg-[#0096d1] disabled:cursor-not-allowed disabled:bg-[#00a7e6]/60"
                      >
                        {isSubmitting ? "SCANNING..." : "SCAN NOW"}
                      </button>
                    </div>

                    {getError("url") && (
                      <div className="pl-2">
                        <InputError message={getError("url")} light />
                      </div>
                    )}
                  </div>
                </motion.form>
              </div>

              <div className="relative hidden w-full max-w-sm justify-center md:flex md:max-w-md md:justify-end">
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  className="relative flex justify-center md:justify-end md:left-[-60px]"
                >
                  <Image
                    src="/assets/crystal-hero.png"
                    alt="AI Crystal Sphere"
                    width={444}
                    height={444}
                    className="animate-float md:w-100 md:h-100"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
