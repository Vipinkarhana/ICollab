import React from "react";
import { FaUsers, FaUniversity, FaUserCheck } from "react-icons/fa";


const AdminDashboard = () => {
  const totalUsers = 0; // Replace with the actual total number of users  
  const topUsers = []; // Replace with the actual top followed users
  const topPosts = []; // Replace with the actual posts with highest engagement
  return (
    <div className="w-[80%] h-screen p-6 bg-gray-100 top-0 left-[20%]">
      <div className="grid grid-cols-3 gap-4 mt-10 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUsers className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUniversity className="text-4xl text-green-500" />
          <div>
            <h2 className="text-gray-500">Total Institutes</h2>
            <p className="text-xl font-bold">N/A</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUserCheck className="text-4xl text-purple-500" />
          <div>
            <h2 className="text-gray-500">Active Users</h2>
            <p className="text-xl font-bold">N/A</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-10 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Top Followed Users</h2>
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
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-500 text-sm">
                      {user.followers.length} Followers, {user.following.length} Following
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Posts with Highest Engagement</h2>
          {topPosts.length > 0 ? (
            <ul>
              {topPosts.map((post) => (
                <li key={post._id} className="p-4 border-b last:border-none">
                  <div className="flex items-center gap-4">
                    {post.pic && (
                      <img
                        src={post.pic}
                        alt="Post Preview"
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    )}
                    
                    <div>
                      <p className="font-semibold">{post.username}</p>
                      <p className="text-gray-500 text-sm truncate w-40">{post.content}</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2 text-gray-600 text-sm">
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
}

export default AdminDashboard