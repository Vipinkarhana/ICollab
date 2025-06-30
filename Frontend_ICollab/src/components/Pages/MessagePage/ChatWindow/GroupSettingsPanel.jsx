import { useEffect, useState } from "react";
import { X, Plus, Users, FileText, Shield } from "lucide-react";

const GroupSettingsPanel = ({ members = [], onClose, setShowCreateNewGroup }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 10); // Start slide-in animation
  }, []);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match transition duration
  };

  return (
    <div
      className={`absolute top-1 right-0 h-[99%] w-96 z-40 bg-white border-l border-gray-300 shadow-2xl transition-transform duration-300 ${
        animateIn ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300 bg-gradient-to-r from-violet-100 to-white">
        <h2 className="text-base font-bold text-gray-800">Group Settings</h2>
        <button onClick={handleClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-violet-600" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        {/* Members List */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-3">
            <Users className="w-4 h-4" /> Members
          </h3>
          <ul className="space-y-4">
            {members.map((member, idx) => (
              <li key={idx} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                <img
                  src={member.avatar || "/default-avatar.png"}
                  alt={member.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">{member.name}</span>
                <span className="ml-auto text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">Member</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Create New Group */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-3">
            <Plus className="w-4 h-4" /> Create New Group
          </h3>
          <button
            className="w-full px-4 py-2 bg-violet-500 text-white rounded-xl shadow hover:bg-violet-600 transition"
            onClick={() => {
              setShowCreateNewGroup(true);
              handleClose();
            }}
          >
            + New Group
          </button>
        </section>

        {/* Manage Documents */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-3">
            <FileText className="w-4 h-4" /> Documents
          </h3>
          <div className="border border-dashed rounded-xl p-4 text-sm text-gray-500 bg-gray-50 text-center">
            No documents uploaded yet.
          </div>
        </section>

        {/* Manage Roles */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-3">
            <Shield className="w-4 h-4" /> Manage Roles
          </h3>
          <ul className="space-y-3">
            {members.map((member, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <span className="text-sm text-gray-700 flex-1">{member.name}</span>
                <select className="text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white shadow-sm focus:ring-violet-500 focus:border-violet-500">
                  <option>Member</option>
                  <option>Admin</option>
                  <option>Viewer</option>
                </select>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default GroupSettingsPanel;
