import {useState} from 'react'
import ProfilePic from "../../../Common/ProfilePic";
import Name_Designation from "../../../Common/Name&Designation";
import { Pencil } from 'lucide-react';
import EditProfile from './EditProfile';

function ProfileCard({user,iscurrentUser}) {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <div className="w-[100%] h-24  flex justify-between bg-white rounded-md py-2 border border-gray-300 text-gray-800">
      <div className="w-auto h-full  flex justify-evenly items-center p-2">
        <ProfilePic picture={user?.profile_pic} className="h-20 w-20 shadow-none" />
        <Name_Designation name={user?.name} designation={user?.designation} nameClass="text-2xl" designationClass="text-lg" />
      </div>
      <div className="w-[8%] h-full  flex  items-start justify-center ">
        {iscurrentUser && <button
          onClick={() => {
            SetIsOpen(true);
          }}
          className="rounded-full hover:bg-slate-100 p-2"
        >
          <Pencil size={24} />
        </button>}
        {isOpen &&  <EditProfile SetIsOpen={SetIsOpen} isOpen={isOpen} />}
      </div>
    </div>
  );
}

export default ProfileCard
