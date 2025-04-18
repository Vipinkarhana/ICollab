import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const categories = ["Hackathons", "Projects", "Builders"];
const filterOptions = {
  Type: ["Online", "Offline"],
  City: ["Delhi", "Bangalore", "Mumbai"],
  Status: ["Upcoming", "Ongoing", "Ended"],
  Rated: ["High", "Medium", "Low"],
  Sort: ["Newest", "Popular"],
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Hackathons");
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Search:", searchQuery);
    console.log("Category:", activeCategory);
    console.log("Filters:", filters);
    // Perform your API call or filtering here
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full">
      {/* Search Bar */}
      <div className="relative flex items-center bg-white rounded-full h-12 shadow-sm p-2 mb-4">
        <Search className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search Project"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 rounded-md border-none focus:ring-0 focus:outline-none"
        />
        <SlidersHorizontal
          className="absolute right-3 text-gray-500 cursor-pointer"
          onClick={() => setShowFilters((prev) => !prev)}
        />
      </div>

      {/* Conditional Filters Panel */}
      {showFilters && (
        <>
          {/* Categories + Filters */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Categories */}
            <div className="md:w-1/4 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                    activeCategory === cat
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(filterOptions).map((filterKey) => (
                <div key={filterKey}>
                  <label className="block text-sm font-medium mb-1">{filterKey}</label>
                  <select
                    value={filters[filterKey] || ""}
                    onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    {filterOptions[filterKey].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-4 text-right">
            <button
              onClick={applyFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
