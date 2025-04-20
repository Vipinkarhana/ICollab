import privateAxios from "./apiService";

export const addPost = async (postData) => {
    try {
        // Step 1: Send post data to create a new post
        const response = await privateAxios.post("/posts", {
            content: postData.content,
            media: postData.mediaFiles.map(({ file, type }) => ({
                fileType: file.type,  // Extracting type from file
                fileName: file.name,  // Extracting name from file
            })),
        });

        const { presignedUrls, postid } = response.data.data;

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

export const editPost = async (postData) => {
    try {
        const existingMedia = postData.mediaFiles.filter(item => typeof item === "string");
        const newMediaFiles = postData.mediaFiles.filter(item => typeof item === "object");

        const response = await privateAxios.post("/posts/editpost", {
            postid: postData.id,
            newcontent: postData.content,
            existingMedia: existingMedia,
            newMedia: newMediaFiles.map(({ file, type }) => ({
                fileType: file.type,
                fileName: file.name,
            }))
        });

        const { presignedUrls, postid } = response.data.data;

        const uploadPromises = newMediaFiles.map((fileObj, index) => {
            const fileBlob = new Blob([fileObj.file], { type: fileObj.file.type });
            return axios.put(presignedUrls[index], fileBlob, {
                headers: { "Content-Type": fileObj.file.type || "application/octet-stream" },
            });
        });

        await Promise.all(uploadPromises);

        const allMediaUrls = [...presignedUrls];

        const post = await privateAxios.post("/posts/addmedia", {
            postid,
            media: allMediaUrls,
        });

        return post.data;
    } catch (error) {
        return error.response?.data || { error: "Post updation failed" };
    }
};

export const deletePost = async (postid) => {
    try {
        const response = await privateAxios.post("/posts/deletepost", {
            postid
        });
        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Failed to fetch feed" };
    }
}

export const getMyPost = async () => {
    try {
        const response = await privateAxios.get("/posts/mypost");
        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Failed to fetch feed" };
    }
}

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

export const toggleSavePost = async (postid) => {
  const response = await privateAxios.post("/posts/savepost",{postid});
  return response.data; // should return something like { status: "saved" } or { status: "unsaved" }
};


export const getSavedPosts = async () => {
  try {
    const response = await privateAxios.get("/posts/savedposts");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    throw error;
  }
};


export const likeAndUnlikePost = async (postId) => {
    try {
        console.log("Reached postService");
      const response = await privateAxios.post("posts/likeandunlikepost", {}, {
        params: { postId }
      });
      console.log("Successfully hitted the route");
      return response.data;
    } catch (error) {
      return error.response?.data || { error: "Failed to toggle like" };
    }
  };
