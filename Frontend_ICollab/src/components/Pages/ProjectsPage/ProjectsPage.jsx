import React, { useState } from "react";
import ProjectCard from "../../Common/ProjectCard"; // Adjust path
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const ProjectsPage = () => {
  const currentUser = useSelector((state) => state.user.userData);
  const username = currentUser?.username;
  const projectData = [
    {
      title: "LUFY - Law Understandable For You",
      type: "AI Tool",
      status: "Ongoing Project",
      field: "Legal Tech",
      collaborators: 356,
      startDate: "21/04/25",
      avatarSeeds: ["Sara", "Tom", "Riya"],
      buttonText: "Join Now"
    },
    {
      title: "GreenTech Innovators",
      type: "Startup Challenge",
      status: "Finished Project",
      field: "Environmental",
      collaborators: 98,
      startDate: "05/02/25",
      avatarSeeds: ["Alex", "Nina", "Dev"],
      buttonText: "View Report"
    },
    {
      title: "ByteCraft Hackathon",
      type: "Hackathon",
      status: "Upcoming Project",
      field: "Open Source",
      collaborators: 512,
      startDate: "01/05/25",
      avatarSeeds: ["Liam", "Emma", "Zed"],
      buttonText: "Register"
    },
    {
      title: "MedScan AI",
      type: "AI Innovation",
      status: "Ongoing Project",
      field: "Healthcare",
      collaborators: 274,
      startDate: "18/04/25",
      avatarSeeds: ["Ava", "John", "Sophia"],
      buttonText: "Apply Now"
    },
    {
      title: "Space & Beyond",
      type: "Research Program",
      status: "Finished Project",
      field: "Astronomy",
      collaborators: 78,
      startDate: "11/03/25",
      avatarSeeds: ["Neil", "Galileo", "Nova"],
      buttonText: "Explore"
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [<ProjectCard />, <ProjectCard />, <ProjectCard />, <ProjectCard />];
  const cardsPerPage = 2;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const paginatedCards = cards.slice(
    activeIndex * cardsPerPage,
    activeIndex * cardsPerPage + cardsPerPage
  );

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      <div className="max-w-6xl mx-auto">

        {/* Search + Button */}
        <div className="flex justify-center items-center w-full ">
          <div className="flex items-center justify-center gap-4 mb-6 w-[100%]">
            <div className="w-[80%]">
              <SearchBar />
            </div>
            <Link to={`/profile/${username}`} className="bg-blue-300 w-40 h-10 text-lg text-white px-4 py-2 rounded-md hover:bg-blue-400  flex items-center justify-center -mt-3">
              Your Project <span>{'>'}</span>
            </Link>
          </div>
        </div>

        {/* Slider-like card display */}
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          {paginatedCards.map((card, idx) => (
            <div key={idx} className="flex-shrink-0 w-full sm:w-[48%]">
              {card}
            </div>
          ))}
        </div>

        {/* Dot Navigation with sliding indicator */}
        <div className="mt-6 relative flex justify-center items-center gap-6">
          {/* Sliding active dot background */}
          <div
            className="absolute w-3 h-3 bg-blue-500 rounded-full transition-transform duration-300"
            style={{
              transform: `translateX(${activeIndex * 2.25}rem)`,
            }}
          ></div>

          {/* Static dots */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full bg-gray-300 z-10"
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>

        {/* Open label and button aligned */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Open</p>
          <button className="bg-blue-300 w-40 h-14 text-white px-4 py-2 rounded-md hover:bg-blue-400 text-sm">
            All open projects <span>{'>'}</span>
          </button>
        </div>

        {/* Static Project Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
        {projectData.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          type={project.type}
          status={project.status}
          field={project.field}
          collaborators={project.collaborators}
          startDate={project.startDate}
          avatarSeeds={project.avatarSeeds}
          buttonText={project.buttonText}
        />
      ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectsPage;
