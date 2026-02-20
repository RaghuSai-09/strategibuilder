'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Shield, Lock, Globe, Users, TrendingUp, AlertTriangle,
  FileText, Plus, CheckCircle, Clock,
  ChevronRight, Sparkles, Mail,
  Phone, ExternalLink, Target, FileDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Application {
  id: string;
  insuranceType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  data?: {
    companyInfo?: {
      legalName?: string;
    };
  };
  lastSavedStep?: number;
}

interface DraftInfo {
  id: string;
  insuranceType: string;
  lastSavedStep: number;
  updatedAt: string;
  data?: any;
}

const insuranceTypes = [
  {
    id: 'tech-eo',
    name: 'Technology E&O',
    shortName: 'Tech E&O',
    description: 'Professional liability for tech companies',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    available: true,
  },
  {
    id: 'dno',
    name: 'Directors & Officers',
    shortName: 'D&O',
    description: 'Protection for leadership decisions',
    icon: Shield,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    available: true,
  },
  {
    id: 'cyber',
    name: 'Cyber Liability',
    shortName: 'Cyber',
    description: 'Data breach & cyber attack coverage',
    icon: Lock,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    available: true,
  },
  {
    id: 'epli',
    name: 'Employment Practices',
    shortName: 'EPLI',
    description: 'Workplace-related claims protection',
    icon: Users,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    available: true,
  },
  {
    id: 'fiduciary',
    name: 'Fiduciary Liability',
    shortName: 'Fiduciary',
    description: 'Employee benefit plan protection',
    icon: TrendingUp,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    available: false,
  },
  {
    id: 'crime',
    name: 'Crime & Fidelity',
    shortName: 'Crime',
    description: 'Theft & fraud protection',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    available: false,
  },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [applications, setApplications] = useState<Application[]>([]);
  const [drafts, setDrafts] = useState<DraftInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    loadDashboardData();

    // Check if we should show quote modal
    if (searchParams.get('action') === 'quote') {
      setShowQuoteModal(true);
    }
  }, [searchParams]);

  const loadDashboardData = async () => {
    try {
      // Fetch applications
      const appsResponse = await fetch('/api/applications');
      if (appsResponse.ok) {
        const appsData = await appsResponse.json();
        setApplications(appsData.applications || []);
      }

      // Fetch drafts
      const draftsResponse = await fetch('/api/applications/draft');
      if (draftsResponse.ok) {
        const draftsData = await draftsResponse.json();
        setDrafts(draftsData.drafts || []);
      }
    } catch (error) {
      console.error('Dashboard load failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsuranceInfo = (type: string) => insuranceTypes.find(i => i.id === type);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-amber-100 text-amber-700 border-amber-200',
      submitted: 'bg-blue-100 text-blue-700 border-blue-200',
      'under-review': 'bg-purple-100 text-purple-700 border-purple-200',
      approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      denied: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-navy-100 text-navy-700 border-navy-200';
  };

  const draftCount = drafts.length;
  const submittedCount = applications.filter(a => a.status === 'submitted').length;
  const reviewCount = applications.filter(a => a.status === 'under-review').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-navy-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-navy-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-2xl font-bold text-navy-900">{draftCount}</span>
          </div>
          <p className="text-sm text-navy-600 font-medium">Draft Applications</p>
          <p className="text-xs text-navy-400 mt-1">Continue where you left off</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-navy-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-navy-900">{submittedCount}</span>
          </div>
          <p className="text-sm text-navy-600 font-medium">Submitted</p>
          <p className="text-xs text-navy-400 mt-1">Awaiting review</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-navy-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-2xl font-bold text-navy-900">{reviewCount}</span>
          </div>
          <p className="text-sm text-navy-600 font-medium">Under Review</p>
          <p className="text-xs text-navy-400 mt-1">Being processed</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-navy-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-2xl font-bold text-navy-900">{approvedCount}</span>
          </div>
          <p className="text-sm text-navy-600 font-medium">Approved</p>
          <p className="text-xs text-navy-400 mt-1">Ready to bind</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Actions & Drafts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Get Protected Today</h2>
                  <p className="text-navy-300 text-sm">Start a new insurance application</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {insuranceTypes.filter(i => i.available).slice(0, 4).map((insurance) => {
                  const Icon = insurance.icon;
                  const existingDraft = drafts.find(d => d.insuranceType === insurance.id);

                  return (
                    <Link
                      key={insurance.id}
                      href={`/dashboard/applications/${insurance.id}/new`}
                      className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition-all hover:scale-105 group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${insurance.color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-medium text-white">{insurance.shortName}</p>
                      {existingDraft && (
                        <span className="text-xs text-gold-400 mt-1 block">Resume →</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ACORD Forms Quick Action */}
          <Link
            href="/dashboard/forms"
            className="block bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl border border-indigo-200 p-5 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <FileDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 group-hover:text-indigo-600 transition-colors">
                    ACORD Forms
                  </h3>
                  <p className="text-sm text-navy-600">
                    Download blank forms or upload filled PDFs for instant data extraction
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-navy-400 group-hover:text-indigo-500 transition-colors" />
            </div>
          </Link>

          {/* Continue Where You Left Off */}
          {drafts.length > 0 && (
            <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
              <div className="p-5 border-b border-navy-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-navy-900">Continue Where You Left Off</h3>
                  <p className="text-sm text-navy-500 mt-1">Your saved draft applications</p>
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {drafts.length} Draft{drafts.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="divide-y divide-navy-100">
                {drafts.map((draft) => {
                  const insurance = getInsuranceInfo(draft.insuranceType);
                  const Icon = insurance?.icon || FileText;
                  const totalSteps = 15;
                  const progress = Math.round(((draft.lastSavedStep || 0) + 1) / totalSteps * 100);

                  return (
                    <Link
                      key={draft.id}
                      href={`/dashboard/applications/${draft.insuranceType}/new`}
                      className="flex items-center gap-4 p-5 hover:bg-navy-50 transition-colors group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insurance?.color || 'from-navy-500 to-navy-600'} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                            {insurance?.name || draft.insuranceType}
                          </h4>
                          <span className="bg-amber-100 text-amber-600 text-xs font-medium px-2 py-0.5 rounded">
                            Draft
                          </span>
                        </div>
                        <p className="text-sm text-navy-500 mt-1">
                          Last edited {new Date(draft.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                            <span>Step {(draft.lastSavedStep || 0) + 1} of {totalSteps}</span>
                            <span>{progress}% complete</span>
                          </div>
                          <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${insurance?.color || 'from-gold-400 to-gold-500'} rounded-full transition-all`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gold-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Continue
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Applications */}
          {applications.length > 0 && (
            <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
              <div className="p-5 border-b border-navy-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-navy-900">Recent Applications</h3>
                  <p className="text-sm text-navy-500 mt-1">Track your submitted applications</p>
                </div>
                <Link href="/dashboard/applications" className="text-sm text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="divide-y divide-navy-100">
                {applications.slice(0, 5).map((app) => {
                  const insurance = getInsuranceInfo(app.insuranceType);
                  const Icon = insurance?.icon || FileText;

                  return (
                    <Link
                      key={app.id}
                      href={`/dashboard/applications/${app.insuranceType}/${app.id}`}
                      className="flex items-center gap-4 p-5 hover:bg-navy-50 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${insurance?.color || 'from-navy-500 to-navy-600'} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-navy-900 group-hover:text-gold-600 transition-colors truncate">
                          {insurance?.name || app.insuranceType}
                        </h4>
                        <p className="text-sm text-navy-500 truncate">
                          {app.data?.companyInfo?.legalName || 'Company info pending'}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1).replace('-', ' ')}
                        </span>
                        <p className="text-xs text-navy-400 mt-1">
                          {new Date(app.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {applications.length === 0 && drafts.length === 0 && (
            <div className="bg-white rounded-2xl border-2 border-dashed border-navy-200 p-12 text-center">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">No Applications Yet</h3>
              <p className="text-navy-600 mb-6 max-w-sm mx-auto">
                Get started by selecting a coverage type above to begin your first application.
              </p>
              <Button onClick={() => setShowQuoteModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Start Your First Application
              </Button>
            </div>
          )}
        </div>

        {/* Right Column - Activity & Help */}
        <div className="space-y-6">
          {/* Activity Timeline */}
          <div className="bg-white rounded-2xl border border-navy-100 p-5">
            <h3 className="font-bold text-navy-900 mb-4">Recent Activity</h3>

            {(applications.length > 0 || drafts.length > 0) ? (
              <div className="space-y-4">
                {[...applications, ...drafts.map(d => ({ ...d, status: 'draft' as const }))]
                  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                  .slice(0, 5)
                  .map((item, idx) => {
                    const insurance = getInsuranceInfo(item.insuranceType);
                    const Icon = insurance?.icon || FileText;

                    return (
                      <div key={idx} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${insurance?.color || 'from-navy-400 to-navy-500'} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-navy-900 font-medium truncate">
                            {insurance?.shortName} - {item.status === 'draft' ? 'Draft Saved' : 'Application ' + item.status}
                          </p>
                          <p className="text-xs text-navy-500">
                            {new Date(item.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-navy-500 text-center py-6">No recent activity</p>
            )}
          </div>

          {/* Quick Help */}
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl border border-gold-200 p-5">
            <h3 className="font-bold text-navy-900 mb-4">Need Assistance?</h3>

            <div className="space-y-3">
              <a
                href="mailto:marianne@strategibuilder.com"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gold-200 hover:border-gold-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">Email Support</p>
                  <p className="text-xs text-navy-500">Get help via email</p>
                </div>
                <ExternalLink className="w-4 h-4 text-navy-400" />
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gold-200 hover:border-gold-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">Call Us</p>
                  <p className="text-xs text-navy-500">Speak with an expert</p>
                </div>
                <ExternalLink className="w-4 h-4 text-navy-400" />
              </a>

              <a
                href="/help"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gold-200 hover:border-gold-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gold-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">Help Center</p>
                  <p className="text-xs text-navy-500">Browse FAQs & guides</p>
                </div>
                <ChevronRight className="w-4 h-4 text-navy-400" />
              </a>
            </div>
          </div>

          {/* Coverage Reminder */}
          <div className="bg-white rounded-2xl border border-navy-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-bold text-navy-900">Coverage Types</h3>
            </div>
            <p className="text-sm text-navy-600 mb-4">
              Explore our full range of insurance products designed for your business.
            </p>
            <div className="flex flex-wrap gap-2">
              {insuranceTypes.map((insurance) => (
                <span
                  key={insurance.id}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border ${insurance.available
                    ? `${insurance.bgColor} ${insurance.borderColor} text-navy-700`
                    : 'bg-navy-50 border-navy-200 text-navy-400'
                    }`}
                >
                  {insurance.shortName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Selection Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-navy-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Select Coverage Type</h2>
                <p className="text-navy-600 mt-1">Choose the insurance product you need</p>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="p-2 hover:bg-navy-50 rounded-lg transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {insuranceTypes.map((insurance) => {
                const Icon = insurance.icon;
                const existingDraft = drafts.find(d => d.insuranceType === insurance.id);

                return (
                  <Link
                    key={insurance.id}
                    href={insurance.available ? `/dashboard/applications/${insurance.id}/new` : '#'}
                    onClick={(e) => {
                      if (insurance.available) {
                        setShowQuoteModal(false);
                      } else {
                        e.preventDefault();
                      }
                    }}
                    className={`relative bg-white rounded-xl p-5 border-2 transition-all ${insurance.available
                      ? 'border-navy-200 hover:border-gold-400 hover:shadow-lg'
                      : 'border-navy-100 opacity-50 cursor-not-allowed'
                      }`}
                  >
                    {!insurance.available && (
                      <div className="absolute top-3 right-3 bg-navy-100 text-navy-500 text-xs font-medium px-2 py-1 rounded-full">
                        Coming Soon
                      </div>
                    )}

                    {existingDraft && insurance.available && (
                      <div className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">
                        Resume Draft
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insurance.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-navy-900 mb-1">{insurance.name}</h3>
                    <p className="text-navy-600 text-sm">{insurance.description}</p>

                    {insurance.available && (
                      <div className="mt-4 flex items-center text-gold-600 font-semibold text-sm">
                        {existingDraft ? 'Continue Application' : 'Start Application'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
