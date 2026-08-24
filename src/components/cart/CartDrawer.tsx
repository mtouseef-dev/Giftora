'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Gift,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, calculateDiscountPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-plum-950/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-cream-300"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-cream-200 bg-cream-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-plum-100 flex items-center justify-center text-plum-800">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-plum-950">Your Shopping Bag</h3>
                  <p className="text-xs text-charcoal-500">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl hover:bg-cream-200 text-charcoal-500 hover:text-charcoal-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-plum-900 text-cream-100 p-3 px-5 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-gold-400" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-gold-300 font-bold">🎉 You unlocked FREE Express Delivery!</span>
                  ) : (
                    <span>
                      Add <strong className="text-gold-300">{formatCurrency(amountNeededForFreeShipping)}</strong> more for <strong>FREE Delivery</strong>
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-cream-300 font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-plum-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-400 to-peach-300 transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-4 text-plum-700">
                    <Gift className="w-8 h-8 opacity-60" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-plum-950">Your gift bag is empty</h4>
                  <p className="text-xs text-charcoal-500 mt-1.5 mb-6 max-w-xs mx-auto">
                    Discover handpicked luxury gifts, toys, and custom keepsakes for your loved ones.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-plum-800 text-white text-xs font-bold hover:bg-plum-900 shadow-plum-glow transition"
                  >
                    Start Shopping <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                cart.map((item) => {
                  const basePrice = item.product.price + (item.variant?.priceAdjustment || 0);
                  const finalUnitPrice = calculateDiscountPrice(basePrice, item.product.discount);
                  const itemTotal = (finalUnitPrice + (item.giftWrap ? 99 : 0)) * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3.5 p-3 rounded-2xl border border-cream-200 hover:border-plum-300 bg-white/70 transition"
                    >
                      <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-charcoal-900 leading-snug line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-charcoal-400 hover:text-rose-600 transition p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {item.variant && (
                            <span className="inline-block text-[11px] text-plum-800 bg-plum-50 px-2 py-0.5 rounded-md font-medium mt-1">
                              {item.variant.name}: {item.variant.value}
                            </span>
                          )}

                          {item.customName && (
                            <p className="text-[11px] text-charcoal-600 mt-1 truncate">
                              <span className="font-semibold text-plum-900">Engraving:</span> &ldquo;{item.customName}&rdquo;
                            </p>
                          )}

                          {item.customMessage && (
                            <p className="text-[11px] text-charcoal-500 mt-0.5 truncate italic">
                              Note: {item.customMessage}
                            </p>
                          )}

                          {item.giftWrap && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-peach-600 font-semibold mt-1">
                              <Sparkles className="w-3 h-3" /> Luxury Gift Wrap (+₹99)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-100">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-cream-300 rounded-lg overflow-hidden bg-cream-50">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="p-1 px-2 hover:bg-cream-200 text-charcoal-700 transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-charcoal-800 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="p-1 px-2 hover:bg-cream-200 text-charcoal-700 transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-plum-900">
                              {formatCurrency(itemTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 bg-cream-50 border-t border-cream-200 space-y-3">
                {/* Promo Code Box */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold text-emerald-900">Coupon {appliedCoupon.code}</span>
                        <span className="text-emerald-700 ml-1">(-{formatCurrency(cartDiscount)})</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponError('');
                          }}
                          placeholder="Coupon Code (e.g. WELCOME10)"
                          className="w-full pl-8 pr-3 py-2 bg-white rounded-xl border border-cream-300 text-xs text-charcoal-900 uppercase font-medium focus:outline-none focus:border-plum-600"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-900 text-white text-xs font-bold transition"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>}
                  </form>
                )}

                {/* Subtotal & Totals */}
                <div className="space-y-1.5 text-xs text-charcoal-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal-900">{formatCurrency(cartSubtotal)}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount</span>
                      <span>-{formatCurrency(cartDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-semibold text-charcoal-900">
                      {cartShipping === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase">Free</span>
                      ) : (
                        formatCurrency(cartShipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-plum-950 pt-2 border-t border-cream-200">
                    <span>Total (Inc. GST)</span>
                    <span className="text-base text-plum-900">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-4 rounded-xl border border-cream-300 bg-white hover:bg-cream-100 text-charcoal-800 text-xs font-bold text-center transition"
                  >
                    View Full Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-4 rounded-xl bg-plum-800 hover:bg-plum-900 text-white text-xs font-bold text-center shadow-plum-glow flex items-center justify-center gap-1.5 transition"
                  >
                    Checkout <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
