import privateAxios from "./adminApiService";

// Track page view
export const trackPageView = async (page = "Analytics") => {
  return await privateAxios.post("/analytics/track-page-view", { page });
};

export const getNotification = async (username) => {
  const response = await privateAxios.get(`/notifications/user/${username}`);
  return response.data;
};

export const subscribeToNotifications = (username, onMessage, onError) => {
  if (!username) return null;

  const eventSource = new EventSource(
    `${
      import.meta.env.VITE_BACKEND_DOMAIN
    }/sse/notifications/stream/${username}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  eventSource.onerror = (err) => {
    console.error("SSE Error:", err);
    if (onError) onError(err);
    eventSource.close();
  };

  return eventSource;
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
