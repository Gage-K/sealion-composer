# Sealion Composer Spec

This is a planning document for Sealion Composer.

## Overview

Sealion Composer is an Omnichord-inspired songwriting tool that enables users to play chord progressions using their computer keyboard. The user selects a root note with their left hand and a chord quality with their right hand to instantly create full chords.

## Core Features

### Keyboard Layout

**Left Hand - Root Notes (Single Octave)**

- Keys: `A`, `W`, `S`, `E`, `D`, `F`, `T`, `G`, `Y`, `H`, `U`, `J`
- Maps to chromatic scale: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
- User plays root note with left hand

**Right Hand - Chord Qualities**

- Keys: `I`, `O`, `P`, `[`, `K`, `L`, `;`, `'`
- Maps to chord types:
  - `I` - Major
  - `O` - Minor
  - `P` - Diminished
  - `[` - Augmented
  - `K` - Sus4
  - `L` - 6th
  - `;` - Minor 7th
  - `'` - Major 7th

### Audio Engine

- Polyphonic synth built on Tone.js
- Each chord plays with appropriate voicing (root, third, fifth, and extensions), but the voicing will be configurable
- Simple ADSR envlope

## Architecture

### Component Structure

```
src/
├── components/
│   ├── Keyboard/
│   │   ├── Keyboard.tsx           # Main keyboard container
│   │   ├── KeyboardKey.tsx        # Individual key component
│   │   └── KeyboardLayout.ts      # Key mapping configurations
│   ├── ChordSelector/
│   │   ├── ChordSelector.tsx      # Chord quality selector
│   │   └── ChordButton.tsx        # Individual chord button
│   ├── Controls/
│   │   ├── OctaveSelector.tsx     # Change base octave
│   │   ├── VolumeControl.tsx      # Master volume
│   │   └── InstrumentSelector.tsx # Choose synth type
│   └── Display/
│       ├── ChordDisplay.tsx       # Shows current chord name
│       └── KeyIndicator.tsx       # Visual feedback for pressed keys
├── hooks/
│   ├── useKeyboard.ts             # Keyboard event handling
│   ├── useAudioEngine.ts          # Tone.js synth management
│   └── useChordLogic.ts           # Chord calculation logic
├── utils/
│   ├── musicTheory.ts             # Chord construction logic
│   ├── audioEngine.ts             # Tone.js setup and config
│   └── keyMappings.ts             # Keyboard to note mappings
├── types/
│   └── music.types.ts             # TypeScript types
└── App.tsx
```

### Data Flow

1. **Input Layer**: `useKeyboard` hook captures keyboard events
2. **Logic Layer**: `useChordLogic` determines which chord to play based on active keys
3. **Audio Layer**: `useAudioEngine` triggers Tone.js to play the appropriate notes
4. **Display Layer**: React components update to show active state

## Implementation Phases

### Phase 1: Foundation (MVP)

- [ ] Set up keyboard event listeners
- [ ] Create key mapping system (keyboard keys → musical notes)
- [ ] Implement basic Tone.js synth
- [ ] Create simple chord calculation logic (major, minor only)
- [ ] Basic UI showing keyboard layout
- [ ] Play chords when keys are pressed

### Phase 2: Core Features

- [ ] Add all 8 chord qualities
- [ ] Implement proper chord voicings
- [ ] Add visual feedback for pressed keys
- [ ] Display current chord name
- [ ] Implement octave shifting
- [ ] Add sustain/release envelopes

### Phase 3: Enhanced Audio

- [ ] Multiple instrument options
- [ ] Volume control
- [ ] Better sound design (reverb, filters)
- [ ] Velocity sensitivity (optional)

### Phase 4: Polish

- [ ] Responsive design
- [ ] Keyboard shortcut reference
- [ ] Settings persistence (localStorage)
- [ ] Mobile touch support (optional)
- [ ] Tutorial/onboarding

## Technical Considerations

### Music Theory Implementation

**Chord Construction**:

- Major: Root, Major 3rd, Perfect 5th
- Minor: Root, Minor 3rd, Perfect 5th
- Diminished: Root, Minor 3rd, Diminished 5th
- Augmented: Root, Major 3rd, Augmented 5th
- Sus4: Root, Perfect 4th, Perfect 5th
- Major 6th: Root, Major 3rd, Perfect 5th, Major 6th
- Minor 7th: Root, Minor 3rd, Perfect 5th, Minor 7th
- Major 7th: Root, Major 3rd, Perfect 5th, Major 7th
