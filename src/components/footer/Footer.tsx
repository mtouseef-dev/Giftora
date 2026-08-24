'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Gift,
  Heart,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Footer: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Use code WELCOME10 for 10% off your first order.', 'success');
  };

  return (
    <footer className="bg-plum-950 text-cream-100 border-t border-plum-900 pt-16 pb-8">
      {/* Value Pillars Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl bg-plum-900/60 border border-plum-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-plum-800 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-cream-50">Free Express Delivery</h5>
              <p className="text-xs text-cream-300">On all orders above ₹999 across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-plum-800 flex items-center justify-center text-peach-300 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-cream-50">Handcrafted Packaging</h5>
              <p className="text-xs text-cream-300">Silk ribbons & luxury presentation boxes</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-plum-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-cream-50">100% Quality Guaranteed</h5>
              <p className="text-xs text-cream-300">Hypoallergenic & child-safe materials</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-plum-800 flex items-center justify-center text-gold-300 flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-cream-50">Gifting Concierge</h5>
              <p className="text-xs text-cream-300">Dedicated advice & custom corporate bulk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-plum-900">
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-plum-800 flex items-center justify-center text-gold-300 shadow-plum-glow">
              <Gift className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-cream-50 flex items-center gap-1">
                Giftora
                <Sparkles className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-peach-300">
                Thoughtful Gifts & Joyful Toys
              </span>
            </div>
          </Link>

          <p className="text-xs text-cream-300 leading-relaxed max-w-sm">
            Curating emotional moments through bespoke personalized gifts, plush cuddle companions, educational STEM toys, and gourmet artisan hampers.
          </p>

          <div className="pt-2 space-y-2 text-xs text-cream-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-peach-400" />
              <span>Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>+91 98765 43210 (Mon-Sat, 9AM - 8PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cream-400" />
              <span>support@giftora.com</span>
            </div>
          </div>
        </div>

        {/* Categories Col */}
        <div>
          <h4 className="font-serif text-sm font-bold text-cream-50 mb-4 tracking-wide uppercase">
            Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-cream-300">
            <li>
              <Link href="/shop?category=personalized-gifts" className="hover:text-gold-300 transition">
                Personalized Keepsakes
              </Link>
            </li>
            <li>
              <Link href="/shop?category=luxury-hampers" className="hover:text-gold-300 transition">
                Luxury Gift Hampers
              </Link>
            </li>
            <li>
              <Link href="/shop?category=soft-toys" className="hover:text-gold-300 transition">
                Soft Toys & Plushies
              </Link>
            </li>
            <li>
              <Link href="/shop?category=stem-educational-toys" className="hover:text-gold-300 transition">
                STEM & Robotics Toys
              </Link>
            </li>
            <li>
              <Link href="/shop?category=scented-candles" className="hover:text-gold-300 transition">
                Aromatherapy & Candles
              </Link>
            </li>
            <li>
              <Link href="/shop?category=romantic-anniversary" className="hover:text-gold-300 transition">
                Romantic & Anniversary
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care Col */}
        <div>
          <h4 className="font-serif text-sm font-bold text-cream-50 mb-4 tracking-wide uppercase">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs text-cream-300">
            <li>
              <Link href="/account" className="hover:text-gold-300 transition">
                Track Your Order
              </Link>
            </li>
            <li>
              <Link href="/#gift-finder" className="hover:text-gold-300 transition">
                Interactive Gift Finder
              </Link>
            </li>
            <li>
              <Link href="/account?tab=reminders" className="hover:text-gold-300 transition">
                Occasion Reminders
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-gold-300 transition font-semibold text-gold-400">
                Admin Management Portal
              </Link>
            </li>
            <li>
              <span className="cursor-pointer hover:text-gold-300 transition" onClick={() => showToast('Estimated delivery: 2-3 business days across India', 'info')}>
                Shipping Policy
              </span>
            </li>
            <li>
              <span className="cursor-pointer hover:text-gold-300 transition" onClick={() => showToast('Hassle-free 7-day replacement for damaged items', 'info')}>
                Return & Refund Policy
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter Col */}
        <div>
          <h4 className="font-serif text-sm font-bold text-cream-50 mb-3 tracking-wide uppercase">
            Get 10% Off
          </h4>
          <p className="text-xs text-cream-300 mb-3">
            Subscribe for secret drops, holiday gifting guides, and receive an instant <strong className="text-gold-300">₹100 coupon</strong>.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You&apos;re subscribed! Use code: <strong>WELCOME10</strong></span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-plum-900 border border-plum-700 text-xs text-cream-50 placeholder:text-cream-400 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-plum-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow transition"
              >
                Claim ₹100 Coupon <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar & Payment Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Giftora Shop Inc. All rights reserved. Crafted with{' '}
          <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500" /> for unforgettable gifting.
        </p>

        {/* Payment badges */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-cream-300">
          <span className="px-2 py-1 rounded bg-plum-900 border border-plum-800">Razorpay</span>
          <span className="px-2 py-1 rounded bg-plum-900 border border-plum-800">UPI / GPay</span>
          <span className="px-2 py-1 rounded bg-plum-900 border border-plum-800">Visa / Mastercard</span>
          <span className="px-2 py-1 rounded bg-plum-900 border border-plum-800">Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};
