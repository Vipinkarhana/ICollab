import React, { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Links from "./Links";
import Contact from "./Contact";
import PageNavbar from "../../../Common/PageNavbar";
import PhonePageNavbar from "../../../Common/PhonePageNavbar";
import ProfilePic from "./ProfilePic";

function ProfilePageForm() {
  const [activeTab, setActiveTab] = useState("ABOUT");
 
  const tabs = ["PROFILE PIC", "ABOUT", "EDUCATION", "EXPERIENCE", "LINKS", "CONTACT"];

  // State for input fields
  const [firstName, setFirstName] = useState("Mohit");
  const [lastName, setLastName] = useState("Goel");
  const [gender, setGender] = useState("Gender");
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
          <ProfilePic />
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
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>

                <hr className="border-b border-gray-200 m-4 w-full -ml-1" />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    I Identify As
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  >
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* About You */}
            <section className="bg-white p-6 rounded-lg shadow h-full">
              <h2 className="text-2xl font-semibold mb-4">README.MD</h2>
              <div className="space-y-2">
                <div>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="This is your chance to tell us more about yourself! Things you're good at, what drives you and interesting projects you've built."
                    className="mt-1 block w-full h-[50svh] border border-gray-300 rounded-md shadow-sm px-3 py-2"
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
