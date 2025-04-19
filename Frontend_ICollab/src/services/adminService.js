import privateAxios from "./adminApiService";

// Track page view
export const trackPageView = async (page = "Analytics") => {
    return await privateAxios.post("/analytics/track-page-view", { page });
  };