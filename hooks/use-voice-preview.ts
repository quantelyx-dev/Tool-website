'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Plays one voice preview at a time. The audio element is created on the first
 * play so no preview file is downloaded until the visitor asks for it.
 */
export function useVoicePreview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setPlayingId(null);
  }, []);

  const toggle = useCallback(
    (id: string, url: string) => {
      if (playingId === id) {
        stop();
        return;
      }

      audioRef.current?.pause();
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.addEventListener('ended', () => setPlayingId(current => (current === id ? null : current)));
      audio.addEventListener('error', () => setPlayingId(current => (current === id ? null : current)));
      setPlayingId(id);
      audio.play().catch(() => setPlayingId(null));
    },
    [playingId, stop],
  );

  return { playingId, toggle, stop };
}
