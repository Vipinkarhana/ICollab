import { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import ProjectCard from "../../Common/ProjectCard";

function Saved() {
  const [activeTab, setActiveTab] = useState("Posts");
  const savedPosts = useSelector((state) => state.savedItem.savedPosts);
  // const savePosts = Object.values(savePostsObjects);

  const tabs = ["Posts", "Projects"];

  const savedProjects = useSelector((state) => state.savedItem.savedProjects);

  const renderContent = () => {
    if (activeTab === "Posts") {
      if (savedPosts.length === 0) {
        return (
          <div className="w-full text-center text-gray-500 py-10 text-xl">
            No saved posts yet.
          </div>
        );
      }

      return (
        <>
          {/* Desktop view (2 columns) */}
          <div className="hidden md:flex w-full  py-4 justify-evenly gap-6">
            <div className="flex flex-col gap-3 w-[45%]">
              {savedPosts
                .filter((_, index) => index % 2 === 0)
                .map((post) => (
                  <div key={post._id}>
                    <PostCard post={post} />
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-3 w-[45%]">
              {savedPosts
                .filter((_, index) => index % 2 !== 0)
                .map((post) => (
                  <div key={post._id}>
                    <PostCard post={post} />
                  </div>
                ))}
            </div>
          </div>

          {/* Mobile/Tablet view (single column) */}
          <div className="flex flex-col gap-4 md:hidden px-1 py-4">
            {savedPosts.map((post) => (
              <div key={post._id}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </>
      );
    } else if (activeTab === "Projects") {
      if (savedProjects.length === 0) {
        return (
          <div className="w-full text-center text-gray-500 py-10 text-xl">
            No saved projects yet.
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 px-1 py-4 sm:grid-cols-2 gap-6 ">
          {savedProjects.map((savedProject) => (
            <ProjectCard key={savedProject.id} project={savedProject} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full h-auto px-2 md:px-6 py-4 flex justify-center overflow-x-hidden">
      <div className="w-full md:w-[90%]">
        {/* Tabs */}
        <div className="flex space-x-0 relative z-10">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab;
            const isFirst = index === 0;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm sm:text-base md:text-lg text-center
                  ${isFirst ? "rounded-tl-md" : "rounded-tr-md"}
                  ${
                    isActive
                      ? "bg-white z-20 shadow-[0_0px_8px_rgba(0,0,0,0.2)] translate-y-[1px] border-b-transparent"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300 border-b-gray-300"
                  }
                `}
                style={{
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full bg-white shadow-md border border-t-0 rounded-b-md -mt-1 z-20 relative ">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Saved;
