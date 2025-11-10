# UI Components - Error Handling System

This directory contains reusable UI components with built-in error handling capabilities.

## Components

### 1. ErrorMessage & InputError

Display error messages below form inputs with animated slide-down effects.

```tsx
import { InputError } from "@/components/ui/ErrorMessage";

// Usage
<InputError message="Please enter a valid email" />
```

### 2. Toast Notifications

Global toast notifications for success, error, warning, and info messages.

```tsx
import Toast from "@/components/ui/Toast";
import { useState } from "react";

function MyComponent() {
  const [showToast, setShowToast] = useState(false);
  
  return (
    <Toast
      message="Successfully saved!"
      type="success" // or "error", "warning", "info"
      show={showToast}
      onClose={() => setShowToast(false)}
      duration={5000} // optional, defaults to 5000ms
    />
  );
}
```

### 3. Input Components

Pre-styled input fields with built-in error handling.

```tsx
import Input, { Textarea } from "@/components/ui/Input";

function MyForm() {
  const [error, setError] = useState("");
  
  return (
    <>
      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        error={error}
        helperText="We'll never share your email"
        required
      />
      
      <Textarea
        label="Message"
        placeholder="Enter your message"
        error={error}
        rows={4}
      />
    </>
  );
}
```

## Form Validation Hook

### useFormValidation

A custom hook for form validation with multiple validation rules.

```tsx
import useFormValidation from "@/hooks/useFormValidation";

function MyForm() {
  const { validate, getError, clearError, clearAllErrors } = useFormValidation();
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validate("email", email, {
      required: true,
      email: true,
      minLength: 5,
      maxLength: 100,
    });
    
    if (!isValid) {
      // Error is automatically set
      return;
    }
    
    // Proceed with form submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          clearError("email"); // Clear error on input
        }}
        error={getError("email")}
      />
    </form>
  );
}
```

## Validation Rules

Available validation rules for `useFormValidation`:

- **required**: Field must not be empty
- **email**: Valid email format
- **minLength**: Minimum character length
- **maxLength**: Maximum character length
- **pattern**: Custom regex pattern
- **custom**: Custom validation function
- **customMessage**: Custom error message for pattern/custom validation

## Examples

### Email Validation with Toast

```tsx
import { useState } from "react";
import Input from "@/components/ui/Input";
import Toast from "@/components/ui/Toast";
import useFormValidation from "@/hooks/useFormValidation";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { validate, getError, clearError } = useFormValidation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validate("email", email, {
      required: true,
      email: true,
    });
    
    if (!isValid) {
      setShowToast(true);
      return;
    }
    
    // Success logic
    console.log("Email submitted:", email);
  };
  
  return (
    <>
      <Toast
        message="Please enter a valid email"
        type="error"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
          placeholder="Enter your email"
          error={getError("email")}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
```

### Custom URL Validation

```tsx
const validateUrl = (url: string): boolean => {
  try {
    let testUrl = url.trim();
    if (!testUrl.startsWith("http://") && !testUrl.startsWith("https://")) {
      testUrl = "https://" + testUrl;
    }
    new URL(testUrl);
    return true;
  } catch {
    return false;
  }
};

const isValid = validate("url", url, {
  required: true,
  custom: validateUrl,
  customMessage: "Please enter a valid website URL",
});
```

## Styling

All components use Tailwind CSS with:
- Red highlights for errors (`border-red-500`, `text-red-600`)
- Smooth animations (`animate-slide-down`, `animate-slide-down-fade`)
- Focus states with ring effects
- Responsive design

## Features

✅ **Dropdown cascading effect** - Errors slide down smoothly  
✅ **Red highlights** - Clear visual indication of errors  
✅ **Auto-dismiss toast** - Toast messages auto-close after duration  
✅ **Multiple validation rules** - Email, required, length, pattern, custom  
✅ **Reusable components** - Use across entire application  
✅ **TypeScript support** - Full type safety  
✅ **Accessible** - Proper ARIA labels and semantic HTML  
✅ **Responsive** - Works on all screen sizes

