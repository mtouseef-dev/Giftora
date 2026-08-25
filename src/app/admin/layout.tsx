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
  ShieldCheck,
  ShieldAlert,
  KeyRound
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useStore();

  // Allow login page access
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Access Control Guard: Block non-admin users
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-plum-950 via-charcoal-900 to-plum-950 text-cream-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-plum-900/80 backdrop-blur-xl border border-plum-700 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 border-2 border-rose-500/30 text-rose-400 rounded-2xl flex items-center justify-center mx-auto shadow-glow">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Access Restricted
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">
              Administrator Access Required
            </h1>
            <p className="text-xs text-cream-300 leading-relaxed">
              You are currently logged in as {user ? <strong className="text-white">{user.email}</strong> : 'a Customer / Guest'}. Only authorized store managers can view or edit products, database, orders, and system settings.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Link
              href="/admin/login"
              className="w-full py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-plum-950 font-extrabold text-xs shadow-glow flex items-center justify-center gap-2 transition"
            >
              <KeyRound className="w-4 h-4" />
              Log In to Admin Portal
            </Link>

            <Link
              href="/"
              className="w-full py-3 rounded-xl bg-plum-800 hover:bg-plum-700 text-cream-200 font-bold text-xs flex items-center justify-center gap-2 transition border border-plum-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
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
              Admin ({user.name})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1 text-cream-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authenticated Admin Session</span>
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
