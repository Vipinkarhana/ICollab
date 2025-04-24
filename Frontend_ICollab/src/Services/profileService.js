import privateAxios from "./apiService";
import axios from "axios";

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