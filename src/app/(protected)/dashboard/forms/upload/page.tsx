'use client';

import { useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Upload, FileText, ArrowLeft, AlertCircle, CheckCircle,
    X, Loader2, CloudUpload
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getAcordForm } from '@/config/acord-forms';

export default function UploadFormPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formId = searchParams.get('formId') || '';
    const formConfig = getAcordForm(formId);

    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        setError(null);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            if (droppedFile.type !== 'application/pdf') {
                setError('Please upload a PDF file');
                return;
            }
            if (droppedFile.size > 20 * 1024 * 1024) {
                setError('File size exceeds 20MB limit');
                return;
            }
            setFile(droppedFile);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Please upload a PDF file');
                return;
            }
            if (selectedFile.size > 20 * 1024 * 1024) {
                setError('File size exceeds 20MB limit');
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file || !formId) return;

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('formId', formId);

            const response = await fetch('/api/forms/upload', {
                method: 'POST',
                body: formData,
            });

            // Check response status before parsing
            if (!response.ok) {
                let errorMessage = `Upload failed (${response.status} ${response.statusText})`;
                try {
                    // Read body as text first (can only be consumed once)
                    const bodyText = await response.text();
                    try {
                        // Try to parse as JSON
                        const errorData = JSON.parse(bodyText);
                        if (errorData.message) {
                            errorMessage += `: ${errorData.message}`;
                        }
                    } catch {
                        // If not JSON, use the raw text
                        if (bodyText) {
                            errorMessage += `: ${bodyText}`;
                        }
                    }
                } catch (bodyError) {
                    console.error('Error reading response body:', bodyError);
                }
                setError(errorMessage);
                return;
            }

            let result;
            try {
                result = await response.json();
            } catch (parseError) {
                setError('Failed to parse server response');
                return;
            }

            if (!result.success) {
                setError(result.message || 'Upload failed');
                return;
            }

            // Store extracted data in localStorage with a generated ID for durability
            const extractedDataId = `extracted-${Date.now()}-${Math.random().toString(36).substring(7)}`;
            localStorage.setItem(extractedDataId, JSON.stringify(result.data));
            
            // Also store in sessionStorage for backward compatibility
            sessionStorage.setItem('extractedFormData', JSON.stringify(result.data));
            
            router.push(`/dashboard/forms/review?formId=${formId}&extractedDataId=${extractedDataId}`);
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    if (!formConfig) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-navy-900 mb-2">Form Not Found</h2>
                <p className="text-navy-600 mb-6">The requested form type could not be found.</p>
                <Link href="/dashboard/forms">
                    <Button>Back to Forms Library</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/dashboard/forms"
                    className="inline-flex items-center text-navy-600 hover:text-navy-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Forms Library
                </Link>

                <h1 className="text-3xl font-bold text-navy-900 mb-2">
                    Upload Completed Form
                </h1>
                <p className="text-navy-600">
                    Upload your filled <span className="font-semibold">{formConfig.formName}</span> and
                    we&apos;ll extract the data automatically
                </p>
            </div>

            {/* Upload Area */}
            <div className="bg-white rounded-2xl border border-navy-100 shadow-lg overflow-hidden">
                {/* Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !file && fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                        if (!file && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            fileInputRef.current?.click();
                        }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Upload PDF file - click or press Enter to browse files, or drag and drop"
                    className={`p-12 border-2 border-dashed rounded-xl m-6 transition-all duration-200 cursor-pointer
            ${isDragging
                            ? 'border-gold-400 bg-gold-50 scale-[1.01]'
                            : file
                                ? 'border-emerald-300 bg-emerald-50'
                                : 'border-navy-200 hover:border-gold-300 hover:bg-navy-50 focus:border-gold-400 focus:bg-gold-50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2'
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {file ? (
                        // File Selected
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <FileText className="w-5 h-5 text-navy-600" />
                                <p className="font-semibold text-navy-900">{file.name}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile();
                                    }}
                                    className="p-1 rounded-full hover:bg-red-100 text-navy-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-sm text-navy-500">{formatFileSize(file.size)}</p>
                        </div>
                    ) : (
                        // Empty State
                        <div className="text-center">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${isDragging ? 'bg-gold-100' : 'bg-navy-100'
                                }`}>
                                <CloudUpload className={`w-8 h-8 ${isDragging ? 'text-gold-500' : 'text-navy-400'}`} />
                            </div>
                            <p className="font-semibold text-navy-900 mb-1">
                                {isDragging ? 'Drop your PDF here' : 'Drag & drop your filled PDF here'}
                            </p>
                            <p className="text-sm text-navy-500 mb-4">
                                or click to browse files
                            </p>
                            <p className="text-xs text-navy-400">
                                PDF format only • Max 20MB
                            </p>
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-3">
                    <Link href="/dashboard/forms" className="flex-shrink-0">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="flex-1 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Extracting Data...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload & Extract Data
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-navy-900 mb-2">💡 Tips for best results</h3>
                <ul className="text-sm text-navy-600 space-y-1.5">
                    <li>• Use Adobe Acrobat Reader (free) to fill the form digitally</li>
                    <li>• Make sure to save the PDF after filling it out</li>
                    <li>• Typed text extracts more accurately than handwritten</li>
                    <li>• You&apos;ll be able to review and edit extracted data before submitting</li>
                </ul>
            </div>
        </div>
    );
}
