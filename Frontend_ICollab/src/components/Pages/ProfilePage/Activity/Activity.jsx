import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Pencil, MoveRight} from "lucide-react";
import PostCard from "../../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import StartPostModal from "../../../Common/StartPostModal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts } from '../../../../Redux/Slices/PostSlice';
function Activity({posts,iscurrentUser}) {
  const dispatch = useDispatch();
  
  const [isOpen, SetIsOpen] = useState(false);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(fetchMyPosts());
    }
  }, []);

  return (
    <div className="w-[100%] h-auto bg-white rounded-md flex flex-col justify-around items-center gap-2 text-gray-800 border border-gray-300">
      <div className="h-12 w-[100%] flex justify-between items-center py-2 px-4 border-b border-gray-300">
        <div className="text-2xl font-semibold  ">
          <p>Activity</p>
        </div>
        <div className="w-[18%]   flex   justify-center items-center gap-1">
          {iscurrentUser && (
            <button
              onClick={() => {
                SetIsOpen(true);
              }}
              className="rounded-full hover:bg-slate-100 p-2"
            >
              <Pencil size={24} />
            </button>
          )}
          {isOpen && <StartPostModal SetIsOpen={SetIsOpen} isOpen={isOpen} />}
        </div>
      </div>
      <div className="h-auto w-[80%] flex">
        {posts.length > 0 ? (
          <PostCard key={posts[0].id} post={posts[0]} />
        ) : (
          <div className="text-gray-500 text-lg font-medium my-4 text-center">
            No Posts Yet
          </div>
        )}
      </div>
      <Link
        to={`/Activity/${posts[0]?.user?.username}`}
        className="flex gap-2 text-xl text-gray-900 border-t border-gray-300 w-[100%] justify-center items-center h-auto py-2"
      >
        <p>Show More Posts</p>
        <MoveRight />
      </Link>
    </div>
  );
}

export default Activity
