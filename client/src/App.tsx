import { useEffect, useRef } from "react";
import "./App.css";
import { AudioEngine } from "./lib/AudioEngine";

function App() {
  const audioEngineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    // Create audio engine instance once
    if (!audioEngineRef.current) {
      audioEngineRef.current = new AudioEngine();
    }

    const handleKeyPress = async () => {
      if (!audioEngineRef.current) return;
      await audioEngineRef.current.startAudioContext();

      audioEngineRef.current.playNote("C4");
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div>
        <h1>Sealion Composer</h1>
        <p>Press any key to test audio (plays C4)</p>
      </div>
    </>
  );
}

export default App;
