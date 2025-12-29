import { useEffect, useState } from "react";

export const useKeyboard = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (shouldHandleKey(e.key)) {
        e.preventDefault();

        const key = e.key.toLowerCase();
        setPressedKeys((prev) => {
          if (prev.has(key)) {
            return prev;
          }
          return new Set(prev).add(key);
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (shouldHandleKey(e.key)) {
        e.preventDefault();
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(e.key.toLowerCase());
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return {
    pressedKeys,
  };
};

function shouldHandleKey(key: string): boolean {
  const validKeys = new Set([
    "a",
    "w",
    "s",
    "e",
    "d",
    "f",
    "t",
    "g",
    "y",
    "h",
    "u",
    "j",
    // Chord qualities (right hand)
    "i",
    "o",
    "p",
    "[",
    "k",
    "l",
    ";",
    "'",
  ]);
  return validKeys.has(key.toLowerCase());
}
