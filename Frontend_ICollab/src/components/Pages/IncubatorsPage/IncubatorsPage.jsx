import React, { useState } from "react";
import { Rocket, Calendar, Link as LinkIcon, Menu } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import StartupCards from "./StartupCards";
import UpcomingEvents from "./EventCard";
import IncubatorCards from "./IncubatorDataCards";

const IncubatorsPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 mt-14 flex flex-col">
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div className="md:block hidden">
          <SidebarHeader />
        </div>

        {/* Mobile Sidebar (slide-in) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed top-0 left-0 z-50 w-64 bg-white h-full shadow-md transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
        >
          <SidebarHeader />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-64 w-full">
          {/* Top navbar with Hamburger menu (mobile only) */}
          <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 flex items-center px-4 md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={24} className="text-gray-700" />
            </button>
            <h1 className="ml-4 text-lg font-semibold text-gray-800">
              IncubatorHub
            </h1>
          </div>

          <main className="flex-1 max-w-6xl mx-auto px-4 pt-20 pb-10 sm:-mt-14">
            {/* Profile Banner */}
            <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute bottom-[-80px] right-[-30px] w-[250px] h-[250px] bg-white/5 rounded-full pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-white text-blue-800 text-2xl font-bold rounded-full flex items-center justify-center shrink-0 ml-24 sm:ml-0">
                  IH
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Innovation Hub Incubator
                  </h1>
                  <div className="flex items-center gap-2 text-white mt-1">
                    <span>
                      <strong>@innovationhub_591bf3908</strong> was incorporated
                      as an incubator on{" "}
                      <span className="underline underline-offset-2 font-medium">
                        {new Date("2017-06-15").toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </span>
                  </div>
                  <p className="mt-2">
                    Building an innovation-driven incubator specializing in IoT
                    solutions, industrial automation, and smart technologies.
                    Our mission is to bridge the gap between research and
                    industry.
                  </p>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">24</div>
                      <div className="text-sm">Startups</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">17</div>
                      <div className="text-sm">Posts</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">12</div>
                      <div className="text-sm">Mentors</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">8</div>
                      <div className="text-sm">Programs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Startups */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Rocket /> Featured Startups
              </h2>
              <div className="mt-4">
                <StartupCards />
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="sm:-mt-80 ">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Calendar /> Upcoming Events
              </h2>
              <div className="flex flex-wrap gap-6 mt-0 ">
                <UpcomingEvents />
              </div>
            </div>

            <IncubatorCards />
          </main>
        </div>
      </div>
    </div>
  );
};

export default IncubatorsPage;
