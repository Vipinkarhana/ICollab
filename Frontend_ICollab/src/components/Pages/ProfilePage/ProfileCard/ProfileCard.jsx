import React from 'react'
import ProfilePic from "../../../Common/ProfilePic";
import Name_Designation from "../../../Common/Name&Designation";
import { Pencil } from 'lucide-react';
function ProfileCard() {
  return (
    <div className="w-[100%] h-24  flex justify-between bg-gray-200 rounded-md py-2 border border-gray-400 text-gray-800">
      <div className="w-[43%] h-full  flex justify-evenly items-center p-2">
        <ProfilePic className="h-20 w-20" />
        <Name_Designation nameClass="text-2xl" designationClass="text-lg" />
      </div>
      <div className="w-[8%] h-full  flex  items-start justify-center ">
        <button className="rounded-full p-2 hover:bg-slate-300">
          <Pencil size={24} />
        </button>
      </div>
    </div>
  );
}

export default ProfileCard
