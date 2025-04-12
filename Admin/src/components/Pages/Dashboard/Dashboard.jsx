import React, { useEffect, useState } from "react";
import { FaUsers, FaUniversity, FaUserCheck } from "react-icons/fa";
import { getAllUsers, getTopUsers, getTopPosts } from "../../../services/adminService";
import { StatsCard, Section } from "../../Common/Reusable";

const DashBoard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [topUsers, setTopUsers] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const users = await getAllUsers();
        setTotalUsers(users.length);

        const topUsersList = await getTopUsers();
        setTopUsers(topUsersList);

        const posts = await getTopPosts();
        setTopPosts(posts);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full md:w-[80%] min-h-screen mt-16 p-4 md:p-6 bg-gray-100 absolute top-0 md:left-[20%]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Users" value={totalUsers} icon={<FaUsers />} color="#3B82F6" />
        <StatsCard title="Total Institutes" value="N/A" icon={<FaUniversity />} color="#10B981" />
        <StatsCard title="Active Users" value="N/A" icon={<FaUserCheck />} color="#8B5CF6" />
      </div>

      {/* Top Users & Top Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Top Users">
          {topUsers.length > 0 ? (
            <ul className="divide-y">
              {topUsers.map((user) => (
                <li key={user._id} className="flex items-center gap-4 py-3">
                  <img
                    src={user.profile_pic}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-medium text-sm md:text-base">{user.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">N/A</p>
          )}
        </Section>

        <Section title="Top Posts">
          {topPosts.length > 0 ? (
            <ul className="divide-y">
              {topPosts.map((post) => (
                <li key={post._id} className="py-3">
                  <div className="flex items-center gap-4">
                    {post.media && (
                      <img
                        src={post.media}
                        alt="Post"
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        {post.name}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm truncate w-40">
                        {post.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-gray-600 text-xs md:text-sm">
                    <span>👍 {post.likes} Likes</span>
                    <span>💬 {post.comments.length} Comments</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">N/A</p>
          )}
        </Section>
      </div>
    </div>
  );
};

export default DashBoard;
