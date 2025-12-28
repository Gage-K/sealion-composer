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
  | "sus4"
  | "minor7"
  | "major7"
  | "6th"
  | "9th";

export type Chord = {
  root: Note;
  quality: ChordQuality;
};
