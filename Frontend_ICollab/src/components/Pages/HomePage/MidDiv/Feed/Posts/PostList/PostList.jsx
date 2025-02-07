import React, { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "../Postcard/PostCard";
import SkeletonPostCard from "../Postcard/SkeletonPostCard";
import test from "../../../../../../../assets/ProfilePic.png";
import test1 from "../../../../../../../assets/test.png";
import test2 from "../../../../../../../assets/test2.png";
import testvedio from "../../../../../../../assets/TestVedio.mp4";

function PostList() {
  const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...`;

  const media1 = [test, test1, test2];
  const media2 = testvedio;

  const generatePosts = (startId, count) =>
    Array.from({ length: count }, (_, i) => ({
      id: startId + i,
      text,
      media: i % 2 === 0 ? media1 : media2,
    }));

  const [allPosts, setAllPosts] = useState(generatePosts(1, 50)); 
  const [visiblePosts, setVisiblePosts] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [totalPostsCount, setTotalPostsCount] = useState(50); 

  const observer = useRef(null);
  const loadedCount = useRef(0); 

  useEffect(() => {
    setVisiblePosts(allPosts.slice(0, 3));
    loadedCount.current = 3;
    console.log("Length", allPosts.length);
  }, [allPosts]);
  // useEffect(() => {
  //   console.log("Length", visiblePosts.length);
  // }, [visiblePosts]);

  const fetchMorePosts = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const nextBatch = allPosts.slice(
        loadedCount.current,
        loadedCount.current + 3
      );

      if (nextBatch.length === 0) {
        const newBatch = generatePosts(totalPostsCount + 1, 50);
        setAllPosts((prev) => [...prev, ...newBatch]);
        setTotalPostsCount((prev) => prev + 50);
      } else {
        setVisiblePosts((prev) => [...prev, ...nextBatch]);
        loadedCount.current += 3;
      }

      setLoading(false);
    }, 1000);
  }, [loading, allPosts, totalPostsCount]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, fetchMorePosts]
  );

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
        </>
      )}
    </div>
  );
}

export default PostList;
