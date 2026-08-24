'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, Quote, Sparkles, Heart } from 'lucide-react';
import { REVIEWS } from '@/data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-cream-100/60 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Loved by 10,000+ Customers
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950 tracking-tight">
            Real Stories, Real Smiles
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            Read verified reviews from customers who surprised their loved ones with Giftora.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft hover:shadow-card transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-gold-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                </div>

                {/* Title & Comment */}
                {rev.title && (
                  <h4 className="font-serif text-sm font-bold text-charcoal-900 mb-2 leading-snug">
                    &ldquo;{rev.title}&rdquo;
                  </h4>
                )}
                <p className="text-xs text-charcoal-600 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* User Avatar & Name */}
              <div className="pt-4 mt-4 border-t border-cream-100 flex items-center gap-3">
                {rev.userAvatar && (
                  <div className="w-9 h-9 rounded-full overflow-hidden relative border border-cream-300">
                    <Image
                      src={rev.userAvatar}
                      alt={rev.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h5 className="text-xs font-bold text-charcoal-900">{rev.userName}</h5>
                  <p className="text-[10px] text-charcoal-400">{rev.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
