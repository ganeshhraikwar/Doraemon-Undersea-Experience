'use client';

import React, { useState } from 'react';
import { MOVIE_METADATA } from '@/lib/movieData';
import { Ticket, Film, Calendar, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface IndiaTheatricalReleaseProps {
  onOpenTrailer: () => void;
}

export default function IndiaTheatricalRelease({ onOpenTrailer }: IndiaTheatricalReleaseProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Hindi');
  const [selectedFormat, setSelectedFormat] = useState<string>('4DX');
  const [bookingReminderSet, setBookingReminderSet] = useState<boolean>(false);

  const handleReminder = () => {
    audioEngine.playSonarPing();
    setBookingReminderSet(true);
    setTimeout(() => setBookingReminderSet(false), 3000);
  };

  return (
    <section
      id="tickets"
      aria-label="India Theatrical Release & Ticketing"
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-6 sm:mb-10 space-y-2">
        <div className="text-[11px] sm:text-xs font-mono text-cyan-400 tracking-wider uppercase">
          06. Indian Theatrical Premiere
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          DORAEMON ON THE BIG SCREEN
        </h2>
        <p className="text-slate-300 max-w-2xl text-xs sm:text-sm">
          TV Asahi and PVR INOX Pictures bring the 45th Doraemon movie to Indian theaters in Hindi, Tamil, and Telugu with 4DX and MX4D presentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Main India Release Ticket Card - Translucent */}
        <div className="lg:col-span-8 bg-slate-950/60 border border-cyan-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-xl space-y-6">
          {/* Release Date Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/70">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Nationwide Cinema Release</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                2 OCTOBER 2026
              </div>
              <div className="text-[11px] text-slate-300">
                Gandhi Jayanti Holiday Weekend
              </div>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Theatrical Presentation
              </div>
              <div className="text-xs sm:text-sm font-bold text-cyan-300">
                PVR INOX Pictures · TV Asahi
              </div>
              <div className="text-[11px] text-slate-400">
                Certification: {MOVIE_METADATA.indiaCertification}
              </div>
            </div>
          </div>

          {/* Language Selection Bar */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Select Language Dub</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MOVIE_METADATA.indiaLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    audioEngine.playBubble();
                    setSelectedLanguage(lang);
                  }}
                  className={`py-2 sm:py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                    selectedLanguage === lang
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection Bar */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cinema Format</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MOVIE_METADATA.indiaFormats.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    audioEngine.playBubble();
                    setSelectedFormat(fmt);
                  }}
                  className={`py-2 sm:py-2.5 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all truncate ${
                    selectedFormat === fmt
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 border-t border-slate-800/70 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleReminder}
              className="flex-1 py-3 px-5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95"
            >
              <Ticket className="w-4 h-4 text-slate-950" />
              <span>
                {bookingReminderSet ? 'REMINDER REGISTERED!' : 'BOOK TICKETS (PVR INOX)'}
              </span>
              {bookingReminderSet && <CheckCircle2 className="w-4 h-4 text-emerald-950" />}
            </button>

            <button
              onClick={onOpenTrailer}
              className="py-3 px-5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Film className="w-4 h-4 text-cyan-400" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>

        {/* Association Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
              India Theatrical Distribution
            </div>
            <div className="text-sm font-bold text-white">
              PVR INOX Pictures &amp; TV Asahi
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Bringing the 45th movie to premier multiplex screens and 4DX/MX4D theaters nationwide.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
              Strategic Partners
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div>
                <span className="text-slate-400">Marketing:</span>{' '}
                <span className="text-white font-medium">Black White Orange (BWO)</span>
              </div>
              <div>
                <span className="text-slate-400">Consulting:</span>{' '}
                <span className="text-white font-medium">Happening 365 Synergies</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Integrates with BookMyShow &amp; PVR INOX at release.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
