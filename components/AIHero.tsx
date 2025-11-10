"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type AIHeroProps = {
  title: string;
  description?: string;
  actions: {
    label: string;
    href: string;
  }[];
  image: {
    src: string;
    alt: string;
  };
};

export function AIHero({ title, actions, image }: AIHeroProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-6 py-20 md:px-12 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1fr,1fr]">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Input Field with Button */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Enter a website URL..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {actions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Image - 3D Sphere */}
        <div className="relative flex items-center justify-center">
          <div className="relative h-80 w-80 md:h-96 md:w-96">
            {/* Glow Effect */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
            
            {/* Image */}
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="animate-[spin_20s_linear_infinite] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

