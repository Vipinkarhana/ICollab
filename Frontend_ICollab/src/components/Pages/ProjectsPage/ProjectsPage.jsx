import React from "react";
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import ProjectCard from "./ProjectCard";
import SearchBar from "./SearchBar";



const ProjectsPage = () => {
  return (
    <div className="min-h-[200vh] bg-blue-100 p-4 min-w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 ">
        {/* Left Sidebar */}
        <div className="md:col-span-1 mt-16 w-[85%]">
          <div className="border border-gray-300 rounded-lg">
          <ProfileCard />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4 h-[150%] relative flex items-center border border-gray-300">
            <h2 className="font-bold -mt-96 text-lg">Ongoing Projects</h2>
            <button className="text-2xl font-bold absolute right-3 text-gray-500 cursor-pointer -mt-96">
              +
            </button>
          </div>
          
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 mt-16 ">
         <SearchBar />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[35svh] ">
            <ProjectCard />
            <ProjectCard />
           
            
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-md mt-16 h-[180%] w-[85%] border border-gray-300 ">
          <h2 className="font-bold mb-3 text-lg">Saved Projects</h2><hr className="w-[115%] border-t-2 -ml-4  border-gray-300 mt-1"/>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
