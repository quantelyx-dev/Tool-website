import { NextResponse } from 'next/server';

import { getSpeechJob } from '@/lib/server/start-the-vision';
import { TTS_TASK_ID_PATTERN } from '@/lib/text-to-speech/config';

export const runtime = 'nodejs';

/** Upstream headers worth forwarding so the browser can seek within the audio. */
const FORWARDED_HEADERS = ['content-length', 'content-range', 'accept-ranges'] as const;

/**
 * Streams the finished MP3 from our own origin. The provider's storage sends no CORS
 * headers, so the browser could neither fetch nor save it directly, and proxying keeps
 * the provider URL off the client.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const { taskId } = await params;
  if (!TTS_TASK_ID_PATTERN.test(taskId)) {
    return NextResponse.json(
      { ok: false as const, error: 'Invalid task id' },
      { status: 400 },
    );
  }

  const job = await getSpeechJob(taskId);
  if (!job.ok) {
    const notFound = job.reason === 'rejected';
    return NextResponse.json(
      {
        ok: false as const,
        error: notFound ? 'Audio not found.' : 'Could not load the audio. Please try again.',
      },
      { status: notFound ? 404 : 502 },
    );
  }
  if (job.status !== 'completed') {
    return NextResponse.json(
      { ok: false as const, error: 'Audio is not ready yet.' },
      { status: 404 },
    );
  }

  const range = request.headers.get('range');
  let upstream: Response;
  try {
    upstream = await fetch(job.audioUrl, {
      headers: range ? { Range: range } : undefined,
      redirect: 'error',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    console.error('[api/text-to-speech] audio fetch error', error);
    return NextResponse.json(
      { ok: false as const, error: 'Could not load the audio. Please try again.' },
      { status: 502 },
    );
  }

  const contentType = upstream.headers.get('content-type') ?? '';
  if (!upstream.ok || !upstream.body || !contentType.startsWith('audio/')) {
    return NextResponse.json(
      { ok: false as const, error: 'Could not load the audio. Please try again.' },
      { status: 502 },
    );
  }

  const headers = new Headers({
    'Content-Type': 'audio/mpeg',
    // No filename here: it would override the client's `download` attribute and its script-based name.
    'Content-Disposition': 'inline',
    'Cache-Control': 'private, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
  });
  for (const name of FORWARDED_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }

  return new Response(upstream.body, { status: upstream.status, headers });
}
