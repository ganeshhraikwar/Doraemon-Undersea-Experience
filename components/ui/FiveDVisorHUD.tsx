'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Shield, Activity, Flame, Zap, Wind, SlidersHorizontal } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface FiveDVisorHUDProps {
  is5DActive: boolean;
  currentDepthLevel: number;
  onTriggerSensory: (type: 'shockwave' | 'thermal' | 'heartbeat' | 'thrusters') => void;
}

export default function FiveDVisorHUD({
  is5DActive,
  currentDepthLevel,
  onTriggerSensory,
}: FiveDVisorHUDProps) {
  const [pitchYaw, setPitchYaw] = useState<{ pitch: number; yaw: number }>({ pitch: 0, yaw: 0 });
  const [isSensoryDockOpen, setIsSensoryDockOpen] = useState<boolean>(false);

  // Update pitch/yaw on mouse movement for visor HUD telemetry
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPitchYaw({
        yaw: Math.round(x * 45),
        pitch: Math.round(y * 30),
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Periodic subtle heartbeat / breathing in deep levels if 5D is active
  useEffect(() => {
    if (!is5DActive) return;
    const interval = setInterval(() => {
      if (currentDepthLevel >= 6) {
        audioEngine.playHeartbeat();
      } else {
        audioEngine.playDiverBreath();
      }
    }, 5500);
    return () => clearInterval(interval);
  }, [is5DActive, currentDepthLevel]);

  if (!is5DActive) return null;

  return (
    <div
      role="region"
      aria-label="5D Diving Visor Heads-Up Display"
      className="fixed inset-0 z-30 pointer-events-none select-none overflow-hidden"
    >
      {/* Subtle Curved Diving Helmet Frame Vignette - Very light and clear */}
      <div className="absolute inset-0 border-[8px] sm:border-[20px] border-slate-950/60 rounded-[30px] sm:rounded-[60px] pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]" />

      {/* Gentle Oceanic Radial Light Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none" />

      {/* Top Left: Subsea Helmet Oxygen & Tekio Adaptation Sync (Only on larger screens) */}
      <div className="absolute top-16 left-6 text-xs font-mono text-cyan-300 space-y-1 bg-slate-950/70 p-2.5 rounded-xl border border-cyan-500/20 backdrop-blur-sm hidden sm:block">
        <div className="flex items-center gap-2 font-bold text-white">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>TEKIO BIO-SUIT // 5D ACTIVE</span>
        </div>
        <div className="text-[11px] text-slate-300 flex items-center gap-2">
          <span>RESPIRATOR: AUTO</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-semibold">100% OK</span>
        </div>
      </div>

      {/* Bottom Left: Spatial Compass Tracker (Hidden on small mobile) */}
      <div className="absolute bottom-6 left-6 text-xs font-mono text-cyan-300 space-y-1 bg-slate-950/70 p-2.5 rounded-xl border border-cyan-500/20 backdrop-blur-sm hidden md:block">
        <div className="flex items-center gap-2 font-bold text-white">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>360° SPATIAL ORIENTATION</span>
        </div>
        <div className="text-[11px] text-slate-300 flex items-center gap-3">
          <span>YAW: {pitchYaw.yaw}°</span>
          <span>PITCH: {pitchYaw.pitch}°</span>
        </div>
      </div>

      {/* Bottom Right: Collapsible 5D Sensory Trigger Dock - Non-intrusive */}
      <aside aria-label="Sensory Actuators Dock" className="absolute bottom-5 right-5 pointer-events-auto flex items-center gap-1.5">
        {/* Toggle trigger button */}
        <button
          onClick={() => setIsSensoryDockOpen((prev) => !prev)}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-rose-300 border border-rose-500/30 backdrop-blur-md shadow-lg text-xs font-medium flex items-center gap-1.5 transition-all"
          title="Toggle 5D Sensory Effects"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden sm:inline">5D Effects</span>
        </button>

        {/* Collapsible actuators bar */}
        {isSensoryDockOpen && (
          <div className="flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-rose-500/30 backdrop-blur-md shadow-xl animate-in fade-in duration-200">
            <button
              onClick={() => {
                audioEngine.playSeismicShockwave();
                onTriggerSensory('shockwave');
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition-all active:scale-90"
              title="5D Seismic Shockwave"
              aria-label="Shockwave"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => {
                audioEngine.play4DXRumble();
                audioEngine.triggerHaptic([100, 50, 100]);
                onTriggerSensory('thermal');
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-amber-950 text-amber-400 border border-slate-800 transition-all active:scale-90"
              title="5D Volcanic Thermal Plume"
              aria-label="Thermal"
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => {
                audioEngine.playBuggyChirp();
                audioEngine.triggerHaptic([40, 40, 80]);
                onTriggerSensory('thrusters');
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-cyan-950 text-cyan-400 border border-slate-800 transition-all active:scale-90"
              title="5D Buggy Thrusters"
              aria-label="Thrusters"
            >
              <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => {
                audioEngine.playHeartbeat();
                onTriggerSensory('heartbeat');
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition-all active:scale-90"
              title="5D Abyssal Heartbeat"
              aria-label="Heartbeat"
            >
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
