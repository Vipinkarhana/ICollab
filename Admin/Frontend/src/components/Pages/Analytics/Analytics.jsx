import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../../config";
import PostCard from "../../Layout/PostCard";

const Analytics = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backend_url}/admin/user`);
        // console.log(response.data.data);
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            `${backend_url}/admin/posts/myallpost?username=${selectedUser.username}`
          );
          setPosts(response.data.data);
          // console.log("Posts:", response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
    }
  }, [selectedUser]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter((user) => user.name.toLowerCase().includes(value))
    );
  };

  return (
    <div className="w-[80%] h-screen p-6 bg-gray-100 absolute top-0 left-[20%]">
      <h1 className="text-2xl font-bold mb-4">User Analytics</h1>

      <div className="flex w-full h-full">
        <div className="w-[30%] h-full bg-white p-4 border-r overflow-y-auto">
          <h2 className="text-lg font-bold mb-2">Users</h2>

          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`p-2 cursor-pointer flex items-center gap-2 border-b rounded-md transition-all duration-200 ${
                  selectedUser && selectedUser._id === user._id
                    ? "bg-gray-200"
                    : "hover:bg-gray-400"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.profile_pic || "https://via.placeholder.com/40"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2"
                />
                <span className="font-medium">{user.name}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>

        <div className="w-[70%] h-full p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">User Posts</h2>
          {selectedUser ? (
            posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  text={post.content}
                  media={post.media}
                  user={selectedUser}
                />
              ))
            ) : (
              <p className="text-gray-500">This user has not posted yet.</p>
            )
          ) : (
            <p className="text-gray-500">Select a user to view posts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
