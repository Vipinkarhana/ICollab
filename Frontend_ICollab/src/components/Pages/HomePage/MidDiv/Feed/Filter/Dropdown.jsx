/**
 * @file Dropdown.js
 * @brief A reusable dropdown component for sorting options.
 * 
 * This component displays a dropdown menu with sorting options.
 * The menu opens/closes when clicked and closes when clicked outside.
 * 
 * @author [Your Name]
 * @date 2025-02-20
 */

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons

/**
 * @class Dropdown
 * @brief Implements a dropdown menu with sorting options.
 * 
 * Features:
 * - Displays sorting options in a dropdown.
 * - Closes when clicking outside.
 * - Uses icons for UX enhancement.
 */
const Dropdown = () => {

  /// @brief State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  /// @brief State to track selected sorting option
  const [selectedOption, setSelectedOption] = useState("All"); 

  /// @brief Reference to dropdown container to detect outside clicks
  const dropdownRef = useRef(null);

  /// @brief Sorting options available in the dropdown
  // Array of options
  const options = [
    "All",
    "Recent",
    "Network",
    "Oldest",
  ];

   /**
   * @brief Effect to handle clicks outside the dropdown and close it.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    /**
   * @brief Handles selection of an option and closes the dropdown.
   * @param option Selected sorting option.
   */
  const handleSelect = (option) => {
    setSelectedOption(option); // Update selected option
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div
      className="relative w-auto flex items-center justify-center"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" flex items-center text-gray-700 w-full text-sm focus:outline-none"
      >
        Sort By: <span className="font-semibold ml-1 text-black">{selectedOption}</span>
        {isOpen ? (
          <ChevronUp className="ml-2 w-5 h-5" />
        ) : (
          <ChevronDown className="ml-2 w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-48 mr-3 w-36 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                selectedOption === option ? "bg-gray-200 font-bold" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
