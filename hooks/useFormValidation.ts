import { useState } from "react";

interface ValidationRules {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  customMessage?: string;
}

interface FieldErrors {
  [key: string]: string;
}

export default function useFormValidation() {
  const [errors, setErrors] = useState<FieldErrors>({});

  const validateField = (
    name: string,
    value: string,
    rules: ValidationRules
  ): string => {
    // Required check
    if (rules.required && !value.trim()) {
      return `This field is required`;
    }

    // Email validation
    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    // Min length check
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    // Max length check
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`;
    }

    // Pattern check
    if (rules.pattern && value && !rules.pattern.test(value)) {
      return rules.customMessage || "Invalid format";
    }

    // Custom validation
    if (rules.custom && value && !rules.custom(value)) {
      return rules.customMessage || "Validation failed";
    }

    return "";
  };

  const validate = (
    name: string,
    value: string,
    rules: ValidationRules
  ): boolean => {
    const error = validateField(name, value, rules);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    return !error;
  };

  const clearError = (name: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };

  const getError = (name: string): string => {
    return errors[name] || "";
  };

  return {
    errors,
    validate,
    clearError,
    clearAllErrors,
    hasErrors,
    getError,
  };
}

