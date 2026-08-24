'use client';

import React, { useState } from 'react';
import {
  Database,
  Search,
  Download,
  Copy,
  Plus,
  RefreshCw,
  Server,
  Layers,
  FileCode2,
  Table as TableIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  Code
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS, CATEGORIES, COUPONS, REVIEWS } from '@/data/mockData';

export default function AdminDatabasePage() {
  const { products, orders, savedAddresses, user, showToast } = useStore();

  const [activeCollection, setActiveCollection] = useState<string>('products');
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic MongoDB Collections Data Source
  const collectionsData: Record<string, any[]> = {
    products: products,
    orders: orders,
    users: [
      user || {
        id: 'usr-101',
        name: 'Aarav Singhania',
        email: 'aarav.singhania@example.com',
        role: 'CUSTOMER',
        phone: '+91 98765 43210',
        createdAt: '2026-01-15'
      },
      {
        id: 'usr-admin',
        name: 'Store Owner',
        email: 'admin@giftora.com',
        role: 'ADMIN',
        createdAt: '2025-11-01'
      }
    ],
    categories: CATEGORIES,
    coupons: COUPONS,
    reviews: REVIEWS,
    addresses: savedAddresses,
  };

  const currentDocs = collectionsData[activeCollection] || [];

  const filteredDocs = currentDocs.filter((doc) => {
    if (!searchQuery.trim()) return true;
    const jsonString = JSON.stringify(doc).toLowerCase();
    return jsonString.includes(searchQuery.toLowerCase());
  });

  const handleCopyJson = (doc: any, id: string) => {
    navigator.clipboard.writeText(JSON.stringify(doc, null, 2));
    setCopiedId(id);
    showToast('Copied raw MongoDB document JSON to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCollection = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentDocs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `giftora_mongodb_${activeCollection}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Exported ${activeCollection}.json successfully!`, 'success');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
      
      {/* Header & Status Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-plum-950">MongoDB Database Explorer</h2>
            <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Connected (Atlas)
            </span>
          </div>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Inspect raw BSON/JSON collections, live schema records, and document relations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCollection}
            className="px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 hover:bg-cream-100 text-xs font-bold text-charcoal-800 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export Collection (.json)
          </button>
        </div>
      </div>

      {/* Cluster Metadata Bar */}
      <div className="p-4 rounded-2xl bg-charcoal-900 text-cream-100 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-[10px] text-charcoal-400 block uppercase">Cluster URI</span>
          <span className="font-bold text-gold-300 truncate block">mongodb+srv://cluster0.giftora.mongodb.net</span>
        </div>
        <div>
          <span className="text-[10px] text-charcoal-400 block uppercase">Database Name</span>
          <span className="font-bold text-white">giftora_production_db</span>
        </div>
        <div>
          <span className="text-[10px] text-charcoal-400 block uppercase">Active Collection</span>
          <span className="font-bold text-emerald-400 font-sans">{activeCollection} ({currentDocs.length} docs)</span>
        </div>
        <div>
          <span className="text-[10px] text-charcoal-400 block uppercase">Driver Engine</span>
          <span className="font-bold text-cream-200">Prisma / Mongoose v8.4</span>
        </div>
      </div>

      {/* Collections Tabs Navigation */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-cream-200 pb-3">
        {Object.keys(collectionsData).map((col) => (
          <button
            key={col}
            onClick={() => {
              setActiveCollection(col);
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeCollection === col
                ? 'bg-plum-800 text-white shadow-plum-glow'
                : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{col}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeCollection === col ? 'bg-white/20' : 'bg-cream-300'
            }`}>
              {collectionsData[col].length}
            </span>
          </button>
        ))}
      </div>

      {/* Query & View Mode Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search / Filter input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${activeCollection} by ID, field, or value...`}
            className="w-full pl-10 pr-4 py-2 bg-cream-50 rounded-xl border border-cream-300 text-xs text-charcoal-900 font-mono focus:outline-none focus:border-plum-800"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden bg-cream-50 p-0.5">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
              viewMode === 'table' ? 'bg-white text-plum-900 shadow-sm' : 'text-charcoal-500'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" /> Table View
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
              viewMode === 'json' ? 'bg-white text-plum-900 shadow-sm' : 'text-charcoal-500'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Raw JSON
          </button>
        </div>
      </div>

      {/* Main Collection Data Inspector */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-12 border border-cream-200 rounded-2xl">
          <Database className="w-12 h-12 text-charcoal-300 mx-auto mb-2" />
          <p className="text-xs font-bold text-charcoal-800">No documents found matching query</p>
        </div>
      ) : viewMode === 'table' ? (
        <div className="border border-cream-200 rounded-2xl overflow-hidden overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-cream-100/90 text-plum-950 font-bold uppercase tracking-wider text-[10px] sticky top-0">
              <tr>
                <th className="p-3">_id</th>
                {Object.keys(filteredDocs[0] || {})
                  .filter((k) => k !== 'id' && k !== 'images' && k !== 'boxContents' && k !== 'specifications')
                  .slice(0, 5)
                  .map((k) => (
                    <th key={k} className="p-3">{k}</th>
                  ))}
                <th className="p-3 text-right">Raw JSON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 font-sans">
              {filteredDocs.map((doc, idx) => (
                <tr key={doc.id || idx} className="hover:bg-cream-50/50 transition">
                  <td className="p-3 font-mono text-[11px] text-plum-900 font-bold">
                    {doc.id || `doc_${idx}`}
                  </td>
                  {Object.keys(filteredDocs[0] || {})
                    .filter((k) => k !== 'id' && k !== 'images' && k !== 'boxContents' && k !== 'specifications')
                    .slice(0, 5)
                    .map((k) => (
                      <td key={k} className="p-3 text-charcoal-700 text-xs truncate max-w-[160px]">
                        {typeof doc[k] === 'object' ? JSON.stringify(doc[k]) : String(doc[k] ?? '')}
                      </td>
                    ))}
                  <td className="p-3 text-right font-sans">
                    <button
                      onClick={() => handleCopyJson(doc, doc.id || String(idx))}
                      className="p-1.5 rounded-lg bg-cream-100 hover:bg-plum-800 hover:text-white transition inline-flex items-center gap-1 text-[11px] font-semibold"
                      title="Copy Document JSON"
                    >
                      {copiedId === (doc.id || String(idx)) ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Raw JSON Tree View */
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredDocs.map((doc, idx) => (
            <div
              key={doc.id || idx}
              className="bg-charcoal-900 rounded-2xl p-4 border border-plum-950 font-mono text-xs text-cream-100 relative group"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-charcoal-700 text-[11px]">
                <span className="text-gold-300 font-bold">
                  {activeCollection}.document[{idx}] &bull; _id: &quot;{doc.id || idx}&quot;
                </span>
                <button
                  onClick={() => handleCopyJson(doc, doc.id || String(idx))}
                  className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-plum-800 text-cream-200 text-[10px] font-bold flex items-center gap-1 transition"
                >
                  <Copy className="w-3 h-3" />
                  {copiedId === (doc.id || String(idx)) ? 'Copied!' : 'Copy Document JSON'}
                </button>
              </div>
              <pre className="overflow-x-auto text-[11px] text-cream-200 leading-relaxed">
                {JSON.stringify(doc, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
