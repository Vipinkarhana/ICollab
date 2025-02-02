import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All"); 
  const dropdownRef = useRef(null);

  // Array of options
  const options = [
    "All",
    "Recent",
    "Network",
    "Oldest",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
