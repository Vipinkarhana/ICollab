import React, { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "../Postcard/PostCard";
import SkeletonPostCard from "../Postcard/SkeletonPostCard";
import test from "../../../../../../../assets/ProfilePic.png";
import test1 from "../../../../../../../assets/test.png";
import test2 from "../../../../../../../assets/test2.png";
import testvedio from"../../../../../../../assets/TestVedio.mp4"

function PostList() {
  const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum 
  
dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat... ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit.

Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit.

Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id

fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...`;
  const media1 = [test, test1, test2];
  const media2 = testvedio;

  // Generate initial 20 posts
  const generatePosts = (startId, count) =>
    Array.from({ length: count }, (_, i) => ({
      id: startId + i,
      text,
      media: i % 2 === 0 ? media1 : media2,
    }));

  const [allPosts, setAllPosts] = useState(generatePosts(1, 20)); // Store all posts
  const [visiblePosts, setVisiblePosts] = useState([]); // Posts currently rendered
  const [loading, setLoading] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const observer = useRef(null);
  const loadedCount = useRef(0); // Track loaded posts

  // Load first 5 posts initially
  useEffect(() => {
    setVisiblePosts(allPosts.slice(0, 5));
    loadedCount.current = 5;
  }, [allPosts]);

  // Function to load next 5 posts
  const fetchMorePosts = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const nextBatch = allPosts.slice(
        loadedCount.current,
        loadedCount.current + 5
      );
      setVisiblePosts((prev) => [...prev, ...nextBatch]);
      loadedCount.current += 5;
      setLoading(false);

      // If we've loaded all 20 posts, show the "See More" button
      if (loadedCount.current >= allPosts.length) {
        setShowSeeMore(true);
      }
    }, 1000);
  }, [loading, allPosts]);

  // Observer callback for infinite scrolling
  const lastPostRef = useCallback(
    (node) => {
      if (loading || showSeeMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, fetchMorePosts, showSeeMore]
  );

  // Load 20 more posts when "See More Posts" is clicked
  const handleLoadMore = () => {
    const newPosts = generatePosts(allPosts.length + 1, 20);
    setAllPosts((prev) => [...prev, ...newPosts]);
    setShowSeeMore(false);
    loadedCount.current = 0; // Reset counter for new batch
  };

  return (
    <div className="h-auto w-[99%] overflow-y-auto scrollbar-hide px-4">
      {visiblePosts.map((post, index) => (
        <div
          key={post.id}
          ref={index === visiblePosts.length - 1 ? lastPostRef : null}
        >
          <PostCard text={post.text} media={post.media} />
        </div>
      ))}

      {loading && (
        <>
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
        </>
      )}

      {showSeeMore && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-gray-300 text-gray-700 px-1 py-1 rounded-md border border-black"
          >
            See More Posts
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
