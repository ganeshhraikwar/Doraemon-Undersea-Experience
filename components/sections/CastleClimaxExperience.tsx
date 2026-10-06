'use client';

import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, Heart, Zap, Sparkles, Flame } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface CastleClimaxExperienceProps {
  onTriggerAlert: (active: boolean) => void;
  onJumpToLevel: (level: number) => void;
}

export default function CastleClimaxExperience({
  onTriggerAlert,
  onJumpToLevel,
}: CastleClimaxExperienceProps) {
  const [climaxStep, setClimaxStep] = useState<number>(0);
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);

  const steps = [
    {
      step: 1,
      tag: 'Phase 01 · Seismic Detection',
      title: 'Volcanic Tremors in the Fault Line',
      desc: 'Natural magma shifts in the crust. Poseidon’s ancient sensors miscalculate the geological shockwave as a hostile surface missile bombardment.',
      icon: <Flame className="w-4 h-4 text-amber-400" />,
    },
    {
      step: 2,
      tag: 'Phase 02 · The Castle Awakens',
      title: 'Automated Defense Bastions Power Up',
      desc: 'The colossal citadel begins to shake the seabed. Crimson warning circuits illuminate the oceanic abyss as ancient Atlantean retaliation conduits warm up.',
      icon: <AlertOctagon className="w-4 h-4 text-rose-500" />,
    },
    {
      step: 3,
      tag: 'Phase 03 · Race Against Time',
      title: 'The Five Friends & El Infiltrate',
      desc: 'Doraemon deploys stealth gadgets while Gian and Suneo provide rear guard defense. El leads the team through subterranean aqueducts to reach the core.',
      icon: <Zap className="w-4 h-4 text-cyan-400" />,
    },
    {
      step: 4,
      tag: 'Phase 04 · The Soul of the Buggy',
      title: 'Beyond Pure Calculation',
      desc: 'When Poseidon’s impenetrable barrier threatens the world, the Underwater Buggy makes the ultimate choice—sacrificing its chassis out of love for Shizuka and friends.',
      icon: <Heart className="w-4 h-4 text-pink-400" />,
    },
  ];

  const handleAdvanceStep = (nextIndex: number) => {
    setClimaxStep(nextIndex);
    if (nextIndex === 1) {
      setIsAlertActive(true);
      onTriggerAlert(true);
      audioEngine.play4DXRumble();
      onJumpToLevel(8);
    } else if (nextIndex === 3) {
      setIsAlertActive(false);
      onTriggerAlert(false);
      audioEngine.playBuggyChirp();
      onJumpToLevel(9);
    } else {
      audioEngine.playSonarPing();
    }
  };

  const currentStepData = steps[climaxStep];

  return (
    <section
      id="climax"
      aria-label="Interactive Climax Sequence"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-rose-400 tracking-wider uppercase flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>08. The Final Descent &amp; Climax</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          THE AWAKENING OF THE CASTLE OF THE UNDERSEA DEVIL
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          They feared it for thousands of years. Now its automated gears have ignited.
        </p>
      </div>

      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-xl space-y-6">
        {/* Step Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-800/70 pb-4">
          {steps.map((st, i) => (
            <button
              key={st.step}
              onClick={() => handleAdvanceStep(i)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                climaxStep === i
                  ? 'bg-rose-950/40 border-rose-500 text-white shadow-md'
                  : 'bg-slate-900/40 border-slate-800/70 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] font-mono text-rose-400">
                Phase 0{st.step}
              </div>
              <div className="text-xs font-bold text-white truncate">
                {st.title}
              </div>
            </button>
          ))}
        </div>

        {/* Current Climax Phase Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
              {currentStepData.icon}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
                {currentStepData.tag}
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-white">
                {currentStepData.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {currentStepData.desc}
          </p>

          {/* Emotional Dimension for Step 4 */}
          {climaxStep === 3 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/30 to-slate-900/50 border border-rose-500/30 space-y-1.5">
              <div className="text-[10px] uppercase font-mono text-pink-400 tracking-wider">
                Emotional Resonance
              </div>
              <blockquote className="italic text-slate-100 text-xs sm:text-base">
                &ldquo;Can something built to calculate learn what it means to care?&rdquo;
              </blockquote>
            </div>
          )}

          {/* Advancement Navigation */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            {climaxStep < steps.length - 1 ? (
              <button
                onClick={() => handleAdvanceStep(climaxStep + 1)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(225,29,72,0.4)] flex items-center gap-1.5 active:scale-95"
              >
                <span>Advance to Phase 0{climaxStep + 2}</span>
                <Zap className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => handleAdvanceStep(0)}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <span>Replay Sequence</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => {
                const nextAlert = !isAlertActive;
                setIsAlertActive(nextAlert);
                onTriggerAlert(nextAlert);
                if (nextAlert) {
                  audioEngine.play4DXRumble();
                  audioEngine.setPoseidonIntensity(true);
                } else {
                  audioEngine.setPoseidonIntensity(false);
                }
              }}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                isAlertActive
                  ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                  : 'bg-slate-900/60 border-slate-700 text-slate-300'
              }`}
            >
              {isAlertActive ? 'Disable Red Alert' : 'Test Red Alert'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
