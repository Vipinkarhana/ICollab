import React from 'react';
import { Link } from "react-router-dom";

const ProjectCard = ({
  title = "Project Title",
  type = "Project Type",
  status = "Status",
  field = "Field",
  collaborators = 0,
  startDate = "DD/MM/YY",
  endDate = "DD/MM/YY",
  avatarSeeds = []
}) => {
  return (
    <div
      className="w-full sm:min-w-[34rem] sm:h-[20rem] bg-white p-5 sm:p-6 rounded-xl shadow-md flex flex-col justify-between font-sans border border-white hover:border-blue-500 transition-all duration-200"
    >
      {/* Title & Type */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 tracking-wide mt-1">{type}</p>
      </div>

      {/* Status + Avatars + Collaborators */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Status */}
        <div>
          <p className="text-xs sm:text-lg text-gray-500 font-medium uppercase tracking-wider">Status</p>
          <div className="inline-block mt-1 px-3 py-[0.25rem] text-sm sm:text-base text-gray-700 border border-gray-300 rounded-full">
            {status}
          </div>
        </div>

        {/* Avatars + Collaborators */}
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {(avatarSeeds || []).slice(0, 3).map((seed, index) => (
              <img
                key={index}
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white"
                alt={`avatar-${seed}`}
              />
            ))}
          </div>
          <span className="text-sm sm:text-base text-green-600 font-medium">
            +{collaborators} Collaborators
          </span>
        </div>
      </div>

      {/* Field, Start & End Dates + View Button */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm sm:text-base text-gray-800 font-medium">
        <button className="uppercase px-3 py-1 bg-blue-200 hover:bg-blue-400 rounded-md text-xs sm:text-lg">
          {field}
        </button>
        <span className="text-gray-700">Starts: {startDate}</span>
        <span className="text-gray-700">Ends: {endDate}</span>
        <Link to="/projectpreview" className="ml-auto">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 transition">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
