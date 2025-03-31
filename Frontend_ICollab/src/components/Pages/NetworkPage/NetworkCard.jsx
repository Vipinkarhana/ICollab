import { useState } from "react";
import ProfilePic from "../../Common/ProfilePic";

const NetworkCard = ({ person }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = (e) => {
    e.preventDefault(); // Prevent page refresh
    setShowFullDescription(!showFullDescription);
  };

  // Ensure person.description is a string and handle empty/undefined cases
  const description = person.description || "";
  const truncatedDescription = description.slice(0, 30); // Show first 30 characters as preview
  const isDescriptionTruncated = description.length > 10;

  return (
    <div className="bg-white p-4 shadow-md rounded-md border border-gray-300 flex flex-col items-center">
      {/* Profile Image */}
      <ProfilePic className="w-20 h-20 mx-auto mb-2 rounded-full border border-gray-300" />
      
      {/* Name */}
      <h3 className="text-center font-bold text-lg sm:text-xl md:text-xl">{person.name}</h3>
      
      {/* Role */}
      <p className="text-center text-gray-600 text-sm sm:text-base">{person.role}</p>
      
      {/* Description */}
      <p className="text-center text-gray-600 text-sm mt-2">
        {showFullDescription ? description : `${truncatedDescription}...`}
      </p>

      {/* Read More Link */}
      {isDescriptionTruncated && !showFullDescription && (
        <a
          href="#"
          onClick={toggleDescription}
          className="text-blue-500 mt-2 underline text-sm sm:text-base"
        >
          Read More
        </a>
      )}
    </div>
  );
};

export default NetworkCard;
