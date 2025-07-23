import { useCallback } from "react";

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // In production, this would integrate with Google Analytics, Plausible, etc.
    console.log("Analytics Event:", event);
    
    // Example GA4 implementation:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', event.action, {
    //     event_category: event.category,
    //     event_label: event.label,
    //     value: event.value,
    //   });
    // }
  }, []);

  const trackPageView = useCallback((page: string) => {
    console.log("Page View:", page);
    
    // Example GA4 implementation:
    // if (typeof gtag !== 'undefined') {
    //   gtag('config', 'GA_MEASUREMENT_ID', {
    //     page_title: document.title,
    //     page_location: window.location.href,
    //   });
    // }
  }, []);

  return {
    trackEvent,
    trackPageView,
  };
}
