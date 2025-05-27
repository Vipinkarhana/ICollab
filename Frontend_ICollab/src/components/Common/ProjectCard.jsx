import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EllipsisVertical, UserPlus, Trash2, PinOff , Edit2 as EditIcon } from "lucide-react";
import { toggleSaveProject, deleteProject } from "../../Services/projectService";
import {
  BookmarkIcon as OutlineBookmark,
  BookmarkIcon as SolidBookmark,
} from "@heroicons/react/24/solid";

const ProjectCard = ({
  project,
  onSave,
  onDelete,
}) => {
console.log("Project: ",project);


  // Derived values
  const status = project?.isOngoing ? 'Ongoing Project' : 'Finished Project';
  const avatarSeeds = project?.collaborator?.map(c => c.username || 'user');
  const collaborators = project?.collaborator?.length;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const startDate = formatDate(project?.startDate);
  const updatedDate = formatDate(project?.updatedAt);
  const endDate = formatDate(project?.endDate);

  // Rest of your existing component JSX remains the same
  // Just update the date display part:
  {status === 'Ongoing Project' ? (
    <span className="text-gray-700">Last updated: {project?.updatedAt}</span>
  ) : (
    <span className="text-gray-700">Ended: {project?.endDate}</span>
  )}


  const [menuOpen, setMenuOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(project?.isSaved || false);

  useEffect(() => {
    setBookmarked(project?.isSaved);
  }, [project?.isSaved]);
  
  const menuRef = useRef(null);

  const currentUser = useSelector((state) => state?.user?.userData);
  const ownerId = project.user?._id || project?.user; // Handle both populated and unpopulated user
  const isOwner = String(currentUser?._id) === String(ownerId);
  console.log("Current User ID:", currentUser?._id);
console.log("Project Owner ID:", ownerId);
console.log("Is Owner:", isOwner);

  const handleDelete = async () => {
    try {
      await deleteProject(project?._id);
      if (onDelete) onDelete(project?._id);
    } catch (error) {
      console.error("Delete failed:", error.response?.data?.message || error.message);
    }
  };

  const handleToggleSave = async () => {
    try {
      // Call the API to toggle save status
      const response = await toggleSaveProject(project?._id);
      const isNowSaved = response?.status === 'saved';
      
      // Update local state
      setBookmarked(isNowSaved);
      
      // Notify parent component if provided
      if (onSave) {
        onSave(project?._id, isNowSaved);
      }
    } catch (error) {
      console.error('Failed to toggle save:', error);
      // Revert UI state on error
      setBookmarked(prev => !prev);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative w-full sm:min-w-[34rem] sm:h-[20rem] bg-white p-5 sm:p-6 rounded-xl shadow-md flex flex-col justify-between font-sans border border-white sm:hover:border-blue-500 transition-all duration-200">
      {/* Top Section: Title + Type + Menu */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
            {/* {title} */}
            {project?.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 tracking-wide mt-1">
            {project?.type}
          </p>
        </div>

        {/* 3 Dots Menu with Ref */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            <EllipsisVertical size={24} strokeWidth={2} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
              <button className="flex items-center gap-2 px-4 py-2 text-lg text-blue-600  hover:bg-gray-100 w-full text-left">
                <UserPlus size={18} />
                Collab
              </button>
              <button
                onClick={handleToggleSave}
                className="flex items-center gap-2 px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {bookmarked ? (
                  <>
                    <SolidBookmark className="w-5 h-5 text-blue-500" />
                    Unsave
                  </>
                ) : (
                  <>
                    <OutlineBookmark className="w-5 h-5 text-gray-500" />
                    Save
                  </>
                )}
              </button>

              {isOwner && (
              <Link 
                  to={`/projects/edit/${project._id}`}
                  className="flex items-center gap-2 px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
              >
              <EditIcon size={18} />
                Edit
              </Link>
           )}
             
              {/* <button className="flex items-center gap-2 px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left">
              < PinOff color="gray" size={18} />
               <p>Pin</p>
              </button> */}
              {isOwner && (
              <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-lg text-red-700 hover:bg-gray-100 w-full text-left">
              < Trash2 color="red" size={18} />
               <p>Delete</p>
              </button>
              )}
            </div>
          )}
          
        </div>
      </div>

      {/* Status + Avatars + Collaborators */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-xs sm:text-lg text-gray-500 font-medium uppercase tracking-wider">
            Status
          </p>
          <div className="inline-block mt-1 px-3 py-[0.25rem] text-sm sm:text-base text-gray-700 border border-gray-300 rounded-full">
            {status}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {(avatarSeeds || [])?.slice(0, 3)?.map((seed, index) => (
              <img
                key={index}
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white"
                alt={`avatar-${seed}`}
              />
            ))}
          </div>
          <span className="text-sm sm:text-base text-green-600 font-medium">
            +{collaborators} Collaborators
          </span>
        </div>
      </div>

      {/* Field, Dates & View Button */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm sm:text-base text-gray-800 font-medium">
        <button className="uppercase px-3 py-1 bg-blue-200 hover:bg-blue-400 rounded-md text-xs sm:text-lg">
          {project?.category}
          {/* {Array.isArray(project.category) ? field.join(', ') : field} */}
        </button>
        <span className="text-gray-700">Started on: {startDate}</span>
        {status === 'Ongoing Project' ? (
    <span className="text-gray-700">Last updated on: {updatedDate}</span>
  ) : (
    <span className="text-gray-700">Ended: {endDate}</span>
  )}
        <Link to={`/project/${project?._id || project?.id}`} className="ml-auto" onClick={() => {(()=>{window.scrollTo({top:0, behavior:"smooth"})})}}>
          <button className="px-4 py-1.5 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 transition">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
