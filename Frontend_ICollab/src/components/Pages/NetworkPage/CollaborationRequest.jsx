import React, { useState } from "react";
import ProfilePic from "../../Common/ProfilePic";
import Name_Designation from "../../Common/Name&Designation";
import { UserX, UserCheck } from "lucide-react";

function CollaborationRequest({ name, designation, profilepic }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");

  const handleClick = (action) => {
    setIsAnimating(true); 

    setTimeout(() => {
      setAnimationCompleted(true); 
      setMessage(action === "accept" ? "Accepted Request" : "Rejected Request");

      setTimeout(() => {
        setIsVisible(false); 
      }, 600);
    }, 450);
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-32 flex items-center justify-between border-b bg-white text-gray-800 px-2 py-1 transition-transform duration-[450ms]">
      {animationCompleted ? (
        <div className="absolute inset-0 flex items-center justify-center   text-black text-xl  ">
          {message}
        </div>
      ) : (
        <div
          className={`w-full flex justify-between items-center transition-transform duration-[500ms] ${
            isAnimating ? "translate-x-[-105%]" : "translate-x-0"
          }`}
        >
          <div className="flex items-start justify-start w-[84%] gap-2">
            <ProfilePic
              className="h-10 w-10 rounded-full border-2 border-gray-300"
              picture={profilepic}
            />
            <div className="flex flex-col items-start justify-start text-center w-auto h-full">
              <Name_Designation
                name={name}
                designation={designation}
                nameClass="text-[1.0rem] font-semibold text-gray-800"
                designationClass="text-xs text-gray-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center w-[15%]">
            <button
              onClick={() => handleClick("accept")}
              className="border-green-600 hover:border-green-700 border text-green-400 p-3 rounded-full flex items-center justify-center transition duration-200"
              aria-label="Accept Request"
            >
              <UserCheck size={18} />
            </button>
            <button
              onClick={() => handleClick("reject")}
              className="border-red-600 hover:border-red-700 border text-red-400 p-3 rounded-full flex items-center justify-center transition duration-200"
              aria-label="Ignore Request"
            >
              <UserX size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollaborationRequest;
