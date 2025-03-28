import React from 'react';
import ProfilePic from '../../Common/ProfilePic';
import Name_Designation from '../../Common/Name&Designation';
import { UserX, UserCheck } from 'lucide-react';

function CollaborationRequest({ name, designation, profilepic, timeAgo }) {
  return (
    <div className="w-full h-32 bg-white text-gray-800 px-2 py-1 flex items-center justify-between border-b">

      {/* Left Section */}
      <div className="flex items-start justify-start w-[84%]  gap-2">
        <ProfilePic
          className="h-10 w-10 rounded-full border-2 border-gray-300 "
          picture={profilepic}
        />
        <div className="flex flex-col items-start justify-start text-center w-auto  h-full">
          <Name_Designation
            name={name}
            designation={designation}
            nameClass="text-[1.0rem] font-semibold text-gray-800"
            designationClass="text-xs text-gray-600"
          />
        </div>
      </div>

      {/* Right Section - Circular Action Buttons */}
      <div className="flex flex-col gap-4 items-center w-[15%]">
        <button 
          className="border-green-600 hover:border-green-700 border text-green-400 p-3 rounded-full flex items-center justify-center transition duration-200"
          aria-label="Accept Request"
        >
          <UserCheck size={18} />
        </button>
        <button 
          className="border-red-600 hover:border-red-700 border text-red-400 p-3 rounded-full flex items-center justify-center transition duration-200"
          aria-label="Ignore Request"
        >
          <UserX size={18} />
        </button>
      </div>
    </div>
  );
}

export default CollaborationRequest;
