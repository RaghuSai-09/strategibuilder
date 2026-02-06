'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const _  = await response.json();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!signupData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      const _ = await response.json();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gold-50">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/login_banner.png"
          alt="Professional business team"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/80 to-navy-900/90" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-60 h-20">
              <Image 
                src="/logo1.png" 
                alt="Strategi Builder" 
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
          </Link>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-serif font-normal leading-tight">
              {isLogin ? 'Welcome Back' : 'Start Your Journey'}
            </h1>
            <p className="text-xl text-white/90 font-light max-w-md">
              {isLogin 
                ? 'Sign in to access your personalized dashboard and manage your insurance portfolio.'
                : 'Join hundreds of businesses trusting us with their complex insurance placements and risk management needs.'
              }
            </p>
            
            {/* Features */}
            <div className="space-y-4 pt-8">
              {[
                { title: 'Expert Insurance Solutions', desc: 'Specialized coverage for complex risks' },
                { title: 'Dedicated Support', desc: 'Personalized advocacy from experienced brokers' },
                { title: 'Proven Success', desc: '95% placement success rate' },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gold-500" />
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-white/60 text-sm">
            © 2025 Strategi Builder. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-3 mb-8 group">
            <ArrowLeft className="w-5 h-5 text-navy-700" />
            <span className="text-navy-700 font-medium">Back to Home</span>
          </Link>

          {/* Form Container */}
          <div className="bg-gold-50/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gold-200/50">
            {/* Toggle Switch */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative inline-flex bg-navy-100/80 rounded-full p-1 shadow-inner">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className={`relative z-10 px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isLogin
                      ? 'text-white'
                      : 'text-navy-600 hover:text-navy-900'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  className={`relative z-10 px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isLogin === false
                      ? 'text-white'
                      : 'text-navy-600 hover:text-navy-900'
                  }`}
                >
                  Sign Up
                </button>
                <div
                  className="absolute top-1 bottom-1 bg-gradient-to-r from-navy-700 to-navy-900 rounded-full shadow-lg transition-all duration-300 ease-in-out"
                  style={{
                    left: isLogin ? '4px' : 'calc(50% - 4px)',
                    width: 'calc(50% - 4px)',
                  }}
                />
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-serif font-normal text-navy-900 mb-2">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-navy-600 font-light">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Fill in your details to get started'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <input
                      type="email"
                      required
                      id="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white text-navy-900 placeholder:text-navy-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-navy-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      id='password'
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full pl-11 pr-12 py-3 rounded-lg border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white text-navy-900 placeholder:text-navy-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginData.rememberMe}
                      onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                      className="w-4 h-4 rounded border-navy-200 text-navy-700 focus:ring-2 focus:ring-navy-700/20"
                    />
                    <span className="text-sm text-navy-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm font-medium text-navy-700 hover:text-navy-900 cursor-pointer">
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-navy-700 to-navy-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={handleSignupSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <input
                      id='name'
                      type="text"
                      required
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white text-navy-900 placeholder:text-navy-400"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white text-navy-900 placeholder:text-navy-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-navy-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="w-full pl-11 pr-12 py-3 rounded-lg border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white text-navy-900 placeholder:text-navy-400"
                      placeholder="Min. 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-navy-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="w-full pl-11 pr-12 py-3 rounded-lg border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white text-navy-900 placeholder:text-navy-400"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={signupData.agreeTerms}
                      onChange={(e) => setSignupData({ ...signupData, agreeTerms: e.target.checked })}
                      className="w-4 h-4 mt-1 rounded border-navy-200 text-navy-700 focus:ring-2 focus:ring-navy-700/20"
                    />
                    <span className="text-sm text-navy-600">
                      I agree to the{' '}
                      <a href="/" className="text-navy-700 font-medium hover:text-navy-900 underline">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/" className="text-navy-700 font-medium hover:text-navy-900 underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-navy-700 to-navy-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-navy-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gold-50 text-navy-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-navy-200 hover:bg-navy-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-navy-700">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-navy-200 hover:bg-navy-50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-medium text-navy-700">GitHub</span>
              </button>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-navy-600 mt-6">
            Need help?{' '}
            <a href="mailto:marianne@strategibuilder.com" className="font-medium text-navy-700 hover:text-navy-900 underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
