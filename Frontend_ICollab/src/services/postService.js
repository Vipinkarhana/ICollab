import privateAxios from "./apiService";

export const addPost = async (postData) => {
    try {
        const response = await privateAxios.post("/posts", postData);
        return response.data;
    } catch (error) {
        return error.response?.data || "Post creation failed";
    }
};