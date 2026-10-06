'use client';

import React from 'react';
import { X, Sparkles, Bell, DoorOpen, Award } from 'lucide-react';

interface EasterEggsModalProps {
  type: 'bell' | 'door' | null;
  onClose: () => void;
}

export default function EasterEggsModal({ type, onClose }: EasterEggsModalProps) {
  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secret Easter Egg Discovered"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-md bg-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.25)] space-y-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'bell' ? (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] animate-bounce">
              <Bell className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-mono tracking-widest text-amber-400">
                Secret Easter Egg Unlocked
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                DORAEMON&apos;S CAT-CALL BELL RANG!
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You clicked Doraemon&apos;s golden bell 3 times! In the original 22nd-century
                blueprints, this bell was a miniature homing signal and pocket summoner.
                Doraemon sends you extra underwater stamina!
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center mx-auto text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-pulse">
              <DoorOpen className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-mono tracking-widest text-pink-400">
                Submerged Anywhere Door
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                SPATIAL CURVATURE DETECTED
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The Anywhere Door rests deep in the marine trench! While immense hydrostatic
                pressure prevents opening it directly underwater without flooding Tokyo,
                its pink frame stands as a testament to Fujiko F. Fujio&apos;s boundless imagination.
              </p>
            </div>
          </>
        )}

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Return to Expedition</span>
          </button>
        </div>
      </div>
    </div>
  );
}
