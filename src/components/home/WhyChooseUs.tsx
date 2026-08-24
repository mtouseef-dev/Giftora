'use client';

import React from 'react';
import { Package, ShieldCheck, HeartHandshake, Zap, Clock, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Package,
      title: 'Artisan Packaging & Wax Seals',
      description: 'Every gift is wrapped by hand in textured boxes, secured with double-faced satin ribbons and an authentic wax seal stamp.',
      badge: 'Signature Touch',
    },
    {
      icon: Zap,
      title: '2-Day Express Pan-India',
      description: 'Priority flight dispatch across Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, and 19,000+ pincodes.',
      badge: 'Fast & Secure',
    },
    {
      icon: ShieldCheck,
      title: '100% Non-Toxic & Child-Safe',
      description: 'All plush toys, Montessori puzzles, and STEM robotics pass strict BIS safety standards with zero harmful microplastics.',
      badge: 'Certified Safe',
    },
    {
      icon: HeartHandshake,
      title: 'Dedicated Gifting Concierge',
      description: 'Need help choosing or organizing 50+ corporate festive hampers? Our dedicated concierge team handles everything from curation to doorstep drop.',
      badge: 'White Glove Service',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-plum-700">
            The Giftora Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950 mt-1">
            Why Discerning Givers Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            We don&apos;t just deliver products; we deliver heartwarming experiences that become lifelong memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-cream-50 border border-cream-200 hover:border-plum-400 hover:shadow-card transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-plum-800 text-gold-300 flex items-center justify-center shadow-plum-glow">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-plum-100 text-plum-900 border border-plum-200">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-plum-950 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
