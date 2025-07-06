import privateAxios from "../Services/adminApiService"; // Axios instance with auth headers

export const fetchMessagesByGroup = async (groupId) => {
  try {
    const res = await privateAxios.get(`/messages/group/${groupId}`);
    return res.data; // returns array of messages
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
