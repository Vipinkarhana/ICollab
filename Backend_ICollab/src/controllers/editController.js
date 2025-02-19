const {addPostMedia} = require('./postController');
const { deleteFromR2 } = require('./deleteFromS3'); // Function to delete files from R2

const editPost = async (req, res, next) => {
    try {
      const { postid, newcontent, userId } = req.body;
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const postObjectId = new mongoose.Types.ObjectId(postid);
      const post = await postModel.findOne({ _id: postObjectId, user: userObjectId });
  
      if (!post) return next(new ApiError(404, 'Post not found or unauthorized'));
      if (newcontent) post.content = newcontent;

      
      if(req.body.data){
  
      // Ensure req.body.data exists and is in correct format
      if (!req.body.data) {
          return res.status(400).json({ message: "Missing 'data' array in request body" });
      }
          const stringsArray = [];
          const media = [];
      try {
          const combinedArray = JSON.parse(req.body.data); // Parse JSON data
  
          combinedArray.forEach(item => {
              if (typeof item === "string") {
                  stringsArray.push(item); // Add to string array
              } else if (typeof item === "object" && item.FileName && item.FileType) {
                  media.push(item); // Add file metadata to files array
              }
          });
  
  
           // Find media to be deleted
           const existingMedia = post.media || [];
           const mediaToDelete = existingMedia.filter((mediaUrl) => !urlsArray.includes(mediaUrl));
   
           // Delete old media from R2
           await Promise.all(mediaToDelete.map((url) => deleteFromR2(url)));
          
  
      } catch (error) {
          return res.error(error);
      }


      if(media.length>0)
        addPostMedia({body: {postid, media}}, res,next);
        }
  
      await post.save();
      await post.populate('user', 'username name profile_pic designation');
  
      res.status(200).json({
        message: 'Post updated successfully',
        data: presignedUrls,
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  


  
  const deletePost = async (req, res, next) => {
    try {
      const { postid } = req.params;
      const userId = req.user._id;
  
      const post = await postModel.findOne({ _id: postid, user: userId });
  
      if (!post) return next(new ApiError(404, 'Post not found or unauthorized'));
  
      // Delete media from Cloudflare R2
      if (post.media.length > 0) {
        await Promise.all(post.media.map((url) => deleteFromR2(url)));
      }
  
      // Remove post from user's posts array
      await userModel.updateOne({ _id: userId }, { $pull: { posts: postid } });
  
      // Delete post from database
      await postModel.deleteOne({ _id: postid });
  
      res.status(200).json({
        message: 'Post deleted successfully',
        status: 'success',
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    editPost,
    deletePost,
  };