'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Eye, EyeOff, Shield } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface NavigationTopBarProps {
  onDiveClick: () => void;
  onBellClick: () => void;
  bellClickCount: number;
  isPureOceanView: boolean;
  onTogglePureOceanView: () => void;
  is5DActive: boolean;
  onToggle5D: () => void;
}

export default function NavigationTopBar({
  onDiveClick,
  onBellClick,
  bellClickCount,
  isPureOceanView,
  onTogglePureOceanView,
  is5DActive,
  onToggle5D,
}: NavigationTopBarProps) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    audioEngine.setMuted(nextState);
    if (!nextState) {
      audioEngine.playSonarPing();
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-2.5 px-3 sm:px-6'
          : 'bg-gradient-to-b from-slate-950/90 to-transparent py-3 px-3 sm:px-8'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Zone 1: Single text element Brand wordmark with secret bell interaction */}
        <div className="flex items-center gap-1.5 shrink min-w-0">
          <a
            href="#hero"
            className="text-xs sm:text-base font-bold tracking-tight text-white hover:text-cyan-300 transition-colors truncate"
          >
            Doraemon: Undersea Devil
          </a>
          <button
            onClick={onBellClick}
            className="relative p-1 rounded-full text-amber-400 hover:text-amber-300 transition-transform active:scale-90 shrink-0"
            title="Doraemon's Golden Bell (Secret Interaction)"
            aria-label="Click Doraemon's Bell"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            {bellClickCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[9px] font-mono text-amber-300 bg-slate-900/90 rounded-full px-1">
                {bellClickCount}/3
              </span>
            )}
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300 shrink-0"
        >
          <a
            href="#hero"
            className="hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5"
          >
            Descent
          </a>
          <a
            href="#characters"
            className="hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5"
          >
            Characters
          </a>
          <a
            href="#buggy"
            className="hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5"
          >
            Buggy
          </a>
          <a
            href="#world"
            className="hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5"
          >
            World
          </a>
          <a
            href="#lore"
            className="hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5"
          >
            Deep Lore
          </a>
          <a
            href="#tickets"
            className="hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5"
          >
            Tickets
          </a>
        </nav>

        {/* Zone 3: Actions row */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Ocean View Toggle: Hides text so 3D background is 100% visible */}
          <button
            onClick={onTogglePureOceanView}
            className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isPureOceanView
                ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'bg-slate-900/80 border-slate-700 text-cyan-300 hover:text-white'
            }`}
            title="Toggle Clean 3D Ocean View (Hide/Show Text)"
            aria-label="Toggle Ocean View"
          >
            {isPureOceanView ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Show Text</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Ocean View</span>
              </>
            )}
          </button>

          {/* 5D Cockpit Toggle: Neatly placed in top bar */}
          <button
            onClick={onToggle5D}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1 ${
              is5DActive
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle 5D Immersion Visor"
            aria-label="Toggle 5D Mode"
          >
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">5D {is5DActive ? 'On' : 'Off'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 sm:p-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 ${
              isMuted
                ? 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
            }`}
            aria-label={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-pulse" />
            )}
          </button>

          {/* Dive In CTA */}
          <button
            onClick={onDiveClick}
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1 active:scale-95"
          >
            <Sparkles className="w-3 h-3 text-slate-950" />
            <span>Dive</span>
          </button>
        </div>
      </div>
    </header>
  );
}
