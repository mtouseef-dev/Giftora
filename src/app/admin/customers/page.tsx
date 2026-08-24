'use client';

import React, { useState } from 'react';
import { Users, Mail, Phone, ShoppingBag, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [customers] = useState([
    {
      id: 'usr-101',
      name: 'Aarav Singhania',
      email: 'aarav.singhania@example.com',
      phone: '+91 98765 43210',
      totalSpent: 18450,
      orderCount: 4,
      joined: 'Jan 15, 2026',
      city: 'Mumbai, MH',
    },
    {
      id: 'usr-102',
      name: 'Pooja Sharma',
      email: 'pooja.sharma@example.com',
      phone: '+91 98111 22334',
      totalSpent: 9240,
      orderCount: 2,
      joined: 'Feb 02, 2026',
      city: 'New Delhi, DL',
    },
    {
      id: 'usr-103',
      name: 'Vikram Mehta',
      email: 'vikram.mehta@example.com',
      phone: '+91 98333 44556',
      totalSpent: 14890,
      orderCount: 3,
      joined: 'Feb 20, 2026',
      city: 'Bengaluru, KA',
    },
    {
      id: 'usr-104',
      name: 'Ananya Deshmukh',
      email: 'ananya.deshmukh@example.com',
      phone: '+91 97654 32109',
      totalSpent: 31490,
      orderCount: 6,
      joined: 'Mar 10, 2026',
      city: 'Pune, MH',
    },
  ]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
      <div className="pb-4 border-b border-cream-200">
        <h2 className="font-serif text-2xl font-bold text-plum-950">Customer Directory</h2>
        <p className="text-xs text-charcoal-500">View registered gifting patrons, order volume, and lifetime value</p>
      </div>

      <div className="border border-cream-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-cream-100/80 text-plum-950 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Customer</th>
              <th className="p-3.5">Contact</th>
              <th className="p-3.5">Location</th>
              <th className="p-3.5">Orders</th>
              <th className="p-3.5">Lifetime Spend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-cream-50/50 transition">
                <td className="p-3.5 font-bold text-charcoal-900">
                  {c.name}
                  <span className="block text-[10px] text-charcoal-400 font-normal">Joined {c.joined}</span>
                </td>
                <td className="p-3.5">
                  <div className="text-charcoal-700">{c.email}</div>
                  <div className="text-[10px] text-charcoal-400">{c.phone}</div>
                </td>
                <td className="p-3.5 text-charcoal-700">{c.city}</td>
                <td className="p-3.5 font-bold text-plum-900">{c.orderCount} Orders</td>
                <td className="p-3.5 font-extrabold text-plum-950">{formatCurrency(c.totalSpent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
