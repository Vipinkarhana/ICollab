import React, { useState } from "react";
import SubmitEducation from "../SubmitEducation";

const Education = ({ setActiveTab }) => {
  const [educationData, setEducationData] = useState([]);
  const [formData, setFormData] = useState({
    degreeType: "",
    institution: "",
    currentlyStudying: false,
    fieldOfStudy: "",
    startMonth: "",
    startYear: "",
    graduationMonth: "",
    graduationYear: "",
    noEducation: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    setEducationData((prev) => [...prev, formData]);
    setFormData({
      degreeType: "",
      institution: "",
      currentlyStudying: false,
      fieldOfStudy: "",
      startMonth: "",
      startYear: "",
      graduationMonth: "",
      graduationYear: "",
      noEducation: false,
    });
  };

  return (
    <div className="h-auto w-[23rem] sm:w-full min-h-screen  p-4 -ml-14 sm:-ml-24">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 ">
        {/* Flex wrapper for form and timeline */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
          {/* Left Form Section */}
          <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold">Education</h2>
            <p className="text-base sm:text-xl text-gray-600">
              The information you provide here helps us in performing analytics.
            </p>

            {/* No education checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="noEducation"
                checked={formData.noEducation}
                onChange={handleChange}
                id="noEducation"
                className="w-4 h-4"
              />
              <label htmlFor="noEducation" className="text-sm sm:text-lg text-gray-700">
                I don’t have a formal education
              </label>
            </div>

            <div className="border-t border-gray-300 w-full" />

            {/* Degree Type */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Degree Type</label>
              <select
                name="degreeType"
                value={formData.degreeType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Degree Type</option>
                <option>B.Tech</option>
                <option>M.Tech</option>
                <option>B.Sc</option>
                <option>M.Sc</option>
              </select>
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Educational Institution</label>
              <input
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                type="text"
                placeholder="e.g. California Institute of Technology"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={formData.currentlyStudying}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm text-gray-700">I currently study here</label>
              </div>
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Field of Study</label>
              <input
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Theoretical Physics"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Start Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Start Month</label>
                <input
                  name="startMonth"
                  value={formData.startMonth}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. August"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Start Year</label>
                <select
                  name="startYear"
                  value={formData.startYear}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i}>{2000 + i}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Graduation Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Graduation Month</label>
                <input
                  name="graduationMonth"
                  value={formData.graduationMonth}
                  onChange={handleChange}
                  type="text"
                  placeholder="Month"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Graduation Year</label>
                <select
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i}>{2025 + i}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-all w-full"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Right Timeline Display Section */}
          <div className="w-full lg:w-1/3">
            <SubmitEducation submittedEducation={educationData} />
          </div>
        </div>

      
      </div>
      <div className=" bottom-0 mt-2">
       <div className="absolute p-2 right-4 left-4 sm:left-32 sm:right-32 flex flex-row justify-between items-center space-x-4 mt-8">
        <button
          onClick={() => setActiveTab("EXPERIENCE")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition "
        >
          ← Back
        </button>
        <button
          onClick={() => setActiveTab("CONTACT")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition "
        >
          Next →
        </button>
      </div>
      </div>
    </div>
    
  );
};

export default Education;
