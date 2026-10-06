'use client';

import React, { useState } from 'react';
import { FOUR_D_FEATURES } from '@/lib/movieData';
import { Wind, Droplets, Zap, Activity, Flame, Sparkles } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface FourDXExperienceProps {
  is4DXActive: boolean;
  onTrigger4DX: () => void;
}

export default function FourDXExperience({
  is4DXActive,
  onTrigger4DX,
}: FourDXExperienceProps) {
  const [activeCue, setActiveCue] = useState<string | null>(null);

  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'motion':
        return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />;
      case 'water-spray':
        return <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />;
      case 'wind':
        return <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />;
      case 'subsea-lighting':
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />;
      case 'haptics':
        return <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />;
    }
  };

  const handleTestFeature = (id: string) => {
    setActiveCue(id);
    audioEngine.play4DXRumble();
    audioEngine.playBubble();
    onTrigger4DX();
    setTimeout(() => {
      setActiveCue(null);
    }, 1800);
  };

  return (
    <section
      id="4dx"
      aria-label="4DX and MX4D Theatrical Experience Simulator"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-cyan-400 tracking-wider uppercase">
          05. Multi-Sensory Theatrical Revolution
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          THE FIRST DORAEMON MOVIE IN SIMULTANEOUS 4DX &amp; MX4D
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          Experience the weight of the deep ocean. Synchronized environmental effects immerse you directly in the cockpit.
        </p>
      </div>

      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-xl space-y-6">
        {/* Sensory Pulse Hero Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/70">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              Theatrical Synchronizer
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white mt-0.5">
              Interactive 4D Environment Chamber
            </div>
          </div>

          <button
            onClick={() => handleTestFeature('all')}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg ${
              is4DXActive
                ? 'bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse'
                : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{is4DXActive ? '4D SENSORS FIRING...' : 'FEEL THE OCEAN (TEST 4DX)'}</span>
          </button>
        </div>

        {/* 6 Sensory Vectors Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {FOUR_D_FEATURES.map((feat) => {
            const isFiring = activeCue === feat.id || (is4DXActive && activeCue === 'all');
            return (
              <div
                key={feat.id}
                onClick={() => handleTestFeature(feat.id)}
                className={`p-3 sm:p-4 rounded-xl border transition-all cursor-pointer select-none space-y-2 ${
                  isFiring
                    ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                    {getFeatureIcon(feat.id)}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {feat.sensoryCue}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                    {feat.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
