/**
 * @file ActivityPage.js
 * @brief Renders the activity page layout with a profile card, activity feed, and additional content section.
 * @details The page consists of three sections:
 *          1. A profile card on the left.
 *          2. The main activity feed in the center.
 *          3. An additional content area (placeholder) on the right.
 * @author ICollab
 * @date 2025-02-20
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import AllActivity from "./AllActivity";
import { useSelector } from "react-redux";
import { fetchMyPosts } from "../../../Redux/Slices/PostSlice";
import { getUserByUsername } from "../../../Services/authService";

/**
 * @class ActivityPage
 * @brief Component for displaying user activity on the platform.
 * @returns {JSX.Element} A page with a profile section, activity feed, and an additional content box.
 */
function ActivityPage() {
  const { username } = useParams();
  const currentUser = useSelector((state) => state.user.userData);
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

  useEffect(() => {
    if ((!currentPosts || currentPosts.length) === 0 && isCurrentUser) {
      dispatch(fetchMyPosts());
    }
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  const user = isCurrentUser ? currentUser : otherUser;
  const posts = isCurrentUser ? currentPosts : otherUser?.posts;

  const otherUserProp = isCurrentUser ? null : user;

  if (!user) return <div>No user found.</div>;
  return (
    <div className="h-auto w-[90svw] mt-14 p-2 flex justify-evenly ">
      <div className="w-[20%] h-[100%] flex flex-col justify-start items-center">
        <ProfileCard otherUser={otherUserProp} />
      </div>
      <div className="w-[50%] min-h-[85svh] h-auto flex-col justify-start items-center gap-2 py-1 border bg-white border-gray-300 rounded-md">
        <AllActivity posts={posts} />
      </div>
      <div className="h-44 w-[20%] bg-white border border-gray-300 rounded-md"></div>
    </div>
  );
}

export default ActivityPage;
