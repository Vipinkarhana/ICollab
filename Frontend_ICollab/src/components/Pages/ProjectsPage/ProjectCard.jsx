import React, { useState } from 'react';
import { Bookmark, Send, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full p-8 shadow-md rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-start gap-4">
        {/* Image without importing */}
        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
          <img
            src="/LandingImage.png" // Image from the 'public' directory or URL
            alt="Logo"
            className="object-cover w-10 h-10"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            LUFY - Law Understandable For You
          </h3>
          <p className="text-sm text-gray-500">Built with passion</p>
          <p className="text-sm text-gray-600 mt-2">
            Lufy is an AI-powered legal document summarizer that extracts key
            information from text, PDFs, and Word files...
          </p>
          <Link to="/project_preview" className="text-lg text-gray-500 hover:text-blue-600 mt-2">
            View
          </Link>
        </div>

        {/* 3 Dot Dropdown Button */}
        <div className="relative">
          <button
            className="flex items-center justify-center"
            onClick={toggleDropdown}
          >
            <span className="text-2xl font-bold text-gray-600">&#x22EE;</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-36 z-10">
              <ul className="text-sm">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                  <Bookmark size={20} />
                  <span>Save</span>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                  <Send  size={20} />
                  <span>Send</span>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                  <UserPlus size={20} />
                  <span>Collab</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
