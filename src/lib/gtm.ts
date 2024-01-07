export const pageview = (url: any) => {
  if (typeof window !== "undefined") {
    (window as any)?.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined") {
    (window as any)?.window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
