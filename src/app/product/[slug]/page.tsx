'use client';

import React, { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
  Gift,
  Plus,
  Minus,
  MapPin,
  Play,
  Share2,
  ChevronRight,
  Package,
  X
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';
import { formatCurrency, calculateDiscountPrice, calculateSavings } from '@/lib/utils';
import { REVIEWS } from '@/data/mockData';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { products, addToCart, isInWishlist, toggleWishlist, showToast } = useStore();

  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || undefined);
  const [quantity, setQuantity] = useState(1);
  const [customName, setCustomName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [giftWrap, setGiftWrap] = useState(true);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'contents' | 'specs' | 'reviews'>('overview');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Gift className="w-16 h-16 text-plum-800 opacity-60 mb-4" />
        <h2 className="font-serif text-2xl font-bold text-plum-950">Product Not Found</h2>
        <p className="text-xs text-charcoal-500 mt-2 mb-6">
          The requested gift or toy might have moved or been updated.
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

  const isWishlisted = isInWishlist(product.id);
  const basePrice = product.price + (selectedVariant?.priceAdjustment || 0);
  const finalUnitPrice = calculateDiscountPrice(basePrice, product.discount);
  const savings = calculateSavings(basePrice, product.discount);

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedVariant,
      customName.trim() || undefined,
      customMessage.trim() || undefined,
      giftWrap
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeChecked(true);
      showToast(`Delivery available to pincode ${pincode}! (2-3 days)`, 'success');
    } else {
      showToast('Please enter a valid 6-digit Indian PIN code', 'error');
    }
  };

  return (
    <div className="bg-cream-50/50 min-h-screen py-8 sm:py-12 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-plum-800 transition">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-plum-800 transition">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${product.categoryId}`} className="hover:text-plum-800 transition">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-plum-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Section (Gallery + Details Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-soft mb-12">
          
          {/* Left Column: Image Gallery & Video Demo */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 group">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Discount Tag */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase shadow-sm">
                  {product.discount}% OFF
                </div>
              )}

              {/* Video Demo Button if available */}
              {product.videoUrl && (
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-plum-900/90 text-gold-300 backdrop-blur-md text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-plum-950 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-gold-300" /> Watch Unboxing Video
                </button>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-300'
                    : 'bg-white/80 text-charcoal-600 hover:bg-white hover:text-rose-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                      selectedImage === idx
                        ? 'border-plum-800 ring-2 ring-plum-600/30'
                        : 'border-cream-200 hover:border-plum-300'
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Variants & Cart Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-plum-700 bg-plum-50 px-2.5 py-0.5 rounded-md">
                  {product.categoryName}
                </span>
                <span className="text-xs text-charcoal-400">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-plum-950 leading-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-xs text-charcoal-600 mt-1 italic">
                  {product.tagline}
                </p>
              )}

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-bold text-amber-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-charcoal-500 underline">
                  {product.reviewCount} Verified Ratings &amp; Reviews
                </span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-plum-950">
                    {formatCurrency(finalUnitPrice)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-base text-charcoal-400 line-through">
                      {formatCurrency(basePrice)}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      Save {formatCurrency(savings)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-charcoal-500 mt-0.5">
                  Inclusive of all taxes &bull; Free Pan-India Delivery on orders &gt; ₹999
                </p>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                  Select {product.variants[0].name}:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                          isSelected
                            ? 'border-plum-800 bg-plum-800 text-white shadow-sm'
                            : 'border-cream-300 bg-cream-50 hover:bg-cream-100 text-charcoal-800'
                        }`}
                      >
                        {v.value}
                        {v.priceAdjustment > 0 && ` (+${formatCurrency(v.priceAdjustment)})`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Personalization Fields if applicable */}
            {product.isPersonalizable && (
              <div className="p-4 rounded-2xl bg-peach-50/60 border border-peach-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-plum-900 uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-peach-600" />
                  Custom Personalization (Free)
                </div>
                
                <div>
                  <input
                    type="text"
                    maxLength={30}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Name to Laser Engrave (e.g. Kavya & Aarav)"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-peach-300 text-xs text-charcoal-900 focus:outline-none focus:border-plum-800 font-medium"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    maxLength={50}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Special Date or Message (e.g. Happy 5th Anniversary)"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-peach-300 text-xs text-charcoal-900 focus:outline-none focus:border-plum-800 font-medium"
                  />
                </div>
              </div>
            )}

            {/* Gift Wrap Checkbox */}
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-charcoal-800">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded text-plum-800 focus:ring-plum-700"
                />
                <span>
                  Add <strong>Luxury Gift Box &amp; Plum Silk Ribbon</strong> (+₹99)
                </span>
              </label>
              <Gift className="w-4 h-4 text-plum-700" />
            </div>

            {/* Quantity and CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden bg-cream-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 px-3 hover:bg-cream-200 text-charcoal-700 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-charcoal-900 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 px-3 hover:bg-cream-200 text-charcoal-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-plum-800 hover:bg-plum-900 text-white font-bold text-xs shadow-plum-glow flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-300" />
                  Add to Shopping Bag
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-charcoal-900 hover:bg-black text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
              >
                Buy Now with 1-Click
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal-900">
                <MapPin className="w-3.5 h-3.5 text-plum-700" />
                <span>Estimate Delivery Time</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-plum-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-plum-800 text-white text-xs font-bold hover:bg-plum-900 transition"
                >
                  Check
                </button>
              </form>
              {pincodeChecked && (
                <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Express Delivery by <strong>{new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</strong> to {pincode}
                </p>
              )}
            </div>

          </div>

        </div>

        {/* Detailed Tabs (Overview, In the Box, Specifications, Customer Reviews) */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-soft mb-16">
          <div className="flex flex-wrap gap-3 border-b border-cream-200 pb-4 mb-6">
            {[
              { id: 'overview', label: 'Product Overview' },
              { id: 'contents', label: 'What’s In The Box' },
              { id: 'specs', label: 'Specifications & Care' },
              { id: 'reviews', label: `Verified Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-plum-800 text-white shadow-plum-glow'
                    : 'bg-cream-50 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs text-charcoal-700 leading-relaxed max-w-3xl">
              <p className="text-sm font-medium text-charcoal-900">{product.description}</p>
              <p>{product.longDescription || product.description}</p>
              {product.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {product.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-cream-100 text-charcoal-700 text-[11px] font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Contents */}
          {activeTab === 'contents' && (
            <div className="space-y-3 max-w-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900">
                Package Contents:
              </h4>
              {product.boxContents ? (
                <ul className="space-y-2 text-xs text-charcoal-700">
                  {product.boxContents.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-charcoal-500">Includes complete product with luxury presentation gift box.</p>
              )}
            </div>
          )}

          {/* Tab 3: Specs */}
          {activeTab === 'specs' && (
            <div className="space-y-4 max-w-2xl text-xs">
              {product.specifications && (
                <div className="divide-y divide-cream-200 border border-cream-200 rounded-xl overflow-hidden">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-3 p-3 bg-white">
                      <span className="font-bold text-plum-950">{key}</span>
                      <span className="col-span-2 text-charcoal-700">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {product.careInstructions && (
                <div className="p-3.5 rounded-xl bg-cream-50 border border-cream-200">
                  <span className="font-bold text-plum-900 block mb-1">Care &amp; Maintenance:</span>
                  <p className="text-charcoal-600">{product.careInstructions}</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-extrabold text-plum-950">{product.rating}</div>
                  <div>
                    <div className="flex text-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-400" />
                      ))}
                    </div>
                    <p className="text-xs text-charcoal-500 mt-0.5">Based on {product.reviewCount} customer ratings</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Review form opened for verified buyer Aarav', 'info')}
                  className="px-4 py-2 rounded-xl bg-plum-800 text-white text-xs font-bold hover:bg-plum-900 transition"
                >
                  Write a Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-cream-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-charcoal-900">{rev.userName}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-charcoal-400">{rev.date}</span>
                    </div>
                    <div className="flex text-gold-500 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                      ))}
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-plum-950">
                You May Also Like
              </h3>
              <Link href="/shop" className="text-xs font-bold text-plum-800 hover:underline">
                View All &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border border-plum-700">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <video src={product.videoUrl} controls autoPlay className="w-full h-full object-cover" />
          </div>
        </div>
      )}

    </div>
  );
}
