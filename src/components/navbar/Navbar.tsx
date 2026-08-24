'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Gift,
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldAlert,
  Compass,
  LogOut,
  PackageCheck,
  MapPin,
  SlidersHorizontal,
  Bell
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    cart,
    wishlist,
    setIsCartOpen,
    user,
    loginAsCustomer,
    loginAsAdmin,
    logout,
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Personalized Gifts', href: '/shop?category=personalized-gifts' },
    { label: 'Luxury Hampers', href: '/shop?category=luxury-hampers' },
    { label: 'Toys & STEM', href: '/shop?category=stem-educational-toys' },
    { label: 'Gift Finder', href: '/#gift-finder', isSpecial: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-cream-300/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-cream-200 text-charcoal-800 transition"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-plum-800 flex items-center justify-center text-gold-300 shadow-plum-glow group-hover:scale-105 transition duration-300">
                  <Gift className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-plum-950 flex items-center gap-1">
                    Giftora
                    <Sparkles className="w-3.5 h-3.5 text-gold-500 fill-gold-400" />
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-plum-700 -mt-1">
                    Luxury Gifts & Toys
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                      link.isSpecial
                        ? 'bg-plum-100/80 text-plum-900 hover:bg-plum-200/80 border border-plum-200'
                        : isActive
                        ? 'text-plum-800 bg-cream-200/60 font-bold'
                        : 'text-charcoal-700 hover:text-plum-800 hover:bg-cream-200/40'
                    }`}
                  >
                    {link.isSpecial && <Compass className="w-4 h-4 text-plum-700 animate-spin-slow" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart, Account) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-cream-100 hover:bg-cream-200 border border-cream-300/80 text-charcoal-700 text-sm transition group"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 text-plum-700 group-hover:scale-110 transition" />
                <span className="hidden sm:inline text-xs text-charcoal-500 font-medium">Search gifts...</span>
              </button>

              {/* Wishlist Button */}
              <Link
                href="/account?tab=wishlist"
                className="relative p-2.5 rounded-xl hover:bg-cream-200 text-charcoal-700 transition group"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 group-hover:text-rose-600 transition" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-cream-50">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-plum-800 hover:bg-plum-900 text-cream-100 font-semibold text-sm shadow-plum-glow hover:shadow-lg transition group"
                aria-label="Open Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-gold-300 group-hover:scale-110 transition" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-gold-400 text-plum-950 text-xs font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              </button>

              {/* User Dropdown / Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-cream-200 text-charcoal-700 transition"
                  aria-label="User Account Menu"
                >
                  <div className="w-8 h-8 rounded-full bg-peach-100 border border-peach-300 flex items-center justify-center text-plum-900 font-bold text-xs">
                    {user ? user.name[0] : <UserIcon className="w-4 h-4" />}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 hidden sm:inline" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div
                      onClick={() => setIsUserMenuOpen(false)}
                      className="fixed inset-0 z-20"
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-cream-300 p-2 z-30 animate-fade-in">
                      {user ? (
                        <div className="p-3 border-b border-cream-200">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-charcoal-900 truncate">{user.name}</p>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                user.role === 'ADMIN'
                                  ? 'bg-plum-100 text-plum-800 border border-plum-300'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {user.role}
                            </span>
                          </div>
                          <p className="text-xs text-charcoal-500 truncate">{user.email}</p>
                        </div>
                      ) : (
                        <div className="p-3 border-b border-cream-200 space-y-2">
                          <div>
                            <p className="text-xs font-bold text-plum-950">Welcome to Giftora</p>
                            <p className="text-[11px] text-charcoal-500">Sign in for fast checkout & rewards</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              href="/login"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="px-3 py-1.5 rounded-xl bg-plum-800 text-white text-xs font-bold text-center hover:bg-plum-900 transition"
                            >
                              Sign In
                            </Link>
                            <Link
                              href="/register"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="px-3 py-1.5 rounded-xl bg-cream-100 border border-cream-300 text-charcoal-800 text-xs font-bold text-center hover:bg-cream-200 transition"
                            >
                              Register
                            </Link>
                          </div>
                        </div>
                      )}

                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 rounded-xl transition"
                        >
                          <PackageCheck className="w-4 h-4 text-plum-700" />
                          My Orders &amp; Tracking
                        </Link>
                        <Link
                          href="/account?tab=wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 rounded-xl transition"
                        >
                          <Heart className="w-4 h-4 text-rose-600" />
                          My Wishlist ({wishlist.length})
                        </Link>
                        <Link
                          href="/account?tab=reminders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 rounded-xl transition"
                        >
                          <Bell className="w-4 h-4 text-gold-600" />
                          Occasion Reminders
                        </Link>
                        <Link
                          href="/account?tab=addresses"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 rounded-xl transition"
                        >
                          <MapPin className="w-4 h-4 text-peach-500" />
                          Saved Addresses
                        </Link>
                        
                        <div className="my-1 border-t border-cream-200" />

                        {/* Dedicated Admin Portal Link */}
                        <Link
                          href="/admin/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-bold text-plum-900 bg-plum-50 hover:bg-plum-100 rounded-xl transition"
                        >
                          <span className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-plum-700" />
                            Owner / Admin Portal
                          </span>
                          <span className="text-[10px] bg-plum-800 text-gold-300 font-bold px-1.5 py-0.5 rounded">
                            PRO
                          </span>
                        </Link>

                        {/* Switch Role Fast Toggle */}
                        <div className="mt-2 p-2 bg-cream-100 rounded-xl">
                          <p className="text-[10px] font-bold text-charcoal-500 uppercase tracking-wider mb-1.5">
                            Demo Role Switcher
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={() => {
                                loginAsCustomer();
                                setIsUserMenuOpen(false);
                              }}
                              className={`text-[11px] font-semibold py-1 rounded-lg border transition ${
                                user?.role === 'CUSTOMER'
                                  ? 'bg-white border-plum-600 text-plum-800 shadow-sm'
                                  : 'border-cream-300 text-charcoal-600 hover:bg-white'
                              }`}
                            >
                              Customer
                            </button>
                            <button
                              onClick={() => {
                                loginAsAdmin();
                                setIsUserMenuOpen(false);
                              }}
                              className={`text-[11px] font-semibold py-1 rounded-lg border transition ${
                                user?.role === 'ADMIN'
                                  ? 'bg-plum-800 border-plum-800 text-white shadow-sm'
                                  : 'border-cream-300 text-charcoal-600 hover:bg-white'
                              }`}
                            >
                              Admin
                            </button>
                          </div>
                        </div>

                        {user && (
                          <button
                            onClick={() => {
                              logout();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition text-left"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-30 bg-plum-950/40 backdrop-blur-xs"
            />
            <div className="lg:hidden relative z-40 border-t border-cream-300 bg-cream-50 p-4 space-y-2 animate-slide-up">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-cream-200 transition"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-cream-200 flex flex-col gap-2">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold bg-plum-800 text-white"
                >
                  <span>Admin Dashboard</span>
                  <span className="text-xs bg-gold-400 text-plum-950 px-2 py-0.5 rounded font-bold">Admin</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
