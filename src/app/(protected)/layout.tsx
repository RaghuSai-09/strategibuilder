'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';
import SearchCommand from '@/components/dashboard/SearchCommand';
import { NotificationProvider } from '@/context/NotificationProvider';
import { ToastContainer } from '@/components/ui/Toast';
import { DashboardSkeleton } from '@/components/ui/Skeleton';

interface UserProfile {
  name: string;
  email: string;
  companyName?: string;
}

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (!response.ok) {
          router.push('/auth');
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    router.push('/auth');
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <Sidebar user={user} onLogout={handleLogout} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Top Header Bar */}
          <header className="bg-white border-b border-navy-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4 flex-1">
              {/* Search Command */}
              <SearchCommand />
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <NotificationDropdown />

              {/* User Avatar */}
              {user && (
                <div className="flex items-center gap-3 pl-4 border-l border-navy-100">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-navy-900">{user.name}</p>
                    <p className="text-xs text-navy-500">{user.companyName || 'No company'}</p>
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-gold-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </NotificationProvider>
  );
}
