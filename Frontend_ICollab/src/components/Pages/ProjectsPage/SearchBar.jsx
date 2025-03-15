import React from "react";
import { Search, SlidersHorizontal } from  'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative flex items-center bg-white rounded-full h-12 shadow-md p-2 mb-4 w-full">
      <Search className="absolute left-3 text-gray-500" />
      <input
        type="text"
        placeholder="Search Project"
        className="w-full pl-10 pr-10 py-2 rounded-md border-none focus:ring-0 focus:outline-none"
      />
      {/* <FiSliders className="absolute right-3 text-gray-500 cursor-pointer" /> */}
      <SlidersHorizontal className="absolute right-3 text-gray-500 cursor-pointer" />
    </div>
  );
};

export default SearchBar;