'use client';

import React, { useState, useEffect } from 'react';
import UnderwaterWorldCanvas from '@/components/3d/UnderwaterWorldCanvas';
import NavigationTopBar from '@/components/ui/NavigationTopBar';
import DepthMeterHUD from '@/components/ui/DepthMeterHUD';
import HeroDescentSection from '@/components/sections/HeroDescentSection';
import CharactersGallery from '@/components/sections/CharactersGallery';
import UnderwaterBuggyStation from '@/components/sections/UnderwaterBuggyStation';
import GadgetShowcase from '@/components/sections/GadgetShowcase';
import SunkenShipLore from '@/components/sections/SunkenShipLore';
import DeepLoreSection from '@/components/sections/DeepLoreSection';
import CastleClimaxExperience from '@/components/sections/CastleClimaxExperience';
import FourDXExperience from '@/components/sections/FourDXExperience';
import IndiaTheatricalRelease from '@/components/sections/IndiaTheatricalRelease';
import MovieInfoAndCredits from '@/components/sections/MovieInfoAndCredits';
import TrailerModal from '@/components/ui/TrailerModal';
import EasterEggsModal from '@/components/ui/EasterEggsModal';
import FiveDVisorHUD from '@/components/ui/FiveDVisorHUD';
import { audioEngine } from '@/lib/audioEngine';

export default function MovieExperiencePage() {
  const [currentDepthLevel, setCurrentDepthLevel] = useState<number>(0);
  const [is4DXActive, setIs4DXActive] = useState<boolean>(false);
  const [is5DActive, setIs5DActive] = useState<boolean>(true); // Active by default for immediate 5D immersion!
  const [isPureOceanView, setIsPureOceanView] = useState<boolean>(false); // Allows hiding all text for pure 3D ocean view
  const [isTekioActive, setIsTekioActive] = useState<boolean>(true);
  const [isChameleonActive, setIsChameleonActive] = useState<boolean>(false);
  const [isPoseidonAlert, setIsPoseidonAlert] = useState<boolean>(false);
  const [isSpoilerUnlocked, setIsSpoilerUnlocked] = useState<boolean>(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);
  const [easterEggType, setEasterEggType] = useState<'bell' | 'door' | null>(null);
  const [bellClickCount, setBellClickCount] = useState<number>(0);

  // Scroll listener to naturally adapt depth level as the visitor scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = scrollY / maxScroll;
      // Map progress [0..1] to depth levels [0..9]
      const computedLevel = Math.min(9, Math.floor(progress * 10));
      setCurrentDepthLevel(computedLevel);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bell easter egg handler: 3 clicks unlocks the secret
  const handleBellClick = () => {
    audioEngine.playBellChime();
    const nextCount = bellClickCount + 1;
    if (nextCount >= 3) {
      setEasterEggType('bell');
      setBellClickCount(0);
    } else {
      setBellClickCount(nextCount);
    }
  };

  const handleDiveDeep = () => {
    const targetElement = document.getElementById('characters');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentDepthLevel(1);
  };

  const handleTrigger4DX = () => {
    setIs4DXActive(true);
    setTimeout(() => {
      setIs4DXActive(false);
    }, 2400);
  };

  return (
    <main
      className={`relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden transition-all duration-700 ${
        isChameleonActive ? 'opacity-85 filter contrast-125' : ''
      }`}
    >
      {/* 3D WebGL Canvas Layer */}
      <UnderwaterWorldCanvas
        currentDepthLevel={currentDepthLevel}
        is4DXActive={is4DXActive}
        isTekioActive={isTekioActive}
        isPoseidonAlert={isPoseidonAlert}
        is5DMode={is5DActive}
        isPureOceanView={isPureOceanView}
      />

      {/* 5D Diving Visor & Sensory Controls */}
      <FiveDVisorHUD
        is5DActive={is5DActive}
        currentDepthLevel={currentDepthLevel}
        onTriggerSensory={(type) => {
          if (type === 'shockwave' || type === 'thermal') {
            setIs4DXActive(true);
            setTimeout(() => setIs4DXActive(false), 2400);
          }
        }}
      />

      {/* Primary Fixed Top Navigation Bar */}
      <NavigationTopBar
        onDiveClick={handleDiveDeep}
        onBellClick={handleBellClick}
        bellClickCount={bellClickCount}
        isPureOceanView={isPureOceanView}
        onTogglePureOceanView={() => setIsPureOceanView((prev) => !prev)}
        is5DActive={is5DActive}
        onToggle5D={() => setIs5DActive((prev) => !prev)}
      />

      {/* Floating Submarine Telemetry HUD */}
      {!isPureOceanView && (
        <DepthMeterHUD
          currentLevel={currentDepthLevel}
          onSelectLevel={(level) => {
            setCurrentDepthLevel(level);
            // Optional jump to section
            if (level === 0) {
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            } else if (level === 1) {
              document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth' });
            } else if (level === 2) {
              document.getElementById('buggy')?.scrollIntoView({ behavior: 'smooth' });
            } else if (level === 4) {
              document.getElementById('world')?.scrollIntoView({ behavior: 'smooth' });
            } else if (level === 5 || level === 7) {
              document.getElementById('lore')?.scrollIntoView({ behavior: 'smooth' });
            } else if (level >= 8) {
              document.getElementById('climax')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          isTekioActive={isTekioActive}
          onToggleTekio={() => setIsTekioActive((prev) => !prev)}
        />
      )}

      {/* Pure 3D Ocean Exploration Floating Pill (when Ocean View is active) */}
      {isPureOceanView && (
        <aside
          aria-label="3D Ocean View Controller"
          className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-auto animate-in fade-in duration-300"
        >
          <div className="bg-slate-950/85 border border-cyan-400/50 px-4 py-2 rounded-full backdrop-blur-md text-xs font-medium text-cyan-200 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs">
              Ocean Exploration Active · Drag or tilt screen to explore
            </span>
            <button
              onClick={() => setIsPureOceanView(false)}
              className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shrink-0 active:scale-95 shadow-sm"
            >
              Show Story
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Sections Flow - Fades smoothly in Ocean View Mode */}
      <div
        className={`relative z-10 transition-all duration-500 ${
          isPureOceanView
            ? 'opacity-0 pointer-events-none scale-95'
            : 'opacity-100 pointer-events-auto scale-100'
        }`}
      >
        <HeroDescentSection
          onDiveDeep={handleDiveDeep}
          onOpenTrailer={() => setIsTrailerOpen(true)}
          isSpoilerUnlocked={isSpoilerUnlocked}
          onToggleSpoiler={() => setIsSpoilerUnlocked((prev) => !prev)}
        />

        <CharactersGallery />

        <UnderwaterBuggyStation onSpeedBoost={handleTrigger4DX} />

        <GadgetShowcase
          isTekioActive={isTekioActive}
          onToggleTekio={() => setIsTekioActive((prev) => !prev)}
          isChameleonActive={isChameleonActive}
          onToggleChameleon={() => setIsChameleonActive((prev) => !prev)}
          onDoorFound={() => setEasterEggType('door')}
        />

        <SunkenShipLore />

        <DeepLoreSection
          isSpoilerUnlocked={isSpoilerUnlocked}
          onUnlockSpoiler={() => setIsSpoilerUnlocked(true)}
        />

        <CastleClimaxExperience
          onTriggerAlert={(alert) => setIsPoseidonAlert(alert)}
          onJumpToLevel={(lvl) => setCurrentDepthLevel(lvl)}
        />

        <FourDXExperience
          is4DXActive={is4DXActive}
          onTrigger4DX={handleTrigger4DX}
        />

        <IndiaTheatricalRelease onOpenTrailer={() => setIsTrailerOpen(true)} />

        <MovieInfoAndCredits />
      </div>

      {/* Trailer Screen Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        onTrigger4DX={handleTrigger4DX}
      />

      {/* Easter Egg Modal */}
      <EasterEggsModal
        type={easterEggType}
        onClose={() => setEasterEggType(null)}
      />
    </main>
  );
}
