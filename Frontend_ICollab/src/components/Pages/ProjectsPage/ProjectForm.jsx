import React, { useState, useEffect } from "react";
import { addProject, getCollaboratorSuggestions, getProjectDetails, updateProject } from "../../../Services/projectService";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const ProjectForm = ({ project: existingProject }) => {
  const { projectId: urlProjectId } = useParams(); // Get project ID from URL
   const isEditMode = !!urlProjectId;
  //  const isEditMode = !!existingProject;
  const navigate = useNavigate();
  // const [projectId, setProjectId] = useState(existingProject?._id || null);
   const [projectId, setProjectId] = useState(urlProjectId || null);
  const [logo, setLogo] = useState(null); // holds the File
  const [removeLogo, setRemoveLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null); // holds the blob-URL
  // const [isLoading, setIsLoading] = useState(false);
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
    "Geospatial",
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
  const [charCounts, setCharCounts] = useState({
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
    if (!selectedCollaborators.find((c) => c.id === user._id)) {
      setSelectedCollaborators([
        ...selectedCollaborators,
        {
          id: user._id,
          label: user.username,
        },
      ]);
    }
    setCollaboratorInput("");
    setSuggestions([]);
  };

  const removeCollaborator = (id) => {
    setSelectedCollaborators(selectedCollaborators.filter((c) => c.id !== id));
  };

  const today = new Date().toISOString().split("T")[0];

  // Handle input changes and update character count
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update character count for text fields
    if (e.target.type === "text" || e.target.type === "textarea") {
      const charCount = value.length; // Count the number of characters
      setCharCounts((prev) => ({ ...prev, [name]: charCount }));
    }
  };

  const [pictures, setPictures] = useState([null, null, null, null, null]);

  // function handlePictureChange(e, idx) {
  //   const file = e.target.files[0];
  //   setPictures((pics) => {
  //     const copy = [...pics];
  //     copy[idx] = file;
  //     return copy;
  //   });
  // }

  function handlePictureChange(e, idx) {
  const file = e.target.files[0];
  setPictures(prev => {
    const newPictures = [...prev];
    newPictures[idx] = file ? {
      file,
      preview: URL.createObjectURL(file)
    } : null;
    return newPictures;
  });
}

  // function handleLogoChange(e) {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   setLogo(file); // remember for submit
  //   setLogoPreview(URL.createObjectURL(file)); // generate preview URL
  //   if (logoPreview) URL.revokeObjectURL(logoPreview);
  // }

  
  const handleLogoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Clear existing logo if in edit mode
  if (isEditMode) {
     setLogoPreview(null);
    setLogo(null);
    document.getElementById('removeLogo').value = 'false';
  }

  // Clean up previous preview if it was a blob URL
  if (logoPreview && logoPreview.startsWith('blob:')) {
    URL.revokeObjectURL(logoPreview);
  }

  setLogo(file);
  setLogoPreview(URL.createObjectURL(file));
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




   // Add useEffect to fetch project details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProjectDetails = async () => {
        console.log("⏳ fetching project details for", urlProjectId);
        // setIsLoading(true);
        try {
          // const response = await fetchProjectDetails(existingProject._id);
          // const response = await getProjectDetails(urlProjectId);
          // const { data: wrapper } = await getProjectDetails(urlProjectId);
          // const projectData = response.data;
          // const projectData = wrapper.data;

           const {
        data: { data: projectData }
      } = await getProjectDetails(urlProjectId);
          console.log("🎯 projectData keys:", Object.keys(projectData), projectData);
          
          // Transform project data to match form state
          setFormData({
            projectName: projectData.name,
            tagline: projectData.tagline,
            problem: projectData.problem,
            category: projectData.category,
            technologies: projectData.technology.join(', '),
            links: projectData.links,
            videoDemo: projectData.videoLink,
            Challenges: projectData.challenges,
            startDate: projectData.startDate.split('T')[0],
            endDate: projectData.endDate?.split('T')[0] || '',
            isOngoing: projectData.stillOngoing,
          });

          setSelectedCollaborators(projectData.collaborator.map(c => ({
            id: c._id,
            label: c.username
          })));

          // Handle existing media
          const mediaFiles = projectData.media.map(url => ({
            url, // Keep URL for preview
            preview: url,
            file: null // No file until user changes it
          }))
          || [];
          while (mediaFiles.length < 5) mediaFiles.push(null);
          setPictures(mediaFiles);

          if (projectData.logo) {
            setLogoPreview(projectData.logo);
          }

        } catch (error) {
          console.error("🚨 getProjectDetails error:", error.response || error);
          toast.error('Failed to load project data');
          navigate('/projects');
        }
        // finally{
        //    setIsLoading(false);
        // }
      };

      fetchProjectDetails();
    }
  // }, [isEditMode, existingProject?._id, navigate]);
  }, [isEditMode, urlProjectId, navigate]);




// Updated submit handler
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   if (!validateForm()) return;

//   setIsSubmitting(true);
//   try {
//     await addProject(FormData);
//     // Reset form state
//   } finally {
//     setIsSubmitting(false);
//   }
//   setSubmitError(null);

//     try {
//       const formPayload = new FormData();

//       // Append fields with corrected names to match backend
//       formPayload.append("name", formData.projectName);
//       formPayload.append("tagline", formData.tagline);
//       formPayload.append("problem", formData.problem);
//       formPayload.append("category", formData.category);
//       formPayload.append("links", formData.links);
//       formPayload.append("videoLink", formData.videoDemo);
//       //formPayload.append('technology', formData.technologies.split(','));
//       formData.technologies
//         .split(",")
//         .map((t) => t.trim())
//         .forEach((tech) => formPayload.append("technology", tech)); // one append per tech :contentReference[oaicite:7]{index=7}

//       //formPayload.append('collaborator', selectedCollaborators.map(c => c.label));
//       selectedCollaborators
//         .map((c) => c.label)
//         .forEach((label) => formPayload.append("collaborator", label)); // one append per collaborator
//       formPayload.append("startDate", formData.startDate);
//       //formPayload.append('isOngoing', formData.isOngoing);
//       formPayload.append("stillOngoing", formData.isOngoing);
//       if (!formData.isOngoing) {
//         formPayload.append("endDate", formData.endDate);
//       }
//       formPayload.append("challenges", formData.Challenges);

//       if (logo) {
//         formPayload.append("logo", logo); // backend expects req.files.logo
//       }
//       pictures.forEach((file) => {
//         if (file) formPayload.append("media", file);
//       });

//       const response = await addProject(formPayload);
      
//       navigate('/projects');
//       toast.success('Project uploaded successfully!');
//       console.log("Project created:", response.data);
//       // Handle success (redirect/show message/etc)
//     } catch (error) {
//       setSubmitError(
//         error.response?.data?.message || "Failed to create project"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };




// Modify handleSubmit to handle both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const formPayload = new FormData();
      
      // Common fields
      formPayload.append("projectId", projectId);
      formPayload.append("name", formData.projectName);
      formPayload.append("tagline", formData.tagline);
      formPayload.append("problem", formData.problem);
      formPayload.append("category", formData.category);
      formPayload.append("links", formData.links);
      formPayload.append("videoLink", formData.videoDemo);
      // split comma-separated techs into individual fields
        formData.technologies
          .split(",")
          .map(t => t.trim())
          .forEach(tech => formPayload.append("technology", tech));

        // collaborators (preferably by ID, not label)
        selectedCollaborators
          // .forEach(c => formPayload.append("collaborator", c.id));
          .forEach(c => formPayload.append("collaborator", c.label));

        formPayload.append("startDate", formData.startDate);
        formPayload.append("stillOngoing", formData.isOngoing);
        if (!formData.isOngoing) {
          formPayload.append("endDate", formData.endDate);
        }
        if (logo) {
  formPayload.append('logo', logo);
}
if (isEditMode && !logoPreview) {
  formPayload.append('removeLogo', 'true');
}

        formPayload.append("challenges", formData.Challenges);
          if (isEditMode) {
        // formPayload.append("_id", projectId);
        // Handle media updates
        // pictures.forEach((file, index) => {
        //   if (file instanceof File) {
        //     formPayload.append("media", file);
        //   } else if (typeof file === 'string') {
        //     formPayload.append("media", file);
        //   }
        // });
        pictures.forEach((pic) => {
  if (pic) {
    if (pic.file) {
      formPayload.append("media", pic.file); // New file
    } else if (pic.url) {
      formPayload.append("media", pic.url); // Existing URL
    }
  }
});
      } else {
        // New project media handling
        pictures.forEach(pic => {
          // if (file) formPayload.append("media", file);
          if (pic && pic.file) {
          formPayload.append("media", pic.file);
        }
        });
      }

      const response = isEditMode 
        ? await updateProject(formPayload) 
        : await addProject(formPayload);

      navigate(isEditMode ? `/project/${projectId}` : '/projects');
      toast.success(`Project ${isEditMode ? 'updated' : 'created'} successfully!`);

    } catch (error) {
      setSubmitError(error.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <form
      className="max-w-4xl mx-auto px-4 py-10 space-y-10 mt-16 bg-white rounded-md"
      onSubmit={handleSubmit}
    >
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
          {charCounts.projectName}/50
        </p>
        {charCounts.projectName > 50 && (
          <p className="text-red-500 text-sm">
            Maximum character count exceeded (50 characters).
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
        <p className="text-sm text-gray-600 mt-1">{charCounts.tagline} / 100</p>
        {charCounts.tagline > 100 && (
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
        <p className="text-sm text-gray-600 mt-1">{charCounts.problem} / 200</p>
        {charCounts.problem > 200 && (
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
          {selectedCollaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className="bg-blue-100 px-2 py-1 rounded flex items-center"
            >
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
            {suggestions.map((user, idx) => (
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
          {charCounts.technologies} / 150
        </p>
        {charCounts.technologies > 150 && (
          <p className="text-red-500 text-sm">
            Maximum word count exceeded (150 words).
          </p>
        )}
        {errors.technologies && (
          <p className="text-red-500 text-sm">{errors.technologies}</p>
        )}
      </div>

      {/*Challenges I ran into */}
      {/* Challenges I ran into */}
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
          {charCounts.Challenges} / 100
        </p>
        {charCounts.Challenges > 100 && (
          <p className="text-red-500 text-sm">
            Maximum character count exceeded (100 characters).
          </p>
        )}
        {errors.Challenges && (
          <p className="text-red-500 text-sm">{errors.Challenges}</p>
        )}
      </div>

      {/* Start Date */}
      <div>
        <h2 className="text-3xl font-semibold">
          Start Date<span className="text-red-500">*</span>
        </h2>
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
              {file ? (
                <img
                  // src={URL.createObjectURL(file)}
                  src={file.preview || file.url}
                  alt="preview"
                  className="object-cover w-full h-full rounded"
                />
              ) : (
                "+"
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePictureChange(e, idx)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Logo */}
      {/* <div>
        <h2 className="text-3xl font-semibold"> Logo</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload a logo for your project (max 1MB)
        </p>
        <label className="mt-3 w-36 h-36 border-2 border-dashed flex items-center justify-center rounded cursor-pointer bg-gray-200 text-gray-500 hover:bg-gray-50 hover:border-blue-500">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo preview"
              className="object-contain w-full h-full p-1"
            />
          ) : (
            <span className="text-gray-500 text-2xl">+</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleLogoChange(e, "logo")}
            className="hidden"
          />
        </label>
      </div> */}



<div>
  <h2 className="text-3xl font-semibold">Logo</h2>
  <p className="text-sm text-gray-600 mt-1">
    {existingProject?.logo ? 'Update' : 'Upload'} Logo for your project (max 1MB)
  </p>
  
  <label className="mt-3 w-36 h-36 border-2 border-dashed flex items-center justify-center rounded cursor-pointer bg-gray-200 text-gray-500 hover:bg-gray-50 hover:border-blue-500 relative">
    {logoPreview ? (
      <>
        <img
          src={logoPreview}
          alt="Logo preview"
          className="object-contain w-full h-full p-1 rounded"
        />
        {/* Remove button */}
        {isEditMode && (
          <button
            type="button"
            onClick={() => {
              setLogo(null);
              setLogoPreview(null);
              // Add hidden input to signal logo removal
              setRemoveLogo(true);
              document.getElementById('removeLogo').value = 'true';
            }}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            aria-label="Remove logo"
          >
            ×
          </button>
        )}
      </>
    ) : (
      <span className="text-gray-500 text-2xl">+</span>
    )}
    <input
      type="file"
      accept="image/*"
      name="logo"
      onChange={handleLogoChange}
      className="hidden"
    />
  </label>
  
  {/* Hidden input for removeLogo flag */}
  {isEditMode && (
    <input
      type="hidden"
      id="removeLogo"
      name="removeLogo"
      value="false"
    />
  )}
  
  {/* Show existing logo info in edit mode */}
  {isEditMode && existingProject?.logo && !logoPreview && (
    <p className="text-sm text-gray-500 mt-2">
      Current logo: {existingProject.logo.split('/').pop()}
    </p>
  )}
</div>






      {/* Updated Submit Section */}
      <div className="pt-6">
        {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {/*isSubmitting ? "Submitting..." : "Submit"*/}
          {isSubmitting ? "Saving..." : isEditMode ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
