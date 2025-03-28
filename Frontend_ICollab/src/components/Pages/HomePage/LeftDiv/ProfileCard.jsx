/**
 * @file ProfileCard.js
 * @brief Displays a user profile card with a profile picture, name, designation, and a brief about section.
 * @details This component fetches user data from Redux and provides a link to edit the profile.
 * @author ICollab
 * @date 2025-02-20
 */

import React from "react";
import { UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePic from "../../../Common/ProfilePic";
import Name_Designation from "../../../Common/Name&Designation";
import { useSelector } from "react-redux";

/**
 * @class ProfileCard
 * @brief Component that displays the user's profile details.
 * @returns {JSX.Element} A styled profile card with a profile picture, name, designation, and about section.
 */

// TODO: Remove This dependency of otherUser (Take Prop user as input)
const ProfileCard = ({otherUser}) => {
  console.log("Other Profile in ProfileCard in Home Page: ", otherUser)
  const user = otherUser || useSelector((state) => state?.user?.userData);
  const profile = otherUser === null? useSelector((state) => state?.user?.profileData): otherUser?.profile;
  const username = user?.username;
  console.log("In Home Page",profile);
  return (
    <>
      <div className="h-48 w-[100%] bg-white rounded-md flex flex-col justify-evenly py-3 border-gray-300 border px-4">
        <div className="h-[30%] w-[100%] px-4 py-1 flex justify-between items-start">
          <div className="-mt-3 -ml-4">
             <ProfilePic picture={user?.profile_pic} className="h-18 w-18"/>
          </div>
          <div className="py-1 -mt-2">
            <Link to={`/profile/${username}`}> 
              <UserCog size={24}/>
            </Link>
          </div>
        </div>
        <Name_Designation name={user?.name} designation={user?.designation} user={user}/>
        <div className="text-sm h-[25%]  text-left text-gray-600">
          <p>{profile?.about?.split(" ")?.slice(0,5)?.join(" ")} <Link to={`/profile/${username}`} className="font-semibold text-gray-900 hover:text-blue-500">Read More</Link></p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;