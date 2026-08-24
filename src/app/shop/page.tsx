'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  Search,
  X,
  Filter,
  Grid3X3,
  LayoutList,
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';
import { formatCurrency, calculateDiscountPrice } from '@/lib/utils';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialOccasion = searchParams.get('occasion') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const { products, categories } = useStore();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const occasions = [
    'all',
    'Birthday',
    'Anniversary',
    'Kids',
    'Wedding',
    'Festival',
    'Corporate',
    'Housewarming',
    'Valentine',
  ];

  const ageGroups = ['all', '0-2 Years', '3-5 Years', '6-12 Years', 'Adults'];

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.categoryName?.toLowerCase().includes(q);
          const matchTags = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCat && !matchTags) return false;
        }

        // Category
        if (selectedCategory !== 'all') {
          const cat = categories.find((c) => c.slug === selectedCategory);
          if (cat && product.categoryId !== cat.id) return false;
        }

        // Occasion
        if (selectedOccasion !== 'all') {
          const matchOcc = product.occasion.some(
            (o) => o.toLowerCase() === selectedOccasion.toLowerCase()
          );
          if (!matchOcc) return false;
        }

        // Age Group
        if (selectedAgeGroup !== 'all') {
          if (product.ageGroup !== selectedAgeGroup) return false;
        }

        // Price
        const effectivePrice = calculateDiscountPrice(product.price, product.discount);
        if (effectivePrice > maxPrice) return false;

        // Stock
        if (inStockOnly && product.stock <= 0) return false;

        // Rating
        if (minRating > 0 && product.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = calculateDiscountPrice(a.price, a.discount);
        const priceB = calculateDiscountPrice(b.price, b.discount);

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    products,
    categories,
    searchQuery,
    selectedCategory,
    selectedOccasion,
    selectedAgeGroup,
    maxPrice,
    inStockOnly,
    minRating,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setSelectedAgeGroup('all');
    setMaxPrice(4000);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedOccasion !== 'all' ||
    selectedAgeGroup !== 'all' ||
    maxPrice < 4000 ||
    inStockOnly ||
    minRating > 0;

  return (
    <div className="bg-cream-100/40 min-h-screen py-8 sm:py-12 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-charcoal-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-plum-900 font-bold">Shop Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-plum-950">
            All Gifts &amp; Toys Collection
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5">
            Showing <strong className="text-plum-900">{filteredProducts.length}</strong> handcrafted gifts, plushies, and STEM robotics.
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, product name, or tag..."
              className="w-full pl-10 pr-8 py-2 bg-cream-50 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-plum-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls (Sort, View Mode, Mobile Filter Toggle) */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-plum-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-gold-400" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-charcoal-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-plum-600"
              >
                <option value="featured">Featured &amp; Best Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-cream-300 rounded-xl overflow-hidden bg-cream-50 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-plum-900 shadow-sm' : 'text-charcoal-500'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white text-plum-900 shadow-sm' : 'text-charcoal-500'
                }`}
                title="List View"
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Main Content Layout (Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200">
              <h3 className="font-serif text-base font-bold text-plum-950 flex items-center gap-2">
                <Filter className="w-4 h-4 text-plum-700" />
                Refine Selection
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900 mb-3">
                Categories
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    selectedCategory === 'all'
                      ? 'bg-plum-800 text-white'
                      : 'text-charcoal-700 hover:bg-cream-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-75">{products.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      selectedCategory === cat.slug
                        ? 'bg-plum-800 text-white'
                        : 'text-charcoal-700 hover:bg-cream-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-75">
                      {products.filter((p) => p.categoryId === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-cream-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900">
                  Max Price
                </h4>
                <span className="text-xs font-extrabold text-plum-800">
                  {formatCurrency(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-plum-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-400 mt-1 font-medium">
                <span>₹500</span>
                <span>₹4,000+</span>
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="pt-4 border-t border-cream-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900 mb-2.5">
                Occasion
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                      selectedOccasion === occ
                        ? 'bg-plum-800 border-plum-800 text-white'
                        : 'border-cream-300 bg-cream-50 text-charcoal-700 hover:bg-cream-100'
                    }`}
                  >
                    {occ === 'all' ? 'All Occasions' : occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group Filter */}
            <div className="pt-4 border-t border-cream-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900 mb-2.5">
                Age Group
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {ageGroups.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAgeGroup(age)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                      selectedAgeGroup === age
                        ? 'bg-plum-800 border-plum-800 text-white'
                        : 'border-cream-300 bg-cream-50 text-charcoal-700 hover:bg-cream-100'
                    }`}
                  >
                    {age === 'all' ? 'All Ages' : age}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Only Toggle */}
            <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
              <label htmlFor="inStock" className="text-xs font-bold text-charcoal-800 cursor-pointer">
                In-Stock Only
              </label>
              <input
                type="checkbox"
                id="inStock"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-plum-800 focus:ring-plum-700 cursor-pointer"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            
            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl bg-cream-50 border border-cream-200 text-xs">
                <span className="font-bold text-plum-950">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-plum-100 text-plum-900 font-semibold">
                    Category: {categories.find((c) => c.slug === selectedCategory)?.name}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {selectedOccasion !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-plum-100 text-plum-900 font-semibold">
                    Occasion: {selectedOccasion}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedOccasion('all')} />
                  </span>
                )}
                {selectedAgeGroup !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-plum-100 text-plum-900 font-semibold">
                    Age: {selectedAgeGroup}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedAgeGroup('all')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-plum-100 text-plum-900 font-semibold">
                    &ldquo;{searchQuery}&rdquo;
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:underline font-bold ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-cream-200 p-8 shadow-soft">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-plum-800">
                  <Search className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-xl font-bold text-plum-950">No products match your criteria</h3>
                <p className="text-xs text-charcoal-500 mt-1 max-w-sm mx-auto">
                  Try widening your price range, clearing filters, or searching for other keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-plum-800 text-white text-xs font-bold hover:bg-plum-900 shadow-plum-glow transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filter Slide-over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-plum-950/60 backdrop-blur-sm"
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                <h3 className="font-serif text-lg font-bold text-plum-950">Filter Products</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-charcoal-500" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900 mb-2">Categories</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold ${
                      selectedCategory === 'all' ? 'bg-plum-800 text-white' : 'text-charcoal-700'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold ${
                        selectedCategory === c.slug ? 'bg-plum-800 text-white' : 'text-charcoal-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-cream-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-plum-900 mb-2">
                  Max Price: {formatCurrency(maxPrice)}
                </h4>
                <input
                  type="range"
                  min="500"
                  max="4000"
                  step="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-plum-800"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-cream-200">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-plum-800 text-white text-xs font-bold shadow-plum-glow"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-charcoal-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
