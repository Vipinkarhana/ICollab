import privateAxios from "./adminApiService";

// Track page view
export const trackPageView = async (page = "Analytics") => {
  return await privateAxios.post("/analytics/track-page-view", { page });
};

export const getNotification = async (username) => {
  const response = await privateAxios.get(`/notifications/user/${username}`);
  return response.data;
};

export const markNotificationRead = async (username, messageId) => {
  const response = await privateAxios.post("/notifications/mark-read", {
    username,
    messageId,
  });
  return response.data;
};

export const deleteNotification = async (username, messageId) => {
  const response = await privateAxios.post("/notifications/delete", {
    username,
    messageId,
  });
  return response.data;
};
