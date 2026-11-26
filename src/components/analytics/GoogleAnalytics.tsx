"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { getGaMeasurementId, trackPageView } from "@/lib/analytics";

/**
 * Loads Google Analytics 4 (gtag.js) when a Measurement ID is configured
 * and tracks initial + SPA client-side route transitions without double-counting.
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

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
