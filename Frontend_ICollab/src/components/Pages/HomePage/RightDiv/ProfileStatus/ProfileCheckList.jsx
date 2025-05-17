import React from "react";
import { Check } from "lucide-react";

const ProfileCheckList = ({ tasks = [], progress = 0 }) => {
  if (progress < 100) return null;

  return (
    <div className="h-auto w-72 px-2">
      <div className="bg-white rounded-xl shadow-md p-6 w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full p-2 flex items-center justify-center">
            <Check size={24} className="text-white" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-1">Profile Completed</h2>
        <p className="text-gray-600 text-sm mb-4">
          Your profile is complete. You're more likely to be noticed by
          recruiters!
        </p>
        <ul className="text-sm text-left space-y-2 mb-6">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
              <span className="ml-2">{task.label}</span>
            </li>
          ))}
        </ul>
        <button className="px-6 py-2 bg-white border border-gray-300 rounded-full font-medium text-sm hover:bg-gray-100">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCheckList;
