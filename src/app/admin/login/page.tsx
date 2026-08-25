'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  KeyRound,
  Database,
  Eye,
  EyeOff,
  Gift
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(email, password);
    if (ok) {
      router.push('/admin');
    } else {
      setError('Invalid email or password. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-plum-950 via-charcoal-900 to-plum-950 text-cream-50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-plum-800 border-2 border-gold-400/40 text-gold-300 flex items-center justify-center mx-auto shadow-glow">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">
            Authorized Personnel Only
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-white tracking-tight">
            Store Owner &amp; Admin Portal
          </h1>
          <p className="text-xs text-cream-300">
            Access analytics, database explorer, product catalog, and order fulfillment.
          </p>
        </div>

        {/* Security Login Card */}
        <div className="bg-plum-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-plum-700/80 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Email Field */}
            <div>
              <label className="block font-bold text-cream-200 mb-1.5">Owner / Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-plum-300 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="touseef@giftora.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-plum-950/80 rounded-xl border border-plum-700 text-white font-mono text-xs focus:outline-none focus:border-gold-400 placeholder:text-plum-400/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-bold text-cream-200 mb-1.5">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-plum-300 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-10 py-2.5 bg-plum-950/80 rounded-xl border border-plum-700 text-white font-mono text-xs focus:outline-none focus:border-gold-400 placeholder:text-plum-400/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-plum-300 hover:text-white transition"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[11px] text-rose-400 font-semibold bg-rose-950/60 p-2.5 rounded-xl border border-rose-800">
                {error}
              </p>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-plum-950 font-extrabold text-xs shadow-glow flex items-center justify-center gap-2 transition"
            >
              <KeyRound className="w-4 h-4" />
              Authorize &amp; Enter Dashboard
            </button>
          </form>

          {/* Security Notice */}
          <div className="p-3.5 rounded-2xl bg-plum-950/70 border border-plum-800 text-[11px] text-cream-300 space-y-1">
            <p className="font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure Admin Access
            </p>
            <p className="text-cream-300/80 leading-relaxed">
              Enter your credentials manually or use your browser/device password manager to automatically fill saved credentials securely.
            </p>
          </div>

          <div className="text-center pt-1">
            <Link href="/" className="text-xs text-cream-400 hover:text-gold-300 transition underline">
              &larr; Return to Customer Storefront
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
