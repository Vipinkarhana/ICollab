import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import StartupCards from "./StartupCards";

const StartUp = ({ startupsData = [] }) => {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const filteredStartups = startupsData.filter((startup) => {
    const matchesSearch = startup.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" ||
      startup.tags.some(
        (tag) => tag.toLowerCase() === industryFilter.toLowerCase()
      );
    const matchesStage =
      stageFilter === "all" ||
      startup.stage?.toLowerCase() === stageFilter.toLowerCase();
    return matchesSearch && matchesIndustry && matchesStage;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-14 flex w-full overflow-x-hidden">
      <div className="flex flex-1 relative w-full">
        {/* Sidebar (Desktop) */}
        <div className="hidden md:block">
          <SidebarHeader />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 z-50 w-64 bg-white h-full shadow-md transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
        >
          <SidebarHeader />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full overflow-x-hidden">
          {/* Mobile Top Navbar */}
          <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 flex items-center px-4 md:hidden mt-14">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={24} className="text-gray-700" />
            </button>
            <h1 className="ml-4 text-lg font-semibold text-gray-800">
              IncubatorHub
            </h1>
          </div>

          <main className="p-4 sm:p-6 md:ml-64 mt-16 w-full max-w-[1100px] mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:-mt-8">
              Our Portfolio Startups
            </h1>

            <div className="w-full flex flex-wrap lg:flex-nowrap gap-4 mb-8">
              {/* Search Input - 50% on large screens */}
              <div className="w-full  lg:w-[47%] relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Industry Filter - 25% on large screens */}
              <div className="w-full lg:w-[25%]">
                <select
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <option value="all">All Industries</option>
                  <option value="iot">IoT</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="agriculture">Agriculture</option>
                </select>
              </div>

              {/* Stage Filter - 25% on large screens */}
              <div className="w-full lg:w-[25%]">
                <select
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                >
                  <option value="all">All Stages</option>
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                </select>
              </div>
            </div>

            {/* Startups Grid */}
            {filteredStartups.length === 1 ? (
              <p className="text-center text-gray-500 ">No startups found.</p>
            ) : (
              <StartupCards startups={filteredStartups}  />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default StartUp;
