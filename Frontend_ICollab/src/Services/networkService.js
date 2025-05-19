import privateAxios from "./apiService";

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

export const getRequest = async () => {
    try {
        const response = await privateAxios.get("/network/getrequest");

        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}

export const sendRequest = async (recieverUsername) => {
    try {
        const response = await privateAxios.post("/network/sendrequest", {
            recieverUsername
        });

        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}

export const acceptRequest = async (senderUsername) => {
    try {
        const response = await privateAxios.post("/network/acceptrequest", {
            senderUsername
        });

        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}

export const rejectRequest = async (senderUsername) => {
    try {
        const response = await privateAxios.post("/network/rejectrequest", {
            senderUsername
        });

        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}

export const suggestedNetwork = async () => {
    try {
        const response = await privateAxios.get("/network/suggestednetwork");

        return response?.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}

export const userNetwork = async () => {
    try {
        const response = await privateAxios.get("/network/usernetwork");
        return response?.data.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
}

