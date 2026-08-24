'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Tags, Sparkles, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { slugify } from '@/lib/utils';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const { categories, products, showToast } = useStore();
  const [catList, setCatList] = useState<Category[]>(categories);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1549465220-1a8b9238cdcd?q=80&w=800&auto=format&fit=crop');

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug: slugify(name),
      description,
      image: imageUrl,
      itemCount: 0,
    };
    setCatList((prev) => [newCat, ...prev]);
    showToast(`Created category "${name}" successfully!`, 'success');
    setShowModal(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-plum-950">Category Management</h2>
          <p className="text-xs text-charcoal-500">Organize store collections, slugs, and display banners</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-white font-bold text-xs shadow-plum-glow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {catList.map((cat) => {
          const productCount = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <div
              key={cat.id}
              className="rounded-2xl border border-cream-200 overflow-hidden shadow-soft flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-cream-100">
                <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  {productCount} Products Linked
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif text-base font-bold text-plum-950">{cat.name}</h3>
                <p className="text-xs text-charcoal-500 line-clamp-2">{cat.description}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-charcoal-400">
                  <span>Slug: /{cat.slug}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif text-lg font-bold text-plum-950">Add Category</h3>
              <button onClick={() => setShowModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block font-bold text-charcoal-800 mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300"
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal-800 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300"
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal-800 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 font-mono text-[11px]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-plum-800 text-white rounded-xl font-bold shadow-plum-glow">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
