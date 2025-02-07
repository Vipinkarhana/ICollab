import React from 'react'
import ProfileImg from "../../assets/ProfilePic.png"
function ProfilePic({ className = "" }) {
  return (
    <div
      className={`h-16 w-16 rounded-full border-2 border-gray-500 shadow-xl overflow-hidden ${className}`}
    >
      <img
        src={ProfileImg}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default ProfilePic
