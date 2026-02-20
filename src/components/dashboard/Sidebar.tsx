'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Plus,
  Menu,
  X,
  Bell,
  Sparkles,
  FileDown,
} from 'lucide-react';

interface SidebarProps {
  user: {
    name: string;
    email: string;
    companyName?: string;
  } | null;
  onLogout: () => void;
}

interface DraftApplication {
  id: string;
  insuranceType: string;
  lastSavedStep: number;
  updatedAt: string;
  data?: {
    companyInfo?: {
      legalName?: string;
    };
  };
}

const insuranceTypeNames: Record<string, string> = {
  'tech-eo': 'Tech E&O',
  'dno': 'D&O',
  'cyber': 'Cyber',
  'epli': 'EPLI',
  'fiduciary': 'Fiduciary',
  'crime': 'Crime',
};

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [drafts, setDrafts] = useState<DraftApplication[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    loadSidebarData();
  }, [pathname]);

  const loadSidebarData = async () => {
    try {
      // Load drafts
      const draftsRes = await fetch('/api/applications/draft');
      if (draftsRes.ok) {
        const data = await draftsRes.json();
        setDrafts(data.drafts || []);
      }

      // Load applications
      const appsRes = await fetch('/api/applications');
      if (appsRes.ok) {
        const data = await appsRes.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Failed to load sidebar data:', error);
    }
  };

  const draftCount = drafts.length;
  const submittedCount = applications.filter(a => a.status === 'submitted').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const pendingCount = applications.filter(a => a.status === 'under-review').length;

  const mainNavItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/dashboard',
    },
    {
      name: 'My Applications',
      href: '/dashboard/applications',
      icon: FileText,
      active: pathname?.startsWith('/dashboard/applications'),
      badge: applications.length || undefined,
    },
    {
      name: 'Insurance Forms',
      href: '/dashboard/forms',
      icon: FileDown,
      active: pathname?.startsWith('/dashboard/forms'),
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      active: pathname === '/profile',
    },
  ];

  const statusItems = [
    {
      name: 'Drafts',
      count: draftCount,
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      name: 'Submitted',
      count: submittedCount,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Under Review',
      count: pendingCount,
      icon: Shield,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Approved',
      count: approvedCount,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo & Header */}
      <div className="p-6 border-b border-navy-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-gold-400" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-navy-900 text-lg">Strategi</h1>
              <p className="text-xs text-navy-500">Insurance Portal</p>
            </div>
          )}
        </Link>
      </div>

      {/* User Info */}
      {user && !isCollapsed && (
        <div className="p-4 mx-4 mt-4 bg-gradient-to-br from-navy-50 to-slate-50 rounded-xl border border-navy-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy-900 truncate">{user.name}</p>
              <p className="text-xs text-navy-500 truncate">{user.email}</p>
            </div>
          </div>
          {user.companyName && (
            <div className="mt-3 pt-3 border-t border-navy-100">
              <p className="text-xs text-navy-500">Company</p>
              <p className="text-sm font-medium text-navy-700 truncate">{user.companyName}</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <Link
          href="/dashboard?action=quote"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-gold-500 to-amber-500 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-amber-600 transition-all shadow-lg shadow-gold-500/25"
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && 'Get a Quote'}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 mt-6 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                  ? 'bg-navy-900 text-white'
                  : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium">{item.name}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${item.active ? 'bg-white/20 text-white' : 'bg-navy-100 text-navy-600'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {/* Status Overview */}
        {!isCollapsed && (
          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">
              Overview
            </h3>
            <div className="space-y-2">
              {statusItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-navy-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="flex-1 text-sm text-navy-600">{item.name}</span>
                    <span className="font-semibold text-navy-900">{item.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Drafts */}
        {!isCollapsed && drafts.length > 0 && (
          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">
              Continue Where You Left Off
            </h3>
            <div className="space-y-2">
              {drafts.slice(0, 3).map((draft) => (
                <Link
                  key={draft.id}
                  href={`/dashboard/applications/${draft.insuranceType}/new`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">
                      {insuranceTypeNames[draft.insuranceType] || draft.insuranceType}
                    </p>
                    <p className="text-xs text-navy-500">
                      Step {(draft.lastSavedStep || 0) + 1} • {new Date(draft.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-navy-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-navy-100">
        {!isCollapsed && (
          <Link
            href="/help"
            className="flex items-center gap-3 px-4 py-2.5 text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors mb-2"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Help & Support</span>
          </Link>
        )}
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-lg border border-navy-100"
      >
        <Menu className="w-6 h-6 text-navy-700" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="lg:hidden fixed inset-0 bg-black/50 z-40 cursor-default"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-2 text-navy-500 hover:text-navy-700"
        >
          <X className="w-6 h-6" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-navy-100 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'
          }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
