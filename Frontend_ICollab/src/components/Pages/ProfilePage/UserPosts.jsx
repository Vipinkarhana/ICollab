import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import { useParams } from "react-router-dom";
import { fetchUserPostsData } from "../../../Redux/Slices/UserProfileSlice"

function UserPosts() {
  const dispatch = useDispatch();

  const { posts , loading, error } = useSelector((state) => state.userProfile);
  const { username } = useParams();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && username && (posts === null || posts?.length === 0)) {
      dispatch(fetchUserPostsData(username));
    }
  }, [dispatch, username, posts?.length]);

  if (loading) {
    return (
      <div className="text-center py-4 text-gray-500">
        Loading your posts...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        You haven't posted anything yet.
      </div>
    );
  }

  return (
    <>
    <div className="w-full hidden px-6 py-4 sm:flex justify-evenly gap-6 ">
     
        <div className="flex flex-col gap-3 w-[45svw] ">
          {posts
            .filter((_, index) => index % 2 === 0)
            .map((post) => (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-3 w-[45svw] ">
          {posts
            .filter((_, index) => index % 2 !== 0)
            .map((post) => (
              <div key={post.id} >
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-3 w-full sm:hidden ">
          {posts?.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
      </>
  );
}

export default UserPosts;
