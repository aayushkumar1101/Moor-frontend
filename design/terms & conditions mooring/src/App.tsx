import { useState } from "react";
import { TermsContent } from "./components/TermsContent";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"terms" | "privacy">("terms");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Simple Navigation */}
      <nav className="bg-white border-b border-[#e5e5e5] px-[76px] py-[24px]">
        <div className="max-w-[1240px] mx-auto flex gap-[24px]">
          <button
            onClick={() => setCurrentPage("terms")}
            className={`font-['Public_Sans:Medium',sans-serif] text-[16px] ${
              currentPage === "terms" ? "text-[#00a7e6]" : "text-[#4c4c6d] hover:text-[#00a7e6]"
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setCurrentPage("privacy")}
            className={`font-['Public_Sans:Medium',sans-serif] text-[16px] ${
              currentPage === "privacy" ? "text-[#00a7e6]" : "text-[#4c4c6d] hover:text-[#00a7e6]"
            }`}
          >
            Privacy Policy
          </button>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === "terms" && <TermsContent />}
      {currentPage === "privacy" && <PrivacyPolicy />}
    </div>
  );
}
