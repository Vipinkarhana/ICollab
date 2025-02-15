import {useState} from 'react'
import ProfilePic from "../../../Common/ProfilePic";
import Name_Designation from "../../../Common/Name&Designation";
import { Pencil } from 'lucide-react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

function ProfileCard() {
  const user = useSelector((state) => state?.user?.userData);
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <div className="w-[100%] h-24  flex justify-between bg-gray-200 rounded-md py-2 border border-gray-400 text-gray-800">
      <div className="w-auto h-full  flex justify-evenly items-center p-2">
        <ProfilePic picture={user?.profile_pic} className="h-20 w-20" />
        <Name_Designation name={user?.name} designation={user?.designation} nameClass="text-2xl" designationClass="text-lg" />
      </div>
      <div className="w-[8%] h-full  flex  items-start justify-center ">
        <button
          onClick={() => {
            SetIsOpen(true);
          }}
          className="rounded-full p-2 hover:bg-slate-300"
        >
          <Pencil size={24} />
        </button>
        {isOpen && <EditProfile SetIsOpen={SetIsOpen} isOpen={isOpen} />}
      </div>
    </div>
  );
}

export default ProfileCard
