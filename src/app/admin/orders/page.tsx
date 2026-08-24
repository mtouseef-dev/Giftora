'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Eye, Filter, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, showToast } = useStore();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-plum-950">Orders &amp; Shipments</h2>
          <p className="text-xs text-charcoal-500">Monitor customer orders, fulfillment tracking, and status transitions</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-plum-800 text-white shadow-sm'
                  : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Order ID, Name, or Email..."
          className="px-3.5 py-2 bg-cream-50 rounded-xl border border-cream-300 text-xs w-full sm:w-64"
        />
      </div>

      {/* Table */}
      <div className="border border-cream-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-cream-100/80 text-plum-950 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Order ID</th>
              <th className="p-3.5">Customer</th>
              <th className="p-3.5">Items</th>
              <th className="p-3.5">Total &amp; Payment</th>
              <th className="p-3.5">Fulfillment Status</th>
              <th className="p-3.5 text-right">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-cream-50/50 transition">
                <td className="p-3.5 font-bold text-plum-950">
                  #{ord.orderNumber}
                  <span className="block text-[10px] text-charcoal-400 font-normal">{formatDate(ord.createdAt)}</span>
                </td>
                <td className="p-3.5">
                  <div className="font-semibold text-charcoal-900">{ord.customerName}</div>
                  <div className="text-[10px] text-charcoal-400">{ord.customerEmail}</div>
                </td>
                <td className="p-3.5 text-charcoal-700">
                  <span className="font-bold">{ord.items.length} items</span>
                  <span className="block text-[10px] text-charcoal-400 truncate max-w-xs">
                    {ord.items.map((i) => i.productName).join(', ')}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="font-extrabold text-plum-950">{formatCurrency(ord.total)}</span>
                  <span className={`block text-[10px] font-bold ${
                    ord.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {ord.paymentMethod} &bull; {ord.paymentStatus}
                  </span>
                </td>
                <td className="p-3.5">
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                    className="px-2.5 py-1 rounded-lg border border-cream-300 bg-white text-xs font-semibold text-charcoal-800"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td className="p-3.5 text-right">
                  <Link
                    href={`/order-success/${ord.id}`}
                    className="p-1.5 rounded-lg bg-cream-100 hover:bg-plum-800 hover:text-white transition inline-block"
                    title="View Customer Invoice"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
