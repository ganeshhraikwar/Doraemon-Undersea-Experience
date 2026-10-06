'use client';

import React, { useState } from 'react';
import { GADGETS, GadgetData } from '@/lib/movieData';
import { Flashlight, Shield, Tent, DoorOpen, Car, VolumeX, Sparkles, Check } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface GadgetShowcaseProps {
  isTekioActive: boolean;
  onToggleTekio: () => void;
  isChameleonActive: boolean;
  onToggleChameleon: () => void;
  onDoorFound: () => void;
}

export default function GadgetShowcase({
  isTekioActive,
  onToggleTekio,
  isChameleonActive,
  onToggleChameleon,
  onDoorFound,
}: GadgetShowcaseProps) {
  const [selectedGadget, setSelectedGadget] = useState<GadgetData>(GADGETS[1]); // Default to Tekio Light

  const getIcon = (type: string) => {
    switch (type) {
      case 'flashlight':
        return <Flashlight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />;
      case 'shield':
        return <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />;
      case 'tent':
        return <Tent className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />;
      case 'door':
        return <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />;
      case 'car':
        return <Car className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />;
      default:
        return <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />;
    }
  };

  const handleSelectGadget = (gadget: GadgetData) => {
    setSelectedGadget(gadget);
    if (gadget.id === 'tekio-light') {
      audioEngine.playTekioLight();
    } else if (gadget.id === 'anywhere-door') {
      audioEngine.playBellChime();
      onDoorFound();
    } else {
      audioEngine.playBubble();
    }
  };

  return (
    <section
      id="gadgets"
      aria-label="22nd Century Secret Gadgets"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-cyan-400 tracking-wider uppercase">
          03. 22nd Century Abyssal Arsenal
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          DORAEMON&apos;S SECRET GADGETS
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          Surviving 10,000 meters underwater demands physics-defying 22nd-century engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Gadget Hologram Inspection Stage - Translucent glass so background is visible */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-7 backdrop-blur-md relative overflow-hidden shadow-xl">
          {/* Top Status */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/70 text-xs">
            <span className="font-mono text-cyan-400 flex items-center gap-1.5 text-[11px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HOLOGRAPHIC SCHEMATIC</span>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {selectedGadget.japaneseName}
            </span>
          </div>

          <div className="my-4 sm:my-6 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                {getIcon(selectedGadget.iconType)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedGadget.name}
                </h3>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  {selectedGadget.category}
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">
                Primary Mission Purpose
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {selectedGadget.purpose}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedGadget.detailedFunction}
            </p>
          </div>

          {/* Interactive Gadget Actuators */}
          <div className="pt-3 border-t border-slate-800/70 flex flex-wrap gap-2.5">
            {selectedGadget.id === 'tekio-light' && (
              <button
                onClick={() => {
                  audioEngine.playTekioLight();
                  onToggleTekio();
                }}
                className={`w-full sm:w-auto px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  isTekioActive
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Flashlight className="w-3.5 h-3.5" />
                <span>
                  {isTekioActive
                    ? 'Tekio Light Wavelength Active'
                    : 'Discharge Adaptation Light Beam'}
                </span>
                {isTekioActive && <Check className="w-3.5 h-3.5 text-slate-950" />}
              </button>
            )}

            {selectedGadget.id === 'chameleon-hat' && (
              <button
                onClick={() => {
                  audioEngine.playBubble();
                  onToggleChameleon();
                }}
                className={`w-full sm:w-auto px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  isChameleonActive
                    ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>
                  {isChameleonActive
                    ? 'Optical Camouflage Engaged'
                    : 'Don Chameleon Hat for Stealth'}
                </span>
              </button>
            )}

            {selectedGadget.id === 'anywhere-door' && (
              <button
                onClick={() => {
                  audioEngine.playBellChime();
                  onDoorFound();
                }}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold rounded-xl bg-pink-500 hover:bg-pink-400 text-white transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <DoorOpen className="w-3.5 h-3.5" />
                <span>Open Submerged Coordinate</span>
              </button>
            )}
          </div>
        </div>

        {/* Compact Gadget Selectors Strip */}
        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-2">
          {GADGETS.map((g) => {
            const isCurrent = selectedGadget.id === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleSelectGadget(g)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isCurrent
                    ? 'bg-slate-900/80 border-cyan-400 text-white shadow-md'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 shrink-0">
                    {getIcon(g.iconType)}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-xs sm:text-sm text-white truncate">
                      {g.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {g.category}
                    </div>
                  </div>
                </div>

                {g.id === 'tekio-light' && isTekioActive && (
                  <span className="text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 rounded px-1 shrink-0 ml-1">
                    ON
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
