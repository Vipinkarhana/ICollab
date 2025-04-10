import React, { useState, useEffect } from "react";
import CollaboratorCard from "./CollaboratorCard"; // adjust path if needed
import { suggestedNetwork } from "../../../../Services/networkService";


/*
const collaborators = [
  { name: "Alice Johnson", designation: "Frontend Developer" },
  { name: "Bob Smith", designation: "Backend Developer" },
  { name: "Charlie Brown", designation: "UI/UX Designer" },
  { name: "Charlie Brown", designation: "UI/UX Designer" },
  { name: "Charlie Brown", designation: "UI/UX Designer" },
  { name: "Charlie Brown", designation: "UI/UX Designer" },
  { name: "Charlie Brown", designation: "UI/UX Designer" },
  { name: "Charlie Brown", designation: "UI/UX Designer" },
  { name: "Charlie Brown", designation: "UI/UX Designer" },
 
];
*/
const RightDiv = ({ className = "" }) => {
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const fetchSuggestedNetwork = async () => {
      const data = await suggestedNetwork();
      if (Array.isArray(data)) {
        setCollaborators(data);
      } else {
        console.error("Error fetching suggested network:", data);
      }
    };

    fetchSuggestedNetwork();
  }, []);

  return (
    <div className={`w-[20%] h-auto flex flex-col justify-start items-center ${className}`}>
      <div className="w-full h-full bg-white border border-gray-300 rounded-md flex flex-col items-center">
        <div className="h-12 w-full text-xl font-bold px-2 flex items-center justify-start">
          <p>Network</p>
        </div>

        {/* Collaborator cards list */}
        <div className="w-full h-[85%] flex flex-col items-center">
          {collaborators.slice(0, 9).map((person, index) => (
            <CollaboratorCard key={index} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightDiv;
