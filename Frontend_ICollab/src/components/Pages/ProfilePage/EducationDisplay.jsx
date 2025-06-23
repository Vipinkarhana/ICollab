import React from "react";
import { Plus, Pencil } from "lucide-react";

export default function EducationDisplay({ submittedEducation = [] }) {
  const dummyEducation = [
    {
      degreeType: "B.Tech",
      institution: "IIT Delhi",
      fieldOfStudy: "Computer Science",
      startMonth: "August",
      startYear: "2021",
      graduationMonth: "May",
      graduationYear: "2025",
      currentlyStudying: true,
    },
    {
      degreeType: "M.Tech",
      institution: "NIT Trichy",
      fieldOfStudy: "Data Science",
      startMonth: "August",
      startYear: "2019",
      graduationMonth: "May",
      graduationYear: "2021",
      currentlyStudying: false,
    },
  ];

  const dataToDisplay = submittedEducation.length > 0 ? submittedEducation : dummyEducation;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md w-full max-w-[100%] sm:max-w-[80%] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-gray-700 font-semibold text-xl sm:text-3xl">Education</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-full text-purple-700">
            <Plus size={24} />
          </button>
          <button className="p-2 rounded-full text-purple-700">
            <Pencil size={24} />
          </button>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-600" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dataToDisplay.map((edu, idx) => (
          <div
            key={idx}
            className="relative border border-green-200 rounded-xl bg-white/40 backdrop-blur-md p-6 shadow-md w-full"
          >
            {/* Badge */}
            <div className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full mb-2">
              {edu.currentlyStudying ? "Currently Studying" : "Completed"}
            </div>

            {/* Degree and Institution */}
            <div className="bg-green-50 px-4 py-2 rounded-md mb-4 w-fit max-w-full">
              <h4 className="text-lg font-semibold text-green-700">
                {edu.degreeType}{" "}
                <span className="text-green-500">@ {edu.institution}</span>
              </h4>
            </div>

            {/* Details */}
            <div className="space-y-4 text-sm text-gray-800">
              <div className="flex">
                <div className="font-semibold w-28">Field:</div>
                <div>{edu.fieldOfStudy}</div>
              </div>

              <div className="flex">
                <div className="font-semibold w-28">Duration:</div>
                <div>
                  {edu.startMonth} {edu.startYear} -{" "}
                  {edu.currentlyStudying
                    ? "Present"
                    : `${edu.graduationMonth} ${edu.graduationYear}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
