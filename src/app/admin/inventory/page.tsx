'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Warehouse, Plus, Minus, Check, AlertTriangle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/utils';

export default function AdminInventoryPage() {
  const { products, updateStock, showToast } = useStore();
  const [stockEdits, setStockEdits] = useState<Record<string, number>>({});

  const handleStockChange = (productId: string, val: number) => {
    setStockEdits((prev) => ({ ...prev, [productId]: Math.max(0, val) }));
  };

  const handleSaveStock = (productId: string) => {
    const newStock = stockEdits[productId];
    if (newStock !== undefined) {
      updateStock(productId, newStock);
      setStockEdits((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
      <div className="pb-4 border-b border-cream-200">
        <h2 className="font-serif text-2xl font-bold text-plum-950">Warehouse Inventory Monitor</h2>
        <p className="text-xs text-charcoal-500">Live stock levels, fast replenishment inputs, and low-inventory warnings</p>
      </div>

      <div className="border border-cream-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-cream-100/80 text-plum-950 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Item</th>
              <th className="p-3.5">SKU</th>
              <th className="p-3.5">Price</th>
              <th className="p-3.5">Current Stock</th>
              <th className="p-3.5">Quick Replenish</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {products.map((p) => {
              const currentStock = stockEdits[p.id] !== undefined ? stockEdits[p.id] : p.stock;
              const hasChanged = stockEdits[p.id] !== undefined && stockEdits[p.id] !== p.stock;

              return (
                <tr key={p.id} className="hover:bg-cream-50/50 transition">
                  <td className="p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal-900 line-clamp-1">{p.name}</h4>
                      <span className="text-[10px] text-charcoal-400">{p.categoryName}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-charcoal-600">{p.sku}</td>
                  <td className="p-3.5 font-bold text-plum-950">{formatCurrency(p.price)}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      p.stock <= 5 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={currentStock}
                        onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                        className="w-20 px-2.5 py-1 rounded-lg bg-cream-50 border border-cream-300 text-xs font-bold text-charcoal-900"
                      />
                      {hasChanged && (
                        <button
                          onClick={() => handleSaveStock(p.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
