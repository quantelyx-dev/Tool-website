import { NextResponse } from 'next/server';

import { getSpeechJob } from '@/lib/server/start-the-vision';
import { TTS_TASK_ID_PATTERN } from '@/lib/text-to-speech/config';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
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
        error: notFound
          ? 'Speech job not found.'
          : 'Could not check the speech job. Please try again.',
      },
      { status: notFound ? 404 : 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json(
    { ok: true as const, status: job.status },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
