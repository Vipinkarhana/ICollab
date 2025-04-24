import React, { useState } from "react";

const Links = () => {
  const [links, setLinks] = useState([]);

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const addNewProfile = () => {
    setLinks([...links, ""]);
  };

  return (
    <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] mx-auto sm:p-4 p-4 bg-white rounded-lg shadow mt-14">
      <h2 className="text-2xl font-semibold mb-2">Online Profiles</h2>
      <p className="text-lg text-gray-600 mb-4">
        Add links to your website, blog, GitHub, LinkedIn, Stack Overflow, Dribbble, Kaggle, or anywhere your work stands out.
      </p>

      {links.map((link, index) => (
        <div key={index} className="flex items-center mb-3">
          <span className="text-xl mr-2">🌐</span>
          <input
            type="url"
            value={link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://your-link.com"
          />
        </div>
      ))}

      <button
        onClick={addNewProfile}
        className="mt-4 px-4 py-2 bg-teal-200 text-black rounded-md hover:bg-teal-300 transition text-xl w-full sm:w-[60%]"
      >
        + Add new profile
      </button>
    </div>
  );
};

export default Links;
