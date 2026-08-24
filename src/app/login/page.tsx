'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Gift,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginCustomer, loginAsCustomer } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginCustomer(email, password);
    if (ok) {
      router.push('/account');
    }
  };

  const handleDemoLogin = () => {
    loginAsCustomer();
    router.push('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cream-100/50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-plum-800 text-gold-300 flex items-center justify-center mx-auto shadow-plum-glow">
            <Gift className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-plum-950">
            Welcome Back
          </h1>
          <p className="text-xs text-charcoal-600">
            Sign in to track orders, manage saved keepsakes, and access member rewards.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Email Field */}
            <div>
              <label className="block font-bold text-charcoal-800 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-cream-300 font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-charcoal-800">Password</label>
                <Link href="#" className="text-[11px] text-plum-800 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-cream-50 rounded-xl border border-cream-300 font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-charcoal-400 hover:text-charcoal-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-plum-800 focus:ring-plum-700"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-white font-bold shadow-plum-glow flex items-center justify-center gap-2 transition"
            >
              Sign In to Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Customer Sign In */}
          <div className="pt-2 border-t border-cream-100 space-y-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-plum-950 font-bold text-xs border border-cream-300 flex items-center justify-center gap-2 transition"
            >
              <UserCheck className="w-4 h-4 text-plum-700" />
              1-Click Demo Customer Sign In
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center pt-2 text-xs text-charcoal-600">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="font-bold text-plum-800 hover:underline">
              Create an Account
            </Link>
          </div>

          {/* Owner Portal Link */}
          <div className="pt-4 border-t border-cream-100 text-center">
            <Link
              href="/admin/login"
              className="text-[11px] font-bold text-charcoal-500 hover:text-plum-900 transition flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-plum-700" />
              Store Owner &amp; Admin Login Portal &rarr;
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
