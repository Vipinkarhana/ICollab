import { useState } from "react";
import AddExperience from "./Add Experience";

function WorkExperienceForm() {
  const [experiences, setExperiences] = useState([
    {
      employer: "",
      role: "",
      workTypes: "",
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
      description: "",
      currentlyWorking: false,
    },
  ]);

  const [noExperience, setNoExperience] = useState(false);
  const [submittedExperiences, setSubmittedExperiences] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const toggleCurrentlyWorking = (index) => {
    const updated = [...experiences];
    updated[index].currentlyWorking = !updated[index].currentlyWorking;
    if (updated[index].currentlyWorking) {
      updated[index].toMonth = "";
      updated[index].toYear = "";
    }
    setExperiences(updated);
  };

  const handleAddExperience = () => {
    const current = experiences[0];
    setSubmittedExperiences([...submittedExperiences, current]);
    setExperiences([
      {
        employer: "",
        role: "",
        workTypes: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        description: "",
        currentlyWorking: false,
      },
    ]);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

  const workTypes = [
    "Full-time",
    "Part-time",
    "Internship",
    "Freelance",
    "Contract",
    "Apprenticeship",
    "Seasonal",
  ];

  const maxDescriptionLength = 500;

  return (
    <div className="flex flex-col md:flex-row h-auto p-4 max-w-4xl">
      {/* Left Form */}
      <div className="">
        <div className="sm:p-6 p-4 bg-white rounded-xl shadow-md -ml-3 space-y-6 sm:w-[32rem] w-[18rem] max-w-3xl">
          <h2 className="text-2xl font-semibold">Work Experience</h2>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={noExperience}
              onChange={() => setNoExperience(!noExperience)}
              className="accent-blue-600"
            />
            I have no prior work experience
          </label>

          {!noExperience && (
            <div className="border border-gray-200 p-5 rounded-xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={experiences[0].employer}
                  onChange={(e) => handleChange(0, "employer", e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={experiences[0].role}
                  onChange={(e) => handleChange(0, "role", e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Work Type
                </label>
                <select
                  value={experiences[0].workTypes}
                  onChange={(e) => handleChange(0, "workTypes", e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 placeholder-gray-400"
                >
                  <option value="">Select Work Type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                  <option>Contract</option>
                  <option>Self-employed</option>
                  <option>Apprenticeship</option>
                  <option>Seasonal</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <select
                  value={experiences[0].fromMonth}
                  onChange={(e) => handleChange(0, "fromMonth", e.target.value)}
                  className="w-full border rounded-md px-1 text-sm py-2"
                >
                  <option value="">From Month</option>
                  {months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>

                <select
                  value={experiences[0].fromYear}
                  onChange={(e) => handleChange(0, "fromYear", e.target.value)}
                  className="w-full border rounded-md px-1 text-sm py-2"
                >
                  <option value="">From Year</option>
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>

                {!experiences[0].currentlyWorking && (
                  <>
                    <select
                      value={experiences[0].toMonth}
                      onChange={(e) =>
                        handleChange(0, "toMonth", e.target.value)
                      }
                      className="w-full border rounded-md text-sm px-1 py-2"
                    >
                      <option value="">To Month</option>
                      {months.map((month) => (
                        <option key={month}>{month}</option>
                      ))}
                    </select>

                    <select
                      value={experiences[0].toYear}
                      onChange={(e) =>
                        handleChange(0, "toYear", e.target.value)
                      }
                      className="w-full border rounded-md px-1 text-sm py-2"
                    >
                      <option value="">To Year</option>
                      {years.map((year) => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={experiences[0].currentlyWorking}
                  onChange={() => toggleCurrentlyWorking(0)}
                  className="accent-blue-600"
                />
                Currently working here
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  maxLength={maxDescriptionLength}
                  placeholder="Description of your role/responsibilities"
                  value={experiences[0].description}
                  onChange={(e) =>
                    handleChange(
                      0,
                      "description",
                      e.target.value.slice(0, maxDescriptionLength)
                    )
                  }
                  className="w-full border rounded-md px-3 py-2 placeholder-gray-400"
                ></textarea>
                <p className="text-sm text-gray-500 text-right mt-1">
                  {experiences[0].description.length}/{maxDescriptionLength}
                </p>
              </div>

              <button
                onClick={handleAddExperience}
                className="bg-green-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-all w-full mt-4"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Summary Panel */}
      <div className="sm:flex-grow  ">
        <AddExperience submittedExperiences={submittedExperiences} />
      </div>
    </div>
  );
}

export default WorkExperienceForm;
