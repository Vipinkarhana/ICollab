import { useState, useEffect } from "react";
import Intro from "./Intro";
import UserPosts from "./UserPosts";
import Saved from "./Saved";
import UserProjects from "./UserProjects";
import ProfileStats from "./ProfileStats";
import Readme from "./Readme";
import ProjectDisplay from "./ProjectDisplay";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../Redux/Slices/UserProfileSlice";
import FloatingButtonMenu from "./FloatingButtonMenu";
import ExperienceDisplay from "./ExperienceDisplay";
import EducationDisplay from "./EducationDisplay";
function ProfilePage() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const location = useLocation();
  const initialTab = location.state?.activeTab || "Intro";
  const [activeTab, setActiveTab] = useState(initialTab);


  const { user, stats, loading, error } = useSelector((state) => state?.userProfile);
  const currentUser = useSelector((state) => state?.user?.userData);
  const isCurrentUser = username === currentUser?.username;
  // const posts = useSelector((state) => state.post.otherUserPosts);

  useEffect(() => {
      dispatch(fetchUserProfile(username));
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found</p>;

  return (
    <div className="w-[99svw] sm:w-[98svw] min-h-screen flex flex-col justify-start items-start m-0 p-0 mt-14">
      <FloatingButtonMenu setActiveTab={setActiveTab} />
      <Intro activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      {activeTab === "Posts" && (
        <div className="w-full p-2 sm:p-4">
          <UserPosts />
        </div>
      )}
      {activeTab === "Saved" && <Saved />}
      {activeTab === "Projects" && (
        <div className="w-full h-auto p-2 sm:p-4">
          <UserProjects />
        </div>
      )}
      {activeTab === "Intro" && (
        <div className="w-full p-2 sm:p-4 flex justify-start items-center flex-col gap-4">
          <ProfileStats stats={stats} />
          <Readme paragraph={user?.profile?.about} isCurrentUser={isCurrentUser} />
          <ProjectDisplay username={username} isCurrentUser={isCurrentUser} />
          <ExperienceDisplay isCurrentUser={isCurrentUser} />
          <EducationDisplay isCurrentUser={isCurrentUser} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
