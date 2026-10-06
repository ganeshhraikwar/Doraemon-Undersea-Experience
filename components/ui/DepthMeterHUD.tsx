'use client';

import React from 'react';
import { DEPTH_ZONES } from '@/lib/movieData';
import { Compass, Waves, Gauge, SunMedium } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface DepthMeterHUDProps {
  currentLevel: number;
  onSelectLevel: (level: number) => void;
  isTekioActive: boolean;
  onToggleTekio: () => void;
}

export default function DepthMeterHUD({
  currentLevel,
  onSelectLevel,
  isTekioActive,
  onToggleTekio,
}: DepthMeterHUDProps) {
  const currentZone = DEPTH_ZONES[currentLevel] || DEPTH_ZONES[0];

  const handleLevelClick = (level: number) => {
    audioEngine.playSonarPing();
    onSelectLevel(level);
  };

  return (
    <aside
      aria-label="Submarine Depth Telemetry"
      className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Adaptation Light Quick Status Pill-Free Bar */}
      <button
        onClick={() => {
          audioEngine.playTekioLight();
          onToggleTekio();
        }}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-md transition-all flex items-center gap-2 border ${
          isTekioActive
            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
        }`}
        title="Toggle 22nd-century Tekio Light biological adaptation"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isTekioActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'
          }`}
        />
        <span>Adaptation Light {isTekioActive ? 'Active' : 'Standby'}</span>
      </button>

      {/* Primary Depth Gauge Panel */}
      <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl p-3.5 shadow-2xl text-slate-200 min-w-[240px]">
        {/* Header Telemetry */}
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2.5 border-b border-slate-800/80 mb-2.5">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEPTH MONITOR</span>
          </div>
          <span className="font-mono tabular-nums text-cyan-400 font-semibold">
            {currentZone.depthRange}
          </span>
        </div>

        {/* Environmental Indicators */}
        <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
          <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Gauge className="w-3 h-3 text-amber-400" />
              <span>Hydrostatic</span>
            </div>
            <div className="font-mono tabular-nums text-slate-200 font-medium">
              {currentZone.pressure}
            </div>
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <SunMedium className="w-3 h-3 text-sky-400" />
              <span>Illumination</span>
            </div>
            <div className="font-mono tabular-nums text-slate-200 font-medium truncate">
              {currentZone.lightLevel}
            </div>
          </div>
        </div>

        {/* Zone Selector Strip */}
        <div className="space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Descent Stratum</span>
            <span className="text-cyan-400">Zone {currentLevel} of 9</span>
          </div>
          <div className="grid grid-cols-10 gap-1 pt-1">
            {DEPTH_ZONES.map((zone) => (
              <button
                key={zone.level}
                onClick={() => handleLevelClick(zone.level)}
                className={`h-5 rounded text-[10px] font-mono transition-all flex items-center justify-center ${
                  currentLevel === zone.level
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
                title={`${zone.name} (${zone.depthRange})`}
                aria-label={`Jump to ${zone.name}`}
              >
                {zone.level}
              </button>
            ))}
          </div>
        </div>

        {/* Current Stratum Title */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-xs flex items-center justify-between">
          <div className="truncate font-medium text-slate-200">
            {currentZone.name}
          </div>
          <Waves className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1.5" />
        </div>
      </div>
    </aside>
  );
}
