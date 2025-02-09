import React from 'react'
function ProfilePic({picture, className = "" }) {
  const ProfileImg = "/ProfilePic.png";
  return (
    <div
      className={`h-16 w-16 rounded-full border-2 border-gray-500 shadow-xl overflow-hidden ${className}`}
    >
      <img
        src={picture ? picture : ProfileImg}
        alt="Profile Pic"
        crossOrigin="anonymous"
        className="h-full w-full object-cover"
        onError={(e) => {
          // Prevent infinite loop in case the fallback image fails
          e.currentTarget.onerror = null;
          e.currentTarget.src = ProfileImg;
        }}
      />
    </div>
  );
}

export default ProfilePic
