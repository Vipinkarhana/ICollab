/**
 * @file AllActivity.js
 * @brief Displays all user activity in the form of posts.
 * @details Fetches and displays posts made by the logged-in user using Redux.
 *          If no posts are available, it shows a "No Posts Yet" message.
 * @author ICollab
 * @date 2025-02-20
 */

import React, {useEffect} from "react";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts } from '../../../Redux/Slices/PostSlice';

/**
 * @class AllActivity
 * @brief Component for displaying a list of the user's posts.
 * @returns {JSX.Element} A section containing all posts or a "No Posts Yet" message.
 */
function AllActivity() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.myPost);

    /**
   * @brief Fetches user posts when the component mounts.
   * @details Dispatches the `fetchMyPosts` action if there are no posts available.
   */
  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(fetchMyPosts());
    }
  }, []);

  return (
    <div className="w-auto h-auto flex flex-col justify-start items-center ">
      <div className="h-12 w-[100%] border-b border-gray-400 flex items-center px-4 text-2xl font-semibold">
        <p>All Activity</p>
      </div>
      <div className="h-auto w-[98%] flex flex-col justify-start items-center p-2 gap-1">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard key={index} text={post?.content} media={post?.media} user={post?.user} />
          ))
        ) : (
          <div className="text-gray-500 text-lg font-medium mt-4 h-[73svh]">
            No Posts Yet
          </div>
        )}
      </div>
    </div>
  );
}

export default AllActivity;
