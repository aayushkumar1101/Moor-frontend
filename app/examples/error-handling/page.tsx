"use client";

import { useState, FormEvent } from "react";
import Input, { Textarea } from "@/components/ui/Input";
import Toast from "@/components/ui/Toast";
import useFormValidation from "@/hooks/useFormValidation";
import { InputError } from "@/components/ui/ErrorMessage";

export default function ErrorHandlingExamples() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success" | "warning" | "info">("error");

  const { validate, getError, clearError, clearAllErrors } = useFormValidation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearError("email");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearError("password");
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    clearError("message");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearAllErrors();

    // Validate all fields
    const isEmailValid = validate("email", email, {
      required: true,
      email: true,
    });

    const isPasswordValid = validate("password", password, {
      required: true,
      minLength: 8,
      customMessage: "Password must be at least 8 characters",
    });

    const isMessageValid = validate("message", message, {
      required: true,
      minLength: 10,
      maxLength: 500,
      customMessage: "Message must be between 10 and 500 characters",
    });

    if (!isEmailValid || !isPasswordValid || !isMessageValid) {
      setToastMessage("Please fix the errors before submitting");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Success
    setToastMessage("Form submitted successfully!");
    setToastType("success");
    setShowToast(true);

    // Reset form
    setEmail("");
    setPassword("");
    setMessage("");
    clearAllErrors();
  };

  const showErrorToast = () => {
    setToastMessage("This is an error message!");
    setToastType("error");
    setShowToast(true);
  };

  const showSuccessToast = () => {
    setToastMessage("Operation completed successfully!");
    setToastType("success");
    setShowToast(true);
  };

  const showWarningToast = () => {
    setToastMessage("Warning: Please check your input!");
    setToastType("warning");
    setShowToast(true);
  };

  const showInfoToast = () => {
    setToastMessage("Here's some helpful information!");
    setToastType("info");
    setShowToast(true);
  };

  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Error Handling System Examples
            </h1>
            <p className="text-lg text-[#4c4c6d]">
              Comprehensive error handling with validation and toast notifications
            </p>
          </div>

          {/* Toast Examples */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Toast Notifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={showErrorToast}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
              >
                Show Error Toast
              </button>
              <button
                onClick={showSuccessToast}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                Show Success Toast
              </button>
              <button
                onClick={showWarningToast}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
              >
                Show Warning Toast
              </button>
              <button
                onClick={showInfoToast}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Show Info Toast
              </button>
            </div>
          </div>

          {/* Form with Validation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Form with Validation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                error={getError("email")}
                helperText="We'll never share your email with anyone"
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                error={getError("password")}
                helperText="Must be at least 8 characters"
                required
              />

              <Textarea
                label="Message"
                placeholder="Enter your message (10-500 characters)"
                value={message}
                onChange={handleMessageChange}
                error={getError("message")}
                rows={4}
                required
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#00a7e6] hover:bg-[#0096d1] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Submit Form
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setMessage("");
                    clearAllErrors();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Inline Error Example */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Inline Error Messages</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Input with error"
                  className="w-full px-4 py-3 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <InputError message="This field has an error" />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Valid input"
                  className="w-full px-4 py-3 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="animate-slide-down mt-2">
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    This field is valid
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Usage Examples</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Email Validation</h3>
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`validate("email", email, {
  required: true,
  email: true,
})`}
                </pre>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Custom Validation</h3>
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`validate("url", url, {
  required: true,
  custom: validateUrl,
  customMessage: "Please enter a valid URL",
})`}
                </pre>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Length Validation</h3>
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`validate("password", password, {
  required: true,
  minLength: 8,
  maxLength: 100,
})`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

