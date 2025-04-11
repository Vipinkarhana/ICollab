import React, { useState } from "react";
import Education from "./Education"; // Import the Education component
import Experience from "./Experience";
import Links from "./Links";
import Contact from "./Contact";
function ProfilePageForm() {
  // State to track the active button
  const [activeButton, setActiveButton] = useState("ABOUT");

  // Function to handle button click
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  console.log(activeButton);
  
  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      {/* Header */}
      <header className="bg-white shadow fixed top-16 left-0 right-0 z-50 h-[12%]">
        <div className="mx-auto py-4 flex">
          <div className="flex justify-evenly flex-1">
            <button
              className={`font-medium text-gray-700 ${
                activeButton === "ABOUT" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleButtonClick("ABOUT")}
            >
              ABOUT
            </button>
            <button
              className={`font-medium text-gray-700 ${
                activeButton === "EDUCATION" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleButtonClick("EDUCATION")}
            >
              EDUCATION
            </button>
            <button
              className={`font-medium text-gray-700 ${
                activeButton === "EXPERIENCE" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleButtonClick("EXPERIENCE")}
            >
              EXPERIENCE
            </button>
            <button
              className={`font-medium text-gray-700 ${
                activeButton === "LINKS" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleButtonClick("LINKS")}
            >
              LINKS
            </button>
            <button
              className={`font-medium text-gray-700 ${
                activeButton === "CONTACT" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleButtonClick("CONTACT")}
            >
              CONTACT
            </button>
          </div>
          <div className="font-medium text-gray-700 whitespace-nowrap ml-4">
            All Changes Saved
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-[80svw] mx-auto px-4 py-8 m-20">
        {activeButton === "ABOUT" && (
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
        {activeButton === "EDUCATION" && (
          <Education/>
        )}
        {activeButton === "EXPERIENCE" && (
         <Experience/>
        )}
        {activeButton === "LINKS" && (
          <Links/>
        )}
        {activeButton === "CONTACT" && (
          <Contact/>
          )}
      </main>
    </div>
  );
}

export default ProfilePageForm;
