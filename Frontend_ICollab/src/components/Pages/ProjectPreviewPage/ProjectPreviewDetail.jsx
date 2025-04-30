import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "../../Common/ProfilePic";

function ProjectPreviewDetail({project}) {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-start w-full py-4 gap-6">
      {/* Team Members Section */}
      <div className="w-full lg:w-[30%]">
        <div className="bg-white flex flex-col gap-4 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-2xl mb-1">Team Members</h2>
          {project.collaborator?.length > 0 ? (
            project.collaborator.map((member, idx) => (
              <Link 
                key={idx} 
                to={`/profile/${encodeURIComponent(member.username)}`} 
                className="flex items-center gap-3 text-lg hover:bg-gray-50 p-2 rounded"
                title={member.username || member.email}
              >
                <ProfilePic user={member} className="h-10 w-10" />
                <p>{member.username || member.email}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No collaborators</p>
          )}
        </div>
      </div> 

      {/* Right Content Section */}
      <div className="w-full lg:w-[68%] flex flex-col gap-6">
        {/* Problem and Challenges */}
        <div className="bg-white shadow-md rounded-md p-4 flex flex-col gap-6">
          {/* Problem */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              The Problem {project.name} Solves
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Challenges */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              Challenges We Ran Into
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {project.challenges}
            </p>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="bg-white shadow-md w-full p-6 rounded-md">
          <h2 className="font-semibold text-xl sm:text-2xl mb-3">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
          {project.technology.map((tech) => (
              <span
                key={tech}
                className="bg-white border border-gray-300 px-4 py-2 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPreviewDetail;
