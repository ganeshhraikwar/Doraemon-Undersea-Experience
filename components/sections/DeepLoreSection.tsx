'use client';

import React, { useState } from 'react';
import { DEEP_LORE, LoreItem } from '@/lib/movieData';
import { ShieldAlert, Lock, Unlock, Eye, Waves, AlertTriangle } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface DeepLoreSectionProps {
  isSpoilerUnlocked: boolean;
  onUnlockSpoiler: () => void;
}

export default function DeepLoreSection({
  isSpoilerUnlocked,
  onUnlockSpoiler,
}: DeepLoreSectionProps) {
  const [selectedLore, setSelectedLore] = useState<LoreItem>(DEEP_LORE[0]);

  const handleSelect = (item: LoreItem) => {
    setSelectedLore(item);
    if (item.id === 'poseidon-system' || item.id === 'devils-horn-missiles') {
      audioEngine.setPoseidonIntensity(true);
    } else {
      audioEngine.playSonarPing();
    }
  };

  return (
    <section
      id="lore"
      aria-label="Deep Undersea Lore & Civilizations"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-rose-400 tracking-wider uppercase flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>04. Classified Abyssal Archives</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          MU FEDERATION, ATLANTIS &amp; THE AUTOMATED MENACE
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          Beneath the ocean surface lies a split history: the harmonious living
          civilization of Mu, and the militarized ghost ruins of Atlantis.
        </p>
      </div>

      {!isSpoilerUnlocked ? (
        /* Spoiler Gate Interstitial - Compact and Translucent */
        <div className="p-5 sm:p-9 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center max-w-xl mx-auto backdrop-blur-md space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-rose-400">
              Restricted Subsea Access · Spoilers Ahead
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              ENTER THE DEEP ARCHIVES?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Reveals the origins of the Castle of the Undersea Devil,
              Poseidon&apos;s computational retaliation trigger, and Triline&apos;s forgotten testimony.
            </p>
          </div>

          <button
            onClick={() => {
              audioEngine.play4DXRumble();
              onUnlockSpoiler();
            }}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2 mx-auto active:scale-95"
          >
            <Unlock className="w-4 h-4" />
            <span>ENTER THE DEEP (UNLOCK LORE)</span>
          </button>
        </div>
      ) : (
        /* Unlocked Deep Lore Terminal */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Index of Archives */}
          <div className="lg:col-span-5 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {DEEP_LORE.map((item) => {
                const isSelected = selectedLore.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900/80 border-rose-500 text-white shadow-md'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="space-y-0.5 truncate mr-2">
                      <div className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-1.5">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.classification}
                      </div>
                    </div>
                    <Eye className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Environmental Philosophy Callout */}
            <div className="mt-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">
                <Waves className="w-3.5 h-3.5" />
                <span>Ocean Stewardship Dimension</span>
              </div>
              <p className="leading-relaxed italic text-slate-200 text-xs">
                &ldquo;The ocean remembers what we leave behind.&rdquo;
              </p>
            </div>
          </div>

          {/* Detailed Selected Archive - Translucent */}
          <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-7 backdrop-blur-md relative overflow-hidden shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/70 pb-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
                  {selectedLore.civilization}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedLore.title}
                </h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                {selectedLore.classification}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs sm:text-sm font-medium text-cyan-200">
              {selectedLore.summary}
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Historical Context &amp; Threat Mechanics
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLore.detailedLore}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-semibold">
                Thematic Significance
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedLore.significance}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
