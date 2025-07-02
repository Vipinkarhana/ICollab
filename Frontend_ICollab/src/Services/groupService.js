// services/groupService.js
import privateAxios from "./adminApiService"; // Your authenticated Axios instance

export const createGroup = async ({ name, members, roomId }) => {
  try {
    const response = await privateAxios.post("/groups/create", {
      name,
      members,
      roomId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating group" };
  }
};