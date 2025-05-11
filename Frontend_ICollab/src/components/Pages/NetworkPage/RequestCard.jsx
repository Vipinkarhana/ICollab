import React from "react";
import ProfilePic from "../../Common/ProfilePic";
import Name_Designation from '../../Common/Name&Designation';
import { Clock } from "lucide-react";

function RequestCard({ person }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md border border-gray-300">
      {/* Profile Image */}
      <ProfilePic className="w-20 h-20 mx-auto mb-2 rounded-full object-cover" />

      {/* Name and Designation */}
      <div className="flex flex-col items-center justify-center">
        <Name_Designation
          name={person.name}
          designation={person.role}
          nameClass="text-[1.0rem] font-semibold text-gray-800 text-center"
          designationClass="text-sm text-gray-600 text-center"
        />
      </div>

      {/* Always Pending Button */}
      <button
        className="w-full mt-2  py-1 rounded flex items-center justify-center gap-1 bg-gray-500 text-white cursor-not-allowed"
        disabled
      >
        <Clock size={20} />
        Pending
      </button>
    </div>
  );
}

export default RequestCard;
