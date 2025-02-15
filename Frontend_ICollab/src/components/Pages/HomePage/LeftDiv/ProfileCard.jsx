import React from "react";
import { UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePic from "../../../Common/ProfilePic";
import Name_Designation from "../../../Common/Name&Designation";
import { useSelector } from "react-redux";
const ProfileCard = () => {
  const user = useSelector((state) => state?.user?.userData);
  const profile = useSelector((state) => state?.user?.profileData);

  return (
    <>
      <div className="h-[30%] w-[100%] bg-gray-200 rounded-md flex flex-col justify-evenly py-2 border-gray-400 border">
        <div className="h-[30%] w-[100%] px-4 py-1 flex justify-between items-start">
          <div className=" -mt-7 ">
             <ProfilePic picture={user?.profile_pic}/>
          </div>
          <div className="py-1 -mt-2">
            <Link to="/profile">
              <UserPen size={20} />
            </Link>
          </div>
        </div>
        <Name_Designation name={user?.name} designation={user?.designation}/>
        <div className="text-sm h-[25%] px-4 text-gray-600">
          <p>{profile?.about?.split(" ")?.slice(0,5)?.join(" ")} <Link to="/profile" className="font-semibold text-gray-900">Read More</Link></p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;