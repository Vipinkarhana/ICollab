import React, { useState, useEffect } from "react";
import { addProject, getCollaboratorSuggestions } from "../../../Services/projectService";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ProjectForm = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);              // holds the File
  const [logoPreview, setLogoPreview] = useState(null); // holds the blob-URL
  const textClass = "text-sm";
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    problem: "",
    category: "",
    // collaborators: "",
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

  const [collaboratorInput, setCollaboratorInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

// Add static categories
const categoryOptions = [
  "Website Development",
    "App Development", 
    "Machine Learning", 
    "Artificial Intelligence", 
    "Blockchain / Web3", 
    "Aerospace", 
    "Healthcare", 
    "Fintech", 
    "Finance", 
    "Education", 
    "Legal", 
    "Civil", 
    "Environment", 
    "Business", 
    "Life Science", 
    "Cybersecurity", 
    "DevOps", 
    "IoT", 
    "Entertainment", 
    "Content Creation", 
    "Geospatial"
];

// useEffect for collaborator suggestions
useEffect(() => {
  const fetchSuggestions = async () => {
    if (collaboratorInput.length > 0) {
      try {
        const response = await getCollaboratorSuggestions(collaboratorInput);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };
  const debounceTimer = setTimeout(fetchSuggestions, 300);
  return () => clearTimeout(debounceTimer);
}, [collaboratorInput]);


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


 // New collaborator suggestion effect
 useEffect(() => {
  const fetchSuggestions = async () => {
    if (collaboratorInput.length > 0) {
      try {
        const response = await getCollaboratorSuggestions(collaboratorInput);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };
  const debounceTimer = setTimeout(fetchSuggestions, 300);
  return () => clearTimeout(debounceTimer);
}, [collaboratorInput]);


// Updated collaborator handlers
const handleCollaboratorSelect = (user) => {
  if (!selectedCollaborators.find(c => c.id === user._id)) {
    setSelectedCollaborators([...selectedCollaborators, {
      id: user._id,
      label: user.username
    }]);
  }
  setCollaboratorInput("");
  setSuggestions([]);
};

const removeCollaborator = (id) => {
  setSelectedCollaborators(selectedCollaborators.filter(c => c.id !== id));
};

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

  const [pictures, setPictures] = useState([null, null, null, null, null]);

  function handlePictureChange(e, idx) {
    const file = e.target.files[0];
    setPictures(pics => {
      const copy = [...pics];
      copy[idx] = file;
      return copy;
    });
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLogo(file);                              // remember for submit
    setLogoPreview(URL.createObjectURL(file));  // generate preview URL
    if (logoPreview) URL.revokeObjectURL(logoPreview);
  }
  

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
    if (!formData.projectName)
      newErrors.projectName = "Project name is required.";
    if (!formData.tagline) newErrors.tagline = "Tagline is required.";
    if (!formData.problem) newErrors.problem = "Problem statement is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.technologies)
      newErrors.technologies = "Technologies are required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.isOngoing && !formData.endDate) {
        newErrors.endDate = "Either select an end date or mark as ongoing.";
      }
    if (!formData.Challenges) newErrors.Challenges = "Challenges are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// Updated submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!validateForm()) return;

  setIsSubmitting(true);
  setIsSubmitting(true);
  try {
    await addProject(FormData);
    // Reset form state
  } finally {
    setIsSubmitting(false);
  }
  setSubmitError(null);

  try {
    const formPayload = new FormData();
    
    // Append fields with corrected names to match backend
    formPayload.append('name', formData.projectName);
    formPayload.append('tagline', formData.tagline);
    formPayload.append('problem', formData.problem);
    formPayload.append('category', formData.category);
    formPayload.append('links', formData.links);
    formPayload.append('videoLink', formData.videoDemo);
    //formPayload.append('technology', formData.technologies.split(','));
    formData.technologies
    .split(',')
    .map(t => t.trim())
    .forEach(tech => formPayload.append('technology', tech));    // one append per tech :contentReference[oaicite:7]{index=7}

    //formPayload.append('collaborator', selectedCollaborators.map(c => c.label));
    selectedCollaborators
    .map(c => c.label)
    .forEach(label => formPayload.append('collaborator', label)); // one append per collaborator
    formPayload.append('startDate', formData.startDate);
    //formPayload.append('isOngoing', formData.isOngoing);
    formPayload.append('stillOngoing', formData.isOngoing);
    if (!formData.isOngoing) {
      formPayload.append('endDate', formData.endDate);
    }
      formPayload.append('challenges', formData.Challenges);

      if (logo) {
        formPayload.append('logo', logo);   // backend expects req.files.logo
      }
      pictures.forEach(file => {
        if (file) formPayload.append('media', file);
      });

      const response = await addProject(formPayload);
      
      navigate('/projects');
      toast.success('Project uploaded successfully!');
      console.log("Project created:", response.data);
      // Handle success (redirect/show message/etc)
      
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form className="max-w-4xl mx-auto px-4 py-10 space-y-10 mt-16 bg-white rounded-md" onSubmit={handleSubmit} >
      {/* Project Name */}
      <div>
        <h2 className="text-3xl font-semibold">
          Project Name <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-gray-600`}>What are you calling it?</p>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            errors.projectName ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Enter project name"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.projectName} / 50
        </p>
        {wordCounts.projectName > 50 && (
          <p className="text-red-500 text-sm">
            Maximum word count exceeded (50 words).
          </p>
        )}
        {errors.projectName && (
          <p className="text-red-500 text-sm">{errors.projectName}</p>
        )}
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
          className={`w-full p-2 border ${
            errors.tagline ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Short tagline"
          required
        />
        <p className="text-sm text-gray-600 mt-1">{wordCounts.tagline} / 100</p>
        {wordCounts.tagline > 100 && (
          <p className="text-red-500 text-sm">
            Maximum word count exceeded (100 words).
          </p>
        )}
        {errors.tagline && (
          <p className="text-red-500 text-sm">{errors.tagline}</p>
        )}
      </div>

      {/* Problem Statement */}
      <div>
        <h2 className="text-3xl font-semibold">
          Problem Statement <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-gray-600`}>
          Describe what can people use it for, or how it makes existing tasks
          easier/safer, etc. (markdown supported)
        </p>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            errors.problem ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="What problem does your project solve?"
          required
        />
        <p className="text-sm text-gray-600 mt-1">{wordCounts.problem} / 200</p>
        {wordCounts.problem > 200 && (
          <p className="text-red-500 text-sm">
            Maximum word count exceeded (200 words).
          </p>
        )}
        {errors.problem && (
          <p className="text-red-500 text-sm">{errors.problem}</p>
        )}
      </div>

      {/* Team Members (Collaborators) */}
      <div className="relative">
        <h2 className="text-3xl font-semibold">
          Add Collaborators <span className="text-red-500"></span>
        </h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedCollaborators.map(collaborator => (
            <div key={collaborator.id} className="bg-blue-100 px-2 py-1 rounded flex items-center">
              <span>{collaborator.label}</span>
              <button
                type="button"
                onClick={() => removeCollaborator(collaborator.id)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          name="collaborators"
          value={collaboratorInput}
          onChange={(e) => setCollaboratorInput(e.target.value)}
          className={`w-full p-2 border ${
            errors.collaborators ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Start typing to see suggestions"
          autoComplete="off"
          // required
        />
        
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-md max-h-40 overflow-y-auto">
            {suggestions
              .map((user, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleCollaboratorSelect(user)}
                >
                  {user.username} ({user.email})
                </li>
              ))}
          </ul>
        )}
        {errors.collaborators && (
          <p className="text-red-500 text-sm">{errors.collaborators}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <h2 className="text-3xl font-semibold">
          Category <span className="text-red-500">*</span>
        </h2>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            errors.category ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          required
        >
          <option value="">Select a category</option>
          {categoryOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      {/* Links */}
      <div>
        <h2 className="text-3xl font-semibold">
          Links <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass} text-gray-600`}>
          Add any links to your project, such as the live site, GitHub
          repository, etc. Please separate them with commas.
        </p>
        <input
          type="text"
          name="links"
          value={formData.links}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            errors.links ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="e.g., https://github.com/myproject, https://myproject.com"
          required
        />
        <p className="text-sm text-gray-600 mt-1">{wordCounts.links} / 50</p>
        {wordCounts.links > 50 && (
          <p className="text-red-500 text-sm">
            Maximum word count exceeded (50 words).
          </p>
        )}
        {errors.links && <p className="text-red-500 text-sm">{errors.links}</p>}
      </div>

      {/* Video Demo */}
      <div>
        <h2 className="text-3xl font-semibold">
          Video Demo <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass}  text-sm text-gray-600 mt-1 `}>
          Provide a link to a video demo of your project (e.g., YouTube or
          Vimeo).
        </p>
        <input
          type="text"
          name="videoDemo"
          value={formData.videoDemo}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            errors.videoDemo ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="e.g., https://youtube.com/mydemo"
          required
        />
        {errors.videoDemo && (
          <p className="text-red-500 text-sm">{errors.videoDemo}</p>
        )}
      </div>

      {/* Technologies */}
      <div>
        <h2 className="text-3xl font-semibold">
          Technologies <span className="text-red-500">*</span>
        </h2>
        <p className={`${textClass}  text-sm text-gray-600 mt-1`}>
          Write a comma-separated list of technologies you used in building the
          project.
        </p>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            errors.technologies ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Technologies used (e.g., React, Node, MongoDB)"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.technologies} / 150
        </p>
        {wordCounts.technologies > 150 && (
          <p className="text-red-500 text-sm">
            Maximum word count exceeded (150 words).
          </p>
        )}
        {errors.technologies && (
          <p className="text-red-500 text-sm">{errors.technologies}</p>
        )}
      </div>

      {/*Challenges I ran into */}
      <div>
        <h2 className="text-3xl font-semibold">
          Challenges I ran into <span className="text-red-500">*</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Tell us about the challenges you faced during the project.
        </p>
        <textarea
          name="Challenges"
          value={formData.Challenges}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            errors.Challenges ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          placeholder="Describe any major roadblocks you faced"
          required
        />
        <p className="text-sm text-gray-600 mt-1">
          {wordCounts.Challenges} / 100
        </p>
        {wordCounts.Challenges > 100 && (
          <p className="text-red-500 text-sm">
            Maximum word count exceeded (100 words).
          </p>
        )}
        {errors.Challenges && (
          <p className="text-red-500 text-sm">{errors.Challenges}</p>
        )}
      </div>

      {/* Start Date */}
      <div>
        <h2 className="text-3xl font-semibold">Start Date<span className="text-red-500">*</span></h2>
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
        {errors.endDate && (
          <p className="text-red-500 text-sm">{errors.endDate}</p>
        )}
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
        <p className="text-sm text-gray-600 mt-1">
          Upload up to 5 pictures (max 1MB each)
        </p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {pictures.map((file, idx) => (
            <label
              key={idx}
              className="w-36 h-36 border-2 border-dashed flex items-center justify-center rounded cursor-pointer bg-gray-200 text-gray-500 hover:border-blue-500 hover:bg-gray-50"
            >
               {file
        ? <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="object-cover w-full h-full rounded"
          />
        : "+"
      }
              <input
                type="file"
                accept="image/*"
                onChange={e => handlePictureChange(e, idx)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div>
        <h2 className="text-3xl font-semibold"> Logo</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload a logo for your project (max 1MB)
        </p>
        <label className="mt-3 w-36 h-36 border-2 border-dashed flex items-center justify-center rounded cursor-pointer bg-gray-200 text-gray-500 hover:bg-gray-50 hover:border-blue-500">
        {logoPreview
      ? (
        <img
          src={logoPreview}
          alt="Logo preview"
          className="object-contain w-full h-full p-1"
        />
      ) : (
        <span className="text-gray-500 text-2xl">+</span>
      )
    }
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleLogoChange(e, "logo")}
            className="hidden"
          />
        </label>
      </div>
      {/* Updated Submit Section */}
      <div className="pt-6">
        {submitError && (
          <div className="text-red-500 mb-4">{submitError}</div>
        )}
        <button
          type = "submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;