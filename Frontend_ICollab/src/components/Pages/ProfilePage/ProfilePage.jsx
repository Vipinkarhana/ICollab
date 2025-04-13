import { useState } from "react";
import Intro from "./Intro";
import UserPosts from "./UserPosts";
import Saved from "./Saved";
import UserProjects from "./UserProjects";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Intro");
  return (
    <div className="w-[98svw] min-h-screen flex flex-col justify-start items-start m-0 p-0 mt-14">
      <Intro activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Posts" && (
        <div className="w-full p-4">
          <UserPosts />
        </div>
      )}
      {activeTab === "Saved" && (
        <Saved/>
      )}
      {activeTab === "Projects" && (
        <div className="w-full p-4">
          <UserProjects />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
