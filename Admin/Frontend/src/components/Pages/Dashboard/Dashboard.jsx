import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../../config";
import { FaUsers, FaUniversity, FaUserCheck } from "react-icons/fa";

const DashBoard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [topUsers, setTopUsers] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(`${backend_url}/admin/user`);
        setTotalUsers(usersRes.data.data.length);

        const topUsersRes = await axios.get(
          `${backend_url}/api/user/top-users`
        );
        setTopUsers(topUsersRes.data);

        const topPostsRes = await axios.get(`${backend_url}/admin/post`);
        setTopPosts(topPostsRes.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full md:w-[80%] min-h-screen mt-14 p-4 md:p-6 bg-gray-100 absolute top-0 md:left-[20%]">

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-4">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUsers className="text-3xl md:text-4xl text-blue-500" />
          <div>
            <h2 className="text-gray-500 text-sm md:text-base">Total Users</h2>
            <p className="text-lg md:text-xl font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUniversity className="text-3xl md:text-4xl text-green-500" />
          <div>
            <h2 className="text-gray-500 text-sm md:text-base">
              Total Institutes
            </h2>
            <p className="text-lg md:text-xl font-bold">N/A</p>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUserCheck className="text-3xl md:text-4xl text-purple-500" />
          <div>
            <h2 className="text-gray-500 text-sm md:text-base">Active Users</h2>
            <p className="text-lg md:text-xl font-bold">N/A</p>
          </div>
        </div>
      </div>

      {/* Top Users & Top Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Users Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold mb-4">Top Users</h2>
          {topUsers.length > 0 ? (
            <ul>
              {topUsers.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-4 p-2 border-b last:border-none"
                >
                  <img
                    src={user.profile_pic}
                    alt={user.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      {user.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>

        {/* Top Posts Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold mb-4">Top Posts</h2>
          {topPosts.length > 0 ? (
            <ul>
              {topPosts.map((post) => (
                <li key={post._id} className="p-4 border-b last:border-none">
                  <div className="flex items-center gap-4">
                    {post.media && (
                      <img
                        src={post.media}
                        alt="Post Preview"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        {post.name}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm truncate w-32 md:w-40">
                        {post.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-gray-600 text-xs md:text-sm">
                    <p>👍 {post.likes} Likes</p>
                    <p>💬 {post.comments.length} Comments</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
