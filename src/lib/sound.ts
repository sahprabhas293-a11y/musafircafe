// Web Audio API procedural ambient sound generator for MusafirCafe
// Generates warm, subtle atmospheric cafe soundscape (gentle rain/room tone + soft warm harmonics)

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public get active(): boolean {
    return this.isPlaying;
  }

  public init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    if (typeof window === "undefined") return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // 1. Soft atmospheric pink/brown noise (filtered like gentle rain / cozy cafe murmur)
      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(450, this.ctx.currentTime);

      const highpass = this.ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(40, this.ctx.currentTime);

      this.noiseNode.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(this.masterGain);
      this.noiseNode.start(0);

      // 2. Warm ambient meditative drone chords (tuned to warm pentatonic Himalayan chord: D - A - F#)
      const frequencies = [146.83, 220.0, 277.18, 440.0];
      this.oscillators = frequencies.map((freq) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        oscGain.gain.setValueAtTime(0.006, this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain!);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    if (this.masterGain) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        try {
          if (this.noiseNode) {
            this.noiseNode.stop();
            this.noiseNode.disconnect();
          }
          this.oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.oscillators = [];
        } catch {}
      }, 1500);
    }
    this.isPlaying = false;
  }
}

export const ambientSound = new AmbientAudioEngine();
