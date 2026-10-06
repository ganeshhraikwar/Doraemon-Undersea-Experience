'use client';

import React, { useState } from 'react';
import { BUGGY_DIALOGUES } from '@/lib/movieData';
import { MessageSquare, Zap, Lightbulb, HeartHandshake, Compass } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface UnderwaterBuggyStationProps {
  onSpeedBoost?: () => void;
}

export default function UnderwaterBuggyStation({ onSpeedBoost }: UnderwaterBuggyStationProps) {
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [headlightsHigh, setHeadlightsHigh] = useState<boolean>(true);
  const [emotionalBondLevel, setEmotionalBondLevel] = useState<number>(42);

  const currentDialogue = BUGGY_DIALOGUES[dialogueIndex];

  const handleNextDialogue = () => {
    audioEngine.playBuggyChirp();
    setDialogueIndex((prev) => (prev + 1) % BUGGY_DIALOGUES.length);
    setEmotionalBondLevel((prev) => Math.min(100, prev + 14));
  };

  const handleToggleLights = () => {
    audioEngine.playBubble();
    setHeadlightsHigh((prev) => !prev);
  };

  const handleBoost = () => {
    audioEngine.playBuggyChirp();
    audioEngine.play4DXRumble();
    onSpeedBoost?.();
  };

  return (
    <section
      id="buggy"
      aria-label="Underwater Buggy Interactive Station"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-amber-400 tracking-wider uppercase">
          02. Autonomous Amphibious Companion
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          UNDERWATER BUGGY: FROM CALCULATION TO CONSCIENCE
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          Initially commissioned for a leisurely seabed camping holiday, Buggy confronts an
          unprecedented query: what makes human hearts choose sacrifice over self-preservation?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Interactive Buggy Control Terminal - Translucent so 3D Buggy in scene is visible */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-amber-500/30 rounded-2xl p-4 sm:p-7 backdrop-blur-md relative overflow-hidden shadow-xl">
          {/* Top Telemetry */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/70 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-semibold text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>BUGGY NEURAL INTERFACE // ACTIVE</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Voice: Ryo Hirohashi
            </div>
          </div>

          {/* Dialogue Box */}
          <div className="my-4 sm:my-6 p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 relative space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400">
                  Buggy Transmission · Protocol {dialogueIndex + 1}
                </div>
                <div className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  &ldquo;{currentDialogue.text}&rdquo;
                </div>
              </div>
            </div>

            {/* Emotional Connection Gauge */}
            <div className="pt-3 border-t border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                <span>Empathy Resonance:</span>
                <span className="font-mono font-bold text-amber-400">
                  {emotionalBondLevel}%
                </span>
              </div>
              <div className="w-full sm:w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-500"
                  style={{ width: `${emotionalBondLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Buggy Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleNextDialogue}
              className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Converse</span>
            </button>

            <button
              onClick={handleToggleLights}
              className={`px-3.5 py-2.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 active:scale-95 ${
                headlightsHigh
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{headlightsHigh ? 'High Beams' : 'Stealth'}</span>
            </button>

            <button
              onClick={handleBoost}
              className="px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Overdrive Test</span>
            </button>
          </div>
        </div>

        {/* Narrative Dimension Card */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md space-y-2">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>The Soul of the Machine</span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white">
              &ldquo;Can something built to calculate learn what it means to care?&rdquo;
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Unlike Poseidon AI whose rigid retaliation trees bring ruin, Buggy learns from
              Shizuka and Nobita that logic is hollow without love.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/70">
              <div className="text-[10px] text-slate-400 mb-0.5">Amphibious Hull</div>
              <div className="text-white font-semibold text-xs truncate">Carbon Titanium</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/70">
              <div className="text-[10px] text-slate-400 mb-0.5">Depth Tolerance</div>
              <div className="text-white font-semibold text-xs truncate">11,000+ Meters</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
