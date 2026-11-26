"use client";

import { useCallback, useState } from "react";

import type {
  GenerateRandomEmailsErrorBody,
  GenerateRandomEmailsSuccessBody,
} from "@/lib/generate-random-emails/api-response";

function errorMessage(body: unknown, fallback: string): string {
  const message = (body as Partial<GenerateRandomEmailsErrorBody> | null)?.error;
  return typeof message === "string" ? message : fallback;
}

/** Calls GET /api/generate-random-emails and tracks the request state. */
export function useRandomEmails() {
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const clearEmails = useCallback(() => {
    setEmails([]);
    setError(null);
    setLoading(false);
  }, []);

  /** Resolves to the new addresses, or null when the request fails. */
  const fetchEmails = useCallback(async (limit: number) => {
    setError(null);
    setLoading(true);
    setEmails([]);

    try {
      const res = await fetch(
        `/api/generate-random-emails?limit=${encodeURIComponent(String(limit))}`,
        { method: "GET", cache: "no-store" },
      );
      const body: unknown = await res.json().catch(() => null);

      if (!res.ok || !body || typeof body !== "object") {
        setError(errorMessage(body, `Request failed (${res.status}).`));
        return null;
      }

      const data = body as GenerateRandomEmailsSuccessBody;
      if (data.ok !== true || !Array.isArray(data.emails)) {
        setError(errorMessage(body, "Unexpected response from the server."));
        return null;
      }

      setEmails(data.emails);
      return data.emails;
    } catch {
      setError("Something went wrong. Check your connection and try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { emails, error, loading, fetchEmails, clearEmails };
}
