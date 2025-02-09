import React, { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "../Postcard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../../../../../../../Redux/Slices/PostSlice";
import SkeletonPostCard from "../Postcard/SkeletonPostCard";

function PostList() {
  const dispatch = useDispatch();
  const handleReload = () => {
    window.location.reload();
  };
  // const content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio recusandae id fugiat...`;

  // const media1 = [test, test1, test2];
  // const media2 = testvedio;

  // const generatePosts = (startId, count) =>
  //   Array.from({ length: count }, (_, i) => ({
  //     id: startId + i,
  //     content: `${content} ${i + 1}`,
  //     media: i % 2 === 0 ? media1 : media2,
  //   }));

  const getNextTimestamp = () => {
    if (!allPosts || allPosts.length === 0) {
      return new Date().getTime() - 1;
    }
    const lastPost = allPosts[allPosts.length - 1];
    return new Date(lastPost.createdAt).getTime() - 1;
  };


  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedEnd, setfeedEnd] = useState(false); // TODO: Remove this Logic and implement proper pagination logic (v0)
  const [totalPostsCount, setTotalPostsCount] = useState(50);

  const observer = useRef(null);
  const loadedCount = useRef(0);

  // 1. Initial load: Dispatch fetchFeed once when the component is mounted.
  useEffect(() => {
    dispatch(fetchFeed(new Date().getTime() - 1))
      .unwrap()
      .then((newPosts) => {
        if (newPosts && newPosts.length > 0) {
          setAllPosts(newPosts);
          // For initial visible posts, display the first 3 (or however many you prefer)
          setVisiblePosts(newPosts.slice(0, 3));
          loadedCount.current = 3;
        }
      })
      .catch((err) => {
        console.error("Error fetching initial feed:", err);
      });
  }, [dispatch]);

  useEffect(() => {
    setVisiblePosts(allPosts.slice(0, 3));
    loadedCount.current = 3;
    // console.log("Length of All Post", allPosts.length);
  }, [allPosts]);

  // useEffect(() => {
  //   console.log("Visible Post Length", visiblePosts.length);
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
        // dispatch(fetchFeed(getNextTimestamp()))
        // const newBatch = generatePosts(totalPostsCount + 1, 50);
        // setAllPosts((prev) => [...prev, ...newBatch]);
        // setTotalPostsCount((prev) => prev + 50);
        setLoading(false);
        setfeedEnd(true);
      } else {
        setVisiblePosts((prev) => [...prev, ...nextBatch]);
        loadedCount.current += 3;
      }

      setLoading(false);
    }, 1000);
  }, [loading, allPosts, totalPostsCount]);

  // const fetchMorePosts = useCallback(() => {
  //   if (loading) return;
  //   setLoading(true);

  //   // Get the timestamp for the next fetch (last post's createdAt - 1ms)
  //   const timestamp = getNextTimestamp();

  //   // Dispatch the async thunk. It is assumed that fetchFeed returns a promise
  //   // that resolves with an array of new posts.
  //   dispatch(fetchFeed(timestamp))
  //     .unwrap()
  //     .then((newPosts) => {
  //       if (newPosts && newPosts.length > 0) {
  //         // Append the new posts to the local state arrays.
  //         setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
  //         setVisiblePosts((prevVisible) => [...prevVisible, ...newPosts]);
  //         // Optionally, update any pagination counters if needed.
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching more posts:", err);
  //       setLoading(false);
  //     });
  // }, [loading, dispatch, allPosts]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (feedEnd) return;
          fetchMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, fetchMorePosts]
  );

  return (
    <div className="h-auto w-[99%] overflow-y-auto scrollbar-hide px-4 pb-5 flex flex-col gap-3">
      {visiblePosts.map((post, index) => (
        <div
          key={post.id}
          ref={index === visiblePosts.length - 1 ? lastPostRef : null}
        >
          <PostCard text={post?.content} media={post?.media} user={post?.user} />
        </div>
      ))}

      {loading && (
        <>
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
        </>
      )}

      {feedEnd && (
        <div className="flex justify-center items-center">
          <button
            onClick={handleReload}
            className="p-2 bg-gray-300 text-gray-800 rounded h-10 w-28 border border-gray-500"
          >
            Reload Page
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
