import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../../../../../../../Redux/Slices/PostSlice";
import PostCard from "../Postcard/PostCard";
import SkeletonPostCard from "../Postcard/SkeletonPostCard";

function PostList() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state?.post?.feed?.posts);
  const [hasMore, setHasMore] = useState(true);
  const [apiCallCount, setApiCallCount] = useState(0);

  // Fetch initial posts on mount
  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const fetchInitialPosts = async () => {
    

    try {
      const newPosts = await dispatch(
        fetchFeed(new Date().getTime() - 1)
      ).unwrap();

      if (newPosts.length > 0) {
        // setAllPosts(newPosts);
      } else {
        setHasMore(false);
      }

      setApiCallCount((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching initial feed:", error);
    }
  };

  const fetchMorePosts = async () => {
    if (!hasMore) return; // Prevent unnecessary API calls

    const lastTimestamp = allPosts.length
      ? new Date(allPosts[allPosts.length - 1].createdAt).getTime() - 1
      : new Date().getTime() - 1;

    try {
      const newPosts = await dispatch(fetchFeed(lastTimestamp)).unwrap();

      if (newPosts.length > 0) {
        // setAllPosts((prev) => [...prev, ...newPosts]);
      } else {
        setHasMore(false);
      }

      setApiCallCount((prev) => prev + 1);
    } catch (error) {
       console.error("❌ Error fetching more posts:", error);
    }
  };

  return (
    <div className="w-full">
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchMorePosts}
      hasMore={hasMore}
      loader={<SkeletonPostCard />}
      endMessage={
        <div className="flex justify-center items-center">
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-gray-300 text-gray-800 rounded h-10 w-28 border border-gray-500"
          >
            Reload Page
          </button>
        </div>
      }
      className="h-auto overflow-y-auto scrollbar-hide   flex flex-col gap-3"
    >
      {allPosts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </InfiniteScroll>
    </div>
  );
}

export default PostList;
