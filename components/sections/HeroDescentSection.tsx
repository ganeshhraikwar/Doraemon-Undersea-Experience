'use client';

import React, { useState } from 'react';
import { ArrowDown, Play, ShieldAlert, Sparkles } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface HeroDescentSectionProps {
  onDiveDeep: () => void;
  onOpenTrailer: () => void;
  isSpoilerUnlocked: boolean;
  onToggleSpoiler: () => void;
}

export default function HeroDescentSection({
  onDiveDeep,
  onOpenTrailer,
  isSpoilerUnlocked,
  onToggleSpoiler,
}: HeroDescentSectionProps) {
  const [, setHasStartedDescent] = useState<boolean>(false);

  const handleDiveClick = () => {
    setHasStartedDescent(true);
    audioEngine.playBubble();
    audioEngine.playTekioLight();
    onDiveDeep();
  };

  return (
    <section
      id="hero"
      aria-label="Cinematic Underwater Descent"
      className="relative min-h-[90vh] flex flex-col items-center justify-between px-4 sm:px-6 pt-20 sm:pt-28 pb-10 text-center select-none"
    >
      {/* Top Context Breadcrumb */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-cyan-300/80 tracking-widest uppercase font-mono">
        <span>45th Doraemon Theatrical Movie</span>
        <span aria-hidden="true">·</span>
        <span>Original Fujiko F. Fujio</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">4DX / MX4D Presentation</span>
      </div>

      {/* Main Hero Typography Lockup */}
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 my-auto z-10 py-6 sm:py-10">
        {/* Japanese Title Subheading */}
        <div className="text-xs sm:text-base font-medium text-cyan-400/90 tracking-widest">
          映画ドラえもん 新・のび太の海底鬼岩城
        </div>

        {/* Primary Cinematic Headline */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-[0_8px_25px_rgba(0,0,0,0.8)] [text-wrap:balance]">
          NEW NOBITA &amp; THE CASTLE OF THE UNDERSEA DEVIL
        </h1>

        {/* Cinematic Atmospheric Copy */}
        <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-light [text-wrap:balance]">
          Deep beneath the crushing abyss, an ancient fortress awakens. Enter the
          unexplored ocean floor with Doraemon, Nobita, and the sentient
          Underwater Buggy.
        </p>

        {/* Primary Interactive CTAs */}
        <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 pt-2">
          <button
            onClick={handleDiveClick}
            className="flex-1 sm:flex-initial px-5 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-base font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>DIVE IN</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
          </button>

          <button
            onClick={onOpenTrailer}
            className="flex-1 sm:flex-initial px-4 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-base font-semibold text-white bg-slate-900/70 hover:bg-slate-800/80 border border-slate-700/80 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>TRAILER</span>
          </button>
        </div>

        {/* Spoiler Gateway Switcher */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1 bg-slate-950/60 border border-slate-800/80 rounded-xl backdrop-blur-md text-[11px] sm:text-xs">
            <span className="text-slate-400 px-1 font-medium hidden sm:inline">First Time?</span>
            <button
              onClick={() => onToggleSpoiler()}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                !isSpoilerUnlocked
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Spoiler-Free
            </button>
            <button
              onClick={() => onToggleSpoiler()}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
                isSpoilerUnlocked
                  ? 'bg-rose-500 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Full Lore</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cinematic Descent Prompt */}
      <div className="flex flex-col items-center gap-1.5 text-xs text-slate-400 z-10">
        <span className="tracking-widest uppercase font-mono text-[10px] sm:text-[11px] text-cyan-300">
          The deepest adventure begins below
        </span>
        <div className="w-4 h-6 sm:w-5 sm:h-8 border-2 border-slate-600 rounded-full flex justify-center p-0.5 sm:p-1">
          <div className="w-1 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
