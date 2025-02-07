import privateAxios from "./apiService";
import axios from "axios";

export const addPost = async (postData) => {
    try {
        console.log("Post Service:", postData);
        console.log("Post Service:", postData.mediaFiles);
        // Step 1: Send post data to create a new post
        const response = await privateAxios.post("/posts", {
            content: postData.content,
            media: postData.mediaFiles.map(({ file, type }) => ({
                fileType: file.type,  // Extracting type from file
                fileName: file.name,  // Extracting name from file
            })),
        });

        const { presignedUrls, post } = response.data.data;
        console.log("Post Service:", presignedUrls);

        // Step 2: Upload files to S3/R2 using presigned URLs
        const uploadPromises = postData.mediaFiles.map((fileObj, index) => {
            const fileBlob = new Blob([fileObj.file], { type: fileObj.file.type });
            return axios.put(presignedUrls[index], fileBlob, {
              headers: { "Content-Type": fileObj.file.type || "application/octet-stream" },
            });
          });

        await Promise.all(uploadPromises);

        return {
            message: "Post created successfully",
            data: post,
        };
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
};