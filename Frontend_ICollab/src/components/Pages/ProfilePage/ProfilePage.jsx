import { useState } from "react";
import Intro from "./Intro";
import UserPosts from "./UserPosts";
import Saved from "./Saved";
import UserProjects from "./UserProjects";
import ProfileStats from "./ProfileStats";
import Readme from "./Readme";
import ProjectDisplay from "./ProjectDisplay";

function ProfilePage() {
  const stats = {
    posts: 5,
    projects: 3,
    collaborators: 5,
    saved: 10,
  };
  const paragraph = `I am Tanmay Sharma, a 2nd-year BTech IT student with a passion for frontend development. I specialize in React.js and Tailwind CSS, building sleek, responsive, and user-friendly web applications. I enjoy crafting seamless user experiences and constantly explore new technologies to enhance my skills. Whether it’s optimizing performance, implementing interactive UI elements, or ensuring accessibility, I love bringing ideas to life through code. I’m always eager to work on exciting projects, collaborate with like-minded developers, and push the boundaries of frontend innovation.`;
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
        <div className="w-full h-auto p-4">
          <UserProjects />
        </div>
      )}
      {activeTab === "Intro" && (
        <div className="w-full p-4 flex justify-start items-center flex-col gap-4">
          <ProfileStats stats={stats} />
          <Readme paragraph={paragraph} />
          <ProjectDisplay activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
