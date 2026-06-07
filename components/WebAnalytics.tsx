"use client";

import { useEffect, useRef } from "react";
import { trackPageEvent } from "@/lib/analyticsClient";

/** Collects page views, section navigation, referrers, and UTM params */
export default function WebAnalytics() {
  const lastHash = useRef<string>("");

  useEffect(() => {
    trackPageEvent("pageview");
    lastHash.current = window.location.hash;

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash === lastHash.current) return;
      lastHash.current = hash;
      trackPageEvent(hash ? "section_view" : "pageview");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
