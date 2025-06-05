import React, { useState, useEffect } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Links from "./Links";
import Contact from "./Contact";
import PageNavbar from "../../../Common/PageNavbar/PageNavbar";
import PhonePageNavbar from "../../../Common/PageNavbar/PhonePageNavbar";
import ProfilePic from "./ProfilePic";
import { updateProfile } from "../../../../Services/profileService";


function ProfilePageForm() {
  const [activeTab, setActiveTab] = useState("PROFILE PIC");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const tabs = [
    "PROFILE PIC",
    "ABOUT",
    "EXPERIENCE",
    "EDUCATION",
    "CONTACT",
    "LINKS",
  ];

  const [formData, setFormData] = useState({
    profilePic: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmpassword: "",
    about: "",
    designation: "",
    skills: [],
    links: [],
  });

  const handleSave = async () => {
    const response = updateProfile(formData);

    if (response.data.status == "sucess") {
      console.log("Profile Updated");
    }
  };

  

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

     if (field === "confirmpassword" || field === "password") {
      const password = field === "password" ? value : formData.password;
      const confirm =
        field === "confirmpassword" ? value : formData.confirmpassword;

      if (password && confirm && password !== confirm) {
        setPasswordMatchError("Passwords do not match");
      } else {
        setPasswordMatchError("");
      }
    }
  };

  // Password match validation

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start m-0 p-0 pt-24 sm:pt-14">
      {/* Navigation */}
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
          <ProfilePic
            setActiveTab={setActiveTab}
            formData={formData}
            updateField={updateField}
          />
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
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
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
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Enter your password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmpassword}
                    onChange={(e) =>
                      updateField("confirmpassword", e.target.value)
                    }
                    placeholder="Enter your confirm password"
                    className={`mt-1 block w-full border ${
                      passwordMatchError ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm px-3 py-2`}
                  />
                  {passwordMatchError && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordMatchError}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* About You */}
            <section className="bg-white p-6 rounded-lg shadow h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-4">README.MD</h2>
                <textarea
                  value={formData.about}
                  onChange={(e) => updateField("about", e.target.value)}
                  placeholder="Tell us more about yourself! Projects, strengths, etc."
                  className="block w-full h-[50svh] border border-gray-300 rounded-md shadow-sm px-3 py-2"
                ></textarea>
              </div>
            </section>

            {/* Navigation Buttons */}
            <div className=" bottom-0  ">
              <div className="absolute p-2 right-4 left-4 sm:left-32 sm:right-32 flex flex-row justify-between items-center space-x-4 mt-4 sm:mt-8">
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
          </div>
        )}

        {activeTab === "EDUCATION" && <Education setActiveTab={setActiveTab} />}
        {activeTab === "EXPERIENCE" && (
          <Experience
            setActiveTab={setActiveTab}
            formData={formData}
            updateField={updateField}
          />
        )}
        {activeTab === "LINKS" && (
          <Links
            setActiveTab={setActiveTab}
            formData={formData}
            updateField={updateField}
            handleSave={handleSave}
          />
        )}
        {activeTab === "CONTACT" && <Contact setActiveTab={setActiveTab} />}
      </main>

      {/* <OTPModal
        isVisible={showOtp}
        onClose={() => setShowOtp(false)}
        onVerify={handleOtpVerify}
      /> */}
    </div>
  );
}

export default ProfilePageForm;
