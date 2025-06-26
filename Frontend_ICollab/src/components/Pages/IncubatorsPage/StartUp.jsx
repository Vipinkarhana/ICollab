import React, { useState } from "react";
import { Search } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import StartupCards from "./StartupCards"; // This should accept `startupsData` as prop

const StartUp = ({ startupsData = [StartupCards] }) => {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  const filteredStartups = startupsData.filter((startup) => {
    const matchesSearch = startup.name.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" ||
      startup.tags.some((tag) => tag.toLowerCase() === industryFilter.toLowerCase());

    // You can expand logic to include `stageFilter` if startup has stage info
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-14 flex">
      <SidebarHeader />

      <main className="container mx-auto p-6 ml-64">
        <h1 className="text-3xl font-bold mb-6">Our Portfolio Startups</h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 ">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search startups..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="min-w-[180px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <option value="all">All Industries</option>
            <option value="iot">IoT</option>
            <option value="healthcare">Healthcare</option>
            <option value="agriculture">Agriculture</option>
          </select>

          <select
            className="min-w-[180px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="all">All Stages</option>
            <option value="pre-seed">Pre-Seed</option>
            <option value="seed">Seed</option>
            <option value="series-a">Series A</option>
          </select>
        </div>

        {/* Startups Grid */}
        {filteredStartups.length === 0 ? (
          <p className="text-center text-gray-500">No startups found.</p>
        ) : (
          <StartupCards startups={filteredStartups} />
        )}
      </main>
    </div>
  );
};

export default StartUp;
