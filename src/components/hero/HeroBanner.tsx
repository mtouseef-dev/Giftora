'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Gift,
  Play,
  Heart,
  ShieldCheck,
  Star,
  Award,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroBanner: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-200/50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-cream-300/60">
      {/* Decorative ambient background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-plum-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-peach-200/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-plum-100/90 border border-plum-200 text-plum-900 text-xs font-bold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
              <span>India&apos;s Most Loved Gifting Destination</span>
              <span className="w-1.5 h-1.5 rounded-full bg-plum-600" />
              <span className="text-plum-700 font-medium">Over 50,000+ Smiles Delivered</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-plum-950 tracking-tight leading-[1.12]"
            >
              Curated Gifts &amp; Joyful Toys That{' '}
              <span className="text-plum-gradient relative">
                Touch Hearts
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-gold-400 -z-10"
                  viewBox="0 0 300 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 15C80 4 220 4 297 15"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-charcoal-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              From bespoke laser-engraved memory keepsakes and gourmet luxury hampers to cuddly plushies and educational STEM robotics for curious minds.
            </motion.p>

            {/* CTAs & Video Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <Link
                href="/shop?category=personalized-gifts"
                className="px-7 py-3.5 rounded-2xl bg-plum-800 hover:bg-plum-900 text-cream-50 font-bold text-sm shadow-plum-glow hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                <Gift className="w-4 h-4 text-gold-300 group-hover:rotate-12 transition" />
                Shop Gifts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/shop?category=stem-educational-toys"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-cream-100 text-plum-950 font-bold text-sm border border-cream-300 shadow-sm hover:shadow transition flex items-center gap-2"
              >
                Explore Toys &amp; STEM
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-4 py-3 rounded-2xl hover:bg-plum-100/60 text-plum-900 font-semibold text-xs transition flex items-center gap-2 border border-transparent hover:border-plum-200"
              >
                <div className="w-7 h-7 rounded-full bg-plum-800 text-white flex items-center justify-center shadow-sm">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span>Watch Packaging</span>
              </button>
            </motion.div>

            {/* Trust Badges Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-cream-300/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-700"
            >
              <div className="flex items-center gap-1.5 font-semibold">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                  ))}
                </div>
                <span><strong>4.9 / 5</strong> (1,800+ Verified Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-plum-700" />
                <span>Handcrafted Artisan Finish</span>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safe Child-Friendly Materials</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Showcase (Visual Grid with Floating Interactive Badges) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-plum-900 group aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1000&auto=format&fit=crop"
                  alt="Luxury Gift Hamper with Scented Candle and Sweets"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 via-transparent to-black/20" />
                
                {/* Overlay Text Inside Hero Image */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-400 text-plum-950 text-[10px] font-extrabold uppercase tracking-wider">
                    Best Seller 2026
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    Artisan Grand Celebration Hamper
                  </h3>
                  <p className="text-xs text-cream-200 line-clamp-2">
                    Pure Belgian chocolates, French vanilla soy candles &amp; organic saffron honey.
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-gold-300">₹3,149 <span className="text-xs line-through text-cream-300 font-normal">₹3,499</span></span>
                    <Link
                      href="/product/artisan-grand-celebration-gourmet-hamper"
                      className="px-3 py-1.5 rounded-xl bg-white text-plum-950 text-xs font-bold hover:bg-cream-100 transition shadow"
                    >
                      View Hamper
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Personalization Live Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-cream-300 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-peach-100 text-peach-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-peach-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal-900">Custom Laser Engraved</p>
                  <p className="text-[10px] text-charcoal-500">Names &amp; Dates on Wood</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Quick Loved Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-cream-300 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal-900">Free Gift Wrapping</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">Included on all orders</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed inset-0 bg-plum-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden shadow-2xl z-10 aspect-video border border-plum-700"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-gift-wrapped-in-brown-paper-42718-large.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
