import React from "react";

function AddExperience({ submittedExperiences }) {
  if (!submittedExperiences || submittedExperiences.length === 0) return null;

  return (
 <div className="p-6 space-y-6 bg-gray-100 rounded-xl h-full border border-blue-300 sm:ml-8 -mr-4 sm:w-[32rem] w-full shadow-lg sm:mt-0 mt-8 overflow-x-hidden">

      <h3 className="text-2xl font-bold text-blue-800 border-b pb-2 border-blue-300">
        Added Experience
      </h3>

      {/* Scrollable list of experiences */}
      <div className="space-y-10  overflow-y-auto max-h-[42rem] overflow-x-hidden pr-4 custom-scrollbar">
        <div className="relative pl-10 space-y-10">
        {/* Vertical timeline line */}
        <div className="absolute sm:left-8 left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-800 rounded-full shadow-md shadow-blue-400/50 animate-pulse" />

        {submittedExperiences.map((exp, idx) => (
          <div
            key={idx}
            className="relative sm:ml-10 sm:w-[21rem] w-44  max-w-7xl rounded-xl border border-blue-200 bg-white/30 backdrop-blur-md p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute sm:-left-14 -left-10 top-8 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-md" />

            {/* Role Badge */}
            <div className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-2">
              {exp.currentlyWorking ? "Current Role" : "Past Role"}
            </div>

            {/* Header */}
            <div className="bg-blue-50 px-4 py-2 rounded-md mb-4">
              <h4 className="text-lg font-semibold text-blue-700">
                {exp.role} <span className="text-blue-500">@ {exp.employer}</span>
              </h4>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-800">
              <div className="font-semibold">Duration:</div>
              <div className="col-span-2">
                {exp.fromMonth} {exp.fromYear} -{" "}
                {exp.currentlyWorking ? "Present" : `${exp.toMonth} ${exp.toYear}`}
              </div>

              <div className="font-semibold">Work Type:</div>
                <div className="col-span-2">
                  {exp.workTypes }
                </div>

              <div className="font-semibold">Description:</div>
              <div className="col-span-2 text-gray-700 whitespace-pre-line">
                {exp.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default AddExperience;
