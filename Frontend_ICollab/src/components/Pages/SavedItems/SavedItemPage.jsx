import React, { useState, useEffect } from "react";
import { BookmarkIcon as SolidBookmark } from "@heroicons/react/24/solid";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import ProjectCard from "../ProjectsPage/ProjectCard";
import { useSelector } from "react-redux";

const SavedItemPage = () => {
  // State to track the selected filter
  const [filter, setFilter] = useState("all");
  const savedPostsObjects = useSelector((state) => state.post.savePost);
  const [savedPosts, setSavedPosts] = useState(Object.values(savedPostsObjects));

  useEffect(() => {
    // Fetch saved posts from the Redux store or API if needed
    setSavedPosts(Object.values(savedPostsObjects));
  }
  , [savedPostsObjects]);

  return (
    <div className="flex min-h-screen bg-gray-100 m-16">
      {/* Left Sidebar */}
      <div className="w-[20svw] bg-white p-4 border-r shadow-sm h-[100%] rounded-md">
        <div className="flex flex-row border-b w-[20svw] -ml-4 gap-2 p-2">
          <SolidBookmark className="w-auto h-[1.5rem] text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">My items</h2>
        </div>
        <div className="text-blue-600 font-medium hover:underline cursor-pointer">
          Saved posts
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 px-6 py-4 w-[50svw]">
        <h2 className="text-xl font-semibold mb-1">Saved items</h2>
        <p className="text-sm text-gray-600 mb-4">
          Anything you save is private.
        </p>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-6">
          <button
            className={`px-4 py-1 rounded-full border font-medium text-sm ${
              filter === "all" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-1 rounded-full border font-medium text-sm ${
              filter === "posts" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setFilter("posts")}
          >
            Posts
          </button>
          <button
            className={`px-4 py-1 rounded-full border font-medium text-sm ${
              filter === "projects" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setFilter("projects")}
          >
            Projects
          </button>
        </div>

        {/* Render content based on filter */}
        <div className="flex flex-col gap-4">
          {filter === "all" && (
            <>
              {/* Show both Posts and Projects */}
              {savedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              <ProjectCard />
              <ProjectCard />
            </>
          )}

          {filter === "posts" && (
            <>
              {savedPosts.length === 0 ? (
                <p>No saved posts yet.</p>
              ) : (
                savedPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              )}
            </>
          )}

          {filter === "projects" && (
            <>
              {/* Show only Projects */}
              <ProjectCard />
              <ProjectCard />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedItemPage;
