/**
 * @file ProfilePic.js
 * @brief Displays a user's profile picture with a fallback image.
 * @details This component renders a circular profile picture, with a default fallback image if no picture is provided or an error occurs.
 * @param {Object} props Component properties.
 * @param {string} [props.picture] URL of the profile picture.
 * @param {string} [props.className] Optional CSS classes for custom styling.
 * @returns {JSX.Element} The ProfilePic component.
 */

import React from 'react';

/**
 * @class ProfilePic
 * @brief A component for displaying a profile picture with a fallback.
 */

function ProfilePic({picture, className = "" }) {
  const ProfileImg = "/ProfilePic.png";
  return (
    <div
      className={`h-16 w-16 rounded-full border-2 border-gray-400  overflow-hidden ${className}`}
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
