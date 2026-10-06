// Synthesized Web Audio API Sound Engine
// Safe, self-contained, no external mp3 dependencies, WCAG accessible with mute/unmute

class OceanAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private subDroneOsc: OscillatorNode | null = null;
  private noiseNode: AudioNode | null = null;
  private poseidonOsc: OscillatorNode | null = null;
  private poseidonGain: GainNode | null = null;
  private isInitialized: boolean = false;

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // Audio not supported in environment
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      if (!this.isInitialized) {
        this.startAmbient();
      }
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 0.5);
      }
    } else {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      }
      if (this.poseidonGain && this.ctx) {
        this.poseidonGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private startAmbient() {
    if (!this.ctx) return;
    try {
      this.isInitialized = true;
      const now = this.ctx.currentTime;

      // Master ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, now);
      this.ambientGain.connect(this.ctx.destination);

      // Low sub-bass sine ocean drone (55Hz - A1 fundamental)
      this.subDroneOsc = this.ctx.createOscillator();
      this.subDroneOsc.type = "sine";
      this.subDroneOsc.frequency.setValueAtTime(55, now);

      const subFilter = this.ctx.createBiquadFilter();
      subFilter.type = "lowpass";
      subFilter.frequency.setValueAtTime(110, now);

      this.subDroneOsc.connect(subFilter);
      subFilter.connect(this.ambientGain);
      this.subDroneOsc.start();

      // Pink/Brown noise water rush simulator
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 1.5;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const waterFilter = this.ctx.createBiquadFilter();
      waterFilter.type = "bandpass";
      waterFilter.frequency.setValueAtTime(280, now);
      waterFilter.Q.setValueAtTime(1.2, now);

      noiseSource.connect(waterFilter);
      waterFilter.connect(this.ambientGain);
      noiseSource.start();
      this.noiseNode = noiseSource;
    } catch {
      // Audio node failure fallback
    }
  }

  // Play realistic rising bubble pop
  public playBubble() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startFreq = 300 + Math.random() * 300;
      const endFreq = startFreq + 450 + Math.random() * 200;

      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.09);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio fallback
    }
  }

  // Subsea hydrophone sonar echo ping
  public playSonarPing() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // A5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Audio fallback
    }
  }

  // Doraemon's golden bell chime (Easter Egg)
  public playBellChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const frequencies = [1046.5, 2093, 3136]; // C6, C7, G7 harmonics
      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        const initGain = 0.09 / (idx + 1);
        gain.gain.setValueAtTime(initGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.7);
      });
    } catch {
      // Audio fallback
    }
  }

  // Underwater Buggy computer vocalization / melodic chirps
  public playBuggyChirp() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.06, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.15);
      });
    } catch {
      // Audio fallback
    }
  }

  // Adaptation Light beam activation swoosh
  public playTekioLight() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.6);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.75);
    } catch {
      // Audio fallback
    }
  }

  // 4DX sub-bass seismic rumble
  public play4DXRumble() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(36, now);
      osc.frequency.linearRampToValueAtTime(48, now + 0.5);
      osc.frequency.linearRampToValueAtTime(30, now + 1.2);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(90, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.4);
    } catch {
      // Audio fallback
    }
  }

  // 5D Sensory Physical Device Vibration (Haptics)
  public triggerHaptic(pattern: number | number[] = [80, 40, 80]) {
    if (typeof window !== "undefined" && "navigator" in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Haptics unavailable
      }
    }
  }

  // 5D Deep-Sea Diver Respirator Exhale
  public playDiverBreath() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.8;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
    } catch {
      // Audio fallback
    }
  }

  // 5D Deep Mariana Trench Heartbeat Pulse
  public playHeartbeat() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Lub
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(45, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);

      // Dub
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(40, now + 0.18);
      gain2.gain.setValueAtTime(0.12, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.35);

      this.triggerHaptic([40, 60, 30]);
    } catch {
      // Audio fallback
    }
  }

  // 5D Tectonic Shockwave / Poseidon EMP Burst
  public playSeismicShockwave() {
    if (!this.ctx) return;
    this.triggerHaptic([120, 50, 180, 50, 240]);
    if (this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(22, now + 1.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.1);
    } catch {
      // Audio fallback
    }
  }

  // Poseidon threat countdown / warning pulse
  public setPoseidonIntensity(active: boolean) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (active && !this.isMuted) {
        if (!this.poseidonOsc) {
          this.poseidonOsc = this.ctx.createOscillator();
          this.poseidonOsc.type = "sawtooth";
          this.poseidonOsc.frequency.setValueAtTime(65.41, now); // C2

          const filter = this.ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(160, now);

          this.poseidonGain = this.ctx.createGain();
          this.poseidonGain.gain.setValueAtTime(0.1, now);

          this.poseidonOsc.connect(filter);
          filter.connect(this.poseidonGain);
          this.poseidonGain.connect(this.ctx.destination);

          this.poseidonOsc.start();
        } else if (this.poseidonGain) {
          this.poseidonGain.gain.setTargetAtTime(0.12, now, 0.4);
        }
      } else if (this.poseidonGain) {
        this.poseidonGain.gain.setTargetAtTime(0, now, 0.4);
      }
    } catch {
      // Audio fallback
    }
  }
}

export const audioEngine = new OceanAudioEngine();
