'use client';

import React, { useState } from 'react';
import { Bell, Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const OccasionReminderBanner: React.FC = () => {
  const { addReminder, showToast } = useStore();

  const [name, setName] = useState('');
  const [occasionType, setOccasionType] = useState<'Birthday' | 'Anniversary' | 'Festival' | 'Other'>('Birthday');
  const [date, setDate] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) {
      showToast('Please enter recipient name and date', 'error');
      return;
    }

    addReminder({
      recipientName: name,
      relationship: 'Loved One',
      occasionType,
      date,
      reminderDaysBefore: 7,
    });

    setSaved(true);
    setName('');
    setDate('');
  };

  return (
    <section className="py-14 bg-gradient-to-r from-plum-950 via-plum-900 to-plum-950 text-cream-50 border-b border-plum-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5" />
              Never Miss a Special Day
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white">
              Save Your Loved One&apos;s Next Celebration
            </h2>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
              We&apos;ll send you a gentle reminder 7 days in advance with curated gift ideas and an exclusive <strong className="text-gold-300">15% festive discount coupon</strong>!
            </p>
          </div>

          <div className="lg:col-span-6">
            {saved ? (
              <div className="p-6 rounded-2xl bg-plum-800/80 border border-gold-400/50 flex items-center gap-4 text-xs">
                <div className="w-10 h-10 rounded-full bg-gold-400 text-plum-950 flex items-center justify-center font-bold flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Celebration Reminder Saved!</h4>
                  <p className="text-cream-200 mt-0.5">
                    We will notify you before the big day with priority dispatch options.
                  </p>
                  <button
                    onClick={() => setSaved(false)}
                    className="text-gold-300 underline font-bold mt-2 inline-block"
                  >
                    Add another occasion
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/15 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recipient Name (e.g. Mom)"
                    className="px-3.5 py-2.5 rounded-xl bg-plum-950/80 border border-plum-700 text-xs text-white placeholder:text-cream-400 focus:outline-none focus:border-gold-400"
                  />

                  <select
                    value={occasionType}
                    onChange={(e) => setOccasionType(e.target.value as any)}
                    className="px-3.5 py-2.5 rounded-xl bg-plum-950/80 border border-plum-700 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Festival">Festival / Diwali</option>
                    <option value="Other">Milestone / Other</option>
                  </select>

                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-plum-950/80 border border-plum-700 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-plum-950 font-bold text-xs shadow-glow transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Save Reminder &amp; Claim 15% Off
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
