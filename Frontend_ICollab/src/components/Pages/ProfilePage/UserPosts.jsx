import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "../../../Redux/Slices/PostSlice";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";

function UserPosts() {
  const dispatch = useDispatch();

  const { myPost, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

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

  if (!myPost.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        You haven't posted anything yet.
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-4 flex justify-evenly gap-6 ">
     
        <div className="flex flex-col gap-3 w-[45svw] ">
          {myPost
            .filter((_, index) => index % 2 === 0)
            .map((post) => (
              <div key={post._id}>
                <PostCard post={post} />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-3 w-[45svw] ">
          {myPost
            .filter((_, index) => index % 2 !== 0)
            .map((post) => (
              <div key={post._id} >
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </div>
  );
}

export default UserPosts;
