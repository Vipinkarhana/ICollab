import { useState } from "react";

function Saved() {
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Projects"];

  const renderContent = () => {
    if (activeTab === "Posts") {
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
                <div key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        </div>
      );
    } else if (activeTab === "Projects") {
      return (
        <div>
          <p>Saved Project 1</p>
          <p>Saved Project 2</p>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-auto px-6 py-4 flex justify-evenly gap-6">
      <div className="w-[80%]">
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
