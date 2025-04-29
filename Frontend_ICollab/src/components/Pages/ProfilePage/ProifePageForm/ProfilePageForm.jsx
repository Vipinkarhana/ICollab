import React, { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Links from "./Links";
import Contact from "./Contact";
import PageNavbar from "../../../Common/PageNavbar/PageNavbar";
import PhonePageNavbar from "../../../Common/PageNavbar/PhonePageNavbar";
import ProfilePic from "./ProfilePic";

function ProfilePageForm() {
  const [activeTab, setActiveTab] = useState("PROFILE PIC");

  const tabs = ["PROFILE PIC", "ABOUT", "EXPERIENCE", "LINKS"];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState(""); // Password input instead of gender
  const [about, setAbout] = useState("");

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start m-0 p-0 pt-24 sm:pt-14">
      <div className="md:flex justify-center items-center w-full h-[15svh] bg-white p-4 hidden">
        <PageNavbar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="flex justify-center items-center w-full h-[15svh] bg-white p-4 md:hidden">
        <PhonePageNavbar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Main Content */}
      <main className="w-[80svw] mx-auto p-4">
        {activeTab === "PROFILE PIC" && (
          <ProfilePic setActiveTab={setActiveTab} />
        )}
         
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>

                <hr className="border-b border-gray-200 m-4 w-full -ml-1" />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* About You */}
            <section className="bg-white p-6 rounded-lg shadow h-full flex flex-col justify-between ">
              <div>
                <h2 className="text-2xl font-semibold mb-4">README.MD</h2>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us more about yourself! Projects, strengths, etc."
                  className="block w-full h-[50svh] border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  rows="5"
                ></textarea>
              </div>
            </section>

            {/* Navigation Buttons */}
            <div className="absolute bottom-0 right-0 p-2 flex justify-end space-x-4">
              <button
                onClick={() => setActiveTab("PROFILE PIC")}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveTab("EXPERIENCE")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {activeTab === "EDUCATION" && <Education />}
        {activeTab === "EXPERIENCE" && <Experience setActiveTab={setActiveTab}  />}
        {activeTab === "LINKS" && <Links setActiveTab={setActiveTab} />}
        {activeTab === "CONTACT" && <Contact />}
      </main>
    </div>
  );
}

export default ProfilePageForm;
