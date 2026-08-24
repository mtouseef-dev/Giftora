'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Gift,
  Heart,
  ChevronRight,
  Star
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { HeroBanner } from '@/components/hero/HeroBanner';
import { OccasionCarousel } from '@/components/hero/OccasionCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { GiftFinder } from '@/components/product/GiftFinder';
import { PersonalizationStudio } from '@/components/product/PersonalizationStudio';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { OccasionReminderBanner } from '@/components/home/OccasionReminderBanner';

export default function HomePage() {
  const { products, categories } = useStore();
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newarrivals' | 'toys'>('bestsellers');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'newarrivals') return p.isNew;
    if (activeTab === 'toys') return p.categoryId === 'cat-3' || p.categoryId === 'cat-4' || p.categoryId === 'cat-6';
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Shop by Occasion Carousel */}
      <OccasionCarousel />

      {/* 3. Featured Categories Grid */}
      <section className="py-16 sm:py-20 bg-cream-50/60 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-plum-700">
                Explore The Collections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950 mt-1">
                Featured Categories
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-plum-800 hover:text-plum-950 flex items-center gap-1 mt-2 sm:mt-0 underline decoration-plum-300"
            >
              Browse All Categories <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition duration-500 bg-white border border-cream-200 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition" />
                  
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      {cat.itemCount} Products
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-plum-950 group-hover:text-plum-700 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-charcoal-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs font-bold text-plum-800 group-hover:text-plum-950">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Curated Showcase (Best Sellers & New Arrivals Tabs) */}
      <section className="py-16 sm:py-24 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-plum-100 text-plum-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                Handpicked Favorites
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950">
                Trending Gifts &amp; Delightful Toys
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-cream-100 border border-cream-300 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'bestsellers'
                    ? 'bg-plum-800 text-white shadow-plum-glow'
                    : 'text-charcoal-700 hover:text-plum-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" /> Best Sellers
              </button>
              <button
                onClick={() => setActiveTab('newarrivals')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'newarrivals'
                    ? 'bg-plum-800 text-white shadow-plum-glow'
                    : 'text-charcoal-700 hover:text-plum-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> New Arrivals
              </button>
              <button
                onClick={() => setActiveTab('toys')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'toys'
                    ? 'bg-plum-800 text-white shadow-plum-glow'
                    : 'text-charcoal-700 hover:text-plum-900'
                }`}
              >
                <Gift className="w-3.5 h-3.5" /> Toys &amp; STEM
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-cream-100 hover:bg-cream-200 border border-cream-300 text-plum-950 font-bold text-xs shadow-sm hover:shadow transition"
            >
              View Full Catalog ({products.length} Products) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Interactive Gift Finder Wizard */}
      <GiftFinder />

      {/* 6. Live Personalization Studio */}
      <PersonalizationStudio />

      {/* 7. Why Choose Us Trust Pillars */}
      <WhyChooseUs />

      {/* 8. Verified Customer Reviews & Testimonials */}
      <Testimonials />

      {/* 9. Occasion Reminders & Newsletter Coupon */}
      <OccasionReminderBanner />
    </div>
  );
}
