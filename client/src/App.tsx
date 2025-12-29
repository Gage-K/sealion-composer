import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useAudioEngine } from "./hooks/useAudioEngine";
import { useKeyboard } from "./hooks/useKeyboard";
import { useChord } from "./hooks/useChord";
import type { EnvelopeSettings } from "./lib/AudioEngine";

function App() {
  const { pressedKeys } = useKeyboard();
  const { currentChord } = useChord(pressedKeys);
  const { attackNotes, releaseNotes, setEnvelope } = useAudioEngine();

  const [envelopeSettings, setEnvelopeSettings] = useState<EnvelopeSettings>({
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
  });

  const updateEnvelope = (partial: Partial<EnvelopeSettings>) => {
    const newSettings = { ...envelopeSettings, ...partial };
    setEnvelopeSettings(newSettings);
    setEnvelope(newSettings);
  };

  const prevChordRef = useRef<typeof currentChord>(null);

  useEffect(() => {
    const prevChord = prevChordRef.current;

    const notesEqual = (notes1: string[], notes2: string[]) => {
      return (
        notes1.length === notes2.length &&
        notes1.every((note, i) => note === notes2[i])
      );
    };

    if (currentChord) {
      if (prevChord) {
        if (!notesEqual(prevChord.notes, currentChord.notes)) {
          releaseNotes(prevChord.notes);
          attackNotes(currentChord.notes);
        }
      } else {
        attackNotes(currentChord.notes);
      }
      prevChordRef.current = currentChord;
    } else if (prevChord) {
      releaseNotes(prevChord.notes);
      prevChordRef.current = null;
    }
  }, [currentChord, attackNotes, releaseNotes]);

  return (
    <>
      <div>
        <h1>Sealion Composer</h1>
        <div style={{ marginBottom: "20px" }}>
          <h2>Envelope Controls</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "400px",
            }}>
            <div>
              <label>
                Attack: {envelopeSettings.attack.toFixed(3)}s
                <input
                  type="range"
                  min="0.001"
                  max="2"
                  step="0.001"
                  value={envelopeSettings.attack}
                  onChange={(e) =>
                    updateEnvelope({ attack: parseFloat(e.target.value) })
                  }
                  style={{ width: "100%" }}
                />
              </label>
            </div>
            <div>
              <label>
                Decay: {envelopeSettings.decay.toFixed(3)}s
                <input
                  type="range"
                  min="0.001"
                  max="2"
                  step="0.001"
                  value={envelopeSettings.decay}
                  onChange={(e) =>
                    updateEnvelope({ decay: parseFloat(e.target.value) })
                  }
                  style={{ width: "100%" }}
                />
              </label>
            </div>
            <div>
              <label>
                Sustain: {envelopeSettings.sustain.toFixed(3)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={envelopeSettings.sustain}
                  onChange={(e) =>
                    updateEnvelope({ sustain: parseFloat(e.target.value) })
                  }
                  style={{ width: "100%" }}
                />
              </label>
            </div>
            <div>
              <label>
                Release: {envelopeSettings.release.toFixed(3)}s
                <input
                  type="range"
                  min="0.001"
                  max="5"
                  step="0.001"
                  value={envelopeSettings.release}
                  onChange={(e) =>
                    updateEnvelope({ release: parseFloat(e.target.value) })
                  }
                  style={{ width: "100%" }}
                />
              </label>
            </div>
            <button
              onClick={() =>
                updateEnvelope({
                  attack: 0.01,
                  decay: 0.1,
                  sustain: 0.5,
                  release: 0.1,
                })
              }
              style={{ marginTop: "10px" }}>
              Reset to Default
            </button>
          </div>
        </div>
        <p>
          Left hand: A,W,S,E,D,F,T,G,Y,H,U,J (root notes)
          <br />
          Right hand: I,O,P,[,K,L,;,' (chord qualities)
        </p>
        {currentChord && (
          <div>
            <p>
              Playing: {currentChord.root} {currentChord.quality}
            </p>
            <p>Notes: {currentChord.notes.join(", ")}</p>
          </div>
        )}
        <p>Pressed keys: {Array.from(pressedKeys).join(", ")}</p>
      </div>
    </>
  );
}

export default App;
