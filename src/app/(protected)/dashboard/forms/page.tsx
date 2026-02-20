'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    FileText, Download, Upload, ArrowLeft, Globe, Shield,
    Lock, Users, CheckCircle, ExternalLink, FileDown, FileUp
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { acordForms, type AcordFormConfig } from '@/config/acord-forms';

const iconMap: Record<string, React.ElementType> = {
    Globe, Shield, Lock, Users,
};

export default function FormsLibraryPage() {
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const handleDownload = async (form: AcordFormConfig) => {
        setDownloadingId(form.id);
        try {
            // Use native browser download for files in public/
            const link = document.createElement('a');
            link.href = form.downloadPath;
            link.download = form.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } finally {
            setTimeout(() => setDownloadingId(null), 1000);
        }
    };

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

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-navy-900 mb-2">
                            ACORD Forms Library
                        </h1>
                        <p className="text-navy-600">
                            Download blank forms, fill them offline, and upload completed forms for processing
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                    <h2 className="text-xl font-bold mb-4">How It Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <FileDown className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">1. Download</p>
                                <p className="text-navy-300 text-xs mt-1">
                                    Download the blank ACORD form for your insurance type
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">2. Fill Out</p>
                                <p className="text-navy-300 text-xs mt-1">
                                    Complete the form using Adobe Acrobat, Preview, or any PDF editor
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                                <FileUp className="w-5 h-5 text-gold-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">3. Upload</p>
                                <p className="text-navy-300 text-xs mt-1">
                                    Upload the filled form — we&apos;ll extract your data automatically
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acordForms.map((form) => {
                    const Icon = iconMap[form.icon] || FileText;
                    const isDownloading = downloadingId === form.id;

                    return (
                        <div
                            key={form.id}
                            className={`bg-white rounded-2xl border-2 ${form.borderColor} hover:shadow-xl transition-all duration-300 overflow-hidden`}
                        >
                            {/* Card Header */}
                            <div className={`${form.bgColor} p-5 border-b ${form.borderColor}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${form.color} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-navy-900 text-lg">{form.formName}</h3>
                                        <p className="text-sm text-navy-600">{form.acordNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5">
                                <p className="text-sm text-navy-600 mb-4 leading-relaxed">
                                    {form.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-navy-500 mb-5">
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>{form.pageCount} pages</span>
                                    <span className="text-navy-300">•</span>
                                    <span>PDF Format</span>
                                    <span className="text-navy-300">•</span>
                                    <span>Fillable Form</span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDownload(form)}
                                        disabled={isDownloading}
                                        className="flex-1"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        {isDownloading ? 'Downloading...' : 'Download Blank'}
                                    </Button>

                                    <Link 
                                        href={`/dashboard/forms/upload?formId=${form.id}`} 
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Filled
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Coming Soon Card */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-navy-200 p-8 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-navy-300" />
                    </div>
                    <h3 className="font-bold text-navy-900 mb-2">More Forms Coming Soon</h3>
                    <p className="text-sm text-navy-500">
                        D&O, Cyber, and EPLI ACORD forms will be available shortly
                    </p>
                </div>
            </div>

            {/* Alternative CTA */}
            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <ExternalLink className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-navy-900">Prefer filling out online?</h3>
                            <p className="text-sm text-navy-600">
                                Use our interactive online forms with real-time validation and auto-save
                            </p>
                        </div>
                    </div>
                    <Link href="/dashboard?action=quote">
                        <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100">
                            Fill Online Instead
                            <CheckCircle className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
