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

        const { presignedUrls, postid } = response.data.data;
        console.log("Post Service:", presignedUrls);

        // Step 2: Upload files to S3/R2 using presigned URLs
        const uploadPromises = postData.mediaFiles.map((fileObj, index) => {
            const fileBlob = new Blob([fileObj.file], { type: fileObj.file.type });
            return axios.put(presignedUrls[index], fileBlob, {
              headers: { "Content-Type": fileObj.file.type || "application/octet-stream" },
            });
          });

        await Promise.all(uploadPromises);

        // Step 3: Send post ID and media URLs to add media to the post
        const post = await privateAxios.post("/posts/addmedia", {
            postid,
            media: presignedUrls,
        });

        return post.data;
    } catch (error) {
        return error.response?.data || { error: "Post creation failed" };
    }
};

export const getFeed = async (timestamp) => {
    try {
        const response = await privateAxios.get("/posts/feed", {
            params: { timestamp },
        });
        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Failed to fetch feed" };
    }
}
