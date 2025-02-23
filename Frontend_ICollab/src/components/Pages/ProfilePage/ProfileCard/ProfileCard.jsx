import {useState} from 'react'
import ProfilePic from "../../../Common/ProfilePic";
import Name_Designation from "../../../Common/Name&Designation";
import { Pencil } from 'lucide-react';
import EditProfile from './EditProfile';
import { UserPlus } from 'lucide-react';

function ProfileCard({user,iscurrentUser}) {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <div className="w-[100%] h-auto  flex justify-between bg-white rounded-md py-2 px-2 border border-gray-300 text-gray-800">
      <div className="w-auto h-full  flex justify-evenly items-center p-2">
        <ProfilePic
          picture={user?.profile_pic}
          className="h-20 w-20 shadow-none"
        />
        <div className="flex flex-col justify-evenly h-full w-auto">
          <Name_Designation
            name={user?.name}
            designation={user?.designation}
            nameClass="text-2xl"
            designationClass="text-lg"
          />
          {iscurrentUser ? (
            <div className="text-blue-500 text-lg  px-4">
              <p>Collaborators: 24</p>
            </div>
          ) : (
            <div className="flex justify-between items-center ">
              <div className="text-blue-500 text-lg  px-4">
                <p>Collaborators: 24</p>
              </div>
                <button className="px-2 bg-blue-500 text-white py-1 rounded flex items-center justify-center gap-1">
                  <UserPlus size={20} />
                  Collab
                </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-[8%] h-full  flex  items-start justify-center ">
        {iscurrentUser && (
          <button
            onClick={() => {
              SetIsOpen(true);
            }}
            className="rounded-full hover:bg-slate-100 p-2"
          >
            <Pencil size={24} />
          </button>
        )}
        {isOpen && <EditProfile SetIsOpen={SetIsOpen} isOpen={isOpen} />}
      </div>
    </div>
  );
}

export default ProfileCard
