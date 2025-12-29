import { NOTES } from "../constants/notes.constants";
import type { Chord, Interval, Octave, Semitone } from "../types/chord.types";

/**
 * Returns the semitone index of a note in the chromatic scale (0-11, where C=0)
 */
const getNoteIndex = (note: Chord["root"]): Semitone => {
  return NOTES.indexOf(note);
};

/**
 * Converts a semitone index and octave to a Tone.js-compatible note string
 * @example getNoteString(0, 4) => "C4"
 * @example getNoteString(1, 5) => "C#5"
 */
const getNoteString = (semitone: Semitone, octave: Octave): string => {
  return `${NOTES[semitone]}${octave}`;
};

/**
 * Converts an interval (semitones from root) to an absolute note with octave
 */
const convertIntervalToNote = (
  rootSemitone: Semitone,
  interval: Interval,
  baseOctave: Octave
): string => {
  const totalSemitones = rootSemitone + interval;
  const octave = baseOctave + Math.floor(totalSemitones / 12);
  const semitone = totalSemitones % 12;
  return getNoteString(semitone, octave);
};

/**
 * Returns the intervals (semitones from root) for a given chord quality
 */
export const getChordIntervals = (quality: Chord["quality"]): Interval[] => {
  switch (quality) {
    case "major":
      return [0, 4, 7]; // Root, Major 3rd, Perfect 5th
    case "minor":
      return [0, 3, 7]; // Root, Minor 3rd, Perfect 5th
    case "diminished":
      return [0, 3, 6]; // Root, Minor 3rd, Diminished 5th
    case "augmented":
      return [0, 4, 8]; // Root, Major 3rd, Augmented 5th
    case "sus4":
      return [0, 5, 7]; // Root, Perfect 4th, Perfect 5th
    case "6th":
      return [0, 4, 7, 9]; // Root, Major 3rd, Perfect 5th, Major 6th
    case "minor7":
      return [0, 3, 7, 10]; // Root, Minor 3rd, Perfect 5th, Minor 7th
    case "major7":
      return [0, 4, 7, 11]; // Root, Major 3rd, Perfect 5th, Major 7th
    default:
      throw new Error(`Invalid chord quality: ${quality}`);
  }
};

/**
 * Applies an inversion to chord intervals
 */
export const applyInversion = (
  intervals: Interval[],
  inversion: number
): Interval[] => {
  if (inversion === 0 || inversion >= intervals.length) {
    return [...intervals];
  }

  const inverted = [...intervals];
  for (let i = 0; i < inversion; i++) {
    const note = inverted.shift()!;
    inverted.push(note + 12);
  }
  return inverted;
};

/**
 * Applies a drop-2 voicing (drops the second-highest note by an octave)
 */
export const applyDrop2 = (intervals: Interval[]): Interval[] => {
  if (intervals.length < 3) return [...intervals];

  const voiced = [...intervals];
  const secondHighest = voiced[voiced.length - 2];
  voiced[voiced.length - 2] = secondHighest - 12;
  return voiced.sort((a, b) => a - b);
};

/**
 * Applies a drop-3 voicing (drops the third-highest note by an octave)
 */
export const applyDrop3 = (intervals: Interval[]): Interval[] => {
  if (intervals.length < 4) return [...intervals];

  const voiced = [...intervals];
  const thirdHighest = voiced[voiced.length - 3];
  voiced[voiced.length - 3] = thirdHighest - 12;
  return voiced.sort((a, b) => a - b);
};

/**
 * Creates a custom voicing by selecting specific chord tones and octaves
 */
export const applyCustomVoicing = (
  intervals: Interval[],
  pattern: Array<[number, number]>
): Interval[] => {
  return pattern.map(([noteIndex, octaveOffset]) => {
    if (noteIndex >= intervals.length) {
      throw new Error(
        `Note index ${noteIndex} out of range for chord with ${intervals.length} notes`
      );
    }
    return intervals[noteIndex] + octaveOffset * 12;
  });
};

export type ChordOptions = {
  octave?: Octave;
  inversion?: number;
  voicing?: "root" | "drop2" | "drop3";
  customPattern?: Array<[number, number]>;
};

/**
 * Generates Tone.js-ready chord notes from root note, chord quality, and optional parameters
 */
export const getChord = (
  root: Chord["root"],
  quality: Chord["quality"],
  options: ChordOptions = {}
): string[] => {
  const {
    octave = 4,
    inversion = 0,
    voicing = "root",
    customPattern,
  } = options;

  let intervals = getChordIntervals(quality);

  if (customPattern) {
    intervals = applyCustomVoicing(intervals, customPattern);
  } else {
    if (inversion > 0) {
      intervals = applyInversion(intervals, inversion);
    }

    if (voicing === "drop2") {
      intervals = applyDrop2(intervals);
    } else if (voicing === "drop3") {
      intervals = applyDrop3(intervals);
    }
  }

  const rootSemitone = getNoteIndex(root);
  return intervals.map((interval) =>
    convertIntervalToNote(rootSemitone, interval, octave)
  );
};
