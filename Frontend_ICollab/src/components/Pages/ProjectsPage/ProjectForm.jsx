import React, { useState } from "react";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    problem: "",
    technologies: "",
    links: "",
    videoDemo: "",
    Challenges: "",
    startDate: "",
    endDate: "",
    isOngoing: false,
    pictures: [],
    logo: null,
  });

  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [wordCounts, setWordCounts] = useState({
    projectName: 0,
    tagline: 0,
    problem: 0,
    technologies: 0,
    Challenges: 0,
    links: 0,
    videoDemo: 0,
  });

  const today = new Date().toISOString().split("T")[0];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update word count for text fields
    if (e.target.type === "text" || e.target.type === "textarea") {
      const wordCount = value.trim().split(/\s+/).length;
      setWordCounts((prev) => ({ ...prev, [name]: wordCount }));
    }
  };

  const handleFileChange = (e, key, multiple = false) => {
    if (multiple) {
      setFormData({
        ...formData,
        [key]: [...e.target.files],
      });
    } else {
      setFormData({
        ...formData,
        [key]: e.target.files[0],
      });
    }
  };

  const handleOngoingChange = (e) => {
    setFormData({
      ...formData,
      isOngoing: e.target.checked,
      endDate: e.target.checked ? "" : formData.endDate,
    });
  };

  // Handle validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName) newErrors.projectName = "Project name is required.";
    if (!formData.tagline) newErrors.tagline = "Tagline is required.";
    if (!formData.problem) newErrors.problem = "Problem statement is required.";
    if (!formData.technologies) newErrors.technologies = "Technologies are required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.isOngoing && !formData.endDate) newErrors.endDate = "End date is required.";
    if (!formData.Challenges) newErrors.Challenges = "Challenges are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted with data:", formData);
      // On success, you can call your submit function here, e.g. onCreateProject(formData);
    }
  };

  const inputClass = "w-full p-2 border rounded-md mt-2 focus:outline-none";
  const textClass = "text-sm mt-1";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 mt-16 bg-white rounded-md">
      {/* Project Name */}
      <div>
        <h2 className="text-3xl font-semibold">
          Project Name <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-gray-600`}>
          What are you calling it?
        </p>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.projectName ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="Enter project name"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.projectName} / 50
        </p>
        {wordCounts.projectName > 50 && (
          <p className="text-red-500 text-sm">Maximum word count exceeded (50 words).</p>
        )}
        {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName}</p>}
      </div>

      {/* Tagline */}
      <div>
        <h2 className="text-3xl font-semibold">
          Tagline <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-gray-600`}>
          Write a short, sharp and on-point description of your project
        </p>
        <input
          type="text"
          name="tagline"
          value={formData.tagline}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.tagline ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="Short tagline"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.tagline} / 100
        </p>
        {wordCounts.tagline > 100 && (
          <p className="text-red-500 text-sm">Maximum word count exceeded (100 words).</p>
        )}
        {errors.tagline && <p className="text-red-500 text-sm">{errors.tagline}</p>}
      </div>

      {/* Problem Statement */}
      <div>
        <h2 className="text-3xl font-semibold">
          Problem Statement <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-gray-600`}>
          Describe what can people use it for, or how it makes existing tasks easier/safer, etc. (markdown supported)
        </p>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.problem ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="What problem does your project solve?"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.problem} / 200
        </p>
        {wordCounts.problem > 200 && (
          <p className="text-red-500 text-sm">Maximum word count exceeded (200 words).</p>
        )}
        {errors.problem && <p className="text-red-500 text-sm">{errors.problem}</p>}
      </div>

      {/* Links */}
      <div>
        <h2 className="text-3xl font-semibold">
          Links <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-gray-600`}>
          Add any links to your project, such as the live site, GitHub repository, etc. Please separate them with commas.
        </p>
        <input
          type="text"
          name="links"
          value={formData.links}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.links ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="e.g., https://github.com/myproject, https://myproject.com"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.links} / 50
        </p>
        {wordCounts.links > 50 && (
          <p className="text-red-500 text-sm">Maximum word count exceeded (50 words).</p>
        )}
        {errors.links && <p className="text-red-500 text-sm">{errors.links}</p>}
      </div>

      {/* Video Demo */}
      <div>
        <h2 className="text-3xl font-semibold">
          Video Demo <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass}  text-sm text-gray-600 mt-1 `}>
          Provide a link to a video demo of your project (e.g., YouTube or Vimeo).
        </p>
        <input
          type="text"
          name="videoDemo"
          value={formData.videoDemo}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.videoDemo ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="e.g., https://youtube.com/mydemo"
          required
        />
        {errors.videoDemo && <p className="text-red-500 text-sm">{errors.videoDemo}</p>}
      </div>

      {/* Technologies */}
      <div>
        <h2 className="text-3xl font-semibold">
          Technologies <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass}  text-sm text-gray-600 mt-1`}>
          Write a comma-separated list of technologies you used in building the project.
        </p>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.technologies ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="Technologies used (e.g., React, Node, MongoDB)"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.technologies} / 150
        </p>
        {wordCounts.technologies > 150 && (
          <p className="text-red-500 text-sm">Maximum word count exceeded (150 words).</p>
        )}
        {errors.technologies && <p className="text-red-500 text-sm">{errors.technologies}</p>}
      </div>

      {/*Challenges I ran into */}
      <div>
        <h2 className="text-3xl font-semibold">
        Challenges I ran into <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-sm text-gray-600 mt-1`}>
          Tell us who worked on this project.
        </p>
        <input
          type="text"
          name="collaborators"
          value={formData.collaborators}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.collaborators ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="Who worked on this project?"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.collaborators} / 100
        </p>
        {wordCounts.collaborators > 100 && (
          <p className="text-red-500 text-sm">Maximum word count exceeded (100 words).</p>
        )}
        {errors.collaborators && <p className="text-red-500 text-sm">{errors.collaborators}</p>}
      </div>

      {/* Start Date */}
      <div>
        <h2 className="text-3xl font-semibold">Start Date</h2>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          max={today}
          required
        />
      </div>

      {/* End Date */}
      <div>
        <h2 className="text-3xl font-semibold">End Date</h2>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          min={formData.startDate}
          disabled={formData.isOngoing}
        />
      </div>

      {/* Ongoing Project Checkbox */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={formData.isOngoing}
          onChange={handleOngoingChange}
          className="mr-2"
        />
        <label>This project is ongoing</label>
      </div>

      {/* Pictures */}
      <div>
        <h2 className="text-3xl font-semibold"> Media</h2>
        <p className="text-sm text-gray-600 mt-1">Upload up to 5 pictures (max 1MB each)</p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <label
              key={i}
              className="w-36 h-36 border-2 border-dashed flex items-center justify-center rounded cursor-pointer bg-gray-200 text-gray-500 hover:border-blue-500 hover:bg-gray-50"
            >
              +
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "pictures", true)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div>
        <h2 className="text-3xl font-semibold"> Logo</h2>
        <p className="text-sm text-gray-600 mt-1">Upload a logo for your project (max 1MB)</p>
        <label className="mt-3 w-36 h-36 border-2 border-dashed flex items-center justify-center rounded cursor-pointer bg-gray-200 text-gray-500 hover:bg-gray-50 hover:border-blue-500">
          +
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "logo")}
            className="hidden"
          />
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
