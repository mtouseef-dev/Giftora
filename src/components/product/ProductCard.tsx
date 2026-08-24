'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, calculateDiscountPrice, calculateSavings } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  const finalPrice = calculateDiscountPrice(product.price, product.discount);
  const savings = calculateSavings(product.price, product.discount);

  return (
    <div className="group relative rounded-3xl bg-white border border-cream-200 hover:border-plum-400/80 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-cream-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition duration-700 ease-out"
          />
        </Link>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
              {product.discount}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full bg-gold-400 text-plum-950 text-[10px] font-extrabold uppercase tracking-wide shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 fill-plum-950" /> Best Seller
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-sm">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-300'
              : 'bg-white/80 text-charcoal-600 hover:bg-white hover:text-rose-600'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick Add overlay button on hover for desktop */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-white text-xs font-bold shadow-plum-glow flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
            Quick Add to Bag
          </button>
        </div>
      </div>

      {/* Product Content Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-plum-700 font-semibold uppercase tracking-wider text-[10px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-charcoal-700 font-bold text-[11px]">
              <Star className="w-3 h-3 fill-gold-400 text-gold-500" />
              <span>{product.rating}</span>
              <span className="text-charcoal-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal-900 group-hover:text-plum-800 transition line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-charcoal-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Personalization Tag indicator */}
          {product.isPersonalizable && (
            <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-peach-700 bg-peach-50 border border-peach-200 px-2 py-0.5 rounded-md font-medium">
              <Sparkles className="w-3 h-3 text-peach-500" /> Custom Engraving Available
            </div>
          )}
        </div>

        {/* Pricing & Mobile Add Button */}
        <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-plum-950">
                {formatCurrency(finalPrice)}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-charcoal-400 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-[10px] text-emerald-700 font-semibold">Save {formatCurrency(savings)}</p>
            )}
          </div>

          {/* Mobile direct Add Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="sm:hidden p-2 rounded-xl bg-plum-800 text-white shadow-plum-glow hover:bg-plum-900"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4 text-gold-300" />
          </button>
        </div>

      </div>

    </div>
  );
};
