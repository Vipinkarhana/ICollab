import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import ProfilePic from "../../ProfilePic";
import { ChevronDown } from "lucide-react";

function ProfileDropDown() {
  const navigate = useNavigate();
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

  const handleClick = (item) => {
  switch (item) {
    case "Posts":
      console.log("Navigating to Posts section");
      navigate(`/profile/${username}`,{
        state: { activeTab: "Posts" }
      });
      setOpen(false); // Close dropdown after navigation
      break;
    case "Intro":
      console.log("Navigating to Intro section");
      navigate(`/profile/${username}`,{
        state: { activeTab: "Intro" }
      });
      setOpen(false); // Close dropdown after navigation
      break;
    case "Project":
      console.log("Navigating to Project section");
      navigate(`/profile/${username}`,{
        state: { activeTab: "Projects" }
      });
      setOpen(false); // Close dropdown after navigation
      break;
    case "Saved":
      console.log("Navigating to Saved section");
     navigate(`/profile/${username}`,{
        state: { activeTab: "Saved" }
      });
      setOpen(false); // Close dropdown after navigation
      break;
    default:
      console.log("Unknown item");
  }
};


  return (
    <div className="relative" ref={dropdownRef}>

      <button
        onClick={toggleDropdown}
        className="flex flex-col items-center gap-1 cursor-pointer px-2 py-1 "
      >

        <ProfilePic className="w-6 h-6 rounded-full object-cover border-0" picture={currentUser?.profile_pic} />


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
              <ProfilePic picture={currentUser?.profile_pic} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">
                {currentUser?.name}
              </p>
              <p className="text-gray-600 text-sm leading-tight">
                {username}
              </p>
              <Link to={`/profile/${username}`}
                className="mt-2 inline-block text-center w-full border border-blue-600 text-blue-600 rounded-md py-1 text-sm font-medium hover:bg-blue-50 transition"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Manage Section */}
          <div className="p-3 border-b text-gray-700">
            <h1 className="text-gray-800 text-lg ml-4">Manage</h1>
            <div className="flex flex-col gap-2 mt-2 items-start">
              {["Posts", "Intro", "Project", "Saved"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleClick(item)}
                  className="hover:bg-blue-100 w-full flex items-start px-4 py-2 cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
