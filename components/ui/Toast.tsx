"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "warning" | "info";
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "error",
  show,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const styles = {
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      icon: "text-red-500",
      text: "text-red-800",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      icon: "text-green-500",
      text: "text-green-800",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      icon: "text-yellow-500",
      text: "text-yellow-800",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      icon: "text-blue-500",
      text: "text-blue-800",
    },
  };

  const currentStyle = styles[type];

  const icons = {
    error: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    success: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    warning: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    info: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-down-fade max-w-md">
      <div
        className={`flex items-start gap-3 ${currentStyle.bg} border-l-4 ${currentStyle.border} rounded-lg p-4 shadow-lg`}
      >
        <svg
          className={`w-6 h-6 ${currentStyle.icon} flex-shrink-0 mt-0.5`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {icons[type]}
        </svg>
        <div className="flex-1">
          <p className={`text-sm font-medium ${currentStyle.text}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${currentStyle.icon} hover:opacity-70 transition-opacity`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

