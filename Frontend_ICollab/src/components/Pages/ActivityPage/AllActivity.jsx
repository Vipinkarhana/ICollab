import React, {useEffect} from "react";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts } from '../../../Redux/Slices/PostSlice';

function AllActivity() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.myPost);

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
