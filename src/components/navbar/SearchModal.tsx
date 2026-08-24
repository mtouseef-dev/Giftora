'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, calculateDiscountPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName?.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.occasion.some((o) => o.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSearches = [
    'Personalized Memory Box',
    'Giant Teddy Bear',
    'STEM Robot',
    'Luxury Hamper',
    'Soy Scented Candle',
    'Preserved Rose',
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-plum-950/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-cream-300 overflow-hidden z-10"
        >
          {/* Search Input Header */}
          <div className="flex items-center gap-3 p-4 border-b border-cream-200 bg-cream-50">
            <Search className="w-5 h-5 text-plum-700" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gifts, toys, occasions, or categories..."
              className="flex-1 bg-transparent text-charcoal-900 placeholder:text-charcoal-500 text-base focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full hover:bg-cream-200 text-charcoal-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cream-200 text-charcoal-700 hover:bg-cream-300 transition"
            >
              ESC
            </button>
          </div>

          {/* Results / Popular suggestions */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-plum-900 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="text-xs px-3 py-1.5 rounded-full bg-cream-100 border border-cream-300 text-charcoal-700 hover:border-plum-500 hover:text-plum-800 transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  Featured Gifts
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.slice(0, 4).map((product) => {
                    const finalPrice = calculateDiscountPrice(product.price, product.discount);
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-cream-200 hover:border-plum-400 hover:bg-plum-50/40 transition group"
                      >
                        <div className="w-14 h-14 relative rounded-lg overflow-hidden flex-shrink-0 bg-cream-200">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-charcoal-900 truncate group-hover:text-plum-700">
                            {product.name}
                          </p>
                          <p className="text-xs text-charcoal-500 truncate">{product.categoryName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-plum-800">{formatCurrency(finalPrice)}</span>
                            {product.discount > 0 && (
                              <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1 rounded">
                                {product.discount}% off
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-charcoal-500 mb-3">
                  Found <span className="font-bold text-plum-800">{filteredProducts.length}</span> results for &ldquo;{query}&rdquo;
                </p>
                {filteredProducts.map((product) => {
                  const finalPrice = calculateDiscountPrice(product.price, product.discount);
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl border border-cream-200 hover:border-plum-500 hover:bg-plum-50/40 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0 bg-cream-200">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-charcoal-900 group-hover:text-plum-700">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-charcoal-500">
                            <span>{product.categoryName}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">★ {product.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-bold text-plum-800">
                            {formatCurrency(finalPrice)}
                          </div>
                          {product.discount > 0 && (
                            <div className="text-xs text-charcoal-400 line-through">
                              {formatCurrency(product.price)}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-plum-700 group-hover:translate-x-1 transition" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <Tag className="w-10 h-10 text-charcoal-400 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-charcoal-700">No gifts or toys match &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-charcoal-500 mt-1">
                  Try searching for keywords like &ldquo;Memory Box&rdquo;, &ldquo;Plush&rdquo;, &ldquo;Robot&rdquo;, or &ldquo;Hamper&rdquo;.
                </p>
              </div>
            )}
          </div>

          <div className="p-3 bg-cream-100 border-t border-cream-200 text-center">
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-xs font-semibold text-plum-800 hover:text-plum-950 flex items-center justify-center gap-1.5"
            >
              Browse complete collection in Shop <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
