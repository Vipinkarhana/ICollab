import { useState } from 'react';
import ProfilePic from "../../../Common/ProfilePic";
import Name_Designation from "../../../Common/Name&Designation";
import { Pencil } from 'lucide-react';
import EditProfile from './EditProfile';
import { UserPlus, Bookmark, SquareChartGantt } from 'lucide-react'; // Import icons for Saved Items and Activity
import { Link } from 'react-router-dom';

function ProfileCard({ user, iscurrentUser }) {
  const [isOpen, SetIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility

  const handleResourceClick = () => {
    setDropdownOpen(prevState => !prevState); // Toggle dropdown visibility
  };

  return (
    <div className="flex flex-col h-auto w-full bg-white rounded-md border border-gray-300 ">
    <div className="w-[100%] h-auto flex justify-between  py-2 px-2 text-gray-800">
      <div className="w-auto h-full flex justify-evenly items-center">
        <ProfilePic
          picture={user?.profile_pic}
          className="h-20 w-20 shadow-none"
        />
        <div className="flex flex-col justify-evenly h-full w-auto ml-4">
          <Name_Designation
            name={user?.name}
            designation={user?.designation}
            nameClass="text-2xl"
            designationClass="text-lg"
          />
          {iscurrentUser ? (
            <div className="text-blue-500 text-lg -mt-5 ">
              <p>24 Collaborators</p>
            </div>
          ) : (
            <div className="flex justify-between items-center gap-2">
              <div className="text-blue-500 text-lg">
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

      {/* Separate div for Profile, Post, and Resource buttons */}
      

      {/* Edit Profile Button */}
      <div className="w-[8%] h-full flex items-start justify-center">
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
    <div className="flex flex-col  gap-4 p-2  ">
        <div className="flex gap-4 ">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-full w-auto">
            Profile
          </button>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-full w-auto">
            Post
          </button>
          <button
            onClick={handleResourceClick} // Handle Resource button click
            className="px-4 py-2 text-white bg-blue-500 rounded-full w-auto"
          >
            Resource
          </button>
        </div>
        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute mt-11 w-[15%] bg-white shadow-lg rounded-md border border-gray-300 ml-40">
            <Link to="/saved_items" className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <Bookmark size={20} />
              <p>Saved Items</p>
            </Link>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <SquareChartGantt  size={20} />
              <p>Activity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
