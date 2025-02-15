import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Pencil, MoveRight, User } from "lucide-react";
import PostCard from "../../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import StartPostModal from "../../HomePage/MidDiv/Feed/Posts/StartPost/StartPostModal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts } from '../../../../Redux/Slices/PostSlice';
function Activity() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.myPost);
  const [isOpen, SetIsOpen] = useState(false);
  console.log(isOpen);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(fetchMyPosts());
    }
  }, []);

  return (
    <div className="w-[100%] h-auto bg-gray-200 rounded-md flex flex-col justify-around items-center gap-2 text-gray-800 border border-gray-400">
      <div className="h-12 w-[100%] flex justify-between items-center py-2 px-4 border-b border-gray-400">
        <div className="text-2xl font-semibold  ">
          <p>Activity</p>
        </div>
        <div className="w-[18%]   flex   justify-center items-center gap-1">
          <button
            onClick={() => {
              SetIsOpen(true);
            }}
            className=" px-2 border-2 border-gray-500 rounded-2xl hover:bg-slate-300"
          >
            Create a post
          </button>
          {isOpen && <StartPostModal SetIsOpen={SetIsOpen} isOpen={isOpen} />}
        </div>
      </div>
      <div className="h-auto w-[80%] flex">
        {posts.length > 0 ? (
          <PostCard text={posts[0]?.content} media={posts[0]?.media} user={posts[0]?.user} />
        ) : (
          <div className="text-gray-500 text-lg font-medium my-4">
            No Posts Yet
          </div>
        )}
      </div>
      <Link to="/Activity" className="flex gap-2 text-xl text-gray-900 border-t border-gray-400 w-[100%] justify-center items-center h-auto py-2">
        <p>Show More Posts</p>
        <MoveRight />
      </Link>
    </div>
  );
}

export default Activity
