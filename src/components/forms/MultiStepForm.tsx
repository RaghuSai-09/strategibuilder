'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Step {
  id: string;
  title: string;
  description: string;
  fields?: any[];
}

interface ValidationError {
  field: string;
  message: string;
}

interface MultiStepFormProps {
  steps: Step[];
  children: React.ReactNode[];
  onSubmit: (data: any) => Promise<void>;
  onSave?: (data: any, currentStep: number) => Promise<void>;
  initialStep?: number;
  initialData?: any;
  insuranceType?: string;
}

// Helper to get nested value
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  children,
  onSubmit,
  onSave,
  initialStep = 0,
  initialData = {},
  insuranceType = '',
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Validate current step
  const validateStep = useCallback((stepIndex: number): ValidationError[] => {
    const step = steps[stepIndex];
    const stepErrors: ValidationError[] = [];
    
    if (!step.fields) return stepErrors;

    for (const field of step.fields) {
      if (field.required) {
        const value = getNestedValue(formData, field.name);
        
        if (value === undefined || value === null || value === '') {
          stepErrors.push({
            field: field.name,
            message: `${field.label} is required`,
          });
        }
        
        // Email validation
        if (field.type === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            stepErrors.push({
              field: field.name,
              message: 'Please enter a valid email address',
            });
          }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
          const phoneRegex = /^[\d\s\-+()]{10,}$/;
          if (!phoneRegex.test(value)) {
            stepErrors.push({
              field: field.name,
              message: 'Please enter a valid phone number',
            });
          }
        }
        
        // Number validation
        if (field.type === 'number' && value !== undefined) {
          if (field.validation?.min !== undefined && value < field.validation.min) {
            stepErrors.push({
              field: field.name,
              message: `${field.label} must be at least ${field.validation.min}`,
            });
          }
          if (field.validation?.max !== undefined && value > field.validation.max) {
            stepErrors.push({
              field: field.name,
              message: `${field.label} must be no more than ${field.validation.max}`,
            });
          }
        }
      }
    }
    
    return stepErrors;
  }, [formData, steps]);

  const handleNext = () => {
    // Validate current step before proceeding
    const stepErrors = validateStep(currentStep);
    
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      // Mark all fields as touched
      const newTouched = new Set(touched);
      for (const err of stepErrors) {
        newTouched.add(err.field);
      }
      setTouched(newTouched);
      return;
    }
    
    setErrors([]);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setErrors([]);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSave = useCallback(async () => {
    if (!onSave) return;
    
    setSaving(true);
    setSaveMessage(null);
    
    try {
      await onSave(formData, currentStep);
      setSaveMessage('Draft saved successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      setSaveMessage('Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  }, [formData, currentStep, onSave]);

  const handleSubmit = async () => {
    // Validate all steps before submitting
    let allErrors: ValidationError[] = [];
    for (let i = 0; i <= currentStep; i++) {
      allErrors = [...allErrors, ...validateStep(i)];
    }
    
    if (allErrors.length > 0) {
      setErrors(allErrors);
      return;
    }
    
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateFormData = useCallback((data: any) => {
    setFormData((prev: any) => {
      // Deep merge the data
      const merged = { ...prev };
      for (const key of Object.keys(data)) {
        if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
          merged[key] = { ...prev[key], ...data[key] };
        } else {
          merged[key] = data[key];
        }
      }
      return merged;
    });
  }, []);

  const getFieldError = useCallback((fieldName: string): string | undefined => {
    const error = errors.find(e => e.field === fieldName);
    return touched.has(fieldName) ? error?.message : undefined;
  }, [errors, touched]);

  const markFieldTouched = useCallback((fieldName: string) => {
    setTouched(prev => new Set(prev).add(fieldName));
  }, []);

  // Auto-save every 30 seconds if there's data
  useEffect(() => {
    if (!onSave || Object.keys(formData).length === 0) return;
    
    const autoSaveInterval = setInterval(() => {
      handleSave();
    }, 30000);
    
    return () => clearInterval(autoSaveInterval);
  }, [formData, onSave, handleSave]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            let stepButtonClass: string;
            
            if (index < currentStep) {
              stepButtonClass = 'bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600';
            } else if (index === currentStep) {
              stepButtonClass = 'bg-gold-500 text-white ring-4 ring-gold-200';
            } else {
              stepButtonClass = 'bg-navy-100 text-navy-400 cursor-not-allowed';
            }
            
            return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-shrink-0" style={{ minWidth: '60px' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (index < currentStep) {
                      setCurrentStep(index);
                      setErrors([]);
                    }
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${stepButtonClass}`}
                  disabled={index > currentStep}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </button>
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium whitespace-nowrap ${
                      index <= currentStep ? 'text-navy-900' : 'text-navy-400'
                    }`}
                  >
                    {step.title.length > 12 ? step.title.slice(0, 12) + '...' : step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-1 rounded transition-all duration-300 min-w-[20px] ${
                    index < currentStep ? 'bg-emerald-500' : 'bg-navy-100'
                  }`}
                  style={{ marginTop: '-1.5rem' }}
                />
              )}
            </React.Fragment>
          );
          })}
        </div>

        {/* Step Description */}
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">
            {steps[currentStep]?.title}
          </h2>
          <p className="text-navy-600">{steps[currentStep]?.description}</p>
        </div>
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800 mb-2">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {errors.slice(0, 5).map((error, idx) => (
                  <li key={idx}>{error.message}</li>
                ))}
                {errors.length > 5 && (
                  <li>...and {errors.length - 5} more errors</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Save Message */}
      {saveMessage && (
        <div className={`mb-6 p-4 rounded-xl ${
          saveMessage.includes('success') 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-amber-50 border border-amber-200 text-amber-800'
        }`}>
          <p className="text-sm font-medium">{saveMessage}</p>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-lg border border-navy-100 p-8 mb-6">
        {React.Children.map(children, (child, index) => {
          if (index === currentStep && React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              formData,
              updateFormData,
              getFieldError,
              markFieldTouched,
            });
          }
          return null;
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="min-w-[120px]"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
        </div>

        <div className="flex gap-3">
          {onSave && (
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={saving}
              className="min-w-[120px]"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
          )}
          
          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="min-w-[120px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
              <Check className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="min-w-[120px]"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-center text-sm text-navy-500">
        Step {currentStep + 1} of {steps.length} • {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
      </div>
    </div>
  );
};
