"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getGaMeasurementId, trackPageView } from "@/lib/analytics";

/**
 * Tracks initial mount and SPA client-side route transitions in Google Analytics 4.
 * The base gtag.js loader sits directly in RootLayout <head> for static HTML detection.
 */
export default function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || !pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [measurementId, pathname, searchParams]);

  return null;
}
