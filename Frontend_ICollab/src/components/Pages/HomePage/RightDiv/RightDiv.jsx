import React, { useState, useEffect } from "react";
import CollaboratorCard from "./CollaboratorCard"; // adjust path if needed
import { userNetwork, suggestedNetwork } from "../../../../Services/networkService";

const RightDiv = ({ className = "" }) => {
  const [collaborators, setCollaborators, ] = useState([]);
  const [headerText, setHeaderText] = useState("Network");
  
  useEffect(() => {
    const fetchUserNetwork = async () => {
      const data = await userNetwork();
      const suggestData = await suggestedNetwork();
      console.log(data.emptyNetwork);
      if(!data.emptyNetwork){
        setHeaderText("Network");
      if (Array.isArray(data.connectedUserIds)) {
        setCollaborators(data.connectedUserIds);
      } else {
        console.error("Error fetching user network:", data.connectedUserIds);
      }
    }
    else{
      setHeaderText("Suggested Network");
      if (Array.isArray(suggestData)) {
        setCollaborators(suggestData);
      } else {
        console.error("Error fetching user network:", data.connectedUserIds);
      }
    }
    };
  

    fetchUserNetwork();
  }, []);

  return (
    <div className={`w-[20%] h-auto flex flex-col justify-start items-center ${className}`}>
      <div className="w-full h-full bg-white border border-gray-300 rounded-md flex flex-col items-center">
        <div className="h-14 w-full text-xl font-bold px-2 flex items-center justify-start">
          <p>{headerText}</p>
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
