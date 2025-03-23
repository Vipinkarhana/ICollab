import React from 'react';
import { Link } from 'react-router-dom';

function ProjectDiv() {
  return (
    <div className="w-[100%] h-auto bg-white rounded-md flex flex-col justify-around items-center border border-gray-300 text-gray-800">
      <div className="h-12 w-[100%] flex justify-between items-center py-2 px-4 border-b border-gray-300">
        <div className="text-2xl font-semibold ">
          <p>Projects</p>
        </div>
        <Link to = "/project"
          className="text-blue-500 hover:underline text-xl font-semibold"
        >
          See All
        </Link>
      </div>
    </div>
  );
}

export default ProjectDiv;
