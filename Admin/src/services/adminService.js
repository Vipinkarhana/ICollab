import privateAxios from "./apiService";

// Fetch analytics data
export const fetchAnalytics = async () => {
  const res = await privateAxios.get("/analytics");
  return res.data;
};

// Track page view
export const trackPageView = async (page = "Analytics") => {
  return await privateAxios.post("/analytics/track-page-view", { page });
};


export const getAllUsers = async () => {
  const res = await privateAxios.get("/user");
  return res.data.data;
};

export const getTopUsers = async () => {
  const res = await privateAxios.get("user/top-users");
  return res.data;
};

export const getTopPosts = async () => {
  const res = await privateAxios.get("/post");
  return res.data.data;
};
  
export const fetchUserPosts = async (username) => {
    const response = await privateAxios.get(`/posts/myallpost?username=${username}`);
    return response.data.data;
  };
