import React from "react";
import {
  Eye,
  Github,
  Linkedin,
  Globe,
  Pencil
} from "lucide-react";
import { Link } from "react-router-dom";
import CollabButton from "../../Common/CollabButton";
import Carousel from "./Carousel";

function ProjectIntro({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col items-center p-4">
        <div className="w-full flex justify-end sm:hidden"
      >
        <Link
          to="/project/create"
          className="border border-gray-400 rounded-full p-4 text-purple-700 hover:bg-gray-100 transition text-sm md:text-lg font-semibold flex  sm:hidden justify-evenly items-center gap-2"
        >
          <Pencil size={24} strokeWidth={2.1}/>
        </Link>
      </div>
      {/* Top Section */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
        
        {/* Logo */}
        <div className="flex justify-center lg:justify-start w-full lg:w-[15%]">
          <div className="h-28 w-28 rounded-md overflow-hidden sm:ml-16">
            <img
              src="https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F77e90ba53cec4f1883f1a5d3350f6e82%2Fprojects%2F226d73c18e3148c8854d27868b6188c4%2Fa67a5df8-2e9a-4cfe-a6d0-bae79844512c.jpeg&w=1440&q=75"
              alt="logo"
              className="object-cover h-full w-full "
            />
          </div>
        </div>

        {/* Title and Info */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-[50%] text-center lg:text-left">
          <div>
            <h1 className="font-bold text-4xl sm:text-5xl">CareTrack</h1>
            <p className="text-gray-500 text-lg sm:text-xl mt-1">
              Navigating Your Health Journey with Care and Precision!
            </p>
          </div>

          <div className="sm:flex hidden flex-row sm:flex-row sm:items-center gap-3 mt-4 w-full">
            <button className="border-2 rounded-md flex  items-center justify-center gap-2 text-lg px-4 py-1">
              <Eye size={24} />
              47
            </button>
            <CollabButton className="w-32" />
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start text-gray-500 text-sm gap-2 mt-2">
            <p>Created on 21st October 2023</p>
            <span className="hidden sm:inline">•</span>
            <p>Updated on 1st October 2025</p>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="flex flex-col w-full lg:w-[30%] gap-4 items-center lg:items-end">
          {/* Links */}
          <div className="flex gap-2 flex-wrap justify-center lg:justify-end">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 rounded-full sm:p-2 p-4 border-2 sm:border-white  hover:border-blue-600"
            >
              <Github size={24} strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 rounded-full sm:p-2 p-4 border-2 sm:border-white  sm:hover:border-blue-600"
            >
              <Linkedin size={24} strokeWidth={1.5} />
            </a>
            <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 rounded-full sm:p-2 p-4 border-2 sm:border-white  hover:border-blue-600"
            >
              <Globe size={24} strokeWidth={1.5} />
            </a>
            <Link
              to={"/profile/edit"}
              className="border hidden sm:block border-gray-300 rounded-md px-3 py-2 text-purple-700 hover:bg-gray-100 text-sm font-semibold"
            >
              Edit Project
            </Link>
          </div>

          {/* Description */}
          <div className="text-justify px-2 text-sm sm:text-base text-gray-700">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
              magni quos fugit labore eum cumque veritatis dolores dolorem vitae
              molestias. Et sunt asperiores aspernatur delectus, perferendis
              dolor earum aut velit officiis deserunt.
            </p>
          </div>
        </div>
        <div className="flex sm:hidden">
        <CollabButton className="w-32" />
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full mt-10">
        <Carousel />
      </div>
    </div>
  );
}

export default ProjectIntro;
