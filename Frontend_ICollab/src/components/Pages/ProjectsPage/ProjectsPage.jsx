import React, { useState, useEffect } from "react";
import ProjectCard from "../../Common/ProjectCard"; // Adjust path if needed
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateProjectButton from "../../Common/CreateProjectButton";

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
      endDate: "12/09/25",
      avatarSeeds: ["Sara", "Tom", "Riya"],
      buttonText: "Join Now",
    },
    {
      title: "GreenTech Innovators",
      type: "Startup Challenge",
      status: "Finished Project",
      field: "Environmental",
      collaborators: 98,
      startDate: "05/02/25",
      endDate: "12/09/25",
      avatarSeeds: ["Alex", "Nina", "Dev"],
      buttonText: "View Report",
    },
    {
      title: "ByteCraft Hackathon",
      type: "Hackathon",
      status: "Upcoming Project",
      field: "Open Source",
      collaborators: 512,
      startDate: "01/05/25",
      endDate: "12/09/25",
      avatarSeeds: ["Liam", "Emma", "Zed"],
      buttonText: "Register",
    },
    {
      title: "MedScan AI",
      type: "AI Innovation",
      status: "Ongoing Project",
      field: "Healthcare",
      collaborators: 274,
      startDate: "18/04/25",
      endDate: "12/09/25",
      avatarSeeds: ["Ava", "John", "Sophia"],
      buttonText: "Apply Now",
    },
    {
      title: "Space & Beyond",
      type: "Research Program",
      status: "Finished Project",
      field: "Astronomy",
      collaborators: 78,
      startDate: "11/03/25",
      endDate: "12/09/25",
      avatarSeeds: ["Neil", "Galileo", "Nova"],
      buttonText: "Explore",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(2); // Initial ongoing projects count
  const [finishedCount, setFinishedCount] = useState(2); // Initial finished projects count

  const cardsPerPage = 2;
  const totalPages = 2; // fixed to only 2 dots as requested

  const ongoingProjects = projectData.filter(project => project.status === "Ongoing Project");
  const finishedProjects = projectData.filter(project => project.status === "Finished Project");

  const paginatedOngoingCards = ongoingProjects
    .slice(0, ongoingCount)
    .map((project, index) => (
      <ProjectCard
        key={index}
        title={project.title}
        type={project.type}
        status={project.status}
        field={project.field}
        collaborators={project.collaborators}
        startDate={project.startDate}
        endDate={project.endDate}
        avatarSeeds={project.avatarSeeds}
        buttonText={project.buttonText}
      />
    ));

  const paginatedFinishedCards = finishedProjects
    .slice(0, finishedCount)
    .map((project, index) => (
      <ProjectCard
        key={index}
        title={project.title}
        type={project.type}
        status={project.status}
        field={project.field}
        collaborators={project.collaborators}
        startDate={project.startDate}
        endDate={project.endDate}
        avatarSeeds={project.avatarSeeds}
        buttonText={project.buttonText}
      />
    ));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col  items-center w-full py-6 bg-gray-100  mt-16">
      <div className="max-w-6xl mx-auto">
       {/* Search + Button */}
<div className="flex justify-center items-center w-full">
  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 w-full sm:w-[90%] px-4">
    
    {/* Search bar */}
    <div className="sm:w-[80%] w-full">
      <SearchBar />
    </div>

    {/* Button - visible from md screens onwards */}
    <div className="sm:w-[20%] w-full flex sm:items-start items-center justify-center sm:justify-end">
      <Link
        to={`/profile/${username}`}
        className="bg-blue-300 w-44 h-12 text-xl text-white px-4 py-2 rounded-full hover:bg-blue-400 
        hidden md:flex items-center justify-center gap-1 mt-5"
      >
        Your Project <span>{">"}</span>
      </Link>
    </div>

  </div>
</div>



        {/* Slider-like card display */}
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          {paginatedOngoingCards.map((card, idx) => (
            <div key={idx} className="flex-shrink-0 w-full sm:w-[48%]">
              {card}
            </div>
          ))}
        </div>

        {/* Dot Navigation */}
        <div className="mt-6 flex justify-center items-center gap-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>

        {/* Ongoing Projects Section */}
        <div className="mt-6 flex items-center justify-between">
          <p className="sm:text-2xl text-3xl text-gray-800">Ongoing</p>
          <button className="bg-blue-300 sm:w-40 h-14 text-white px-4 py-4 rounded-md hover:bg-blue-400 text-sm md:flex hidden">
            All open projects <span>{">"}</span>
          </button>
        </div>

        {/* Static Project Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {paginatedOngoingCards}
        </div>

        {/* More Button in the middle of the cards */}
        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={() => setOngoingCount(ongoingCount + 2)} // Increase by 2 to load more cards
            className="bg-blue-300 sm:w-40 w-[40%] h-14 text-white sm:px-4 sm:py-2 rounded-md hover:bg-blue-400 text-sm"
          >
           Load More <span>{">"}</span>
          </button>
        </div>

        {/* Finished Projects Section */}
        <div className="mt-6 flex items-center justify-between">
          <p className="sm:text-2xl text-3xl text-gray-800">Finished</p>
          <button className="bg-blue-300 sm:w-40 h-14 text-white px-4 py-4 rounded-md hover:bg-blue-400 text-sm  md:flex hidden">
            All open projects <span>{">"}</span>
          </button>
        </div>

        {/* Static Project Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {paginatedFinishedCards}
        </div>

        {/* More Button in the middle of the cards */}
        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={() => setFinishedCount(finishedCount + 2)} // Increase by 2 to load more cards
            className="bg-blue-300 sm:w-40 w-[40%]  h-14 text-white sm:px-4 sm:py-2 rounded-md hover:bg-blue-400 text-sm"
          >
           Load More <span>{">"}</span>
          </button>
        </div>
      </div>
      <CreateProjectButton/>
    </div>
  );
};

export default ProjectsPage;
