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
  const { loginAdmin, loginAsAdmin } = useStore();

  const [email, setEmail] = useState('touseef@giftora.com');
  const [password, setPassword] = useState('Touseef@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(email, password);
    if (ok) {
      router.push('/admin');
    } else {
      setError('Invalid credentials. Default: touseef@giftora.com / Touseef@123');
    }
  };

  const handleQuickMasterLogin = () => {
    loginAsAdmin();
    router.push('/admin');
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
            Access analytics, MongoDB database explorer, product catalog, and order fulfillment.
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-plum-950/80 rounded-xl border border-plum-700 text-white font-mono text-xs focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-bold text-cream-200 mb-1.5">Admin Master Key / Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-plum-300 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-10 py-2.5 bg-plum-950/80 rounded-xl border border-plum-700 text-white font-mono text-xs focus:outline-none focus:border-gold-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-plum-300 hover:text-white"
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

          {/* Quick 1-Click Master Access for Demo */}
          <div className="pt-2 border-t border-plum-800 space-y-2">
            <button
              type="button"
              onClick={handleQuickMasterLogin}
              className="w-full py-2.5 rounded-xl bg-plum-800/80 hover:bg-plum-800 text-gold-300 font-bold text-xs border border-gold-400/40 flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Owner Master Bypass (touseef@giftora.com)
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-plum-950/60 border border-plum-800 text-[11px] text-cream-300 space-y-1">
            <p className="font-bold text-gold-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Database &amp; System Info:
            </p>
            <p>Default Master Login: <code className="bg-plum-900 px-1 py-0.5 rounded text-white">touseef@giftora.com</code></p>
            <p>Default Master Password: <code className="bg-plum-900 px-1 py-0.5 rounded text-white">Touseef@123</code></p>
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
