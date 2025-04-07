import React, { useState } from 'react';
import { UserPlus, Bookmark, FileText } from 'lucide-react';

const Head = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='w-full px-4 relative'>
      {/* Collab Button and Three Dots Menu */}
      <div className="absolute top-4 right-4 flex flex-row sm:flex-row items-center sm:items-center sm:gap-10 gap-4 -mt-6">
        {/* Collab Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-300 ">
          <UserPlus size={20} />
          <span className="inline sm:inline">Collab</span> {/* Ensure text is always visible */}
        </button>

        {/* Three Dots Dropdown Button */}
        <div className="relative">
          <button
            className=" flex items-center justify-center "
            onClick={toggleDropdown}
          >
            <span className="text-2xl font-bold text-gray-600">&#x22EE;</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-36 z-10">
              <ul className="text-sm">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                  <Bookmark size={20} />
                  <span>Saved</span>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                  <FileText size={20} />
                  <span>Report</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Project Title */}
      <div className="text-2xl sm:text-4xl font-bold text-gray-800  md:text-left mt-6 mb-8 ">
        Project Title
      </div>

      {/* Image Section */}
      <div className="bg-white rounded-2xl w-full max-w-full overflow-hidden flex justify-center">
        <img
          src="/LandingImage.png"
          alt="Landing Image"
          className="w-auto h-[20rem] md:h-[30rem] lg:h-[40rem] "
        />
      </div>
    </div>
  );
};

export default Head;
 

