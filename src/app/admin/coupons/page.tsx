'use client';

import React, { useState } from 'react';
import { Plus, Ticket, Check, X, Sparkles } from 'lucide-react';
import { COUPONS } from '@/data/mockData';
import { Coupon } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/utils';

export default function AdminCouponsPage() {
  const { showToast } = useStore();
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState(15);
  const [minimumAmount, setMinimumAmount] = useState(1000);
  const [description, setDescription] = useState('');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType: 'PERCENTAGE',
      discountValue,
      minimumAmount,
      active: true,
      description: description || `${discountValue}% discount on orders above ₹${minimumAmount}`,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon ${newCoupon.code} created!`, 'success');
    setShowModal(false);
    setCode('');
  };

  const toggleCouponActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
    showToast('Coupon status updated', 'info');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-plum-950">Coupons &amp; Promotional Codes</h2>
          <p className="text-xs text-charcoal-500">Create discount campaigns, percentage discounts, and minimum order rules</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-white font-bold text-xs shadow-plum-glow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between ${
              c.active ? 'border-plum-300 bg-cream-50/50' : 'border-cream-200 bg-white opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-extrabold px-3 py-1 rounded-xl bg-plum-800 text-gold-300">
                  {c.code}
                </span>
                <button
                  onClick={() => toggleCouponActive(c.id)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-charcoal-200 text-charcoal-600'
                  }`}
                >
                  {c.active ? 'Active' : 'Disabled'}
                </button>
              </div>
              <p className="text-xs font-semibold text-charcoal-900">{c.description}</p>
              <p className="text-[11px] text-charcoal-500 mt-1">
                Min Order: {formatCurrency(c.minimumAmount)} &bull; Discount: {c.discountValue}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif text-lg font-bold text-plum-950">Create Promo Code</h3>
              <button onClick={() => setShowModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block font-bold text-charcoal-800 mb-1">Coupon Code (e.g. FESTIVE20) *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal-800 mb-1">Discount % *</label>
                <input
                  type="number"
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300"
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal-800 mb-1">Minimum Order Amount (INR ₹) *</label>
                <input
                  type="number"
                  required
                  value={minimumAmount}
                  onChange={(e) => setMinimumAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-plum-800 text-white rounded-xl font-bold shadow-plum-glow">
                  Publish Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
