import React from 'react'
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import SearchBar from "./SearchBar";
import ProjectCard from "./ProjectCard";
import { Plus } from 'lucide-react';

function ProjectsPage() {
  return (
    <div className="w-[100svw] mt-14 flex   justify-evenly p-2">
      <div className="w-[20%] h-[100%]  flex flex-col justify-start items-center gap-2">
        <ProfileCard otherUser={null} />
        <div className="w-[100%] h-[56svh] bg-white py-2 rounded-lg   relative flex flex-col justify-start items-center border border-gray-300">
          <div className="flex justify-between items-center w-full border-b border-gray-300 px-2 py-1">
            <h2 className="font-semibold text-lg">Ongoing Projects</h2>
            <button className="text-2xl font-bold text-gray-500 cursor-pointer">
              <Plus />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-auto  flex flex-col justify-start items-center gap-2 py-1">
        <SearchBar />
        <div className="grid grid-cols-2 gap-4 h-auto w-[80%] items-center">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
      <div className="w-[20%] h-[88svh] bg-white border border-gray-300 rounded-md flex flex-col justify-start items-center ">
        <div className="py-1 w-[100%] text-xl font-semibold px-2  flex  items-center justify-start border-b border-gray-300">
          <p>Saved Projects</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage