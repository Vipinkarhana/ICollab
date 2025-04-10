import React, { useState } from 'react'; 
import { Plus } from 'lucide-react';

// Image upload box component
const ImageUploadBox = ({ label, subtext, maxFiles = 1, onChange, files }) => { 
  const handleFileChange = (e) => { 
    const selectedFiles = Array.from(e.target.files).slice(0, maxFiles); 
    onChange(selectedFiles); 
  };

  return ( 
    <div className="mb-8"> 
      <label className="block font-semibold text-lg mb-1">{label}</label> 
      <small className="text-gray-500 block mb-3 uppercase text-xs tracking-wide">{subtext}</small> 
      <div className={`grid gap-3 ${maxFiles > 1 ? 'grid-cols-5' : 'w-24'}`}> 
        {[...Array(maxFiles)].map((_, index) => ( 
          <label key={index} className="aspect-square bg-blue-100 border-2 border-dashed border-blue-400 flex items-center justify-center cursor-pointer rounded-md hover:bg-blue-200">
            {files[index] ? ( 
              <img src={URL.createObjectURL(files[index])} alt="preview" className="w-full h-full object-cover rounded" />
            ) : ( 
              <Plus className="text-blue-500" /> 
            )} 
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
              multiple={maxFiles > 1} 
            /> 
          </label> 
        ))} 
      </div>
    </div>
  ); 
};

// Main project page
const NewProjectPage = () => { 
  const [projectName, setProjectName] = useState(''); 
  const [tagline, setTagline] = useState(''); 
  const [problem, setProblem] = useState(''); 
  const [challenges, setChallenges] = useState(''); 
  const [technologies, setTechnologies] = useState(''); 
  const [links, setLinks] = useState(''); 
  const [videoDemo, setVideoDemo] = useState(''); 
  const [coverImage, setCoverImage] = useState([]); 
  const [pictures, setPictures] = useState([]); 
  const [logo, setLogo] = useState([]);
  
  // State for platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // Touched states for validation
  const [projectNameTouched, setProjectNameTouched] = useState(false);
  const [taglineTouched, setTaglineTouched] = useState(false);
  const [problemTouched, setProblemTouched] = useState(false);
  const [challengesTouched, setChallengesTouched] = useState(false);
  const [technologiesTouched, setTechnologiesTouched] = useState(false);

  // Handle checkbox changes
  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPlatforms((prev) => [...prev, value]);
    } else {
      setSelectedPlatforms((prev) => prev.filter((platform) => platform !== value));
    }
  };

  // Check if any platform is selected
  const isPlatformSelected = selectedPlatforms.length > 0;

  // Validation checks
  const isProjectNameInvalid = projectNameTouched && projectName.trim() === '';
  const isTaglineInvalid = taglineTouched && tagline.trim() === '';
  const isProblemInvalid = problemTouched && problem.trim() === '';
  const isChallengesInvalid = challengesTouched && challenges.trim() === '';
  const isTechnologiesInvalid = technologiesTouched && technologies.trim() === '';

  return ( 
    <div className="p-6 w-full min-h-screen bg-white flex flex-col overflow-x-hidden items-center mt-16"> 
      <h2 className="text-2xl font-semibold mb-6 text-center">Project Submission</h2>

      {/* Project Name */}
      <div className="flex flex-col justify-center ">
        <div className="mb-6">
          <label className="block font-medium">Project Name *</label>
          <small className={`text-gray-500 mb-1 block ${isProjectNameInvalid ? 'text-red-500' : ''}`}>WHAT ARE YOU CALLING IT?</small>
          <input
            type="text"
            maxLength={50}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setProjectNameTouched(true)}
            className="w-full border-0 focus:outline-none focus:ring-0"
          />
          <p className={`text-right text-sm ${isProjectNameInvalid ? 'text-red-500' : 'text-gray-500'}`}>{projectName.length}/50</p>
        </div>

        {/* Tagline */}
        <div className="mb-6">
          <label className="block font-medium">Tagline *</label>
          <small className={`text-gray-500 mb-1 block ${isTaglineInvalid ? 'text-red-500' : ''}`}>WRITE A SHORT, SHARP AND ON POINT DESCRIPTION OF YOUR PROJECT</small>
          <textarea
            maxLength={200}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            onBlur={() => setTaglineTouched(true)}
            className="w-full border-0 focus:outline-none focus:ring-0"
          />
          <p className={`text-right text-sm ${isTaglineInvalid ? 'text-red-500' : 'text-gray-500'}`}>{tagline.length}/200</p>
        </div>

        {/* Problem */}
        <div className="mb-6">
          <label className="block font-medium">The problem it solves</label>
          <small className={`text-gray-500 mb-1 block ${isProblemInvalid ? 'text-red-500' : ''}`}>DESCRIBE WHAT CAN PEOPLE USE IT FOR, OR HOW IT MAKES EXISTING TASKS EASIER/SAFER ETC (MARKDOWN SUPPORTED)</small>
          <textarea
            maxLength={2000}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onBlur={() => setProblemTouched(true)}
            className="w-full border-0 focus:outline-none focus:ring-0"
          />
          <p className={`text-right text-sm ${isProblemInvalid ? 'text-red-500' : 'text-gray-500'}`}>{problem.length}/2000</p>
        </div>

        {/* Challenges */}
        <div className="mb-6">
          <label className="block font-medium">Challenges I ran into</label>
          <small className={`text-gray-500 mb-1 block ${isChallengesInvalid ? 'text-red-500' : ''}`}>TELL US ABOUT ANY SPECIFIC BUG OR HURDLE YOU RAN INTO WHILE BUILDING THIS PROJECT</small>
          <textarea
            maxLength={2000}
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
            onBlur={() => setChallengesTouched(true)}
            className="w-full border-0 focus:outline-none focus:ring-0"
          />
          <p className={`text-right text-sm ${isChallengesInvalid ? 'text-red-500' : 'text-gray-500'}`}>{challenges.length}/2000</p>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <label className="block font-medium">Technologies I used</label>
          <small className={`text-gray-500 mb-1 block ${isTechnologiesInvalid ? 'text-red-500' : ''}`}>WRITE A COMMA SEPARATED LIST OF TECHNOLOGIES YOU USED</small>
          <input
            maxLength={100}
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            onBlur={() => setTechnologiesTouched(true)}
            className="w-full border-0 focus:outline-none focus:ring-0"
          />
          <p className={`text-right text-sm ${isTechnologiesInvalid ? 'text-red-500' : 'text-gray-500'}`}>{technologies.length}/100</p>
        </div>

        {/* Links */}
        <div className="mb-6">
          <label className="block font-medium">Links</label>
          <small className="text-gray-500 mb-1 block">ADD LINKS TO GITHUB, WEBSITE, APP STORE ETC</small>
          <input
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            className="w-full border-0 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Video Demo */}
        <div className="mb-6">
          <label className="block font-medium">Video Demo</label>
          <small className="text-gray-500 mb-1 block">ADD LINK TO VIDEO DEMOING THE FUNCTIONING OF THE PROJECT</small>
          <input
            value={videoDemo}
            onChange={(e) => setVideoDemo(e.target.value)}
            className="w-full border-0 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Cover Image */}
        <ImageUploadBox
          label="Cover Image"
          subtext="UPLOAD A COVER IMAGE TO SHOWCASE A GLIMPSE OF YOUR PROJECT TO THE WORLD (SIZE: MAX 1MB, RECOMMENDED DIMENSIONS: 1200X630)."
          maxFiles={1}
          onChange={setCoverImage}
          files={coverImage}
        />

        {/* Pictures */}
        <ImageUploadBox
          label="Pictures"
          subtext="UPLOAD A MAXIMUM OF 5 PICTURES (SIZE: MAX 1MB EACH) SHOWCASING YOUR PROJECT."
          maxFiles={5}
          onChange={setPictures}
          files={pictures}
        />

        {/* Logo */}
        <ImageUploadBox
          label="Logo"
          subtext="UPLOAD A LOGO TO REPRESENT YOUR PROJECT (SIZE: MAX 1MB)."
          maxFiles={1}
          onChange={setLogo}
          files={logo}
        />
      </div>

      {/* Footer */}
      <div className="w-full bg-gray-100 py-6 mt-6 items-center justify-between flex flex-col ">
        <label className="font-semibold">Select platforms this project is built for</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {['Web', 'Android', 'iOS', 'macOS', 'Others'].map((platform) => (
            <label key={platform} className="flex items-center space-x-2 mr-40 ml-32">
              <input
                type="checkbox"
                value={platform}
                onChange={handlePlatformChange}
                checked={selectedPlatforms.includes(platform)}
                className="h-5 w-5 text-blue-600"
              />
              <span>{platform}</span>
            </label>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto flex justify-center">
          <button
            type="submit"
            disabled={!isPlatformSelected} // Disable button until a platform is selected
            className={`w-full sm:w-auto py-3 px-6 rounded-md transition ${isPlatformSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-300 cursor-not-allowed'}`}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;
