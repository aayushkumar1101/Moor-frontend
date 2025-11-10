"use client";

import { useState } from "react";

type OptimizationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function OptimizationModal({ isOpen, onClose }: OptimizationModalProps) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className="mb-2 text-xl font-semibold text-neutral-900">
          Get optimization report
        </h2>
        <p className="mb-6 text-sm text-neutral-600">
          Lorem ipsum dolor sit amet consectetur. Urna venenatis augue faucibus
          pellien
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

