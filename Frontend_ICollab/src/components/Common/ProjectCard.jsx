import React from 'react';
import {Link} from "react-router-dom";
const ProjectCard = ({
  title = "Project Title",
  type = "Project Type",
  status = "Status",
  field = "Field",
  collaborators = 0,
  startDate = "DD/MM/YY",
  avatarSeeds = [],
  buttonText = "Apply Now"
}) => {
  return (
    <Link to={"/projectpreview"} className="w-full min-w-[34rem] h-[20rem] bg-white p-6 rounded-xl shadow-md flex flex-col justify-between font-sans border border-white hover:border-blue-500">
        <div className="h-20 flex flex-col justify-center gap-2">
        <h2 className="text-[1.5rem] font-semibold text-gray-900 leading-tight">{title}</h2>
        <p className="text-sm text-gray-500 mt-1 tracking-wide">{type}</p>
        </div>
        
      <div className='flex justify-between items-center'>
        {/* Title */}

        {/* Status Tag */}
        <div className="mt-4">
          <p className="text-[0.65rem] text-gray-500 font-medium uppercase tracking-wider">Status</p>
          <div className="inline-block mt-1 px-3 py-[0.3rem] text-xs text-gray-700 border border-gray-300 rounded-full">
            {status}
          </div>
        </div>

        {/* Avatars + Collaborators */}
        <div className="flex items-center mt-4 space-x-2">
          <div className="flex -space-x-2">
            {(avatarSeeds || []).slice(0, 3).map((seed, index) => (
              <img
                key={index}
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}`}
                className="w-6 h-6 rounded-full border-2 border-white"
                alt={`avatar-${seed}`}
              />
            ))}
          </div>
          <span className="text-sm text-green-600 font-medium">+{collaborators} Collaborators</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-sm text-gray-600 flex justify-between items-center gap-2 font-medium">
       
        <button className="uppercase h-[5svh] p-2 px-4 rounded-md bg-blue-200 hover:bg-blue-400">{field}</button>
        
        <span className="text-gray-800 font-semibold">Starts {startDate}</span>
      </div>

      {/* CTA Button */}
      
    </Link>
  );
};

export default ProjectCard;
