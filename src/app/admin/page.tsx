'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminOverviewPage() {
  const { products, orders, categories, updateOrderStatus } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 145000;
  const totalOrdersCount = orders.length + 38;
  const lowStockProducts = products.filter((p) => p.stock <= 10);

  const kpis = [
    {
      title: "Total Gross Revenue",
      value: formatCurrency(totalRevenue),
      change: "+24.8% vs last month",
      icon: TrendingUp,
      accent: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "Orders Processed",
      value: `${totalOrdersCount} Orders`,
      change: "98.2% fulfillment rate",
      icon: ShoppingBag,
      accent: "text-plum-800 bg-plum-50",
    },
    {
      title: "Active Catalog Gifts",
      value: `${products.length} Products`,
      change: `${categories.length} Curated Categories`,
      icon: Package,
      accent: "text-peach-700 bg-peach-50",
    },
    {
      title: "Low-Stock Alerts",
      value: `${lowStockProducts.length} Items`,
      change: "Action required",
      icon: AlertTriangle,
      accent: "text-amber-700 bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-cream-200 shadow-soft">
        <div>
          <h2 className="font-serif text-2xl font-bold text-plum-950">Store Performance Analytics</h2>
          <p className="text-xs text-charcoal-500">Live operational overview of sales, orders, and stock levels</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-plum-800 text-white text-xs font-bold shadow-plum-glow hover:bg-plum-900 transition"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-3xl border border-cream-200 shadow-soft space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal-500">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-extrabold text-plum-950">{kpi.value}</h3>
                <p className="text-[11px] font-medium text-emerald-700 mt-0.5">{kpi.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Trend Visual Bar Simulation */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-plum-950">Sales Revenue Trend (Past 7 Days)</h3>
            <p className="text-xs text-charcoal-500">Daily breakdown of store sales across categories</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            Avg. ₹21,400 / day
          </span>
        </div>

        {/* CSS simulated bar chart */}
        <div className="grid grid-cols-7 gap-3 pt-6 items-end h-48 border-b border-cream-200 pb-2">
          {[
            { day: 'Mon', height: '65%', amount: '₹18.5k' },
            { day: 'Tue', height: '50%', amount: '₹14.2k' },
            { day: 'Wed', height: '80%', amount: '₹24.8k' },
            { day: 'Thu', height: '70%', amount: '₹21.0k' },
            { day: 'Fri', height: '95%', amount: '₹31.5k' },
            { day: 'Sat', height: '100%', amount: '₹34.8k' },
            { day: 'Sun', height: '85%', amount: '₹28.2k' },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-charcoal-500 opacity-0 group-hover:opacity-100 transition">
                {bar.amount}
              </span>
              <div
                className="w-full bg-gradient-to-t from-plum-900 to-plum-700 hover:from-gold-500 hover:to-gold-400 rounded-t-xl transition-all duration-300 shadow-sm"
                style={{ height: bar.height }}
              />
              <span className="text-xs font-semibold text-charcoal-700">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Recent Orders Feed & Low-Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <h3 className="font-serif text-base font-bold text-plum-950">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-plum-800 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl border border-cream-100 bg-cream-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-plum-950">#{ord.orderNumber}</span>
                    <span className="text-charcoal-500">&bull; {ord.customerName}</span>
                  </div>
                  <p className="text-charcoal-500 text-[11px] mt-0.5">
                    {ord.items.length} items &bull; {formatDate(ord.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="font-extrabold text-plum-900">{formatCurrency(ord.total)}</span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                    className="px-2.5 py-1 rounded-lg border border-cream-300 bg-white text-xs font-semibold text-charcoal-800"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low-Stock Monitor (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <h3 className="font-serif text-base font-bold text-plum-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Low Stock Warnings
            </h3>
            <Link href="/admin/inventory" className="text-xs font-bold text-plum-800 hover:underline">
              Inventory &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-2xl border border-amber-200 bg-amber-50/40 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 line-clamp-1">{p.name}</h4>
                    <span className="text-[10px] text-amber-800 font-semibold">
                      Only {p.stock} units remaining
                    </span>
                  </div>
                </div>

                <Link
                  href="/admin/inventory"
                  className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px] hover:bg-amber-700 transition"
                >
                  Restock
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
