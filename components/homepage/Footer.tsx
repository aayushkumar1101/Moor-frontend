import Link from "next/link";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">
          {/* Left side - Logo and Description */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <Link href="/" className="inline-block">
                <Image
                  src="/assets/moor-logo.svg"
                  alt="mooring"
                  width={94}
                  height={24}
                  className="h-5 sm:h-6"
                />
              </Link>
              <div className="hidden h-4 w-px bg-[#d0d0d0] sm:block" />
              <p className="text-xs text-[#4c4c6d] sm:text-sm">A T9L Company</p>
            </div>
            <p className="text-xs text-[#4c4c6d] sm:text-sm md:max-w-md">
              The AI Web Docking Platform where AI agents dock with websites.
            </p>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <Link
              href="#privacy"
              className="text-xs text-[#4c4c6d] hover:text-[#1a1a1a] transition-colors sm:text-sm"
            >
              Privacy
            </Link>
            <Link
              href="#terms"
              className="text-xs text-[#4c4c6d] hover:text-[#1a1a1a] transition-colors sm:text-sm"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
