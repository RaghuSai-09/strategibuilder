'use client';

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: (name: string, value: any) => void;
  onBlur?: (name: string) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  error?: string;
  options?: { value: string; label: string }[];
  className?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternMessage?: string;
  };
  disabled?: boolean;
  autoFocus?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  placeholder,
  helperText,
  error,
  options,
  className = '',
  validation,
  disabled = false,
  autoFocus = false,
}) => {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validate = (val: any): string | null => {
    if (required && (val === undefined || val === null || val === '')) {
      return `${label} is required`;
    }

    if (val && validation) {
      if (validation.minLength && typeof val === 'string' && val.length < validation.minLength) {
        return `${label} must be at least ${validation.minLength} characters`;
      }
      if (validation.maxLength && typeof val === 'string' && val.length > validation.maxLength) {
        return `${label} must be no more than ${validation.maxLength} characters`;
      }
      if (type === 'number' || type === 'currency') {
        const numVal = parseFloat(val);
        if (validation.min !== undefined && numVal < validation.min) {
          return `${label} must be at least ${validation.min}`;
        }
        if (validation.max !== undefined && numVal > validation.max) {
          return `${label} must be no more than ${validation.max}`;
        }
      }
      if (validation.pattern && typeof val === 'string') {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(val)) {
          return validation.patternMessage || `${label} format is invalid`;
        }
      }
    }

    if (type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return 'Please enter a valid email address';
      }
    }

    if (type === 'tel' && val) {
      const phoneRegex = /^[\d\s\-()+]{10,}$/;
      if (!phoneRegex.test(val)) {
        return 'Please enter a valid phone number';
      }
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : (type === 'number' || type === 'currency')
      ? e.target.value === '' ? '' : parseFloat(e.target.value) || 0
      : e.target.value;
    
    onChange(name, newValue);

    if (touched) {
      const validationError = validate(newValue);
      setLocalError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validate(value);
    setLocalError(validationError);
    onBlur?.(name);
  };

  const displayError = error || (touched ? localError : null);

  const baseInputClasses = `w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
    displayError
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
      : 'border-navy-200 focus:border-gold-500 focus:ring-gold-500'
  } focus:ring-2 focus:outline-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            rows={4}
            className={baseInputClasses}
          />
        );

      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            className={baseInputClasses}
          >
            <option value="">Select an option...</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-start">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value || false}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              disabled={disabled}
              autoFocus={autoFocus}
              className="mt-1 h-5 w-5 rounded border-navy-300 text-gold-600 focus:ring-gold-500"
            />
            <label htmlFor={name} className="ml-3 text-sm text-navy-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={required}
                  disabled={disabled}
                  className="h-4 w-4 border-navy-300 text-gold-600 focus:ring-gold-500"
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="ml-3 text-sm text-navy-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-500">$</span>
            <input
              type="number"
              id={name}
              name={name}
              value={value || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              autoFocus={autoFocus}
              min={validation?.min}
              max={validation?.max}
              className={`${baseInputClasses} pl-8`}
            />
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            className={baseInputClasses}
          />
        );

      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            className={baseInputClasses}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className={`mb-6 ${className}`}>
        {renderInput()}
        {helperText && <p className="mt-2 text-sm text-navy-500">{helperText}</p>}
        {displayError && (
          <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{displayError}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-navy-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {helperText && <p className="mt-2 text-sm text-navy-500">{helperText}</p>}
      {displayError && (
        <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
};
