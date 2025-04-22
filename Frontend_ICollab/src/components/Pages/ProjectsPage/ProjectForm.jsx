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
    startDate: "",
    endDate: "",
    pictures: [],
    logo: null,
  });

  const [touchedFields, setTouchedFields] = useState({});

  const handleChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean); // Split by commas and trim spaces
    setFormData({ ...formData, tags });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: [...e.target.files]
    });
  };

  const handleOngoingChange = (e) => {
    setIsOngoing(e.target.checked); // Update ongoing state based on checkbox
    if (e.target.checked) {
      setFormData({ ...formData, endDate: '' }); // Clear end date when ongoing
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Check required fields
    if (!formData.title) newErrors.title = 'Project title is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!isOngoing && !formData.endDate) newErrors.endDate = 'End date is required.';
    if (!formData.collaborators) newErrors.collaborators = 'Collaborators are required.';
    if (!formData.roles) newErrors.roles = 'Role is required.';
    if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required.';

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreateProject(formData);
    }
  };

  const isRequiredFieldEmpty = (key) => {
    return touchedFields[key] && !formData[key];
  };

  const isDateInvalid =
  formData.startDate &&
  formData.endDate &&
  new Date(formData.endDate) < new Date(formData.startDate);


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
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter project title"
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter project description"
          required
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter project category"
          required
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      {/* Start and End Date */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
            max={today} // Prevent future dates for the start date (allow today's date and earlier)
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required={!isOngoing} // Disable requirement if ongoing
            disabled={isOngoing} // Disable the field if ongoing
            min={formData.startDate} // Set end date to not be before the start date
            max={today} // Set end date to not be after today
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
        </div>
      </div>

      {/* Ongoing Checkbox */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isOngoing}
            onChange={handleOngoingChange}
            className="form-checkbox"
          />
          <span className="ml-2">This project is ongoing</span>
        </label>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-medium">Tags </label>
        <input
          type="text"
          name="tags"
          value={formData.tags.join(', ')} // join tags into a string
          onChange={handleTagsChange}
          className={`w-full p-2 border ${errors.tags ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter tags"
          required
        />
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
      </div>

      {/* Team Members (Collaborators) */}
      <div>
        <label className="block font-medium">Add Collaborators</label>
        <input
          type="text"
          name="collaborators"
          value={formData.collaborators}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.collaborators ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Add team members"
          required
        />
        {errors.collaborators && <p className="text-red-500 text-sm">{errors.collaborators}</p>}
      </div>

      {/* Roles */}
      <div>
        <label className="block font-medium">Roles</label>
        <input
          type="text"
          value={formData.video}
          onChange={(e) => handleChange(e, "video")}
          placeholder="Paste or type link here"
          className={inputClass}
          style={{ border: "none" }}
        />
      </div>


       {/* Start Date */}
      <div>
        <h2 className="text-3xl font-semibold">Start Date</h2>
        <p className={`${textClass} text-gray-600`}>When did you start this project?</p>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange(e, "startDate")}
          onBlur={() => handleBlur("startDate")}
          className={inputClass}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* End Date */}
      <div>
        <h2 className="text-3xl font-semibold">End Date</h2>
        <p className={`${textClass} text-gray-600`}>When did you complete this project?</p>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => handleChange(e, "endDate")}
          onBlur={() => handleBlur("endDate")}
          className={inputClass}
          min={formData.startDate || new Date().toISOString().split("T")[0]}
        />
        {isDateInvalid && (
          <p className="text-sm text-red-500 mt-1">
            End date cannot be before start date
          </p>
        )}
      </div>




      {/* Pictures */}
      <div>
        <h2 className="text-3xl font-semibold">Media</h2>
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
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Create Project
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

