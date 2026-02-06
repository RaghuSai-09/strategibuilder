'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // TODO: Check authentication status
    const fetchUserProfile = async () => {
      try {
        // TODO: Implement actual API call
        const response = await fetch('/api/auth/profile', {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          // Not authenticated, redirect to login
          router.push('/auth');
          return;
        }

        const data = await response.json();
        setUser(data.user);
        setFormData({
          name: data.user.name,
          email: data.user.email,
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const data = await response.json();
      setUser(data.user);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleLogout = () => {
    // TODO: Clear authentication token/session
    // localStorage.removeItem('token');
    router.push('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gold-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Profile</h1>
              <p className="mt-1 text-sm text-navy-600">
                Manage your account information
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-navy-200 rounded-md text-sm font-medium text-navy-700 hover:bg-navy-50"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {editing ? (
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="h-24 w-24 rounded-full bg-navy-600 flex items-center justify-center text-white text-3xl font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-navy-900">
                      {user?.name || 'User'}
                    </h2>
                    <p className="text-sm text-navy-600">{user?.email}</p>
                    {user?.createdAt && (
                      <p className="text-xs text-navy-500 mt-1">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="border-t border-navy-200 pt-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-navy-500">Full Name</dt>
                      <dd className="mt-1 text-sm text-navy-900">{user?.name || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-navy-500">Email Address</dt>
                      <dd className="mt-1 text-sm text-navy-900">{user?.email || 'N/A'}</dd>
                    </div>
                  </dl>
                </div>

                {/* Actions */}
                <div className="border-t border-navy-200 pt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 border border-navy-200 rounded-md text-sm font-medium text-navy-700 hover:bg-navy-50"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-navy-200 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-navy-200 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500 sm:text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                      });
                    }}
                    className="px-4 py-2 border border-navy-200 rounded-md text-sm font-medium text-navy-700 hover:bg-navy-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
