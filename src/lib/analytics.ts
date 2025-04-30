export const Analytics = {
    trackPageView: (pageName: string) => {
      console.log(`Analytics: Page view - ${pageName}`);
    },
    trackEvent: (eventName: string, properties?: Record<string, any>) => {
      console.log(`Analytics: Event - ${eventName}`, properties);
    }
  };