'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, CheckCircle, AlertCircle, Edit3, ChevronDown,
    ChevronRight, FileText, Send, Loader2, Check, X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getAcordForm } from '@/config/acord-forms';

interface ExtractedField {
    pdfFieldName: string;
    label: string;
    value: string | boolean;
    type: 'text' | 'checkbox' | 'dropdown' | 'radio';
}

interface ExtractionData {
    formId: string;
    totalFields: number;
    filledFields: number;
    emptyFields: number;
    completionPercentage: number;
    fields: ExtractedField[];
    filledFieldsOnly: ExtractedField[];
    groupedFields: Record<string, ExtractedField[]>;
}

export default function ReviewFormPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formId = searchParams.get('formId') || '';
    const extractedDataId = searchParams.get('extractedDataId');
    const formConfig = getAcordForm(formId);

    const [data, setData] = useState<ExtractionData | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showAllFields, setShowAllFields] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Load extracted data from localStorage (durable) or sessionStorage (fallback)
        let stored: string | null = null;
        
        if (extractedDataId) {
            // Try to retrieve by extractedDataId from localStorage
            stored = localStorage.getItem(extractedDataId);
        }
        
        // Fallback to sessionStorage
        if (!stored) {
            stored = sessionStorage.getItem('extractedFormData');
        }
        
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as ExtractionData;
                setData(parsed);
                // Auto-expand all sections
                setExpandedSections(new Set(Object.keys(parsed.groupedFields)));
            } catch (error) {
                console.error('Failed to parse extracted form data:', error);
                // Clean up bad data
                if (extractedDataId) {
                    localStorage.removeItem(extractedDataId);
                }
                sessionStorage.removeItem('extractedFormData');
            }
        }
    }, [extractedDataId]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(section)) {
                next.delete(section);
            } else {
                next.add(section);
            }
            return next;
        });
    };

    const startEditing = (fieldName: string, currentValue: string | boolean) => {
        setEditingField(fieldName);
        setEditValue(String(currentValue));
    };

    const saveEdit = (fieldName: string) => {
        if (!data) return;

        // Helper to check if a field is filled
        const isFilled = (field: ExtractedField) => {
            return field.type === 'checkbox' ? field.value === true : field.value !== '';
        };

        // Find original field to check type
        const originalField = data.fields.find(f => f.pdfFieldName === fieldName);
        let finalValue: string | boolean = editValue;

        // Preserve boolean type for checkboxes
        if (originalField && originalField.type === 'checkbox') {
            finalValue = editValue === 'true';
        }

        const updatedFields = data.fields.map(f =>
            f.pdfFieldName === fieldName ? { ...f, value: finalValue } : f
        );
        const updatedFilledOnly = updatedFields.filter(isFilled);

        // Re-group
        const updatedGrouped: Record<string, ExtractedField[]> = {};
        for (const [section, fields] of Object.entries(data.groupedFields)) {
            updatedGrouped[section] = fields.map(f =>
                f.pdfFieldName === fieldName ? { ...f, value: finalValue } : f
            );
        }

        // Recalculate stats
        const filledCount = updatedFields.filter(isFilled).length;
        const emptyCount = updatedFields.length - filledCount;
        const completionPct = updatedFields.length > 0 
            ? Math.round((filledCount / updatedFields.length) * 100) 
            : 0;

        setData({
            ...data,
            fields: updatedFields,
            filledFieldsOnly: updatedFilledOnly,
            groupedFields: updatedGrouped,
            filledFields: filledCount,
            emptyFields: emptyCount,
            completionPercentage: completionPct,
        });
        setEditingField(null);
        setEditValue('');
    };

    const cancelEdit = () => {
        setEditingField(null);
        setEditValue('');
    };

    const handleSubmit = async () => {
        if (!data) return;
        setSubmitting(true);
        setError(null);

        try {
            // For now, simulate submission
            // In production, this would send to your applications API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Clean up sessionStorage and localStorage
            sessionStorage.removeItem('extractedFormData');
            if (extractedDataId) {
                localStorage.removeItem(extractedDataId);
            }
            setSubmitted(true);
        } catch (error) {
            console.error('Submit failed:', error);
            setError(
                'Failed to submit application. ' +
                (error instanceof Error ? error.message : 'Please try again.')
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!formConfig) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-navy-900 mb-2">Form Not Found</h2>
                <Link href="/dashboard/forms">
                    <Button>Back to Forms Library</Button>
                </Link>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <AlertCircle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-navy-900 mb-2">No Data Found</h2>
                <p className="text-navy-600 mb-6">
                    Please upload a filled form first to review the extracted data.
                </p>
                <Link href={`/dashboard/forms/upload?formId=${formId}`}>
                    <Button>Upload Form</Button>
                </Link>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-navy-900 mb-3">Application Submitted!</h2>
                <p className="text-navy-600 mb-8 max-w-md mx-auto">
                    Your {formConfig.formName} data has been submitted successfully.
                    You&apos;ll receive a confirmation shortly.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/dashboard">
                        <Button variant="outline">Go to Dashboard</Button>
                    </Link>
                    <Link href="/dashboard/forms">
                        <Button>Upload Another Form</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href={`/dashboard/forms/upload?formId=${formId}`}
                    className="inline-flex items-center text-navy-600 hover:text-navy-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Upload
                </Link>

                <h1 className="text-3xl font-bold text-navy-900 mb-2">
                    Review Extracted Data
                </h1>
                <p className="text-navy-600">
                    Review the data extracted from your <span className="font-semibold">{formConfig.formName}</span>.
                    Click any field to edit.
                </p>
            </div>

            {/* Extraction Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-navy-100 p-4 text-center">
                    <p className="text-2xl font-bold text-navy-900">{data.totalFields}</p>
                    <p className="text-xs text-navy-500">Total Fields</p>
                </div>
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-700">{data.filledFields}</p>
                    <p className="text-xs text-emerald-600">Fields Filled</p>
                </div>
                <div className="bg-white rounded-xl border border-navy-100 p-4 text-center">
                    <p className="text-2xl font-bold text-navy-900">{data.completionPercentage}%</p>
                    <p className="text-xs text-navy-500">Complete</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="w-full h-2 bg-navy-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${data.completionPercentage}%` }}
                    />
                </div>
            </div>

            {/* Toggle: Show all vs filled only */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy-900">Extracted Fields</h2>
                <button
                    onClick={() => setShowAllFields(!showAllFields)}
                    className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                >
                    {showAllFields ? 'Show filled only' : 'Show all fields'}
                </button>
            </div>

            {/* Grouped Fields */}
            <div className="space-y-3 mb-8">
                {Object.entries(data.groupedFields).map(([sectionName, sectionFields]) => {
                    const displayFields = showAllFields
                        ? sectionFields
                        : sectionFields.filter(f => f.type === 'checkbox' ? f.value === true : f.value !== '');

                    if (displayFields.length === 0) return null;

                    const isExpanded = expandedSections.has(sectionName);

                    return (
                        <div
                            key={sectionName}
                            className="bg-white rounded-xl border border-navy-100 overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(sectionName)}
                                className="w-full flex items-center justify-between p-4 hover:bg-navy-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-navy-500" />
                                    <span className="font-semibold text-navy-900">{sectionName}</span>
                                    <span className="text-xs bg-navy-100 text-navy-600 px-2 py-0.5 rounded-full">
                                        {displayFields.length} field{displayFields.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-navy-400" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-navy-400" />
                                )}
                            </button>

                            {/* Section Fields */}
                            {isExpanded && (
                                <div className="border-t border-navy-100 divide-y divide-navy-50">
                                    {displayFields.map((field) => (
                                        <div
                                            key={field.pdfFieldName}
                                            className="flex items-center gap-4 px-4 py-3 hover:bg-navy-50 transition-colors group"
                                        >
                                            {/* Label */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-navy-900 truncate">
                                                    {field.label}
                                                </p>
                                                <p className="text-xs text-navy-400">{field.pdfFieldName}</p>
                                            </div>

                                            {/* Value / Edit */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {editingField === field.pdfFieldName ? (
                                                    <div className="flex items-center gap-2">
                                                        {field.type === 'checkbox' ? (
                                                            <select
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                className="px-2 py-1 border border-navy-200 rounded-lg text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                                            >
                                                                <option value="true">Yes (Checked)</option>
                                                                <option value="false">No (Unchecked)</option>
                                                            </select>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                className="px-2 py-1 border border-navy-200 rounded-lg text-sm w-48 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                                                                autoFocus
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') saveEdit(field.pdfFieldName);
                                                                    if (e.key === 'Escape') cancelEdit();
                                                                }}
                                                            />
                                                        )}
                                                        <button
                                                            onClick={() => saveEdit(field.pdfFieldName)}
                                                            className="p-1 text-emerald-500 hover:bg-emerald-50 rounded"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className={`text-sm max-w-xs truncate ${field.type === 'checkbox'
                                                                ? field.value
                                                                    ? 'text-emerald-600 font-medium'
                                                                    : 'text-navy-400'
                                                                : field.value
                                                                    ? 'text-navy-700'
                                                                    : 'text-navy-300 italic'
                                                            }`}>
                                                            {field.type === 'checkbox'
                                                                ? field.value ? '✓ Yes' : '✗ No'
                                                                : field.value || 'Empty'}
                                                        </span>
                                                        <button
                                                            onClick={() => startEditing(field.pdfFieldName, field.value)}
                                                            className="p-1 text-navy-400 hover:text-gold-500 opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1 rounded"
                                                            aria-label={`Edit ${field.label}`}
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Submit Actions */}
            <div className="sticky bottom-0 bg-white border-t border-navy-100 -mx-6 px-6 py-4 rounded-b-xl shadow-lg">
                {error && (
                    <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}
                <div className="flex items-center justify-between gap-4">
                    <Link href={`/dashboard/forms/upload?formId=${formId}`}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Re-upload
                        </Button>
                    </Link>

                    <div className="flex items-center gap-3">
                        <p className="text-sm text-navy-500">
                            {data.filledFields} of {data.totalFields} fields filled
                        </p>
                        <Button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Application
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
