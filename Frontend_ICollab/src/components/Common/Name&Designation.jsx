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

/**
 * @class Name_Designation
 * @brief A component that displays a user's name and designation.
 */


function Name_Designation({ name,designation, nameClass = "", designationClass = "" }) {
  return (
    <div className="flex h-16 px-4 py-2 flex-col">
      <div className={`text-xl font-bold ${nameClass}`}>
        <p>{name}</p>
      </div>
      <div className={`text-gray-900 ${designationClass}`}>
        <p>{designation}</p>
      </div>
    </div>
  );
}

export default Name_Designation;
