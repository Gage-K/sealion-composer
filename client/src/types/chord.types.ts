type Note =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

type ChordQuality =
  | "major"
  | "minor"
  | "diminished"
  | "augmented"
  | "sus4"
  | "6th"
  | "minor7"
  | "major7";

export type Chord = {
  root: Note;
  quality: ChordQuality;
};

export type Semitone = number;

export type Interval = number;

export type Octave = number;
