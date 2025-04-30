import privateAxios from "./apiService";

export const updateProfile = async (formData) => {
    try {
        const response = await privateAxios.post("/profile/updateprofile", formData);

        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}


export const updateInfo = async ({name,designation,profile}) => {
    try {
        const response = await privateAxios.post("/profile/changeuserinfo", {
            name, designation
        });

        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}

export const updateAbout = async (about) => {
    try {
        const response = await privateAxios.post("/profile/changeabout", {
            about
        });

        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
};

export const getUserProfile = async (username) => {
    try {
      const response = await privateAxios.get(`/profile/${username}`);
      console.log("API response in service:", response.data);
      // Backend responds with: { message, status, data: user }
      return response.data.data; // This is the full user object with populated profile and projects
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  };