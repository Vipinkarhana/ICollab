// ✅ CreateGroupPage.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const CreateNewGroup = ({ members = [], onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMember = (name) => {
    setSelectedMembers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleCreate = () => {
    console.log("Group Created:", groupName, selectedMembers);
    onClose();
  };

  return (
    <div className="  flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-violet-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800">Create New Group</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group Name
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Members
          </label>
          <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {members.map((member, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.name)}
                  onChange={() => toggleMember(member.name)}
                  className="accent-violet-500"
                />
                <span className="text-sm text-gray-700">{member.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="w-full px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateNewGroup;
