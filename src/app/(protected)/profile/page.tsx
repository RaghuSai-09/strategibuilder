'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Lock,
  Bell,
  Globe2,
  Clock,
  Camera,
  Save,
  X,
  Pencil,
  CheckCircle,
  AlertTriangle,
  Key,
  Trash2,
  ChevronRight,
} from 'lucide-react';

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
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    marketingEmails: false,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (!response.ok) {
          router.push('/auth');
          return;
        }
        const data = await response.json();
        setUser(data.user);
        setFormData({
          name: data.user.name || '',
          email: data.user.email || '',
          phone: '',
          companyName: '',
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Update failed');

      const data = await response.json();
      setUser(data.user);
      setEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Mock success
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordSection(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" />
          <p className="text-navy-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white border border-emerald-200 rounded-xl shadow-2xl px-5 py-4 animate-slide-in-right">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-900">Changes saved</p>
            <p className="text-xs text-navy-500">Your profile has been updated</p>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="relative bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 rounded-2xl overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-gold-500/30 ring-4 ring-white/10">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors cursor-pointer">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
              <p className="text-navy-300 mt-1">{user?.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-navy-400">
                  <Clock className="w-3.5 h-3.5" />
                  Member since {memberSince}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Active
                </span>
              </div>
            </div>

            {/* Edit Button */}
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-sm transition-colors border border-white/10"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-navy-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-navy-900">Personal Information</h2>
                <p className="text-sm text-navy-500 mt-0.5">Manage your personal details</p>
              </div>
              {editing && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: '',
                        companyName: '',
                      });
                    }}
                    className="px-4 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-navy-700 to-navy-900 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            <div className="p-6">
              {editing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">Company Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Your company"
                          className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: User, label: 'Full Name', value: user?.name || 'N/A' },
                    { icon: Mail, label: 'Email Address', value: user?.email || 'N/A' },
                    { icon: Phone, label: 'Phone Number', value: formData.phone || 'Not set' },
                    { icon: Building2, label: 'Company Name', value: formData.companyName || 'Not set' },
                  ].map((field) => {
                    const Icon = field.icon;
                    const isUnset = field.value === 'Not set';
                    return (
                      <div key={field.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-navy-500" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-navy-400 uppercase tracking-wide">{field.label}</p>
                          <p className={`text-sm font-medium mt-0.5 ${isUnset ? 'text-navy-400 italic' : 'text-navy-900'}`}>
                            {field.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-navy-100">
              <h2 className="font-bold text-navy-900">Security</h2>
              <p className="text-sm text-navy-500 mt-0.5">Manage your account security</p>
            </div>

            <div className="p-6 space-y-4">
              {/* Password */}
              <div className="flex items-center justify-between p-4 bg-navy-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
                    <Key className="w-5 h-5 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Password</p>
                    <p className="text-xs text-navy-500">Last changed: Never</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
                >
                  Change
                  <ChevronRight className={`w-4 h-4 transition-transform ${showPasswordSection ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {showPasswordSection && (
                <form onSubmit={handlePasswordChange} className="p-4 bg-navy-50/30 rounded-xl space-y-4 border border-navy-100">
                  {passwordError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{passwordError}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Min. 8 characters"
                        className="w-full px-4 py-2.5 border border-navy-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Repeat password"
                        className="w-full px-4 py-2.5 border border-navy-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPasswordSection(false)}
                      className="px-4 py-2 text-sm font-medium text-navy-600 hover:bg-navy-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-900 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}

              {/* Two-Factor */}
              <div className="flex items-center justify-between p-4 bg-navy-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Two-Factor Authentication</p>
                    <p className="text-xs text-navy-500">Add an extra layer of security</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Preferences & Danger Zone */}
        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-navy-100">
              <h2 className="font-bold text-navy-900">Notifications</h2>
              <p className="text-sm text-navy-500 mt-0.5">Choose what you hear about</p>
            </div>

            <div className="p-6 space-y-4">
              {[
                {
                  key: 'emailNotifications' as const,
                  icon: Mail,
                  title: 'Email Notifications',
                  desc: 'Important account updates',
                },
                {
                  key: 'applicationUpdates' as const,
                  icon: Bell,
                  title: 'Application Updates',
                  desc: 'Status changes and reminders',
                },
                {
                  key: 'marketingEmails' as const,
                  icon: Globe2,
                  title: 'Marketing',
                  desc: 'Product news and tips',
                },
              ].map((pref) => {
                const Icon = pref.icon;
                return (
                  <label key={pref.key} className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-navy-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900">{pref.title}</p>
                      <p className="text-xs text-navy-500">{pref.desc}</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences[pref.key]}
                      onClick={() => setPreferences({ ...preferences, [pref.key]: !preferences[pref.key] })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        preferences[pref.key] ? 'bg-gold-500' : 'bg-navy-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          preferences[pref.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl border border-gold-200 p-6">
            <h3 className="font-bold text-navy-900 mb-3">Account Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Account Type', value: 'Standard' },
                { label: 'Member Since', value: memberSince },
                { label: 'Last Login', value: 'Today' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-navy-600">{item.label}</span>
                  <span className="text-xs font-semibold text-navy-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-red-100">
              <h2 className="font-bold text-red-700">Danger Zone</h2>
              <p className="text-sm text-red-400 mt-0.5">Irreversible actions</p>
            </div>
            <div className="p-6">
              <button className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
              <p className="text-xs text-navy-400 mt-3">
                Once you delete your account, there is no going back. All data will be permanently removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
