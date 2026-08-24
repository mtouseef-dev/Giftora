'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  Search,
  Check,
  X,
  Sparkles,
  Upload,
  Link as LinkIcon,
  ImageIcon,
  Star,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency, slugify } from '@/lib/utils';
import { Product } from '@/types';

// Curated high-res stock gift assets for 1-click selection
const STOCK_GALLERY_ASSETS = [
  { label: 'Royal Oak Keepsake Box', url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop' },
  { label: 'Artisan Gourmet Hamper', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop' },
  { label: 'Jumbo Teddy Bear Plush', url: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop' },
  { label: 'STEM Robotics Builder Kit', url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop' },
  { label: 'Scented Soy Aromatherapy Candles', url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop' },
  { label: 'Montessori Activity Cube', url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop' },
  { label: 'Preserved 24K Gold Rose Dome', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop' },
  { label: 'Executive Leather Desk Set', url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop' },
  { label: 'Soft White Bunny Plushie', url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop' },
  { label: 'Golden Ribbon Festive Box', url: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?q=80&w=800&auto=format&fit=crop' },
];

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Basic Info
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(999);
  const [discount, setDiscount] = useState(10);
  const [sku, setSku] = useState('GFT-NEW-01');
  const [stock, setStock] = useState(20);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-1');
  const [isPersonalizable, setIsPersonalizable] = useState(false);
  const [featured, setFeatured] = useState(true);

  // Image Management State
  const [imageUploadMode, setImageUploadMode] = useState<'upload' | 'link' | 'stock'>('upload');
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice(1299);
    setDiscount(15);
    setSku(`GFT-${Date.now().toString().slice(-4)}`);
    setStock(25);
    setImagesList(['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop']);
    setInputUrl('');
    setIsPersonalizable(true);
    setFeatured(true);
    setShowModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setDiscount(product.discount);
    setSku(product.sku);
    setStock(product.stock);
    setCategoryId(product.categoryId);
    setImagesList(product.images && product.images.length > 0 ? [...product.images] : ['https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop']);
    setInputUrl('');
    setIsPersonalizable(product.isPersonalizable || false);
    setFeatured(product.featured || false);
    setShowModal(true);
  };

  // Image Upload Handlers
  const handleDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagesList((prev) => [...prev, reader.result as string]);
          showToast(`Uploaded ${file.name} from gallery`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    setImagesList((prev) => [...prev, inputUrl.trim()]);
    showToast('Added image from link', 'success');
    setInputUrl('');
  };

  const handleSelectStockAsset = (url: string) => {
    if (!imagesList.includes(url)) {
      setImagesList((prev) => [...prev, url]);
      showToast('Added photo from stock library', 'success');
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    setImagesList((prev) => {
      const item = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [item, ...rest];
    });
    showToast('Set as main primary image', 'info');
  };

  const handleRemoveImage = (index: number) => {
    if (imagesList.length <= 1) {
      showToast('A product must have at least 1 image', 'warning');
      return;
    }
    setImagesList((prev) => prev.filter((_, i) => i !== index));
    showToast('Image removed from gallery', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === categoryId);
    const finalImages = imagesList.length > 0 ? imagesList : ['https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop'];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        slug: slugify(name),
        description,
        price,
        discount,
        sku,
        stock,
        categoryId,
        categoryName: cat?.name,
        images: finalImages,
        isPersonalizable,
        featured,
      });
    } else {
      addProduct({
        name,
        slug: slugify(name),
        description,
        price,
        discount,
        sku,
        stock,
        categoryId,
        categoryName: cat?.name,
        featured,
        rating: 5.0,
        reviewCount: 1,
        images: finalImages,
        tags: ['Gifts', cat?.name || 'Curated'],
        occasion: ['Birthday', 'Anniversary'],
        isPersonalizable,
      });
    }
    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-plum-950">Product Inventory &amp; Media Manager</h2>
          <p className="text-xs text-charcoal-500">Manage catalog items, pricing, multi-image galleries, and device uploads</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-white font-bold text-xs shadow-plum-glow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name or SKU..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-plum-800"
        />
      </div>

      {/* Table */}
      <div className="border border-cream-200 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-cream-100/80 text-plum-950 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Product &amp; Gallery</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Price / Discount</th>
              <th className="p-3.5">Stock</th>
              <th className="p-3.5">Personalizable</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-cream-50/50 transition">
                <td className="p-3.5 flex items-center gap-3">
                  <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-cream-200">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 line-clamp-1">{product.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-charcoal-400">
                      <span>SKU: {product.sku}</span>
                      <span>&bull;</span>
                      <span className="text-plum-800 font-semibold">{product.images.length} Photos</span>
                    </div>
                  </div>
                </td>
                <td className="p-3.5 text-charcoal-700 font-medium">{product.categoryName}</td>
                <td className="p-3.5">
                  <span className="font-bold text-plum-950">{formatCurrency(product.price)}</span>
                  {product.discount > 0 && (
                    <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-bold ml-1.5">
                      -{product.discount}%
                    </span>
                  )}
                </td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    product.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="p-3.5">
                  {product.isPersonalizable ? (
                    <span className="text-[10px] font-bold text-peach-700 bg-peach-50 px-2 py-0.5 rounded">
                      Yes (Engraved)
                    </span>
                  ) : (
                    <span className="text-[10px] text-charcoal-400">Standard</span>
                  )}
                </td>
                <td className="p-3.5 text-right space-x-1">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="p-1.5 rounded-lg hover:bg-cream-200 text-charcoal-600 hover:text-plum-800"
                    title="Edit Product & Gallery"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-50 text-charcoal-400 hover:text-rose-600"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Add / Edit Modal with Dual Image Upload & Gallery */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[92vh] space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-plum-950">
                  {editingProduct ? 'Edit Product & Gallery' : 'Add New Product'}
                </h3>
                <p className="text-xs text-charcoal-500">Configure product attributes, pricing, and multi-photo media</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-charcoal-400 hover:text-charcoal-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Product Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-charcoal-800 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 font-semibold text-charcoal-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-charcoal-800 mb-1">Short Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal-800 mb-1">Base Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 font-bold text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal-800 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 font-bold text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal-800 mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 font-mono text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal-800 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 font-bold text-charcoal-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-charcoal-800 mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-charcoal-900"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Enhanced Product Image / Media Section */}
              <div className="p-4 rounded-2xl bg-cream-50/80 border border-cream-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-plum-950 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-plum-700" />
                      Product Gallery &amp; Photos ({imagesList.length} Selected)
                    </h4>
                    <p className="text-[11px] text-charcoal-500">
                      Upload from local device gallery, paste direct image link, or select from curated stock assets.
                    </p>
                  </div>

                  {/* Mode Selector Tabs */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-cream-300">
                    <button
                      type="button"
                      onClick={() => setImageUploadMode('upload')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition ${
                        imageUploadMode === 'upload' ? 'bg-plum-800 text-white' : 'text-charcoal-600 hover:bg-cream-100'
                      }`}
                    >
                      <Upload className="w-3 h-3" /> Device Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMode('link')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition ${
                        imageUploadMode === 'link' ? 'bg-plum-800 text-white' : 'text-charcoal-600 hover:bg-cream-100'
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" /> Image Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMode('stock')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition ${
                        imageUploadMode === 'stock' ? 'bg-plum-800 text-white' : 'text-charcoal-600 hover:bg-cream-100'
                      }`}
                    >
                      <FolderOpen className="w-3 h-3" /> Stock Library
                    </button>
                  </div>
                </div>

                {/* Mode 1: Device File Upload */}
                {imageUploadMode === 'upload' && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-plum-300 hover:border-plum-600 bg-white rounded-2xl p-6 text-center cursor-pointer transition space-y-2 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleDeviceFileUpload}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-plum-100 text-plum-800 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-plum-950">Click to Browse Gallery or Drag &amp; Drop Images</p>
                    <p className="text-[10px] text-charcoal-400">Supports PNG, JPG, WEBP, GIF (Multiple files supported)</p>
                  </div>
                )}

                {/* Mode 2: Direct Image URL Link */}
                {imageUploadMode === 'link' && (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Paste image web URL (e.g. https://images.unsplash.com/... or Cloudinary URL)"
                      className="flex-1 px-3 py-2 bg-white rounded-xl border border-cream-300 font-mono text-[11px] text-charcoal-900 focus:outline-none focus:border-plum-800"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2 bg-plum-800 hover:bg-plum-900 text-white font-bold rounded-xl"
                    >
                      Add Photo
                    </button>
                  </div>
                )}

                {/* Mode 3: Curated Stock Asset Library */}
                {imageUploadMode === 'stock' && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-charcoal-500 font-medium">Click any photo below to add it directly to this product&apos;s gallery:</p>
                    <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto pr-1">
                      {STOCK_GALLERY_ASSETS.map((asset, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelectStockAsset(asset.url)}
                          className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 group transition ${
                            imagesList.includes(asset.url) ? 'border-plum-800 ring-2 ring-plum-600/30' : 'border-cream-300 hover:border-plum-400'
                          }`}
                          title={asset.label}
                        >
                          <Image src={asset.url} alt={asset.label} fill className="object-cover group-hover:scale-105 transition" />
                          {imagesList.includes(asset.url) && (
                            <div className="absolute inset-0 bg-plum-900/60 flex items-center justify-center text-white">
                              <CheckCircle2 className="w-5 h-5 text-gold-300" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Image Gallery List & Thumbnails */}
                {imagesList.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                      Active Product Gallery (First image is Primary):
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {imagesList.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 bg-cream-100 group transition ${
                            idx === 0 ? 'border-plum-800 ring-2 ring-plum-600/20 shadow-md' : 'border-cream-300'
                          }`}
                        >
                          <Image src={imgUrl} alt={`Gallery Image ${idx + 1}`} fill className="object-cover" />
                          
                          {idx === 0 ? (
                            <span className="absolute top-1 left-1 bg-plum-800 text-gold-300 text-[9px] font-extrabold px-1.5 py-0.2 rounded-md shadow">
                              Primary
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="absolute top-1 left-1 bg-black/70 hover:bg-plum-800 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md opacity-0 group-hover:opacity-100 transition"
                            >
                              Make Primary
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-rose-700 transition"
                            title="Remove from product"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={isPersonalizable}
                    onChange={(e) => setIsPersonalizable(e.target.checked)}
                    className="w-4 h-4 rounded text-plum-800"
                  />
                  <span>Personalizable (Laser Engraving)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-plum-800"
                  />
                  <span>Mark as Featured Product</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-cream-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-white font-bold shadow-plum-glow transition"
                >
                  {editingProduct ? 'Save Product Changes' : 'Publish Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
