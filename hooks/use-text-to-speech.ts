'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ApiError } from '@/lib/http';
import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';
import {
  fetchTextToSpeechStatus,
  submitTextToSpeech,
  type TextToSpeechFailureBody,
} from '@/lib/text-to-speech/api';

const POLL_INTERVAL_MS = 2_000;
const POLL_TIMEOUT_MS = 120_000;
const MAX_CONSECUTIVE_POLL_ERRORS = 3;

export type TextToSpeechState =
  | { phase: 'idle' }
  | { phase: 'submitting' }
  | { phase: 'processing'; taskId: string }
  | { phase: 'ready'; taskId: string }
  | { phase: 'error'; message: string };

export type TextToSpeechOutcome =
  | { ok: true; taskId: string }
  | { ok: false; message: string };

const GENERIC_ERROR = 'Something went wrong while creating your audio. Please try again.';

function isAbort(error: unknown): boolean {
  return (
    (error instanceof DOMException || error instanceof Error) &&
    error.name === 'AbortError'
  );
}

function messageFor(error: unknown): string {
  if (error instanceof ApiError) {
    const body = error.body as TextToSpeechFailureBody | null;
    return body?.error ?? GENERIC_ERROR;
  }
  return GENERIC_ERROR;
}

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

/**
 * Submits a speech job and polls it until the audio is ready. Aborts any in-flight
 * request on reset, on a new generation, and on unmount.
 */
export function useTextToSpeech() {
  const [state, setState] = useState<TextToSpeechState>({ phase: 'idle' });
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({ phase: 'idle' });
  }, []);

  const generate = useCallback(
    async (values: TextToSpeechFormValues): Promise<TextToSpeechOutcome | null> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const { signal } = controller;

      const fail = (message: string): TextToSpeechOutcome => {
        setState({ phase: 'error', message });
        return { ok: false, message };
      };

      setState({ phase: 'submitting' });

      try {
        const { taskId } = await submitTextToSpeech(values, { signal });
        setState({ phase: 'processing', taskId });

        const deadline = Date.now() + POLL_TIMEOUT_MS;
        let consecutiveErrors = 0;

        while (Date.now() < deadline) {
          await wait(POLL_INTERVAL_MS, signal);

          try {
            const { status } = await fetchTextToSpeechStatus(taskId, { signal });
            consecutiveErrors = 0;

            if (status === 'completed') {
              setState({ phase: 'ready', taskId });
              return { ok: true, taskId };
            }
            if (status === 'failed') {
              return fail('The speech service could not create this audio. Please try again.');
            }
          } catch (error) {
            if (isAbort(error)) throw error;
            consecutiveErrors += 1;
            if (consecutiveErrors >= MAX_CONSECUTIVE_POLL_ERRORS) {
              return fail(messageFor(error));
            }
          }
        }

        return fail('Creating the audio is taking longer than expected. Please try again.');
      } catch (error) {
        if (isAbort(error)) return null;
        return fail(messageFor(error));
      }
    },
    [],
  );

  return { state, generate, reset };
}
