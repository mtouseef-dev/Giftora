'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  Printer,
  Sparkles,
  ShoppingBag,
  Share2,
  MessageCircle
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { getOrderById, showToast } = useStore();

  const order = getOrderById(id as string);

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
  }, []);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Package className="w-16 h-16 text-plum-800 opacity-60 mb-4" />
        <h2 className="font-serif text-2xl font-bold text-plum-950">Order Not Found</h2>
        <p className="text-xs text-charcoal-500 mt-2 mb-6">
          Could not locate order #{id}. Check your account or continue shopping.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-plum-800 text-white text-xs font-bold shadow-plum-glow"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const trackingSteps = [
    { title: 'Order Placed', time: 'Just now', completed: true },
    { title: 'Payment Verified', time: order.paymentStatus === 'PAID' ? 'Verified (PAID)' : 'Pending (COD)', completed: true },
    { title: 'Artisan Packaging', time: 'In Progress', active: true },
    { title: 'Shipped (Express)', time: `Tracking: ${order.trackingNumber || 'Pending'}`, completed: false },
    { title: 'Delivered', time: `Est: ${order.estimatedDelivery ? formatDate(order.estimatedDelivery) : 'In 2-3 days'}`, completed: false },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSimulation = () => {
    showToast(`WhatsApp live order updates enabled for ${order.customerPhone}!`, 'success');
  };

  return (
    <div className="bg-cream-100/50 min-h-screen py-10 sm:py-16 border-b border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-soft text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed &bull; #{order.orderNumber}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950 mt-3">
              Thank You for Gifting with Giftora!
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mt-2">
              We have received your order. A receipt and shipment tracker has been sent to{' '}
              <strong className="text-plum-900">{order.customerEmail}</strong>.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 hover:bg-cream-100 text-xs font-bold text-charcoal-800 flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" /> Print Tax Invoice
            </button>
            <button
              onClick={handleWhatsAppSimulation}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Receive WhatsApp Updates
            </button>
          </div>
        </div>

        {/* Live Tracking Timeline */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft mb-8">
          <h3 className="font-serif text-lg font-bold text-plum-950 mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 text-plum-700" />
            Live Shipment Tracker
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {trackingSteps.map((step, idx) => (
              <div key={idx} className="flex sm:flex-col items-center text-left sm:text-center gap-3 sm:gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 transition ${
                    step.completed
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : step.active
                      ? 'bg-plum-800 text-gold-300 ring-4 ring-plum-100'
                      : 'bg-cream-200 text-charcoal-400'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal-900">{step.title}</p>
                  <p className="text-[10px] text-charcoal-500 mt-0.5">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
          <h3 className="font-serif text-lg font-bold text-plum-950 pb-3 border-b border-cream-200">
            Order Items &amp; Delivery Details
          </h3>

          {/* Items */}
          <div className="divide-y divide-cream-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-cream-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-900">{item.productName}</h4>
                    <p className="text-[11px] text-charcoal-500">
                      Qty: {item.quantity} {item.variantName ? `&bull; ${item.variantName}` : ''}
                    </p>
                    {item.customName && (
                      <p className="text-[10px] text-plum-800 font-semibold">
                        Engraving: &ldquo;{item.customName}&rdquo;
                      </p>
                    )}
                    {item.customMessage && (
                      <p className="text-[10px] text-charcoal-500 italic">
                        Note: &ldquo;{item.customMessage}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-xs font-extrabold text-plum-950">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Price totals */}
          <div className="pt-4 border-t border-cream-200 space-y-2 text-xs text-charcoal-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal-900">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Coupon Savings ({order.couponCode})</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-semibold text-charcoal-900">
                {order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-plum-950 pt-2 border-t border-cream-200">
              <span>Total Paid ({order.paymentMethod})</span>
              <span className="text-xl font-extrabold text-plum-900">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Destination Address */}
          <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-1 text-xs">
            <h4 className="font-bold text-plum-950 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-plum-700" /> Destination Address:
            </h4>
            <p className="font-semibold text-charcoal-900">{order.address.name}</p>
            <p className="text-charcoal-600">{order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
            <p className="text-charcoal-500">Contact: {order.address.phone}</p>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-plum-800 hover:bg-plum-900 text-white text-xs font-bold shadow-plum-glow transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account"
              className="text-xs font-semibold text-plum-800 hover:underline"
            >
              View All Orders &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
