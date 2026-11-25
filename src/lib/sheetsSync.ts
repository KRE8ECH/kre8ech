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

const ENV_SHEETS_WEBHOOK_URL = (
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ?? ""
).trim();

const SYNC_TIMEOUT_MS = 6000;

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Resolves the active Google Sheets / webhook endpoint.
 * Prefers the build-time global NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL so all
 * visitors sync to the owner's sheet, falling back to admin localStorage.
 */
export function getActiveSheetsEndpoint(): {
  url: string;
  source: "env" | "local" | "none";
} {
  if (ENV_SHEETS_WEBHOOK_URL) {
    return { url: ENV_SHEETS_WEBHOOK_URL, source: "env" };
  }
  const localUrl = getWebhookUrl().trim();
  if (localUrl) {
    return { url: localUrl, source: "local" };
  }
  return { url: "", source: "none" };
}

/** Returns true when a global build-time webhook URL is baked into the bundle. */
export function isGlobalSheetsSyncConfigured(): boolean {
  return Boolean(ENV_SHEETS_WEBHOOK_URL);
}

/**
 * Posts a record to the configured Google Apps Script Web App or webhook.
 * Uses text/plain + mode: "no-cors" so browser Apps Script POSTs succeed
 * without triggering CORS preflight blocks.
 */
export async function syncToGoogleSheet(
  sheetName: SheetTarget,
  payload: object,
  overrideUrl?: string
): Promise<SheetsSyncResult> {
  if (typeof window === "undefined") {
    return { synced: false, source: "none", error: "Browser environment required" };
  }

  const trimmedOverride = overrideUrl?.trim();
  const resolved = trimmedOverride
    ? {
        url: trimmedOverride,
        source: (trimmedOverride === ENV_SHEETS_WEBHOOK_URL ? "env" : "local") as
          | "env"
          | "local"
      }
    : getActiveSheetsEndpoint();

  if (!resolved.url || !isValidHttpUrl(resolved.url)) {
    return {
      synced: false,
      source: "none",
      error: "Google Sheets endpoint URL is not configured or invalid"
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), SYNC_TIMEOUT_MS);

  try {
    await fetch(resolved.url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, sheetName }),
      mode: "no-cors",
      keepalive: true,
      signal: controller.signal
    });
    return { synced: true, source: resolved.source };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send submission to Google Sheets";
    return { synced: false, source: resolved.source, error: message };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
