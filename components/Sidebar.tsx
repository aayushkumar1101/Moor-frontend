"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
};

type NavSection = {
  title?: string;
  items: NavItem[];
};

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const sections: NavSection[] = [
    {
      items: [
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 6L8 2L14 6V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          label: "Home",
          href: "/dashboard",
          active: true,
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 5V8L10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ),
          label: "Voices",
          href: "/voices",
        },
      ],
    },
    {
      title: "Products",
      items: [
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 11L8 8.5L3 11V3.5C3 3.22386 3.22386 3 3.5 3H12.5C12.7761 3 13 3.22386 13 3.5V11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          label: "Text to Speech",
          href: "/text-to-speech",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 10.6667V5.33333C2 4.59695 2.59695 4 3.33333 4H4.66667C4.84348 4 5.01305 3.92976 5.13807 3.80474L7.52859 1.41421C8.10453 0.838275 9.06667 1.24292 9.06667 2.06863V13.9314C9.06667 14.7571 8.10453 15.1617 7.52859 14.5858L5.13807 12.1953C5.01305 12.0702 4.84348 12 4.66667 12H3.33333C2.59695 12 2 11.403 2 10.6667Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M11.3333 5.33333C12.0697 6.40476 12.0697 9.59524 11.3333 10.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ),
          label: "Music",
          href: "/music",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
            </svg>
          ),
          label: "Notifications",
          href: "/notifications",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M13.5 8C13.5 8.55228 13.9477 9 14.5 9V9C14.7761 9 15 8.77614 15 8.5V7.5C15 7.22386 14.7761 7 14.5 7V7C13.9477 7 13.5 7.44772 13.5 8V8ZM2.5 8C2.5 7.44772 2.05228 7 1.5 7V7C1.22386 7 1 7.22386 1 7.5V8.5C1 8.77614 1.22386 9 1.5 9V9C2.05228 9 2.5 8.55228 2.5 8V8Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ),
          label: "Settings",
          href: "/settings",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="2"
                y="4"
                width="12"
                height="9"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ),
          label: "Products",
          href: "/products",
        },
      ],
    },
  ];

  return (
    <aside className="flex h-screen w-[240px] flex-col border-r border-neutral-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/moor-logo.svg"
            alt="mooring"
            width={80}
            height={24}
            className="h-6"
          />
        </Link>
        <button className="text-neutral-400 hover:text-neutral-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            fill="none"
            viewBox="0 0 16 16"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <div className="mb-2 px-3 text-xs font-medium text-neutral-500">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    item.active
                      ? "bg-neutral-100 font-medium text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-neutral-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-neutral-50">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-semibold text-white">
            FK
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-neutral-900">Fahad Khan</div>
            <div className="truncate text-xs text-neutral-500">My Workspace</div>
          </div>
          <svg
            className="h-4 w-4 flex-shrink-0 text-neutral-400"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}

