import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable InputField component following the DRY (Don't Repeat Yourself) principle.
 * Encapsulates label, input styling, password toggle visibility, helper text, and error states.
 */
export default function InputField({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  className = '',
  inputClassName = '',
  rightElement,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`space-y-0.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11px] font-semibold text-gray-700 select-none"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-[#f8fafc] border rounded-lg py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#008848] focus:outline-none transition-all ${
            isPassword ? 'pl-3 pr-9' : 'px-3'
          } ${
            error ? 'border-red-400 focus:border-red-500' : 'border-gray-200/80'
          } ${inputClassName}`}
          {...props}
        />

        {/* Built-in eye toggle for password inputs */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-0.5 focus:outline-none cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-3.5 h-3.5 stroke-[2]" />
            ) : (
              <Eye className="w-3.5 h-3.5 stroke-[2]" />
            )}
          </button>
        )}

        {rightElement && !isPassword && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="text-[10px] text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
