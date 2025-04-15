import React, { useState, useRef, useEffect } from "react";
import { Bookmark, Send, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-8 shadow-md rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="w-24 h-24 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
          <img
            src="/LandingImage.png"
            alt="Logo"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex justify-evenly flex-col w-[75%] h-full gap-1">
          <h3 className="text-lg font-semibold text-gray-800">
            LUFY - Law Understandable For You
          </h3>
          <p className="text-sm text-gray-500">Built with passion</p>
          <p className="text-sm text-gray-600 mt-2">
            Lufy is an AI-powered legal document summarizer that extracts key
            information from text, PDFs, and Word files...
          </p>
          <Link
            to="/projectpreview"
            className="text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md px-2 py-2 mt-2 w-28 justify-center flex items-center"
          >
            View
          </Link>
        </div>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            ref={buttonRef}
            className="flex items-center justify-center"
            onClick={toggleDropdown}
          >
            <span className="text-2xl font-bold text-gray-600">&#x22EE;</span>
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-36 z-10"
            >
              <ul className="text-sm">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                  <Bookmark size={20} />
                  <span>Save</span>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                  <Send size={20} />
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
