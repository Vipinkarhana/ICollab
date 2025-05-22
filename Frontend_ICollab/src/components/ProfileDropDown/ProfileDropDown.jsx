import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePic from "../Common/ProfilePic";
import { ChevronDown } from "lucide-react";

function ProfileDropDown() {
   const currentUser = useSelector((state) => state.user.userData);
  const username = currentUser?.username;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="relative" ref={dropdownRef}>
    
     <button
  onClick={toggleDropdown}
  className="flex flex-col items-center gap-1 cursor-pointer px-2 py-1 "
>

  <ProfilePic className="w-6 h-6 rounded-full object-cover" />

 
  <div className="flex items-center ml-1">
    <span className="text-sm font-medium text-gray-700">Me</span>
    <ChevronDown className="w-4 h-4 text-gray-600 ml-1" />
  </div>
</button>


      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 h-auto bg-white shadow-lg border border-gray-200 rounded-lg z-50 text-sm">
          {/* Top User Info */}
          <div className="flex items-start gap-10 p-4 border-b ">
            <div className="w-10 h-10">
            <ProfilePic  />
             </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">
                Mohit Goel
              </p>
              <p className="text-gray-600 text-sm leading-tight">
                RKGIT || C language || web developer || python || Learning BI
                Power
              </p>
              <Link to = {`/profile/${username}`}
                className="mt-2 inline-block text-center w-full border border-blue-600 text-blue-600 rounded-md py-1 text-sm font-medium hover:bg-blue-50 transition"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Manage Section */}
          <div className="py-2 border-b text-gray-700">
             <h1 className="text-gray-800 text-lg ml-4">Manage</h1>
            {["Posts", "Intro", "Project", "Saved"].map((item) => (
              <div
                key={item}
                className="hover:bg-gray-100 px-4 py-2 cursor-pointer hover:underline"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
