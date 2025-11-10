"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { InputError } from "@/components/ui/ErrorMessage";
import Toast from "@/components/ui/Toast";
import useFormValidation from "@/hooks/useFormValidation";

export function HeroSection() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const { validate, clearError, getError } = useFormValidation();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    // Clear error when user starts typing
    if (getError("url")) {
      clearError("url");
    }
  };

  const validateUrl = (url: string): boolean => {
    try {
      // Allow URLs without protocol or with http/https
      let testUrl = url.trim();
      if (!testUrl.startsWith("http://") && !testUrl.startsWith("https://")) {
        testUrl = "https://" + testUrl;
      }
      new URL(testUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    const isValid = validate("url", url, {
      required: true,
      custom: validateUrl,
      customMessage: "Please enter a valid website URL",
    });

    if (!isValid) {
      setToastMessage("Please enter a valid website URL");
      setShowToast(true);
      return;
    }

    if (url.trim()) {
      router.push(`/scan?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <>
      <Toast
        message={toastMessage}
        type="error"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <section className="relative overflow-hidden">
      {/* Background with enhanced patterns and effects */}
      <div className="relative bg-gradient-to-br from-black via-[#001a2e] to-black">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Blue glow orb - top left */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '4s' }} />
          
          {/* Purple glow orb - top right */}
          <div className="absolute top-20 right-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '6s', animationDelay: '1s' }} />
          
          {/* Cyan glow orb - bottom left */}
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '5s', animationDelay: '2s' }} />
          
          {/* Moving gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-2xl animate-float" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }} />

        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          {/* Mobile: Crystal as Background */}
          <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
            <Image
              src="/assets/crystal-hero.png"
              alt="AI Crystal Sphere"
              width={444}
              height={444}
              className="animate-float w-full max-w-[280px] opacity-80"
              priority
            />
          </div>

          <div className="relative grid items-center gap-8 py-12 pb-40 sm:py-16 sm:pb-56 md:grid-cols-2 md:gap-12 md:py-20 md:pb-64">
            {/* Left Content */}
            <div className="relative z-10 space-y-6 text-center md:space-y-8 md:text-left">
              <h1 className="text-[32px] font-bold leading-[38px] text-white sm:text-[48px] sm:leading-[56px] md:text-[64px] md:leading-[72px]">
                Making the Website{" "}
                <span className="text-white">AI-</span>
                <br />
                <span className="text-white">Ready</span>
              </h1>

              {/* Input with Button - Mobile: Inline Arrow, Desktop: Separate Button */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  {/* Mobile: Input with inline arrow */}
                  <div className="relative md:hidden">
                    <input
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      placeholder="Enter a webpage URL"
                      className={`h-12 w-full rounded-lg border bg-white pl-4 pr-12 text-sm text-neutral-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        getError("url")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                          : "border-gray-300 focus:border-[#00a7e6] focus:ring-[#00a7e6]/50"
                      }`}
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 text-gray-600 transition-all hover:bg-gray-300"
                      aria-label="Submit"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Desktop: Input with separate SCAN NOW button */}
                  <div className="hidden md:flex md:gap-3">
                    <input
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      placeholder="Enter a webpage URL"
                      className={`h-14 flex-1 rounded-lg border bg-white px-6 text-base text-neutral-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        getError("url")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                          : "border-[#26262c] focus:border-[#00a7e6] focus:ring-[#00a7e6]/50"
                      }`}
                    />
                    <button 
                      type="submit"
                      className="h-14 whitespace-nowrap rounded-lg bg-[#00a7e6] px-5 text-xs font-bold uppercase tracking-[1.8px] text-white transition-colors hover:bg-[#0096d1]"
                    >
                      SCAN NOW
                    </button>
                  </div>

                  {getError("url") && (
                    <div className="pl-2">
                      <InputError message={getError("url")} light />
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Right Content - 3D Crystal (Desktop Only) */}
            <div className="relative hidden md:flex items-center justify-center">
              <Image
                src="/assets/crystal-hero.png"
                alt="AI Crystal Sphere"
                width={444}
                height={444}
                className="animate-float w-full max-w-[400px]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom glow effects */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-500/20 via-cyan-500/5 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-32 bg-cyan-400/10 blur-3xl" />
      </div>
    </section>
    </>
  );
}
