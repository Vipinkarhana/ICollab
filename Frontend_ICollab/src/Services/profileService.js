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