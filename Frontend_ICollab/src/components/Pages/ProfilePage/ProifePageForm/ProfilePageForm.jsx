import React, { useState } from "react";
import Education from "./Education"; // Import the Education component
import Experience from "./Experience";
import Links from "./Links";
import Contact from "./Contact";
import PageNavbar from "../../../Common/PageNavbar";
function ProfilePageForm() {

  const [activeTab, setActiveTab] = useState("ABOUT");
  const tabs = [
    "ABOUT",
    "EDUCATION",
    "EXPERIENCE",
    "LINKS",
    "CONTACT"
  ];
  return (
    <div className="w-[100svw] min-h-screen flex flex-col justify-start items-start m-0 p-0 mt-14">
      <div className="flex justify-center items-center w-full h-[20svh] bg-white   p-4">
        <PageNavbar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="w-[50%] h-[11svh]"
        />
      </div>

      {/* Main Content */}
      <main className="w-[80svw] mx-auto p-4">
        {activeTab === "ABOUT" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <section className="bg-white p-6 rounded-lg shadow h-auto">
              <h2 className="text-2xl font-semibold mb-4">Basic information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value="Mohit"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value="Goel"
                    className="mt-1 block w-full border rounded-md shadow-sm px-3 py-2"
                  />
                </div>
                <hr className="border-b border-gray-200 m-4 w-full -ml-1" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    I Identify As
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* About You */}
            <section className="bg-white p-6 rounded-lg shadow h-[100%]">
              <h2 className="text-2xl font-semibold mb-4">About you</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    placeholder="Add a bio."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    README.md
                  </label>
                  <textarea
                    placeholder="This is your chance to tell us more about yourself! Things you're good at, what drives you and interesting projects you've built."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </section>
          </div>
        )}
        {activeTab === "EDUCATION" && <Education />}
        {activeTab === "EXPERIENCE" && <Experience />}
        {activeTab === "LINKS" && <Links />}
        {activeTab === "CONTACT" && <Contact />}
      </main>
    </div>
  );
}

export default ProfilePageForm;
