"use client";

import { getWebhookUrl } from "@/lib/storage";

export type SheetTarget =
  | "Student Registrations"
  | "Hackready Workshop"
  | "Contact Enquiries";

export interface SheetsSyncResult {
  synced: boolean;
  source: "env" | "local" | "none";
  error?: string;
}

const ENV_WEBHOOK_URL = (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "").trim();

/** Returns the active Google Apps Script webhook URL (global build env first, then local fallback). */
export function getActiveSheetsEndpoint(): { url: string; source: "env" | "local" | "none" } {
  if (ENV_WEBHOOK_URL) {
    return { url: ENV_WEBHOOK_URL, source: "env" };
  }
  const localUrl = getWebhookUrl().trim();
  if (localUrl) {
    return { url: localUrl, source: "local" };
  }
  return { url: "", source: "none" };
}

export function isGlobalSheetsSyncConfigured(): boolean {
  return Boolean(ENV_WEBHOOK_URL);
}

/**
 * Dispatches a registration or enquiry record to the configured Google Apps Script Web App.
 * Uses text/plain with no-cors so browser preflight requests do not block Apps Script redirects.
 */
export async function syncToGoogleSheet(
  sheetName: SheetTarget,
  payload: Record<string, unknown>,
  overrideUrl?: string
): Promise<SheetsSyncResult> {
  const endpoint = overrideUrl?.trim()
    ? { url: overrideUrl.trim(), source: "local" as const }
    : getActiveSheetsEndpoint();

  if (!endpoint.url) {
    return { synced: false, source: "none", error: "No Google Sheets endpoint configured." };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    await fetch(endpoint.url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, sheetName }),
      mode: "no-cors",
      keepalive: true,
      signal: controller.signal,
    });
    return { synced: true, source: endpoint.source };
  } catch (err) {
    return {
      synced: false,
      source: endpoint.source,
      error: err instanceof Error ? err.message : "Failed to reach Google Sheets webhook",
    };
  } finally {
    clearTimeout(timeout);
  }
}
