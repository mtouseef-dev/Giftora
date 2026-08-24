'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Database,
  Package,
  Tags,
  ShoppingBag,
  Users,
  Ticket,
  Warehouse,
  ArrowLeft,
  Gift,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loginAsAdmin } = useStore();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview Analytics', href: '/admin', icon: LayoutDashboard },
    { label: 'MongoDB Database', href: '/admin/database', icon: Database },
    { label: 'Products Manager', href: '/admin/products', icon: Package },
    { label: 'Categories Manager', href: '/admin/categories', icon: Tags },
    { label: 'Orders & Shipments', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers Directory', href: '/admin/customers', icon: Users },
    { label: 'Coupons & Promos', href: '/admin/coupons', icon: Ticket },
    { label: 'Inventory Monitor', href: '/admin/inventory', icon: Warehouse },
  ];

  return (
    <div className="bg-cream-100/60 min-h-screen">
      {/* Admin Top Header */}
      <header className="bg-plum-950 text-white border-b border-plum-900 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg bg-plum-800 hover:bg-plum-700 text-cream-200 text-xs font-semibold flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <div className="h-4 w-px bg-plum-800" />
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-gold-400" />
            <span className="font-serif text-lg font-bold">Giftora Control Center</span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gold-400 text-plum-950">
              Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1 text-cream-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>PostgreSQL &amp; Cloudinary Connected</span>
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-3xl border border-cream-200 shadow-soft space-y-1">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-plum-800">
              Store Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-plum-800 text-white shadow-plum-glow'
                      : 'text-charcoal-700 hover:bg-cream-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </aside>

          {/* Admin View Area */}
          <main className="lg:col-span-9">{children}</main>

        </div>
      </div>
    </div>
  );
}
