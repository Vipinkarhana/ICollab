/**
 * @file Name_Designation.js
 * @brief Displays a user's name and designation.
 * @details This component renders a name and designation with optional custom styling.
 * @param {Object} props Component properties.
 * @param {string} props.name The user's name.
 * @param {string} props.designation The user's designation.
 * @param {string} [props.nameClass] Optional CSS class for styling the name.
 * @param {string} [props.designationClass] Optional CSS class for styling the designation.
 * @returns {JSX.Element} The Name_Designation component.
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
/**
 * @class Name_Designation
 * @brief A component that displays a user's name and designation.
 */


function Name_Designation({ name, designation, nameClass = "", designationClass = "", user,divclass="" }) {
  return (
    <div className={`flex h-16 justify-center   flex-col  ${divclass}`}>
      <Link
        to={user?.username ? `/profile/${user.username}` : "#"}
        className={`text-xl text-left font-bold hover:underline ${nameClass}`}
      >
        <p>{name}</p>
      </Link>
      <div className={`text-gray-900 text-left ${designationClass}`}>
        <p>{designation}</p>
      </div>
    </div>
  );
}

export default Name_Designation;
