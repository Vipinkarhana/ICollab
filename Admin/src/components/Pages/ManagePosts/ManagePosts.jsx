import React, { useEffect, useState } from "react";
import PostCard from "../../Layout/PostCard";
import { getAllUsers, fetchUserPosts } from "../../../services/adminService";

const ManagePosts = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
        setFilteredUsers(userList);
        if (userList.length > 1) setSelectedUser(userList[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (!selectedUser) return;
      try {
        const postList = await fetchUserPosts(selectedUser.username);
        setPosts(postList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    loadUserPosts();
  }, [selectedUser]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter((user) => user.name.toLowerCase().includes(value))
    );
    setIsDropdownOpen(true);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full mt-14 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage User Posts</h1>

      {/* Search bar with dropdown */}
      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div>
          {!isDropdownOpen ? (
            <button className="absolute top-2 right-2" onClick={() => setIsDropdownOpen(true)}>🔍</button>
          ) : (
            <button className="absolute top-2 right-2" onClick={() => setIsDropdownOpen(false)}>❌</button>
          )}
        </div>

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

      {selectedUser && (
        <div className="mx-auto md:w-3/4 mt-4">
          <h2 className="text-lg font-bold mb-2">Current User : {selectedUser?.name}</h2>
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
    </div>
  );
};

export default ManagePosts;
