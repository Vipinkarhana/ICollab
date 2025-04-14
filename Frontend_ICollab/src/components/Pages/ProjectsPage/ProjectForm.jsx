import React, { useState } from "react";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    problem: "",
    challenges: "",
    technologies: "",
    links: "",
    video: "",
    coverImage: null,
    pictures: [],
    logo: null,
  });

  const [touchedFields, setTouchedFields] = useState({});

  const handleChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleBlur = (key) => {
    setTouchedFields((prev) => ({ ...prev, [key]: true }));
  };

  const handleFileChange = (e, key, multiple = false) => {
    const files = e.target.files;
    if (multiple) {
      setFormData((prev) => ({ ...prev, [key]: Array.from(files).slice(0, 5) }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: files[0] }));
    }
  };

  const isRequiredFieldEmpty = (key) => {
    return touchedFields[key] && !formData[key];
  };

  const inputClass = "w-full mt-2 p-2 rounded focus:outline-none";
  const textClass = "text-sm mt-1";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 mt-16 bg-white rounded-md">
      {/* Project Name */}
      <div>
        <h2 className="text-3xl font-semibold">
          Project Name<span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} uppercase font-semibold ${isRequiredFieldEmpty("projectName") ? "text-red-500" : "text-gray-600"}`}>
          What are you calling it?
        </p>
        <input
          type="text"
          maxLength={50}
          value={formData.projectName}
          onChange={(e) => handleChange(e, "projectName")}
          onBlur={() => handleBlur("projectName")}
          className={inputClass}
          style={{ border: "none" }}
        />
        <p className="text-sm text-gray-500 mt-1">{formData.projectName.length}/50</p>
      </div>

      {/* Tagline */}
      <div>
        <h2 className="text-3xl font-semibold">
          Tagline<span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} uppercase font-semibold ${isRequiredFieldEmpty("tagline") ? "text-red-500" : "text-gray-600"}`}>
          Write a short, sharp and on point description of your project
        </p>
        <textarea
          maxLength={200}
          rows={2}
          value={formData.tagline}
          onChange={(e) => handleChange(e, "tagline")}
          onBlur={() => handleBlur("tagline")}
          className={inputClass}
          style={{ border: "none" }}
        />
        <p className="text-sm text-gray-500 mt-1">{formData.tagline.length}/200</p>
      </div>

      {/* Problem */}
      <div>
        <h2 className="text-3xl font-semibold">The problem it solves</h2>
        <p className="text-sm text-gray-600 mt-1">
          Describe what can people use it for, or how it makes existing tasks easier/safer etc (Markdown supported)
        </p>
        <textarea
          maxLength={2000}
          rows={5}
          value={formData.problem}
          onChange={(e) => handleChange(e, "problem")}
          className={inputClass}
          style={{ border: "none" }}
        />
        <p className="text-sm text-gray-500 mt-1">{formData.problem.length}/2000</p>
      </div>

      {/* Challenges */}
      <div>
        <h2 className="text-3xl font-semibold">Challenges I ran into</h2>
        <p className="text-sm text-gray-600 mt-1">
          Tell us about any specific bug or hurdle you ran into while building this project. How did you get over it? (Markdown supported)
        </p>
        <textarea
          maxLength={2000}
          rows={5}
          value={formData.challenges}
          onChange={(e) => handleChange(e, "challenges")}
          className={inputClass}
          style={{ border: "none" }}
        />
        <p className="text-sm text-gray-500 mt-1">{formData.challenges.length}/2000</p>
      </div>

      {/* Technologies */}
      <div>
        <h2 className="text-3xl font-semibold">
          Technologies I used<span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} ${isRequiredFieldEmpty("technologies") ? "text-red-500" : "text-gray-600"}`}>
          Write a comma separated list of technologies you used in building the project.
        </p>
        <input
          type="text"
          maxLength={100}
          value={formData.technologies}
          onChange={(e) => handleChange(e, "technologies")}
          onBlur={() => handleBlur("technologies")}
          className={inputClass}
          style={{ border: "none" }}
        />
        <p className="text-sm text-gray-500 mt-1">{formData.technologies.length}/100</p>
      </div>

      {/* Links */}
      <div>
        <h2 className="text-3xl font-semibold">
          Links<span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} ${isRequiredFieldEmpty("links") ? "text-red-500" : "text-gray-600"}`}>
          Add links to GitHub, Website, App Store etc. wherever the project can be tested live
        </p>
        <input
          type="text"
          value={formData.links}
          onChange={(e) => handleChange(e, "links")}
          onBlur={() => handleBlur("links")}
          placeholder="Paste or type a link here"
          className={inputClass}
          style={{ border: "none" }}
        />
      </div>

      {/* Video */}
      <div>
        <h2 className="text-3xl font-semibold">Video Demo</h2>
        <p className="text-sm text-gray-600 mt-1">
          Add link to video demoing the functioning of the project, or, record one using Loom
        </p>
        <input
          type="text"
          value={formData.video}
          onChange={(e) => handleChange(e, "video")}
          placeholder="Paste or type link here"
          className={inputClass}
          style={{ border: "none" }}
        />
      </div>

      {/* Cover Image */}
      <div>
        <h2 className="text-3xl font-semibold">Cover Image</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload a cover image (Max 1MB, Recommended Dimensions: 1200x630)
        </p>
        <label className="mt-3 w-40 h-40 border-2 border-dashed flex items-center justify-center rounded cursor-pointer bg-gray-200 text-gray-500 hover:bg-gray-50 hover:border-blue-500">
          +
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "coverImage")}
            className="hidden"
          />
        </label>
      </div>

      {/* Pictures */}
      <div>
        <h2 className="text-3xl font-semibold">Pictures</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload a maximum of 5 pictures (Size: Max 1MB each)
        </p>
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
        <h2 className="text-3xl font-semibold">Logo</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload a logo to represent your project (Size: Max 1MB)
        </p>
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

      {/* You can add a submit button here */}
      <div className="pt-6">
        <button
          onClick={() => console.log("Submitted data:", formData)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;

