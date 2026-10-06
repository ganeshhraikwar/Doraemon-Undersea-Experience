'use client';

import React from 'react';
import { MOVIE_METADATA } from '@/lib/movieData';
import { Music, Award, Film, Users, ShieldCheck } from 'lucide-react';

export default function MovieInfoAndCredits() {
  return (
    <footer
      aria-label="Movie Details, Production Credits and Legal Notice"
      className="relative pt-12 pb-12 px-3 sm:px-6 max-w-6xl mx-auto border-t border-slate-800/70 mt-8 space-y-10"
    >
      {/* Emotional Final Climax Resolution Message */}
      <div className="text-center max-w-2xl mx-auto space-y-2 py-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
          The Journey Above and Below
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
          &ldquo;THE DEEP MAY BE UNKNOWN. BUT YOU NEVER DIVE ALONE.&rdquo;
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Through ancient ruins and forgotten wars, the courage of friends saved the Earth.
        </p>
      </div>

      {/* Production Details Matrix - Compact Translucent Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Creative Leadership */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md space-y-2">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Direction &amp; Story</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div>
              <div className="text-slate-400 text-[10px]">Creator:</div>
              <div className="text-white font-semibold truncate">{MOVIE_METADATA.originalCreator}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Director:</div>
              <div className="text-white font-semibold truncate">{MOVIE_METADATA.director}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Screenplay:</div>
              <div className="text-white font-semibold truncate">{MOVIE_METADATA.screenplay}</div>
            </div>
          </div>
        </div>

        {/* Music & Theme Song */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] uppercase tracking-wider">
            <Music className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Soundtrack</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div>
              <div className="text-slate-400 text-[10px]">Score:</div>
              <div className="text-white font-semibold truncate">{MOVIE_METADATA.music}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Theme Song:</div>
              <div className="text-amber-300 font-semibold truncate">&ldquo;{MOVIE_METADATA.themeSong.title}&rdquo;</div>
              <div className="text-slate-400 text-[10px] truncate">by {MOVIE_METADATA.themeSong.artist}</div>
            </div>
          </div>
        </div>

        {/* Theatrical Specs */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md space-y-2">
          <div className="flex items-center gap-1.5 text-sky-400 font-mono text-[10px] uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Specifications</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div>
              <div className="text-slate-400 text-[10px]">Runtime:</div>
              <div className="text-white font-semibold">{MOVIE_METADATA.runtime}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">India Premiere:</div>
              <div className="text-cyan-300 font-semibold">{MOVIE_METADATA.indiaTheatricalRelease}</div>
            </div>
          </div>
        </div>

        {/* Production Committee */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md space-y-2">
          <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[10px] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Production</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div className="truncate">Fujiko-Pro · Shogakukan</div>
            <div className="truncate">TV Asahi · Shin-Ei Animation</div>
            <div className="text-slate-400 text-[10px] pt-1">
              Distributor: <span className="text-white">{MOVIE_METADATA.japanDistributor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Legal Notice */}
      <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 text-center sm:text-left">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{MOVIE_METADATA.copyrightNotice}</span>
        </div>
        <div>TV Asahi · PVR INOX Pictures · Shin-Ei Animation</div>
      </div>
    </footer>
  );
}
