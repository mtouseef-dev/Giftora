'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronRight,
  Zap,
  ShoppingBag,
  X
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, calculateDiscountPrice } from '@/lib/utils';
import { Address } from '@/types';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    savedAddresses,
    createOrder,
    user,
    appliedCoupon,
    showToast
  } = useStore();

  const [contactName, setContactName] = useState(user?.name || 'Aarav Singhania');
  const [contactEmail, setContactEmail] = useState(user?.email || 'aarav.singhania@example.com');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+91 98765 43210');
  
  const [addressLine, setAddressLine] = useState('Penthouse 402, Magnolia Residency, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400050');

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD' | 'UPI'>('RAZORPAY');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <ShoppingBag className="w-16 h-16 text-plum-800 opacity-60 mb-4" />
        <h2 className="font-serif text-2xl font-bold text-plum-950">No Items to Checkout</h2>
        <p className="text-xs text-charcoal-500 mt-2 mb-6">
          Your cart is currently empty. Add items to proceed with checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2.5 rounded-xl bg-plum-800 text-white text-xs font-bold shadow-plum-glow"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSelectSavedAddress = (addr: Address) => {
    setContactName(addr.name);
    setContactPhone(addr.phone);
    if (addr.email) setContactEmail(addr.email);
    setAddressLine(addr.address);
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
    showToast('Applied saved address', 'info');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim() || !addressLine.trim() || !pincode.trim()) {
      showToast('Please fill all required shipping address fields', 'error');
      return;
    }

    if (paymentMethod === 'RAZORPAY' || paymentMethod === 'UPI') {
      setShowRazorpayModal(true);
    } else {
      // Cash on delivery direct order
      completeOrderPlacement('COD');
    }
  };

  const completeOrderPlacement = (finalPaymentMethod: 'RAZORPAY' | 'COD' | 'UPI') => {
    setIsProcessing(true);

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      address: addressLine,
      city,
      state,
      pincode,
    };

    setTimeout(() => {
      const order = createOrder({
        address: shippingAddress,
        paymentMethod: finalPaymentMethod,
        shippingFee: deliveryMethod === 'express' ? 150 : cartShipping,
        deliveryMethod,
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast('Order confirmed successfully!', 'success');
      router.push(`/order-success/${order.id}`);
    }, 1200);
  };

  return (
    <div className="bg-cream-100/50 min-h-screen py-8 sm:py-12 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-charcoal-500 mb-2">
            <Link href="/cart" className="hover:text-plum-800">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-plum-900 font-bold">Secure Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950 flex items-center gap-2">
            Secure Checkout
            <Lock className="w-5 h-5 text-emerald-600 inline" />
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact, Address, Delivery, Payment */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Contact Info */}
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-cream-100">
                <h3 className="font-serif text-base font-bold text-plum-950 flex items-center gap-2">
                  <User className="w-4 h-4 text-plum-800" />
                  1. Contact Information
                </h3>
                {user && (
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Logged in as {user.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Phone Number (For Tracking Updates) *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Email Address (For Invoices) *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-cream-100">
                <h3 className="font-serif text-base font-bold text-plum-950 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-plum-800" />
                  2. Shipping Address
                </h3>
              </div>

              {/* Saved Addresses quick picker */}
              {savedAddresses.length > 0 && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                    Use Saved Address:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-3 rounded-2xl border text-left text-xs transition ${
                          addressLine === addr.address
                            ? 'border-plum-800 bg-plum-50/70 font-semibold'
                            : 'border-cream-300 bg-cream-50 hover:bg-cream-100'
                        }`}
                      >
                        <p className="font-bold text-plum-950">{addr.name}</p>
                        <p className="text-charcoal-600 line-clamp-1 text-[11px] mt-0.5">{addr.address}</p>
                        <p className="text-[10px] text-charcoal-400 mt-1">{addr.city}, {addr.pincode}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Street Address / Apartment / Landmark *</label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="e.g. Flat 402, Sunshine Heights, Main Road"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">Pincode (6 digits) *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-plum-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-3">
              <h3 className="font-serif text-base font-bold text-plum-950 pb-3 border-b border-cream-100 flex items-center gap-2">
                <Truck className="w-4 h-4 text-plum-800" />
                3. Delivery Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-start justify-between ${
                    deliveryMethod === 'standard'
                      ? 'border-plum-800 bg-plum-50/70 shadow-sm'
                      : 'border-cream-300 bg-cream-50'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-plum-950">Standard Delivery (2-3 Days)</p>
                    <p className="text-[11px] text-charcoal-500 mt-0.5">Reliable Pan-India logistics</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 uppercase">
                    {cartShipping === 0 ? 'Free' : formatCurrency(cartShipping)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-start justify-between ${
                    deliveryMethod === 'express'
                      ? 'border-plum-800 bg-plum-50/70 shadow-sm'
                      : 'border-cream-300 bg-cream-50'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-plum-950 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-gold-500 fill-gold-500" /> Express Next-Day Flight
                    </p>
                    <p className="text-[11px] text-charcoal-500 mt-0.5">Guaranteed priority dispatch</p>
                  </div>
                  <span className="text-xs font-bold text-plum-900">+₹150</span>
                </button>
              </div>
            </div>

            {/* 4. Payment Method Selection */}
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
              <h3 className="font-serif text-base font-bold text-plum-950 pb-3 border-b border-cream-100 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-plum-800" />
                4. Payment Method
              </h3>

              <div className="space-y-2.5">
                {/* Razorpay Online */}
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'RAZORPAY'
                    ? 'border-plum-800 bg-plum-50/80 ring-2 ring-plum-600/20'
                    : 'border-cream-300 bg-cream-50 hover:bg-cream-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'RAZORPAY'}
                      onChange={() => setPaymentMethod('RAZORPAY')}
                      className="text-plum-800 focus:ring-plum-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-plum-950 flex items-center gap-1.5">
                        Razorpay Secure (UPI, Cards, NetBanking, Wallets)
                        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                      </p>
                      <p className="text-[11px] text-charcoal-500 mt-0.5">
                        Google Pay, PhonePe, Paytm, RuPay, Visa, Mastercard
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Recommended
                  </span>
                </label>

                {/* Cash on Delivery */}
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'COD'
                    ? 'border-plum-800 bg-plum-50/80 ring-2 ring-plum-600/20'
                    : 'border-cream-300 bg-cream-50 hover:bg-cream-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="text-plum-800 focus:ring-plum-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-plum-950">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-charcoal-500 mt-0.5">
                        Pay in cash upon doorstep package delivery
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Total Summary */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                <h3 className="font-serif text-base font-bold text-plum-950">
                  Your Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </h3>
                <Link href="/cart" className="text-xs font-semibold text-plum-800 hover:underline">
                  Edit Bag
                </Link>
              </div>

              {/* Items List Mini */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const basePrice = item.product.price + (item.variant?.priceAdjustment || 0);
                  const finalUnitPrice = calculateDiscountPrice(basePrice, item.product.discount);
                  return (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-cream-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-charcoal-900 truncate">{item.product.name}</p>
                        <p className="text-charcoal-500 text-[11px]">
                          Qty: {item.quantity} {item.variant ? `&bull; ${item.variant.value}` : ''}
                        </p>
                      </div>
                      <div className="font-bold text-plum-950">
                        {formatCurrency((finalUnitPrice + (item.giftWrap ? 99 : 0)) * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-2 text-xs text-charcoal-700 pt-3 border-t border-cream-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">{formatCurrency(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatCurrency(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-charcoal-900">
                    {deliveryMethod === 'express'
                      ? '₹150 (Express)'
                      : cartShipping === 0
                      ? 'Free'
                      : formatCurrency(cartShipping)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-plum-950 pt-2 border-t border-cream-200">
                  <span>Total Amount</span>
                  <span className="text-xl font-extrabold text-plum-900">
                    {formatCurrency(cartTotal + (deliveryMethod === 'express' ? 150 : 0))}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-plum-800 hover:bg-plum-900 disabled:bg-plum-400 text-white font-bold text-sm shadow-plum-glow flex items-center justify-center gap-2 transition"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gold-300" />
                    Place Order &amp; Pay {formatCurrency(cartTotal + (deliveryMethod === 'express' ? 150 : 0))}
                  </>
                )}
              </button>

              <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200 text-center text-[11px] text-charcoal-600 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Protected by 256-Bit Bank Grade Encryption</span>
              </div>

            </div>

          </div>

        </form>

      </div>

      {/* Razorpay Simulation Interactive Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-plum-800 animate-slide-up">
            
            {/* Razorpay Modal Header */}
            <div className="bg-plum-900 text-cream-100 p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-gold-300">
                  <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Secure Gateway
                </div>
                <h4 className="font-serif text-lg font-bold text-white mt-0.5">Giftora Official Store</h4>
              </div>
              <button
                onClick={() => setShowRazorpayModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-cream-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Total Amount Pill */}
            <div className="bg-plum-950 text-white p-3 px-6 flex items-center justify-between text-xs border-b border-plum-800">
              <span className="text-cream-300">Amount Payable:</span>
              <span className="text-base font-extrabold text-gold-300">
                {formatCurrency(cartTotal + (deliveryMethod === 'express' ? 150 : 0))}
              </span>
            </div>

            {/* Simulated Payment Tabs */}
            <div className="p-6 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Choose Instant Payment Method:
              </label>

              <div className="space-y-2">
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => setSelectedUpiApp('gpay')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition ${
                    selectedUpiApp === 'gpay'
                      ? 'border-plum-800 bg-plum-50 font-bold text-plum-950'
                      : 'border-cream-300 hover:bg-cream-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-cream-200 flex items-center justify-center font-bold text-plum-900 text-[10px]">
                      UPI
                    </div>
                    <span>Google Pay / PhonePe / Paytm UPI</span>
                  </div>
                  <CheckCircle2 className={`w-4 h-4 ${selectedUpiApp === 'gpay' ? 'text-plum-800' : 'text-transparent'}`} />
                </button>

                {/* Card Option */}
                <button
                  type="button"
                  onClick={() => setSelectedUpiApp('card')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition ${
                    selectedUpiApp === 'card'
                      ? 'border-plum-800 bg-plum-50 font-bold text-plum-950'
                      : 'border-cream-300 hover:bg-cream-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-plum-800" />
                    <span>Credit / Debit Card (Visa, RuPay, Master)</span>
                  </div>
                  <CheckCircle2 className={`w-4 h-4 ${selectedUpiApp === 'card' ? 'text-plum-800' : 'text-transparent'}`} />
                </button>
              </div>

              {/* Simulation Notice */}
              <div className="p-3 bg-cream-100 rounded-xl text-[11px] text-charcoal-600">
                ⚡ <strong>Sandbox Simulation Mode</strong>: Click button below to simulate verified Razorpay payment callback and instant order confirmation.
              </div>

              {/* Confirm Payment CTA */}
              <button
                type="button"
                onClick={() => {
                  setShowRazorpayModal(false);
                  completeOrderPlacement('RAZORPAY');
                }}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Authorize &amp; Complete Payment ({formatCurrency(cartTotal + (deliveryMethod === 'express' ? 150 : 0))})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
