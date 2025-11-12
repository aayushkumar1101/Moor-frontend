"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/moor-logo.svg"
            alt="mooring"
            width={120}
            height={32}
            className="h-6 sm:h-8"
          />
        </Link>

        {/* Hamburger Menu Button - Mobile Only */}
        {/*<button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-6 bg-[#1a1a1a] transition-all"></span>
          <span className="h-0.5 w-6 bg-[#1a1a1a] transition-all"></span>
          <span className="h-0.5 w-6 bg-[#1a1a1a] transition-all"></span>
        </button>*/}
      </div>

      {/* Mobile Menu Dropdown - Empty for now */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
          <nav className="space-y-3">
            {/* Menu items can be added here in the future */}
          </nav>
        </div>
      )}
    </header>
  );
}

