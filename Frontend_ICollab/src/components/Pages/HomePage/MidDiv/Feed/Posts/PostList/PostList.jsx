import { useEffect, useState, useCallback } from "react";
import PostCard from "../Postcard/PostCard"; 
import test from "../../../../../../../assets/test.png"
import test2 from "../../../../../../../assets/test2.png"
import SkeletonPost from "../Postcard/SkeletonPostCard"

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  
  
  const mockFetchPosts = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const fakePosts = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        description: `This is the description of post ${i + 1}.`,
        media:
          i % 2 === 0
            ? [test,test2] 
            : `https://samplelib.com/lib/preview/mp4/sample-5s.mp4`, 
      }));
      setPosts(fakePosts);
      setDisplayedPosts(fakePosts.slice(0, 20));
      setIndex(20);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    mockFetchPosts();
  }, [mockFetchPosts]);

  const loadMore = () => {
    if (index < posts.length) {
      setDisplayedPosts((prev) => [...prev, ...posts.slice(index, index + 20)]);
      setIndex((prev) => prev + 20);
    } else {
      mockFetchPosts();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index, loading, posts]);

  return (
    <div className="p-4 space-y-4">
      {displayedPosts.map((post) => (
        <PostCard key={post.id} text={post.description} media={post.media} />
      ))}
      {loading && (
        <>
        <SkeletonPost/>
        <SkeletonPost/>
        <SkeletonPost/>
        <SkeletonPost/>
        </>
      )}
    </div>
  );
}
