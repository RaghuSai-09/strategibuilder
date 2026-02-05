'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Clock, CheckCircle, AlertCircle, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'submitted':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'under-review':
        return <Eye className="w-5 h-5 text-purple-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'denied':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-navy-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-amber-100 text-amber-700';
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'under-review':
        return 'bg-purple-100 text-purple-700';
      case 'approved':
        return 'bg-emerald-100 text-emerald-700';
      case 'denied':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-navy-100 text-navy-700';
    }
  };

  const getInsuranceName = (type: string) => {
    const names: Record<string, string> = {
      'tech-eo': 'Technology E&O',
      'dno': 'Directors & Officers',
      'cyber': 'Cyber Liability',
      'epli': 'EPLI',
      'fiduciary': 'Fiduciary Liability',
      'crime': 'Crime & Fidelity',
    };
    return names[type] || type;
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
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
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 mb-2">
              My Applications
            </h1>
            <p className="text-navy-600">
              View and manage all your insurance applications
            </p>
          </div>
          
          <Link href="/dashboard">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'All' },
          { value: 'draft', label: 'Drafts' },
          { value: 'submitted', label: 'Submitted' },
          { value: 'under-review', label: 'Under Review' },
          { value: 'approved', label: 'Approved' },
        ].map((filterOption) => (
          <button
            key={filterOption.value}
            onClick={() => setFilter(filterOption.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filter === filterOption.value
                ? 'bg-gold-500 text-white shadow-md'
                : 'bg-white text-navy-700 border border-navy-200 hover:border-gold-400'
            }`}
          >
            {filterOption.label}
            {filterOption.value !== 'all' && (
              <span className="ml-2 text-xs opacity-75">
                ({applications.filter(a => a.status === filterOption.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Applications Grid */}
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredApplications.map((application) => (
            <Link
              key={application.id}
              href={`/dashboard/applications/${application.insuranceType}/${application.id}`}
              className="bg-white rounded-xl border-2 border-navy-200 hover:border-gold-400 hover:shadow-xl transition-all duration-300 p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(application.status)}
                  <div>
                    <h3 className="font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                      {getInsuranceName(application.insuranceType)}
                    </h3>
                    <p className="text-sm text-navy-600">
                      {application.companyInfo?.legalName || 'Incomplete'}
                    </p>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              <div className="space-y-2 text-sm text-navy-600 mb-4">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium">{new Date(application.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="font-medium">{new Date(application.updatedAt).toLocaleDateString()}</span>
                </div>
                {application.coverageDetails?.requestedLimits && (
                  <div className="flex justify-between">
                    <span>Coverage Limit:</span>
                    <span className="font-medium">
                      ${parseInt(application.coverageDetails.requestedLimits).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                <span className="text-sm text-navy-500">
                  {application.status === 'draft' ? 'Continue editing' : 'View details'}
                </span>
                <svg className="w-5 h-5 text-navy-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-navy-200">
          <FileText className="w-16 h-16 text-navy-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-navy-900 mb-2">
            No {filter !== 'all' ? filter : ''} applications found
          </h3>
          <p className="text-navy-600 mb-6">
            {filter === 'all' 
              ? "You haven't started any applications yet"
              : `You don't have any ${filter} applications`}
          </p>
          <Link href="/dashboard">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Start New Application
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
