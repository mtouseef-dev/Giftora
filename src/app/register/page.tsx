'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Gift,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function RegisterPage() {
  const router = useRouter();
  const { registerCustomer } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = registerCustomer(name, email, phone, password);
    if (ok) {
      router.push('/account');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cream-100/50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-plum-800 text-gold-300 flex items-center justify-center mx-auto shadow-plum-glow">
            <Gift className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-plum-950">
            Create Your Account
          </h1>
          <p className="text-xs text-charcoal-600">
            Join Giftora to unlock instant ₹100 welcome vouchers and celebration reminders.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Full Name */}
            <div>
              <label className="block font-bold text-charcoal-800 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Singhania"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-cream-300 font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block font-bold text-charcoal-800 mb-1.5">Email Address *</label>
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

            {/* Phone */}
            <div>
              <label className="block font-bold text-charcoal-800 mb-1.5">Mobile Phone (For Order Tracking)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-cream-300 font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-bold text-charcoal-800 mb-1.5">Create Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-cream-300 font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                required
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-plum-800 focus:ring-plum-700"
              />
              <label htmlFor="terms" className="text-[11px] text-charcoal-600 leading-tight">
                I agree to the <Link href="#" className="underline text-plum-800">Terms of Service</Link> &amp; <Link href="#" className="underline text-plum-800">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-white font-bold shadow-plum-glow flex items-center justify-center gap-2 transition"
            >
              Create My Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-charcoal-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-plum-800 hover:underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
