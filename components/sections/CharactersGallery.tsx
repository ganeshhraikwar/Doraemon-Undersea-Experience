'use client';

import React, { useState } from 'react';
import { CHARACTERS, CharacterData } from '@/lib/movieData';
import { Shield, Heart, Zap, Compass, ChevronRight } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface CharactersGalleryProps {
  onFocusCharacter?: (charId: string) => void;
}

export default function CharactersGallery({ onFocusCharacter }: CharactersGalleryProps) {
  const [selectedChar, setSelectedChar] = useState<CharacterData>(CHARACTERS[0]);

  const handleSelect = (char: CharacterData) => {
    setSelectedChar(char);
    if (char.id === 'underwater-buggy') {
      audioEngine.playBuggyChirp();
    } else if (char.id === 'doraemon') {
      audioEngine.playBellChime();
    } else {
      audioEngine.playBubble();
    }
    onFocusCharacter?.(char.id);
  };

  return (
    <section
      id="characters"
      aria-label="Expedition Crew & Undersea Characters"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      {/* Editorial Section Header */}
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-cyan-400 tracking-wider uppercase">
          01. Seabed Expedition Roster
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          THE FIVE FRIENDS &amp; THE GUARDIANS OF THE DEEP
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          From suburban Tokyo to the pitch-black Mariana Trench, each companion
          brings courage, empathy, and technical brilliance.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Character Navigation Column */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
          {CHARACTERS.map((char) => {
            const isSelected = selectedChar.id === char.id;
            return (
              <button
                key={char.id}
                onClick={() => handleSelect(char)}
                className={`w-full text-left p-2.5 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-slate-900/80 border-cyan-400 text-white shadow-md'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="space-y-0.5 min-w-0 truncate">
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: char.color }}
                    />
                    <span className="font-bold text-xs sm:text-sm text-white truncate">
                      {char.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {char.role}
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform hidden lg:block shrink-0 ${
                    isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Selected Character Spotlight Stage - Translucent glass */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-7 backdrop-blur-md relative overflow-hidden shadow-xl space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/70 pb-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                  {selectedChar.depth}
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  {selectedChar.name}
                </h3>
                <div className="text-xs text-slate-400">
                  Voice: {selectedChar.voiceActor} (Japanese Original)
                </div>
              </div>

              <div
                className="px-2.5 py-1 rounded-lg border text-[11px] font-semibold"
                style={{
                  borderColor: `${selectedChar.color}66`,
                  backgroundColor: `${selectedChar.color}1a`,
                  color: selectedChar.color,
                }}
              >
                {selectedChar.role}
              </div>
            </div>

            {/* Concept / Emotional Theme */}
            <blockquote className="border-l-2 border-cyan-400 pl-3 py-1 italic text-slate-200 text-xs sm:text-sm leading-relaxed bg-cyan-950/20 rounded-r-lg">
              &ldquo;{selectedChar.quoteOrConcept}&rdquo;
            </blockquote>

            {/* Detailed Description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {selectedChar.description}
            </p>

            {/* Attributes Matrix */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Expedition Aptitude
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-slate-900/60 p-2 sm:p-2.5 rounded-xl border border-slate-800/70">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Shield className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">Courage</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white">
                    {selectedChar.stats.courage}%
                  </div>
                </div>

                <div className="bg-slate-900/60 p-2 sm:p-2.5 rounded-xl border border-slate-800/70">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Heart className="w-3 h-3 text-rose-400 shrink-0" />
                    <span className="truncate">Empathy</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white">
                    {selectedChar.stats.compassion}%
                  </div>
                </div>

                <div className="bg-slate-900/60 p-2 sm:p-2.5 rounded-xl border border-slate-800/70">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Zap className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">Wit</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white">
                    {selectedChar.stats.wit}%
                  </div>
                </div>

                <div className="bg-slate-900/60 p-2 sm:p-2.5 rounded-xl border border-slate-800/70">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Compass className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">Lead</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white">
                    {selectedChar.stats.leadership}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
