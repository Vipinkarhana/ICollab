import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../../ProjectsPage/ProjectCard';

function ProjectDiv() {
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null); // Ref for the container holding project cards
  const [isScrolled, setIsScrolled] = useState(false); // Track if scrolled to right
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false); // Track if scrolled to the end
  const [showMoreProjects, setShowMoreProjects] = useState(false); // Track if we should show more projects

  useEffect(() => {
    const fetchProjects = () => {
      setProjects([
        { id: 1, title: "Project 1", description: "This is a brief description of Project 1." },
        { id: 2, title: "Project 2", description: "This is a brief description of Project 2." },
        { id: 3, title: "Project 3", description: "This is a brief description of Project 3." },
        { id: 4, title: "Project 4", description: "This is a brief description of Project 4." },
        { id: 5, title: "Project 5", description: "This is a brief description of Project 5." },
        { id: 6, title: "Project 6", description: "This is a brief description of Project 6." },
        { id: 7, title: "Project 7", description: "This is a brief description of Project 7." },
        { id: 8, title: "Project 8", description: "This is a brief description of Project 8." },
        { id: 9, title: "Project 9", description: "This is a brief description of Project 9." },
        { id: 10, title: "Project 10", description: "This is a brief description of Project 10." },
      ]);
    };

    fetchProjects();
  }, []);

  // Scroll left by 300px
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Scroll right by 300px
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Handle scroll event to check whether to show left button or not
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsScrolled(scrollLeft > 0); // If scrolled to the right, show the "Previous" button
      setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth); // If scrolled to the end, hide the "Next" button
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-md flex flex-col justify-around items-center border border-gray-300 text-gray-800 shadow-lg">
      <div className="h-12 w-full flex justify-between items-center py-2 px-4 border-b border-gray-300">
        <div className="text-2xl font-semibold">
          <p>Projects</p>
        </div>

        {/* Replaced Link with a Button */}
        <button
          onClick={() => setShowMoreProjects(true)}
          className="text-blue-500 hover:underline text-xl font-semibold"
        >
          See All
        </button>
      </div>

      <div className="relative w-full py-4">
        {projects.length === 0 ? (
          <p className="text-center text-gray-600">No Projects available.</p>
        ) : (
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-hidden scrollbar-hide p-2"
              onScroll={handleScroll}
            >
              {/* Render Project Cards */}
              {projects.slice(0, showMoreProjects ? projects.length : 6).map((project) => (
                <div key={project.id} className="w-64 flex justify-center">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                  />
                </div>
              ))}
            </div>

            {/* Left Scroll Button */}
            {isScrolled && (
              <button
                onClick={scrollLeft}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black px-3 py-1 bg-opacity-35 hover:bg-opacity-50 rounded-full"
              >
                &#10094;
              </button>
            )}

            {/* Right Scroll Button */}
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black px-3 py-1 bg-opacity-35 hover:bg-opacity-50 rounded-full"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>

      {/* Modal to show more projects */}
      {showMoreProjects && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 h-3/4 overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
            <div className="grid grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="w-64 flex justify-center">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                  />
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
              onClick={() => setShowMoreProjects(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDiv;
