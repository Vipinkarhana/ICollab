import React from "react";
import { UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePic from "../../../Common/ProfilePic";
const ProfileCard = () => {
  return (
    <>
      <div className="h-[30%] w-[90%] bg-gray-200 rounded-md flex flex-col justify-evenly py-2">
        <div className="h-[30%] w-[100%] px-2 py-1 flex justify-between items-start">
          <div className=" -mt-7 ">
             <ProfilePic/>
          </div>
          <div className="py-1 -mt-2">
            <Link to="/profile">
              <UserPen size={20} />
            </Link>
          </div>
        </div>
        <div className="h-[15%]  px-2 text-xl flex justify-start items-center font-bold">
          <p>Jhon Dews</p>
        </div>
        <div className="px-2 text-sm text-gray-900 h-[18%] flex justify-start items-center mt-1 font-medium">
          <p>IT, Software Engineer</p>
        </div>
        <div className="text-sm h-[25%] px-2 text-gray-600">
          <p>Lorem ipsum dicta eaque cons equatur?... <Link to="/profile" className="font-semibold text-gray-900">Read More</Link></p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;