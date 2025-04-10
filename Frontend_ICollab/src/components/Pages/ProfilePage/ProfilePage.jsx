import { useState } from "react";
import Intro from "./Intro";
import UserPosts from "./UserPosts";
function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Intro");
  return (
    <div className="w-[100svw] min-h-screen flex flex-col justify-start items-start m-0 p-0 mt-14">
      <Intro activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Posts" && (
        <div className="w-full p-4">
          <UserPosts />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
