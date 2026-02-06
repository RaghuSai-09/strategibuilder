'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MultiStepForm } from '@/components/forms/MultiStepForm';
import { FormField } from '@/components/forms/FormField';
import { getAllSteps, getInsuranceConfig } from '@/config/forms';
import { ArrowLeft, Save, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// Helper function to get nested value from object
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper function to set nested value in object
const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
};

interface FormStepComponentProps {
  formData?: any;
  updateFormData?: (data: any) => void;
  getFieldError?: (fieldName: string) => string | undefined;
  markFieldTouched?: (fieldName: string) => void;
  fields: any[];
}

const FormStepComponent: React.FC<FormStepComponentProps> = ({
  formData = {},
  updateFormData = () => {},
  getFieldError,
  markFieldTouched,
  fields,
}) => {
  const handleFieldChange = (name: string, value: any) => {
    const newData = { ...formData };
    setNestedValue(newData, name, value);
    updateFormData(newData);
  };

  const handleFieldBlur = (name: string) => {
    markFieldTouched?.(name);
  };

  // Group fields into columns for better layout (2 columns for short fields)
  const renderFields = () => {
    return (
      <div className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={getNestedValue(formData, field.name)}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={getFieldError?.(field.name)}
          />
        ))}
      </div>
    );
  };

  return renderFields();
};

export default function NewApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const insuranceType = params.type as string;
  
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [savedDraftId, setSavedDraftId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<any>({});

  useEffect(() => {
    // Load configuration for this insurance type
    const insuranceConfig = getInsuranceConfig(insuranceType);
    if (!insuranceConfig) {
      router.push('/dashboard');
      return;
    }

    setConfig(insuranceConfig);
    const allSteps = getAllSteps(insuranceType);
    setSteps(allSteps);

    // Check for existing draft
    const loadDraft = async () => {
      try {
        const response = await fetch(`/api/applications/draft?type=${insuranceType}`);
        if (response.ok) {
          const draft = await response.json();
          if (draft && draft.id) {
            setInitialData(draft.data || {});
            setSavedDraftId(draft.id);
          }
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    };

    loadDraft();
    setLoading(false);
  }, [insuranceType, router]);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: savedDraftId,
          insuranceType,
          data: formData,
          status: 'submitted',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Show success message
        router.push('/dashboard/applications?submitted=true');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      throw error;
    }
  };

  const handleSave = async (formData: any, currentStep: number) => {
    try {
      const response = await fetch('/api/applications/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: savedDraftId,
          insuranceType,
          data: formData,
          lastSavedStep: currentStep,
          status: 'draft',
          savedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.id) {
          setSavedDraftId(result.id);
        }
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-navy-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center py-12">
        <p className="text-navy-600">Insurance type not found</p>
        <Link href="/dashboard" className="text-gold-600 hover:text-gold-700 mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-navy-600 hover:text-navy-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 mb-2">
              {config.name} Application
            </h1>
            <p className="text-navy-600">
              {config.description}
            </p>
          </div>
          
          {savedDraftId && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm">
              <Save className="w-4 h-4" />
              <span>Draft saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Help Banner */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Your progress is automatically saved every 30 seconds. 
            You can also click &ldquo;Save Draft&rdquo; at any time to save your progress and return later.
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>
      </div>

      {/* Multi-Step Form */}
      <MultiStepForm
        steps={steps}
        onSubmit={handleSubmit}
        onSave={handleSave}
        initialData={initialData}
        insuranceType={insuranceType}
      >
        {steps.map((step) => (
          <FormStepComponent
            key={step.id}
            fields={step.fields || []}
          />
        ))}
      </MultiStepForm>

      {/* Footer Help */}
      <div className="mt-8 text-center text-sm text-navy-500">
        <p>
          Questions about your application? Contact us at{' '}
          <a href="mailto:support@strategiinsurance.com" className="text-gold-600 hover:text-gold-700">
            support@strategiinsurance.com
          </a>
        </p>
      </div>
    </div>
  );
}
