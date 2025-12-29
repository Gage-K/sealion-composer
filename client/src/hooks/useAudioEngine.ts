import { useCallback, useEffect, useRef } from "react";
import { AudioEngine, type EnvelopeSettings } from "../lib/AudioEngine";

export const useAudioEngine = () => {
  const audioEngineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    if (!audioEngineRef.current) {
      audioEngineRef.current = new AudioEngine();
    }

    // Cleanup: release all notes on unmount
    return () => {
      audioEngineRef.current?.releaseAll();
    };
  }, []);

  const attackNotes = useCallback(async (notes: string[]) => {
    if (!audioEngineRef.current) return;
    await audioEngineRef.current.startAudioContext();
    audioEngineRef.current.attackNotes(notes);
  }, []);

  const releaseNotes = useCallback((notes: string[]) => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.releaseNotes(notes);
  }, []);

  const releaseAll = useCallback(() => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.releaseAll();
  }, []);

  const setEnvelope = useCallback((envelope: Partial<EnvelopeSettings>) => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.setEnvelope(envelope);
  }, []);

  const setVelocity = useCallback((velocity: number) => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.setVelocity(velocity);
  }, []);

  const setVolume = useCallback((db: number) => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.setVolume(db);
  }, []);

  return {
    attackNotes,
    releaseNotes,
    releaseAll,
    setEnvelope,
    setVelocity,
    setVolume,
  };
};
