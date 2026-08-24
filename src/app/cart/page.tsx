'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Gift,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, calculateDiscountPrice } from '@/lib/utils';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
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
  const [giftNote, setGiftNote] = useState('');

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

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-cream-50/50">
        <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-4 text-plum-800">
          <ShoppingBag className="w-10 h-10 opacity-60" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-plum-950">Your Shopping Bag is Empty</h2>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 mb-8 max-w-sm">
          Discover our curated personalized keepsakes, luxury gift hampers, and STEM toys.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-2xl bg-plum-800 hover:bg-plum-900 text-white text-xs font-bold shadow-plum-glow transition flex items-center gap-2"
        >
          Explore All Gifts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-100/40 min-h-screen py-8 sm:py-12 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-charcoal-500 mb-2">
            <Link href="/" className="hover:text-plum-800">Home</Link>
            <span>/</span>
            <span className="text-plum-900 font-bold">Shopping Bag</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h1>
            <button
              onClick={clearCart}
              className="text-xs text-rose-600 hover:underline font-semibold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Empty Bag
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items & Gift Note */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Free Shipping Meter */}
            <div className="bg-plum-900 text-cream-100 p-4 rounded-2xl shadow-sm text-xs">
              <div className="flex items-center justify-between mb-2 font-medium">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-400" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-gold-300 font-bold">🎉 Congratulations! You have unlocked FREE Express Delivery!</span>
                  ) : (
                    <span>
                      Add <strong className="text-gold-300">{formatCurrency(amountNeededForFreeShipping)}</strong> more to get <strong>FREE Delivery</strong>
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-cream-300">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-plum-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-400 to-peach-300 transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Card List */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-soft divide-y divide-cream-100 overflow-hidden">
              {cart.map((item) => {
                const basePrice = item.product.price + (item.variant?.priceAdjustment || 0);
                const finalUnitPrice = calculateDiscountPrice(basePrice, item.product.discount);
                const itemTotal = (finalUnitPrice + (item.giftWrap ? 99 : 0)) * item.quantity;

                return (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-2xl overflow-hidden bg-cream-100 flex-shrink-0 border border-cream-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-plum-700 tracking-wider">
                              {item.product.categoryName}
                            </span>
                            <Link href={`/product/${item.product.slug}`}>
                              <h3 className="font-serif text-base sm:text-lg font-bold text-plum-950 hover:text-plum-800 leading-snug">
                                {item.product.name}
                              </h3>
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.variant && (
                          <span className="inline-block text-xs text-plum-800 bg-plum-50 px-2.5 py-0.5 rounded-md font-semibold mt-1">
                            {item.variant.name}: {item.variant.value}
                          </span>
                        )}

                        {item.customName && (
                          <p className="text-xs text-charcoal-700 mt-1.5">
                            <strong className="text-plum-900 font-semibold">Laser Engraving:</strong> &ldquo;{item.customName}&rdquo;
                          </p>
                        )}

                        {item.customMessage && (
                          <p className="text-xs text-charcoal-500 mt-0.5 italic">
                            Message/Tag: &ldquo;{item.customMessage}&rdquo;
                          </p>
                        )}

                        {item.giftWrap && (
                          <div className="mt-1 inline-flex items-center gap-1 text-xs text-peach-700 bg-peach-50 px-2 py-0.5 rounded-md font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-peach-500" /> Luxury Gift Wrap (+₹99)
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden bg-cream-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1.5 px-3 hover:bg-cream-200 text-charcoal-700 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-charcoal-900 min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1.5 px-3 hover:bg-cream-200 text-charcoal-700 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price Breakdown */}
                        <div className="text-right">
                          <div className="text-base font-extrabold text-plum-950">
                            {formatCurrency(itemTotal)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[11px] text-charcoal-400">
                              {formatCurrency(finalUnitPrice + (item.giftWrap ? 99 : 0))} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Gift Note Box */}
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-plum-900">
                <Gift className="w-4 h-4 text-plum-700" />
                <span>Add Complimentary Handwritten Greeting Card Note</span>
              </div>
              <textarea
                rows={3}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Write a heartfelt gift message for your recipient (printed on premium gold-embossed cardstock)..."
                className="w-full p-3.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-plum-800"
              />
              <p className="text-[11px] text-charcoal-400">
                Included complimentary with all orders.
              </p>
            </div>

          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-6">
              <h3 className="font-serif text-lg font-bold text-plum-950 pb-3 border-b border-cream-200">
                Order Summary
              </h3>

              {/* Coupon Box */}
              {appliedCoupon ? (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-emerald-950">Code {appliedCoupon.code} Applied</p>
                      <p className="text-[11px] text-emerald-700">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
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
                        placeholder="Coupon (e.g. WELCOME10)"
                        className="w-full pl-8 pr-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-xs text-charcoal-900 uppercase font-medium focus:outline-none focus:border-plum-800"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-plum-800 hover:bg-plum-900 text-white text-xs font-bold transition"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>}
                </form>
              )}

              {/* Price Calculation */}
              <div className="space-y-2.5 text-xs text-charcoal-700">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-charcoal-900">{formatCurrency(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Savings</span>
                    <span>-{formatCurrency(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span className="font-semibold text-charcoal-900">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">Free</span>
                    ) : (
                      formatCurrency(cartShipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST &amp; Taxes</span>
                  <span className="text-charcoal-500 font-medium">Included in price</span>
                </div>

                <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-plum-950">Grand Total</span>
                    <p className="text-[10px] text-charcoal-400">(Inclusive of all taxes)</p>
                  </div>
                  <span className="text-2xl font-extrabold text-plum-900">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <Link
                href="/checkout"
                className="w-full py-4 rounded-2xl bg-plum-800 hover:bg-plum-900 text-white text-sm font-bold shadow-plum-glow flex items-center justify-center gap-2 transition"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust Indicators */}
              <div className="pt-2 border-t border-cream-100 flex items-center justify-between text-[11px] text-charcoal-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure 256-Bit SSL
                </span>
                <span>Fast Dispatch in 24h</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
