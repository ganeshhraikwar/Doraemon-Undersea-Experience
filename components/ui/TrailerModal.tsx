'use client';

import React from 'react';
import { X, Play, Music, Film, Sparkles } from 'lucide-react';
import { MOVIE_METADATA } from '@/lib/movieData';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrigger4DX: () => void;
}

export default function TrailerModal({ isOpen, onClose, onTrigger4DX }: TrailerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Theatrical Trailer Chamber"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                THEATRICAL TEASER &amp; PREVIEW CHAMBER
              </h3>
              <p className="text-xs text-slate-400">
                {MOVIE_METADATA.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Trailer Chamber"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Projection Screen */}
        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
          {/* Ambient Video Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950 via-slate-950 to-blue-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.2),transparent_70%)]" />

          {/* Cinematic Teaser Screen Content */}
          <div className="relative z-10 text-center p-6 space-y-4 max-w-lg">
            <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center mx-auto text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Play className="w-7 h-7 fill-cyan-400 text-cyan-400 ml-1" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Official Theatrical Teaser
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                THE CASTLE AWAKENS
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience the official theatrical preview in 4DX / MX4D motion theaters.
                Featuring theme song &ldquo;Honto&rdquo; by sumika.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={onTrigger4DX}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg hover:bg-cyan-300 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Simulate 4DX In-Cinema Motion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Audio Meta */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 font-medium">Theme Song:</span>
            <span>&ldquo;Honto&rdquo; by sumika (Sony Music Labels)</span>
          </div>
          <div>Original Score by Takayuki Hattori</div>
        </div>
      </div>
    </div>
  );
}
