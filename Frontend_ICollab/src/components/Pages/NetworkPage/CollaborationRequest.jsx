import React from 'react'
import ProfilePic from '../../Common/ProfilePic'
import Name_Designation from '../../Common/Name&Designation';
import { UserX,UserCheck } from 'lucide-react';
function CollaborationRequest({name,designation,profilepic}) {
  return (
    <div className="h-auto w-full shadow-lg border flex items-center justify-around py-2 rounded-sm flex-col ">
      <div className="w-full h-auto flex flex-col items-center justify-start">
        <ProfilePic className="h-[3.4rem] w-[3.4rem]" picture={profilepic} />
        <Name_Designation
          name={name}
          designation={designation}
          nameClass="text-[1rem] text-center"
          designationClass="text-[0.8rem] text-center"
        />
      </div>
      <div className="w-full h-10 flex items-center justify-evenly gap-2 mt-5">
        <button className="bg-green-500 text-white rounded-md px-4 p-1 flex items-center gap-2">
          <UserCheck size={18} />
          Accept
        </button>
        <button className="bg-red-500 text-white rounded-md px-4 p-1 flex items-center gap-2">
          <UserX size={18} />
          Reject
        </button>
      </div>
    </div>
  );
}

export default CollaborationRequest
