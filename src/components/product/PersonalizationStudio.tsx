'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShoppingBag, Check, ShieldCheck, Heart, Type } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, calculateDiscountPrice } from '@/lib/utils';

export const PersonalizationStudio: React.FC = () => {
  const { products, addToCart } = useStore();
  
  // Choose the solid oak memory box as default personalized product
  const heroProduct = products.find((p) => p.isPersonalizable) || products[0];

  const [customName, setCustomName] = useState('Kavya & Aarav');
  const [customDate, setCustomDate] = useState('12.09.2026');
  const [selectedFont, setSelectedFont] = useState<'font-serif' | 'font-sans' | 'font-mono'>('font-serif');
  const [selectedFinish, setSelectedFinish] = useState<'Classic Oak' | 'Royal Walnut' | 'Vintage Mahogany'>('Classic Oak');
  const [giftWrap, setGiftWrap] = useState(true);

  const discountedPrice = calculateDiscountPrice(heroProduct.price, heroProduct.discount);

  const handleAddCustomGift = () => {
    addToCart(
      heroProduct,
      1,
      heroProduct.variants?.[0],
      `${customName} (${customDate}) - ${selectedFinish}`,
      `Font: ${selectedFont}`,
      giftWrap
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-b border-cream-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-peach-100 border border-peach-300 text-peach-900 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-peach-600 animate-spin-slow" />
            Live Personalization Studio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950 tracking-tight">
            Create a One-of-a-Kind Keepsake
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            Watch your custom name and heartfelt date engraved in real-time before placing your order.
          </p>
        </div>

        {/* Studio Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-cream-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Live Visual Preview Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-plum-950 border-4 border-cream-200 group">
              <Image
                src={heroProduct.images[0]}
                alt="Personalized Laser Engraving Box Preview"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

              {/* Simulated Laser Engraved Brass / Wood Plaque */}
              <div className="absolute inset-x-8 bottom-10 bg-amber-900/60 backdrop-blur-md border border-amber-400/50 p-4 rounded-xl shadow-2xl text-center text-amber-100">
                <div className="flex items-center justify-center gap-2 text-amber-300 text-[10px] uppercase font-bold tracking-widest mb-1">
                  <Sparkles className="w-3 h-3" /> Precision Laser Engraving
                </div>
                
                <h3 className={`text-xl sm:text-2xl font-bold tracking-wider text-gold-200 drop-shadow-md transition-all duration-300 ${selectedFont}`}>
                  {customName || 'Your Name Here'}
                </h3>
                
                {customDate && (
                  <p className="text-xs text-amber-200/90 font-medium tracking-widest mt-1">
                    {customDate}
                  </p>
                )}

                <div className="mt-2 text-[10px] text-amber-300/80 font-mono">
                  Finish: {selectedFinish}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-charcoal-500 px-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Permanent high-depth laser engraving
              </span>
              <span>100% Satisfaction Guaranteed</span>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-plum-700 uppercase tracking-widest">
                {heroProduct.categoryName}
              </span>
              <h3 className="font-serif text-2xl font-bold text-plum-950 mt-1">
                {heroProduct.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-plum-900">
                  {formatCurrency(discountedPrice)}
                </span>
                <span className="text-sm text-charcoal-400 line-through">
                  {formatCurrency(heroProduct.price)}
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  Save {heroProduct.discount}%
                </span>
              </div>
            </div>

            {/* Input 1: Custom Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                Recipient Name / Couple Initials:
              </label>
              <div className="relative">
                <Type className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  maxLength={30}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Kavya & Aarav"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-cream-300 text-sm text-charcoal-900 font-semibold focus:outline-none focus:border-plum-700"
                />
              </div>
              <span className="text-[11px] text-charcoal-400 mt-1 block">
                Up to 30 characters (Included Free of Charge)
              </span>
            </div>

            {/* Input 2: Special Date / Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                Special Date or Short Tagline:
              </label>
              <input
                type="text"
                maxLength={25}
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                placeholder="e.g. 12.09.2026 or Forever Yours"
                className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-cream-300 text-sm text-charcoal-900 font-semibold focus:outline-none focus:border-plum-700"
              />
            </div>

            {/* Input 3: Typography Style */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                Font Style:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'font-serif', label: 'Classic Serif' },
                  { id: 'font-sans', label: 'Modern Clean' },
                  { id: 'font-mono', label: 'Minimalist' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFont(f.id as any)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                      selectedFont === f.id
                        ? 'border-plum-800 bg-plum-800 text-white shadow-sm'
                        : 'border-cream-300 bg-cream-50 text-charcoal-700 hover:bg-cream-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Gift Wrap Checkbox */}
            <div className="p-3.5 rounded-2xl bg-peach-50/60 border border-peach-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="giftWrapStudio"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded text-plum-800 focus:ring-plum-700 cursor-pointer"
                />
                <label htmlFor="giftWrapStudio" className="text-xs text-charcoal-800 font-medium cursor-pointer">
                  Include <strong>Luxury Gift Wrapping</strong> with plum ribbon &amp; wax seal (+₹99)
                </label>
              </div>
              <Sparkles className="w-4 h-4 text-peach-600" />
            </div>

            {/* Action CTA */}
            <button
              onClick={handleAddCustomGift}
              className="w-full py-4 rounded-2xl bg-plum-800 hover:bg-plum-900 text-white font-bold text-sm shadow-plum-glow flex items-center justify-center gap-2 transition duration-300"
            >
              <ShoppingBag className="w-4 h-4 text-gold-300" />
              Add Custom Keepsake to Bag
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
