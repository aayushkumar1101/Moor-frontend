"use client";

import { InputError } from "./ErrorMessage";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export default function Input({
  error,
  label,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder-gray-400 transition-all duration-300 ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-[#00a7e6] focus:border-[#00a7e6]"
        } ${className}`}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && <InputError message={error} />}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export function Textarea({
  error,
  label,
  helperText,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder-gray-400 transition-all duration-300 resize-vertical ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-[#00a7e6] focus:border-[#00a7e6]"
        } ${className}`}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && <InputError message={error} />}
    </div>
  );
}

