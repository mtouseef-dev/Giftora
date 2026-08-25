'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  User as UserIcon,
  PackageCheck,
  Heart,
  MapPin,
  Bell,
  Trash2,
  ShoppingBag,
  Plus,
  Truck,
  CheckCircle2,
  Calendar,
  Sparkles,
  LogOut,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';

  const {
    user,
    orders,
    wishlist,
    products,
    savedAddresses,
    addAddress,
    deleteAddress,
    reminders,
    addReminder,
    deleteReminder,
    loginAsCustomer,
    loginAsAdmin,
    logout,
    addToCart,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // New address state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrText, setNewAddrText] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrPin, setNewAddrPin] = useState('');

  // New reminder state
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [remName, setRemName] = useState('');
  const [remRel, setRemRel] = useState('Spouse / Partner');
  const [remType, setRemType] = useState<'Birthday' | 'Anniversary' | 'Festival' | 'Other'>('Anniversary');
  const [remDate, setRemDate] = useState('');

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrPhone || !newAddrText || !newAddrCity || !newAddrPin) {
      showToast('Please fill all address fields', 'error');
      return;
    }
    addAddress({
      name: newAddrName,
      phone: newAddrPhone,
      address: newAddrText,
      city: newAddrCity,
      state: newAddrState || 'Maharashtra',
      pincode: newAddrPin,
      isDefault: false,
    });
    setShowAddAddress(false);
    setNewAddrName('');
    setNewAddrPhone('');
    setNewAddrText('');
    setNewAddrCity('');
    setNewAddrPin('');
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remName || !remDate) {
      showToast('Please provide recipient name and date', 'error');
      return;
    }
    addReminder({
      recipientName: remName,
      relationship: remRel,
      occasionType: remType,
      date: remDate,
      reminderDaysBefore: 7,
    });
    setShowAddReminder(false);
    setRemName('');
    setRemDate('');
  };

  return (
    <div className="bg-cream-100/50 min-h-screen py-8 sm:py-12 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Profile Bar */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-plum-800 text-gold-300 flex items-center justify-center font-serif text-2xl font-bold shadow-plum-glow">
              {user ? user.name[0] : 'G'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-plum-950">
                  {user ? user.name : 'Guest User'}
                </h1>
                {user && (
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    user.role === 'ADMIN'
                      ? 'bg-plum-100 text-plum-900 border border-plum-300'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {user.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-charcoal-500 mt-0.5">{user?.email || 'Sign in to access your profile'}</p>
              <p className="text-[11px] text-charcoal-400">Member since {user?.createdAt || '2026'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {user?.role === 'ADMIN' ? (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl bg-plum-800 text-gold-300 font-bold text-xs shadow-plum-glow flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Admin Control Panel
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="px-4 py-2 rounded-xl bg-plum-100 text-plum-900 hover:bg-plum-200 font-bold text-xs border border-plum-300 transition flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-plum-700" /> Owner / Admin Login
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl border border-cream-300 hover:bg-cream-100 text-charcoal-700 font-bold text-xs transition"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={loginAsCustomer}
                className="px-4 py-2 rounded-xl bg-plum-800 text-white font-bold text-xs shadow-plum-glow"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Main Grid: Tabs Sidebar + Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-3xl border border-cream-200 shadow-soft space-y-1">
            {[
              { id: 'orders', label: 'My Orders', icon: PackageCheck, count: orders.length },
              { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: savedAddresses.length },
              { id: 'reminders', label: 'Occasion Reminders', icon: Bell, count: reminders.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                    isActive
                      ? 'bg-plum-800 text-white shadow-plum-glow'
                      : 'text-charcoal-700 hover:bg-cream-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-cream-200 text-charcoal-700'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft min-h-[400px]">
            
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-plum-950">Order History</h3>
                    <p className="text-xs text-charcoal-500">Track and manage your previous gift shipments</p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <PackageCheck className="w-12 h-12 text-charcoal-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-charcoal-800">No orders placed yet</p>
                    <p className="text-xs text-charcoal-500 mt-1">Start shopping to surprise your friends and family.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl border border-cream-200 bg-cream-50/40 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cream-200">
                          <div>
                            <span className="text-[11px] font-extrabold text-plum-900">
                              #{order.orderNumber}
                            </span>
                            <span className="text-xs text-charcoal-500 ml-2">
                              Placed on {formatDate(order.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                order.status === 'DELIVERED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-plum-100 text-plum-800'
                              }`}
                            >
                              {order.status}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-200 text-charcoal-800">
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                                  <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                                </div>
                                <div>
                                  <p className="font-semibold text-charcoal-900">{item.productName}</p>
                                  <p className="text-[11px] text-charcoal-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-bold text-plum-950">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-charcoal-500">Total: </span>
                            <strong className="text-sm font-extrabold text-plum-950">{formatCurrency(order.total)}</strong>
                          </div>
                          <Link
                            href={`/order-success/${order.id}`}
                            className="text-xs font-bold text-plum-800 hover:underline flex items-center gap-1"
                          >
                            Live Tracking &amp; Invoice <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-plum-950">My Saved Wishlist</h3>
                    <p className="text-xs text-charcoal-500">Gifts and toys saved for future occasions</p>
                  </div>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-rose-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-charcoal-800">Your wishlist is empty</p>
                    <p className="text-xs text-charcoal-500 mt-1">Tap the heart icon on any product to save it here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistedProducts.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-plum-950">Saved Shipping Addresses</h3>
                    <p className="text-xs text-charcoal-500">Manage delivery locations for faster checkout</p>
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="px-3.5 py-1.5 rounded-xl bg-plum-800 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleSaveAddress} className="p-5 rounded-2xl bg-cream-50 border border-cream-300 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900">New Address Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Recipient Name"
                        value={newAddrName}
                        onChange={(e) => setNewAddrName(e.target.value)}
                        className="px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={newAddrPhone}
                        onChange={(e) => setNewAddrPhone(e.target.value)}
                        className="px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Street Address / Flat No."
                        value={newAddrText}
                        onChange={(e) => setNewAddrText(e.target.value)}
                        className="sm:col-span-2 px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Pincode (6-digits)"
                        value={newAddrPin}
                        onChange={(e) => setNewAddrPin(e.target.value)}
                        className="px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-3 py-1.5 rounded-xl border border-cream-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-plum-800 text-white text-xs font-bold"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAddresses.map((addr) => (
                    <div key={addr.id} className="p-4 rounded-2xl border border-cream-200 bg-white flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-plum-950">{addr.name}</h4>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-700">{addr.address}</p>
                        <p className="text-xs text-charcoal-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-[11px] text-charcoal-400 mt-1">Phone: {addr.phone}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-cream-100 flex justify-end">
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: OCCASION REMINDERS */}
            {activeTab === 'reminders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-plum-950">Occasion Reminders</h3>
                    <p className="text-xs text-charcoal-500">Never miss a birthday, anniversary, or festival</p>
                  </div>
                  <button
                    onClick={() => setShowAddReminder(!showAddReminder)}
                    className="px-3.5 py-1.5 rounded-xl bg-plum-800 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Reminder
                  </button>
                </div>

                {showAddReminder && (
                  <form onSubmit={handleSaveReminder} className="p-5 rounded-2xl bg-cream-50 border border-cream-300 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900">Add Special Occasion</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Recipient Name (e.g. Mom)"
                        value={remName}
                        onChange={(e) => setRemName(e.target.value)}
                        className="px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      />
                      <select
                        value={remType}
                        onChange={(e) => setRemType(e.target.value as any)}
                        className="px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      >
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Festival">Festival</option>
                        <option value="Other">Other</option>
                      </select>
                      <input
                        type="date"
                        required
                        value={remDate}
                        onChange={(e) => setRemDate(e.target.value)}
                        className="px-3 py-2 bg-white rounded-xl border border-cream-300 text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddReminder(false)}
                        className="px-3 py-1.5 rounded-xl border border-cream-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-plum-800 text-white text-xs font-bold"
                      >
                        Save Reminder
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reminders.map((rem) => (
                    <div key={rem.id} className="p-4 rounded-2xl border border-cream-200 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center font-bold">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-plum-950">{rem.recipientName}</h4>
                          <p className="text-[11px] text-plum-800 font-semibold">{rem.occasionType}</p>
                          <p className="text-[10px] text-charcoal-500">Date: {rem.date}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteReminder(rem.id)}
                        className="p-1 text-charcoal-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-charcoal-500">Loading profile...</div>}>
      <AccountContent />
    </Suspense>
  );
}
