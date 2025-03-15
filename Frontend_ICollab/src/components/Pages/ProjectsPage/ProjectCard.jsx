// ProjectCard.jsx

const ProjectCard = () => {
  return (
      <div className="bg-white p-4 rounded-lg shadow-md w-64 h-85 border border-gray-300">
        <img
          src="/LandingImage.png"
          alt="Project"
          className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="mt-2 font-semibold text-lg">Project Title</h3>
        <p className="text-gray-600 text-sm">Project brief description in some words...</p>
        <button className="mt-2 bg-blue-500 text-white px-9 py-2 rounded-md hover:bg-blue-600 w-[50%] ml-14">
          View
        </button>
      </div>
    
  );
};

export default ProjectCard;
 // Ensure this export is present
  