import React, { useState, useEffect } from "react";

const roles = [
  "Designer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "Blockchain Developer",
];

const suggestedSkills = [
  "Python",
  "React.js",
  "Node.js",
  "Rust",
  "Shell",
  "JavaScript",
  "Go",
  "Kotlin",
  "Solidity",
  "TypeScript",
];

const Experience = ({ setActiveTab, formData, updateField }) => {
  const [selectedRole, setSelectedRole] = useState(formData?.designation || "");
  const [customRole, setCustomRole] = useState("");
  const [skills, setSkills] = useState(formData?.skills?.length ? formData.skills : ["", "", "", "", ""]);
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");

  // Sync designation to parent
  useEffect(() => {
    const finalRole = selectedRole === "Other" ? customRole : selectedRole;
    updateField("designation", finalRole);
  }, [selectedRole, customRole]);

  // Sync skills to parent
  useEffect(() => {
    updateField("skills", skills.filter(skill => skill.trim() !== ""));
  }, [skills]);

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      if (uploadedFile.size <= 5 * 1024 * 1024) {
        setResumeFile(uploadedFile);
        setError("");
      } else {
        setResumeFile(null);
        setError("File size should be less than 5MB");
      }
    } else {
      setResumeFile(null);
      setError("Only PDF files are allowed");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange({ target: { files: [droppedFile] } });
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setError("");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Role Selection Card */}
      <div className="bg-white p-6 rounded-lg shadow h-auto">
        <h2 className="text-2xl font-semibold mb-4">Designation</h2>
        <p className="text-lg text-gray-700 mb-4">Which of the following describes you best?</p>
        <div className="space-y-3">
          {roles.map((role) => (
            <label
              key={role}
              className={`flex items-center p-3 border rounded-md cursor-pointer transition ${
                selectedRole === role ? "bg-blue-100 border-blue-500" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={() => {
                  setSelectedRole(role);
                  setCustomRole("");
                }}
                className="mr-3"
              />
              {role}
            </label>
          ))}

          {/* Other option */}
          <label
            className={`flex items-center p-3 border rounded-md cursor-pointer transition ${
              selectedRole === "Other" ? "bg-blue-100 border-blue-500" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="Other"
              checked={selectedRole === "Other"}
              onChange={() => setSelectedRole("Other")}
              className="mr-3"
            />
            Other
          </label>

          {selectedRole === "Other" && (
            <input
              type="text"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              placeholder="Enter your designation"
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      </div>

      {/* Skills Card */}
      <div className="bg-white p-6 rounded-lg shadow h-auto">
        <h2 className="text-2xl font-semibold mb-4">Top Skills</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Skill Inputs */}
          <div className="flex-1 space-y-4">
            <p className="text-lg text-gray-700 mb-2">Rank your top 5 tech skills</p>
            {skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                placeholder={`${index + 1}. Add Skill`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Suggested Skills */}
          <div className="flex-1">
            <p className="text-lg font-medium text-gray-600 mb-2">Suggested</p>
            <div className="flex flex-col gap-2">
              {suggestedSkills.map((skill) => {
                const firstEmpty = skills.findIndex((s) => s === "");
                return (
                  <span
                    key={skill}
                    onClick={() => {
                      if (firstEmpty !== -1) {
                        handleSkillChange(firstEmpty, skill);
                      }
                    }}
                    className="cursor-pointer text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                  >
                    + {skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Resume Upload Section */}
      {/* <div className="bg-white p-6 rounded-lg shadow sm:h-[55svh] h-[75svh] md:col-span-2">
        <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("resumeInput").click()}
          className="border-2 border-dashed border-blue-400 bg-blue-50 p-8 rounded-md text-center text-blue-600 cursor-pointer h-[80%] flex justify-center items-center flex-col"
        >
          {resumeFile ? (
            <>
              <p className="text-sm font-medium">Uploaded: {resumeFile.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="mt-3 px-3 py-1 bg-red-100 text-red-600 rounded text-xs hover:bg-red-200"
              >
                Remove File
              </button>
            </>
          ) : (
            <p className="text-sm text-center">
              Drop your resume here or{" "}
              <span className="text-blue-600 underline">Upload from your computer</span>
            </p>
          )}
          <input
            type="file"
            accept="application/pdf"
            id="resumeInput"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Make sure your resume is in .pdf format only (5MB max)
        </p>
      </div> */}

      {/* <div >
      <WorkExperienceForm />
      </div> */}
       {/* Bottom Right Navigation Buttons */}
       <div className=" bottom-0  ">
       <div className="absolute p-2 right-4 left-4 sm:left-32 sm:right-32 flex flex-row justify-between items-center space-x-4 mt-4">
        <button
          onClick={() => setActiveTab("ABOUT")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition "
        >
          ← Back
        </button>
        <button
          onClick={() => setActiveTab("LINKS")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition "
        >
          Next →
        </button>
      </div>
      </div>
    </div>
  );
};

export default Experience;
