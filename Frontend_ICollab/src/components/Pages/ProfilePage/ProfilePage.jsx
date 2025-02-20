import React,{useState} from "react";

import ProfileCard from "./ProfileCard/ProfileCard";
import AboutDiv from "./AboutDiv/AboutDiv";
import Activity from "./Activity/Activity";
import Experiences from "./Experiences/Experiences";

const ProfilePage = () => {
  
  return (
    <div className="w-[100%] h-auto  mt-12 py-1 flex justify-center gap-2">
      <div className="w-[55%] h-auto  p-2 flex flex-col gap-4 ">
        <ProfileCard />
        <AboutDiv />
        <Activity />
        <Experiences/>
      </div>
      <div className="w-[20%]  bg-white rounded-md border border-gray-300"></div>
    </div>
  ); 
  
}

export default ProfilePage;