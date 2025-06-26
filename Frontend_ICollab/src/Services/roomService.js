import privateAxios from "./adminApiService";

export const getMyRooms = async () => {
  console.log("Hit 1")
  const response = await privateAxios.get("/room/myrooms");
    console.log("Hit 2")
  console.log("Rooms fetched successfully:", response.data.data);
  return response.data.data;

};