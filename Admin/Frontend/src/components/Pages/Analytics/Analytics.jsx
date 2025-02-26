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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backend_url}/admin/user`);
        const userList = response.data.data;

        setUsers(userList);
        setFilteredUsers(userList);

        // Find the second user who has posts
        if (userList.length > 1) {
          const defaultUser = userList[1]; // Select second user by default
          setSelectedUser(defaultUser);
        }
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
          console.log(response.data);
          setPosts(response.data.data);
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

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsDropdownOpen(false); // Close dropdown on selection
  };

  return (
    <div className="w-full md:w-[80%] p-6 bg-gray-100 md:absolute mt-14 md:left-[20%]">
      <h1 className="text-2xl font-bold mb-4">User Analytics</h1>

      {/* 🔹 MOBILE VIEW - Search Bar with Dropdown */}
      <div className="md:hidden relative w-full">
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsDropdownOpen(true)} // Open dropdown when clicking search
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* 🔹 Dropdown for User List (Appears when search bar is clicked) */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-md mt-1 max-h-60 overflow-y-auto z-10">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleUserSelect(user)}
                >
                  <img
                    src={user.profile_pic || "https://via.placeholder.com/40"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 p-2">No users found.</p>
            )}
          </div>
        )}
      </div>

      {/* 🔹 USER POSTS (For Mobile - Below Search Bar) */}
      {selectedUser && (
        <div className="md:hidden mt-4">
          <h2 className="text-lg font-bold mb-2">
            User Posts : {selectedUser?.name}
          </h2>
          {posts.length > 0 ? (
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
          )}
        </div>
      )}

      {/* 🔹 DESKTOP VIEW - Two Column Layout */}
      <div className="hidden md:flex w-full h-screen overflow-hidden">
        {/* Users List */}
        <div className="md:w-[30%] w-full bg-white p-4 border-r h-full flex flex-col">
          <h2 className="text-lg font-bold mb-2">Users</h2>

          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Scrollable User List */}
          <div className="flex-1 overflow-y-auto">
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
        </div>

        {/* User Posts */}
        <div className="md:w-[70%] w-full p-4 overflow-y-auto h-full">
          <h2 className="text-lg font-bold mb-4">
            User Posts : {selectedUser?.name}
          </h2>
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


