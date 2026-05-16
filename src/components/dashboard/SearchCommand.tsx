'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  FileText,
  LayoutDashboard,
  User,
  Shield,
  Globe,
  Lock,
  Users,
  FileDown,
  HelpCircle,
  Command,
  ArrowRight,
  X,
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  category: 'page' | 'insurance' | 'action';
}

const staticResults: SearchResult[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Overview and quick actions',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    category: 'page',
  },
  {
    id: 'applications',
    title: 'My Applications',
    subtitle: 'View all your applications',
    href: '/dashboard/applications',
    icon: <FileText className="w-4 h-4" />,
    category: 'page',
  },
  {
    id: 'forms',
    title: 'Insurance Forms',
    subtitle: 'ACORD forms library',
    href: '/dashboard/forms',
    icon: <FileDown className="w-4 h-4" />,
    category: 'page',
  },
  {
    id: 'upload',
    title: 'Upload ACORD Form',
    subtitle: 'Upload and extract PDF data',
    href: '/dashboard/forms/upload',
    icon: <FileDown className="w-4 h-4" />,
    category: 'action',
  },
  {
    id: 'profile',
    title: 'Profile',
    subtitle: 'Manage your account',
    href: '/profile',
    icon: <User className="w-4 h-4" />,
    category: 'page',
  },
  {
    id: 'help',
    title: 'Help & Support',
    subtitle: 'FAQs and contact info',
    href: '/help',
    icon: <HelpCircle className="w-4 h-4" />,
    category: 'page',
  },
  {
    id: 'tech-eo',
    title: 'Technology E&O',
    subtitle: 'Professional liability for tech companies',
    href: '/dashboard/applications/tech-eo/new',
    icon: <Globe className="w-4 h-4" />,
    category: 'insurance',
  },
  {
    id: 'dno',
    title: 'Directors & Officers (D&O)',
    subtitle: 'Protection for leadership decisions',
    href: '/dashboard/applications/dno/new',
    icon: <Shield className="w-4 h-4" />,
    category: 'insurance',
  },
  {
    id: 'cyber',
    title: 'Cyber Liability',
    subtitle: 'Data breach & cyber attack coverage',
    href: '/dashboard/applications/cyber/new',
    icon: <Lock className="w-4 h-4" />,
    category: 'insurance',
  },
  {
    id: 'epli',
    title: 'Employment Practices (EPLI)',
    subtitle: 'Workplace-related claims protection',
    href: '/dashboard/applications/epli/new',
    icon: <Users className="w-4 h-4" />,
    category: 'insurance',
  },
];

const categoryLabels: Record<string, string> = {
  page: 'Pages',
  insurance: 'Start Application',
  action: 'Quick Actions',
};

export default function SearchCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredResults = query.trim()
    ? staticResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : staticResults;

  // Group results by category
  const groupedResults: Record<string, SearchResult[]> = {};
  for (const result of filteredResults) {
    if (!groupedResults[result.category]) {
      groupedResults[result.category] = [];
    }
    groupedResults[result.category].push(result);
  }

  // Flat list for keyboard navigation
  const flatResults = Object.values(groupedResults).flat();

  // Keyboard shortcut to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setIsOpen(false);
      router.push(result.href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(flatResults[selectedIndex]);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selected = resultsRef.current.querySelector('[data-selected="true"]');
      selected?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Search Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-full flex items-center gap-2 pl-10 pr-4 py-2 bg-slate-50 border border-navy-100 rounded-lg text-sm text-navy-400 hover:border-navy-200 hover:bg-white transition-colors text-left"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <span>Search applications...</span>
          <kbd className="ml-auto hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-navy-100 text-navy-500 rounded text-[10px] font-medium">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>
      </div>

      {/* Command Palette Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden animate-scale-in">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-navy-100">
              <Search className="w-5 h-5 text-navy-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, applications, insurance types..."
                className="flex-1 text-sm text-navy-900 placeholder:text-navy-400 outline-none bg-transparent"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-navy-400 hover:text-navy-600 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 bg-navy-50 text-navy-400 rounded text-[10px] font-medium">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-[360px] overflow-y-auto py-2">
              {flatResults.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-navy-500">
                    No results for &ldquo;<span className="font-medium text-navy-700">{query}</span>&rdquo;
                  </p>
                  <p className="text-xs text-navy-400 mt-1">Try searching for pages, insurance types, or actions</p>
                </div>
              ) : (
                Object.entries(groupedResults).map(([category, results]) => (
                  <div key={category}>
                    <div className="px-5 py-2">
                      <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-wider">
                        {categoryLabels[category] || category}
                      </p>
                    </div>
                    {results.map((result) => {
                      const globalIndex = flatResults.indexOf(result);
                      const isSelected = globalIndex === selectedIndex;
                      return (
                        <button
                          key={result.id}
                          data-selected={isSelected}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                            isSelected
                              ? 'bg-navy-50 text-navy-900'
                              : 'text-navy-700 hover:bg-navy-50/50'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-navy-100' : 'bg-navy-50'
                            }`}
                          >
                            {result.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{result.title}</p>
                            <p className="text-xs text-navy-500 truncate">{result.subtitle}</p>
                          </div>
                          {isSelected && (
                            <ArrowRight className="w-4 h-4 text-navy-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-navy-100 flex items-center justify-between text-[11px] text-navy-400 bg-navy-50/50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white border border-navy-200 rounded text-[10px]">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white border border-navy-200 rounded text-[10px]">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white border border-navy-200 rounded text-[10px]">Esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
