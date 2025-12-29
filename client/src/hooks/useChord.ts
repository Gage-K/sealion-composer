import { useMemo } from "react";
import type { Chord } from "../types/chord.types";
import { getChord } from "../utils/chord.utils";

// Map keyboard keys to root notes
const ROOT_NOTE_MAP: Record<string, Chord["root"]> = {
  a: "C",
  w: "C#",
  s: "D",
  e: "D#",
  d: "E",
  f: "F",
  t: "F#",
  g: "G",
  y: "G#",
  h: "A",
  u: "A#",
  j: "B",
};

// Map keyboard keys to chord qualities
const CHORD_QUALITY_MAP: Record<string, Chord["quality"]> = {
  i: "major",
  o: "minor",
  p: "diminished",
  "[": "augmented",
  k: "major7",
  l: "minor7",
  ";": "sus4",
  "'": "6th",
};

export const useChord = (pressedKeys: Set<string>) => {
  const currentChord = useMemo((): {
    notes: string[];
    root: Chord["root"];
    quality: Chord["quality"];
  } | null => {
    const rootKey = Array.from(pressedKeys).find((key) => key in ROOT_NOTE_MAP);

    const qualityKey = Array.from(pressedKeys).find(
      (key) => key in CHORD_QUALITY_MAP
    );

    if (!rootKey || !qualityKey) {
      return null;
    }

    const root = ROOT_NOTE_MAP[rootKey];
    const quality = CHORD_QUALITY_MAP[qualityKey];

    return {
      notes: getChord(root, quality),
      root,
      quality,
    };
  }, [pressedKeys]);

  return {
    currentChord,
  };
};
