"use client";

import { Header } from "@/components/homepage/Header";
import { FooterSection } from "@/components/homepage/Footer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import WebsiteScanProgress from "@/components/scan/WebsiteScanProgress";

function ScanContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WebsiteScanProgress url={url} />
      <FooterSection />
    </div>
  );
}

export default function ScanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00a7e6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4c4c6d]">Loading...</p>
        </div>
      </div>
    }>
      <ScanContent />
    </Suspense>
  );
}

