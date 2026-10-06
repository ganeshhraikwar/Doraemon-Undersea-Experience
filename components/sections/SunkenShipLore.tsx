'use client';

import React, { useState } from 'react';
import { Anchor, Compass, Search, ChevronRight } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface POI {
  id: string;
  title: string;
  label: string;
  depth: string;
  description: string;
}

const SHIPWRECK_POIS: POI[] = [
  {
    id: 'discovery',
    title: 'The Sunken Galleon Discovery',
    label: 'Marker Alpha',
    depth: '3,800m Trench',
    description:
      'Centuries ago, a surface vessel sank into the abyss. Resting on this shelf, it became the landmark where Nobita, Doraemon, and the crew first crossed paths with the undersea civilization.',
  },
  {
    id: 'who-was-there',
    title: 'Who Was Aboard?',
    label: 'Marker Beta',
    depth: 'Cabin Ruins',
    description:
      'Centuries of marine growth encrust the timber. Yet modern probes indicate this wreck has been under constant observation by the Mu Federation military.',
  },
  {
    id: 'mu-boundary',
    title: 'The Mu Federation Boundary',
    label: 'Marker Gamma',
    depth: 'Lower Keel',
    description:
      'Past this sunken galleon lies the sovereign territory of the Mu Federation, where surface intruders are intercepted by undersea soldiers led by El.',
  },
];

export default function SunkenShipLore() {
  const [activePoi, setActivePoi] = useState<POI>(SHIPWRECK_POIS[0]);

  const handleSelectPoi = (poi: POI) => {
    audioEngine.playSonarPing();
    setActivePoi(poi);
  };

  return (
    <section
      id="world"
      aria-label="Sunken Shipwreck Discovery"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
          <Anchor className="w-3.5 h-3.5" />
          <span>07. The Abyssal Landmark</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          THE SUNKEN SHIP: GATEWAY TO THE UNKNOWN
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          What began as an ordinary seabed exploration changes forever upon reaching this wreck.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* POI Selector Buttons */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
          {SHIPWRECK_POIS.map((poi) => {
            const isSelected = activePoi.id === poi.id;
            return (
              <button
                key={poi.id}
                onClick={() => handleSelectPoi(poi)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900/80 border-cyan-400 text-white shadow-md'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="space-y-0.5 truncate mr-2">
                  <div className="text-[10px] font-mono text-cyan-400">{poi.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">
                    {poi.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{poi.depth}</div>
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

        {/* Detailed POI Narrative Stage - Translucent glass */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-7 backdrop-blur-md relative overflow-hidden shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/70 pb-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                Depth {activePoi.depth}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {activePoi.title}
              </h3>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {activePoi.description}
          </p>

          <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Hull Coordinates Active</span>
            </span>
            <span className="font-mono text-slate-400">SEABED TRENCH 3800M</span>
          </div>
        </div>
      </div>
    </section>
  );
}
