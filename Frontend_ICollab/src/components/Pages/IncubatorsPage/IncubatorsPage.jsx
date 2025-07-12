import React, { useState } from "react";
import {
  Rocket,
  Calendar,
  Link as LinkIcon,
  Sidebar,
  Menu,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import StartupCards from "./StartupCards";
import UpcomingEvents from "./EventCard";
import IncubatorCards from "./IncubatorDataCards";
import { useIncubator } from "../../Common/IncubatorContext";
import IncubatorLanding from "../LandingPage/IncubatorLanding";
import EditIncubatorModal from "./EditIncubatorModal";

const IncubatorsPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { status, incubatorData } = useIncubator();
  const incubator = incubatorData?.incubator;
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Application Under Review</h2>
          <p>
            Your incubator profile is currently under review. You'll gain full
            access once approved. <br />
            Please check back later or contact support for more information.{" "}
            <br />
            Also, please keep checking your email for updates on your
            application. <br />
            Your email : {incubator.email}
          </p>
        </div>
      </div>
    );
  }

  if (status === "not_applied") {
    return <IncubatorLanding />;
  }

  if (status === "approved") {
    return (
      <div className="h-auto bg-gray-50 mt-14 flex flex-col ">
        {/* Layout: Sidebar + Main Content */}
        <div className="flex flex-1">
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

            <div>
              {/* Banner */}
              {/* Other sections */}
            </div>

            <main className="flex-1 max-w-6xl mx-auto px-4 pt-20 pb-10 sm:-mt-14">
              {/* Profile Banner */}
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="flex items-center gap-1 bg-white text-blue-800 px-4 py-2 rounded-md text-sm font-semibold shadow hover:bg-gray-100"
                  >
                    {/* Show Pencil on mobile only */}
                    <Pencil size={16} className="sm:hidden" />

                    {/* Show text on tablet & desktop only */}
                    <span className="hidden sm:inline">Edit Profile</span>
                  </button>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white/10 rounded-full pointer-events-none" />
                <div className="absolute bottom-[-80px] right-[-30px] w-[250px] h-[250px] bg-white/5 rounded-full pointer-events-none" />

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                  <div className="w-20 h-20 bg-white text-blue-800 text-2xl font-bold rounded-full flex items-center justify-center shrink-0 ml-24 sm:ml-0">
                    {incubator.nameOfIncubator
                      ? incubator.nameOfIncubator.slice(0, 2).toUpperCase()
                      : "IH"}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {incubator.nameOfIncubator || "Unnamed Incubator"}
                    </h1>
                    <div className="flex items-center gap-2 text-white mt-1">
                      <span>
                        <strong>@{incubatorData.username}</strong>
                      </span>
                      <a href="#">
                        <LinkIcon size={16} />
                      </a>
                      <span>was incorporated an incubator on </span>
                      <span className="underline underline-offset-2 font-medium">
                        {new Date(
                          incubatorData.incorporatedOn
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="mt-2">
                      This page display the detailed data of the incubator. You
                      can edit the data by clicking on the edit button in the
                      top right corner. Please note that the edited data will be
                      sent for review and approval. Once approved, the data will
                      be updated on this page.
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

              <IncubatorCards />

              {/* Featured Startups */}
              <section className="mb-8 ">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Rocket /> Featured Startups
                </h2>
                <div className="flex flex-row-1 sm:flex-row-2 lg:flex-row-3 gap-4 mt-4">
                  {/* Add startup cards here */}
                  <StartupCards />
                </div>
                <div className="mb-6">
                <Link
                  to="/startup"
                  className="block -mt-60 text-blue-600 hover:underline"
                >
                  View All Startups →
                </Link>
                </div>
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
        {/* Modal */}
        <EditIncubatorModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      </div>
    );
  }
};

export default IncubatorsPage;
