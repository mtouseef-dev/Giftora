'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, Truck, ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-plum-950 text-cream-100 text-xs py-2 px-4 border-b border-plum-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-cream-200">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            Special Offer: Use code <strong className="text-gold-300 font-semibold underline decoration-gold-400">WELCOME10</strong> for 10% off
          </span>
          <span className="hidden md:inline text-plum-400">|</span>
          <span className="hidden md:flex items-center gap-1 text-cream-300">
            <Truck className="w-3.5 h-3.5 text-peach-300" />
            Free Pan-India Delivery on orders over ₹999
          </span>
        </div>

        <div className="flex items-center gap-4 text-cream-300">
          <div className="flex items-center gap-1 text-cream-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">100% Quality Verified</span>
          </div>
          <span className="text-plum-400">|</span>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1 hover:text-gold-300 transition"
          >
            <Phone className="w-3 h-3 text-gold-400" />
            <span className="hidden sm:inline">Concierge:</span> +91 98765 43210
          </a>
          <span className="text-plum-400">|</span>
          <Link href="/account" className="hover:text-gold-300 transition font-medium">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};
