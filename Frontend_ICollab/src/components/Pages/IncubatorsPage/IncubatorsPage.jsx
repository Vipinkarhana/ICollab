import React from "react";
import { Rocket, Calendar, Link as LinkIcon, Sidebar } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import StartupCards from "./StartupCards";
import UpcomingEvents from "./EventCard";

const IncubatorsPage = () => {
  return (
    <div className="h-auto bg-gray-50 mt-14 flex flex-col ">
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarHeader />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <main className="flex-1 max-w-6xl mx-auto p-6">
            {/* Profile Banner with Gradient + Circles */}
            <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              {/* Decorative Circles */}
              <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute bottom-[-80px] right-[-30px] w-[250px] h-[250px] bg-white/5 rounded-full pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-white text-blue-800 text-2xl font-bold rounded-full flex items-center justify-center shrink-0">
                  IH
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Innovation Hub Incubator
                  </h1>
                  <div className="flex items-center gap-2 text-white mt-1">
                    <span>@innovationhub_591bf3908</span>
                    <a href="#">
                      <LinkIcon size={16} />
                    </a>
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
            <section className="mb-8 ">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Rocket /> Featured Startups
              </h2>
              <div className="flex flex-row-1 sm:flex-row-2 lg:flex-row-3 gap-4 mt-4">
                {/* Add startup cards here */}
                <StartupCards />
              </div>
              <a
                href="startups.html"
                className="block mt-4 text-blue-600 hover:underline"
              >
                View All Startups →
              </a>
            </section>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Calendar /> Upcoming Events
              </h2>
              <div className="flex flex-row-1 sm:flex-row-2 lg:flex-row-3 gap-6 ">
                <UpcomingEvents />
              </div>
              {/* <div className="mt-6">
                <a
                  href="#"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View All Events →
                </a>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default IncubatorsPage;
