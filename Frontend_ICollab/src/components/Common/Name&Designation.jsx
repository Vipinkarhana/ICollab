import React from "react";

function Name_Designation({ name, nameClass = "", designationClass = "" }) {
  return (
    <div className="flex h-16 px-4 py-2 flex-col">
      <div className={`text-xl font-bold ${nameClass}`}>
        <p>{name}</p>
      </div>
      <div className={`text-gray-900 ${designationClass}`}>
        <p>IT, Software Engineer</p>
      </div>
    </div>
  );
}

export default Name_Designation;
