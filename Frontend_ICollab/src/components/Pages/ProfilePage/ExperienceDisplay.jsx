import React from "react";
import { Plus, Pencil } from "lucide-react";

export default function ExperienceDisplay({ submittedExperiences = [] }) {
  const dummyExperiences = [
    {
      role: "Frontend Developer",
      employer: "Tech Solutions Inc.",
      fromMonth: "January",
      fromYear: "2023",
      toMonth: "December",
      toYear: "2023",
      currentlyWorking: false,
      workTypes: "Internship",
      description:
        "Worked on building responsive web pages using React and Tailwind CSS. Improved performance by optimizing components.",
    },
    {
      role: "Web Developer",
      employer: "StartupX",
      fromMonth: "February",
      fromYear: "2024",
      toMonth: "",
      toYear: "",
      currentlyWorking: true,
      workTypes: "Part-time",
      description:
        "Maintaining the startup’s main website and developing new features to enhance user experience.",
    },
    {
      role: "Python",
      employer: "Tech Solutions Inc.2.0",
      fromMonth: "January",
      fromYear: "2023",
      toMonth: "December",
      toYear: "2023",
      currentlyWorking: false,
      workTypes: "Internship",
      description:
        "Worked on building responsive web pages using React and Tailwind CSS. Improved performance by optimizing components.",
    },
    {
      role: "Data Analysis",
      employer: "StartupX 2.0",
      fromMonth: "February",
      fromYear: "2024",
      toMonth: "",
      toYear: "",
      currentlyWorking: true,
      workTypes: "Current-time",
      description:
        "Maintaining the startup’s main website and developing new features to enhance user experience.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md w-full max-w-[100%] sm:max-w-[80%] mx-auto">
      {/* Header Section with Icons */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-gray-700 font-semibold text-lg sm:text-2xl md:text-3xl">
          Experience
        </h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-full text-purple-700">
            <Plus size={20} className="sm:size-6" />
          </button>
          <button className="p-2 rounded-full text-purple-700">
            <Pencil size={20} className="sm:size-6" />
          </button>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-600" />

      {/* Grid responsive: 1 column on mobile, 2 on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dummyExperiences.map((exp, idx) => (
          <div
            key={idx}
            className="relative border border-blue-200 rounded-xl bg-white/40 backdrop-blur-md p-4 sm:p-6 shadow-md w-full"
          >
            {/* Role Badge */}
            <div className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-2">
              {exp.currentlyWorking ? "Current Role" : "Past Role"}
            </div>

            {/* Header */}
            <div className="bg-blue-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md mb-4 w-fit max-w-full">
              <h4 className="text-base sm:text-lg font-semibold text-blue-700">
                {exp.role}{" "}
                <span className="text-blue-500">@ {exp.employer}</span>
              </h4>
            </div>

            {/* Details */}
            <div className="space-y-4 text-sm text-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="font-semibold w-28">Duration:</div>
                <div>
                  {exp.fromMonth} {exp.fromYear} -{" "}
                  {exp.currentlyWorking
                    ? "Present"
                    : `${exp.toMonth} ${exp.toYear}`}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="font-semibold w-28">Work Type:</div>
                <div>{exp.workTypes}</div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <div className="font-semibold w-28">Description:</div>
                <div className="text-gray-700 whitespace-pre-line">
                  {exp.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
