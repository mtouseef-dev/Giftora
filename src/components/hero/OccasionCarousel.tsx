'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cake, Heart, Baby, Sparkles, Building2, Home, Gift } from 'lucide-react';

export const OccasionCarousel: React.FC = () => {
  const occasions = [
    {
      name: 'Birthday Gifts',
      slug: 'Birthday',
      count: '34+ items',
      icon: Cake,
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop',
      accentColor: 'from-plum-900/80 to-plum-950/90',
    },
    {
      name: 'Anniversary & Romance',
      slug: 'Anniversary',
      count: '28+ items',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop',
      accentColor: 'from-rose-950/80 to-plum-950/90',
    },
    {
      name: 'Kids & Baby Shower',
      slug: 'Kids',
      count: '42+ items',
      icon: Baby,
      image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=400&auto=format&fit=crop',
      accentColor: 'from-amber-950/80 to-plum-950/90',
    },
    {
      name: 'Festive & Celebration',
      slug: 'Festival',
      count: '20+ items',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=400&auto=format&fit=crop',
      accentColor: 'from-yellow-950/80 to-plum-950/90',
    },
    {
      name: 'Corporate & Executive',
      slug: 'Corporate',
      count: '15+ items',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=400&auto=format&fit=crop',
      accentColor: 'from-slate-950/80 to-plum-950/90',
    },
    {
      name: 'Housewarming & Warmth',
      slug: 'Housewarming',
      count: '18+ items',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400&auto=format&fit=crop',
      accentColor: 'from-emerald-950/80 to-plum-950/90',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-plum-700 mb-1">
              <Gift className="w-3.5 h-3.5" />
              <span>Celebrate Special Moments</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-plum-950">
              Shop by Occasion
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-plum-800 hover:text-plum-950 underline decoration-plum-300 mt-2 sm:mt-0"
          >
            Explore All Categories &rarr;
          </Link>
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {occasions.map((occ) => {
            const Icon = occ.icon;
            return (
              <Link
                key={occ.name}
                href={`/shop?occasion=${encodeURIComponent(occ.slug)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] shadow-sm hover:shadow-card transition duration-300 border border-cream-200"
              >
                <Image
                  src={occ.image}
                  alt={occ.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${occ.accentColor} opacity-75 group-hover:opacity-85 transition`} />

                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between text-white">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-gold-300 group-hover:bg-gold-400 group-hover:text-plum-950 transition duration-300">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <h3 className="font-serif text-sm font-bold leading-tight text-white group-hover:text-gold-200 transition">
                      {occ.name}
                    </h3>
                    <p className="text-[11px] text-cream-300 mt-0.5">{occ.count}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
