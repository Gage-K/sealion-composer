import { PolySynth, Synth, Volume } from "tone";
import type { Chord } from "../types/chord.types";

export class AudioEngine {
  private synth: PolySynth;
  private volume: Volume;
  private isStarted: boolean = false;

  constructor() {
    this.volume = new Volume().toDestination();
    this.synth = new PolySynth(Synth).connect(this.volume);
  }

  async startAudioContext() {
    if (!this.isStarted) {
      await this.synth.context.resume();
      this.isStarted = true;
    }
  }

  playChord(chord: Chord) {
    const notes = this.getNotes(chord);
    this.synth.triggerAttackRelease(notes, "8n");
  }

  playNote(note: string) {
    this.synth.triggerAttackRelease(note, "8n");
  }

  private getNotes(chord: Chord): string[] {
    const rootNote = `${chord.root}4`;
    return [rootNote];
  }
}
