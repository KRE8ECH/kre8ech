/**
 * Built-in Google Analytics 4 Measurement ID for live traffic & conversion tracking.
 * Can be overridden at build time via NEXT_PUBLIC_GA_MEASUREMENT_ID.
 */
export const DEFAULT_GA_MEASUREMENT_ID = "G-N53SKC691X";

const RAW_GA_ID = (
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  DEFAULT_GA_MEASUREMENT_ID
).trim();

const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/i.test(RAW_GA_ID) ? RAW_GA_ID : "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag(): ((...args: unknown[]) => void) | null {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
  return window.gtag;
}

/** Returns the validated GA4 Measurement ID, or empty string if unconfigured. */
export function getGaMeasurementId(): string {
  return GA_MEASUREMENT_ID;
}

/** Returns true when a valid GA4 Measurement ID is configured. */
export function isGaConfigured(): boolean {
  return Boolean(GA_MEASUREMENT_ID);
}

/** Records an initial or SPA route page_view event in Google Analytics 4. */
export function trackPageView(url: string): void {
  const gtag = ensureGtag();
  if (!gtag) return;
  gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title
  });
}

/** Records a custom conversion or engagement event in Google Analytics 4. */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  const gtag = ensureGtag();
  if (!gtag) return;
  gtag("event", eventName, params);
}
