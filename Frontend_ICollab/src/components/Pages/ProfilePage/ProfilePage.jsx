import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import ProfileCard from "./ProfileCard/ProfileCard";
import AboutDiv from "./AboutDiv/AboutDiv";
import ProjectDiv from "./ProjectDiv/ProjectDiv"
import Activity from "./Activity/Activity";
import Experiences from "./Experiences/Experiences";
import { getUserByUsername } from "../../../services/authService";

const ProfilePage = () => {
  const { username } = useParams();
  const currentUser = useSelector((state) => state.user.userData);
  const currentProfile = useSelector((state) => state.user.profileData);
  const currentPosts = useSelector((state) => state.post.myPost);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!username && currentUser?.username) {
    return <Navigate to={`/profile/${currentUser.username}`} replace />;
  }

  const isCurrentUser = currentUser?.username === username;

  // Fetch other user's profile data
  useEffect(() => {
    let controller = new AbortController(); // Cancel previous requests if needed

    if (!isCurrentUser && username) {
      setLoading(true);
      setError(null);

      getUserByUsername(username, { signal: controller.signal })
        .then((data) => {
          console.log("User data:", data.data);
          setOtherUser(data.data);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Error fetching user:", error);
            setError("Failed to fetch user data.");
          }
        })
        .finally(() => setLoading(false));
    }

    return () => controller.abort(); // Cleanup function to cancel request if the component unmounts
  }, [username, isCurrentUser]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  const user = isCurrentUser ? currentUser : otherUser;
  const profile = isCurrentUser? currentProfile: otherUser?.profile;
  const posts = isCurrentUser ? currentPosts : otherUser?.posts

  if (!user) return <div>No user found.</div>;
 // TODO: About Not Working Properly
  return (
    <div className="w-[100%] h-auto mt-12 py-1 flex justify-center gap-2">
      <div className="w-[55%] h-auto p-2 flex flex-col gap-4">
        <ProfileCard user={user} iscurrentUser={isCurrentUser} />
        <AboutDiv text={profile?.about || ""} iscurrentUser={isCurrentUser} />
        <ProjectDiv></ProjectDiv>
        <Activity posts={posts || []} iscurrentUser={isCurrentUser} />
        <Experiences iscurrentUser={isCurrentUser}/>
      </div>
      <div className="w-[20%] bg-white rounded-md border border-gray-300"></div>
    </div>
  );
};

export default ProfilePage;
