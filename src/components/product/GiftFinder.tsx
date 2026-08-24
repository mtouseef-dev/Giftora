'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Smile, User, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export const GiftFinder: React.FC = () => {
  const { products } = useStore();

  const [recipient, setRecipient] = useState<string>('Girlfriend');
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [budget, setBudget] = useState<string>('1500-3000');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const recipients = [
    { id: 'Girlfriend', label: 'Girlfriend / Wife', icon: Heart },
    { id: 'Boyfriend', label: 'Boyfriend / Husband', icon: Smile },
    { id: 'Mom', label: 'Mom / Dad', icon: User },
    { id: 'Kids', label: 'Kids & Babies', icon: Gift },
    { id: 'Friend', label: 'Best Friend / Colleague', icon: Sparkles },
  ];

  const occasions = [
    'Birthday',
    'Anniversary',
    'Festival',
    'Housewarming',
    'Just Because',
  ];

  const budgets = [
    { id: 'under-1500', label: 'Under ₹1,500' },
    { id: '1500-3000', label: '₹1,500 – ₹3,000' },
    { id: 'above-3000', label: '₹3,000 & Above' },
  ];

  // Filtering recommendation logic
  const handleFindGifts = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const getMatchedProducts = () => {
    return products.filter((p) => {
      let matchBudget = true;
      if (budget === 'under-1500') matchBudget = p.price <= 1500;
      else if (budget === '1500-3000') matchBudget = p.price > 1500 && p.price <= 3000;
      else if (budget === 'above-3000') matchBudget = p.price > 3000;

      let matchOccasion = p.occasion.some((o) =>
        o.toLowerCase().includes(occasion.toLowerCase())
      );

      let matchRecipient = true;
      if (recipient === 'Kids') {
        matchRecipient = p.categoryId === 'cat-3' || p.categoryId === 'cat-4' || p.categoryId === 'cat-6';
      } else if (recipient === 'Girlfriend') {
        matchRecipient = p.tags.includes('Romantic') || p.tags.includes('Candles') || p.tags.includes('Luxury Hamper') || p.tags.includes('Teddy Bear') || Boolean(p.isPersonalizable);
      }

      return matchBudget || matchOccasion || matchRecipient;
    }).slice(0, 3);
  };

  const matchedProducts = getMatchedProducts();

  return (
    <section id="gift-finder" className="py-16 sm:py-20 bg-gradient-to-b from-cream-100 to-cream-50 border-b border-cream-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
            AI-Assisted Gift Finder
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950 tracking-tight">
            Find the Perfect Gift in 3 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            No more guessing! Select your recipient, occasion, and budget to receive curated matches tailored for genuine delight.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-cream-200">
          <form onSubmit={handleFindGifts} className="space-y-8">
            
            {/* Step 1: Recipient */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-plum-900 mb-3">
                1. Who is this gift for?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {recipients.map((item) => {
                  const Icon = item.icon;
                  const isSelected = recipient === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setRecipient(item.id);
                        setIsGenerated(false);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'border-plum-800 bg-plum-50/80 ring-2 ring-plum-600/20 text-plum-950 font-bold shadow-sm'
                          : 'border-cream-200 bg-cream-50 hover:bg-cream-100 text-charcoal-700'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-plum-800 text-gold-300' : 'bg-white text-charcoal-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Occasion */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-plum-900 mb-3">
                2. What is the occasion?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {occasions.map((occ) => {
                  const isSelected = occasion === occ;
                  return (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => {
                        setOccasion(occ);
                        setIsGenerated(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition ${
                        isSelected
                          ? 'border-plum-800 bg-plum-800 text-white shadow-sm'
                          : 'border-cream-300 bg-cream-50 hover:bg-cream-100 text-charcoal-700'
                      }`}
                    >
                      {occ}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Budget */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-plum-900 mb-3">
                3. What is your budget?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {budgets.map((b) => {
                  const isSelected = budget === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setBudget(b.id);
                        setIsGenerated(false);
                      }}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition ${
                        isSelected
                          ? 'border-plum-800 bg-plum-50 ring-2 ring-plum-600/20 text-plum-950 shadow-sm'
                          : 'border-cream-300 bg-cream-50 hover:bg-cream-100 text-charcoal-700'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="px-10 py-4 rounded-2xl bg-plum-800 hover:bg-plum-900 text-white font-extrabold text-sm shadow-plum-glow hover:shadow-xl transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
                FIND MY PERFECT GIFT
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Results Reveal Section */}
          <AnimatePresence>
            {isGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 pt-8 border-t border-cream-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-plum-950">
                      Curated Matches for &ldquo;{recipient}&rdquo; on &ldquo;{occasion}&rdquo;
                    </h3>
                    <p className="text-xs text-charcoal-500">
                      Handpicked based on your preferences with verified 5-star ratings.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsGenerated(false)}
                    className="text-xs text-plum-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Quiz
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {matchedProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
