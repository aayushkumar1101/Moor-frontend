"use client";

type ActionButtonsProps = {
  onDownload: () => void;
  onEmail: () => void;
};

export function ActionButtons({ onDownload, onEmail }: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onDownload}
        className="flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 11L8 2M8 11L5 8M8 11L11 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 11V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Download Report
      </button>

      <button
        onClick={onEmail}
        className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 4L8 9L14 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2"
            y="3"
            width="12"
            height="10"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        Send on E-mail
      </button>
    </div>
  );
}

