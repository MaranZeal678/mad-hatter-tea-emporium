type Tracker = { track: (event: string, props?: Record<string, unknown>) => void };

declare global {
  interface Window {
    hatterAnalytics?: Tracker;
  }
}

/** Send a product-analytics event once the page has settled. */
export function track(event: string, props?: Record<string, unknown>) {
  window.hatterAnalytics?.track(event, { path: window.location.pathname, ...props });
}
