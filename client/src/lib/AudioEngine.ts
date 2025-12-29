import { PolySynth, Volume } from "tone";

export type EnvelopeSettings = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export class AudioEngine {
  private synth: PolySynth;
  private volume: Volume;
  private envelopeSettings: EnvelopeSettings;
  private velocity: number = 0.6; // Default velocity (0-1, where 1 is loudest)
  private isStarted: boolean = false;

  constructor() {
    // Set volume to -12dB to prevent clipping
    this.volume = new Volume(-8).toDestination();
    this.synth = new PolySynth().connect(this.volume);
    this.envelopeSettings = {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.5,
      release: 0.1,
    };
  }

  async startAudioContext() {
    if (!this.isStarted) {
      await this.synth.context.resume();
      this.isStarted = true;
    }
  }

  setEnvelope(envelope: Partial<EnvelopeSettings>) {
    this.envelopeSettings = { ...this.envelopeSettings, ...envelope };
    this.synth.set({ envelope: this.envelopeSettings });
  }

  attackNotes(notes: string[]) {
    // Use velocity to control volume (prevents peaking)
    this.synth.triggerAttack(notes, undefined, this.velocity);
  }

  setVelocity(velocity: number) {
    this.velocity = Math.max(0, Math.min(1, velocity)); // Clamp between 0-1
  }

  setVolume(db: number) {
    this.volume.volume.value = db;
  }

  releaseNotes(notes: string[]) {
    this.synth.triggerRelease(notes);
  }

  releaseAll() {
    this.synth.releaseAll();
  }
}
