import { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import ProjectCard from "../../Common/ProjectCard";
function Saved() {
  const [activeTab, setActiveTab] = useState("Posts");
  const savePostsObjects = useSelector((state) => state.post.savePost);
  console.log("savePostsObjects", savePostsObjects);

  const savePosts = Object.values(savePostsObjects);
  console.log("savePosts", savePosts);

  const tabs = ["Posts", "Projects"];

  // 👇 Mock saved projects (until backend integration)
  const savedProjects = [
    {
      _id: "p1",
      title: "MitraPay Wallet",
      description: "A secure digital wallet for smooth transactions.",
    },
    {
      _id: "p2",
      title: "CakeHeavens",
      description: "An eCommerce platform for rural cake shops.",
    },
    {
      _id: "p3",
      title: "HabitLoop",
      description: "Track and maintain your daily habits easily.",
    },
    {
      _id: "p4",
      title: "Emergency Ambulance Booking",
      description: "Real-time ambulance tracking and AI hospital suggestions.",
    },
  ];

  const renderContent = () => {
    if (activeTab === "Posts") {
      if (savePosts.length === 0) {
        return (
          <div className="w-full text-center text-gray-500 py-10 text-xl">
            No saved posts yet.
          </div>
        );
      }

      return (
        <div className="w-full px-6 py-4 flex justify-evenly gap-6">
          <div className="flex flex-col gap-3 w-[45svw]">
            {savePosts
              .filter((_, index) => index % 2 === 0)
              .map((post) => (
                <div key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-3 w-[45svw]">
            {savePosts
              .filter((_, index) => index % 2 !== 0)
              .map((post) => (
                <div key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2">
          {savedProjects.map((project) => (
            <ProjectCard />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full h-auto px-6 py-4 flex justify-evenly gap-6 overflow-x-hidden">
      <div className="w-[90%]">
        {/* Tabs */}
        <div className="flex space-x-0 relative z-10">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab;
            const isFirst = index === 0;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-lg   
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
        <div className="w-full bg-white shadow-md border border-t-0 rounded-b-md -mt-1 z-20 relative p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Saved;
