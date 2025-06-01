import React from "react";


const SubmitEducation = ({ submittedEducation }) => {
  if (!submittedEducation || submittedEducation.length === 0) return null;

  const formatDuration = (edu) => {
    const start = `${edu.startMonth || ""} ${edu.startYear || ""}`.trim();
    const end = edu.currentlyStudying
      ? "Present"
      : `${edu.graduationMonth || ""} ${edu.graduationYear || ""}`.trim();

    return `${start} → ${end}`;
  };

  return (
   <div className="relative sm:h-[48rem] p-6 bg-gradient-to-br from-[#f0f4ff] to-white rounded-3xl sm:w-[34rem]  border border-indigo-200 -mt-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">

      <h3 className="sm:text-3xl text-2xl font-extrabold text-indigo-800 mb-6 border-b pb-3 border-indigo-300 tracking-tight">
        🧾 Academic Timeline
      </h3>

      <div className="space-y-8 sm:max-h-[40rem]  overflow-y-auto pr-4 scrollbar-hide">
        <div className="relative pl-10 space-y-8 -ml-8 sm:ml-0">
          {/* Vertical glowing line */}
          <div className="absolute sm:left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-indigo-600 to-indigo-800 rounded-full animate-pulse shadow-lg" />

          {submittedEducation.map((edu, idx) => (
            <div
              key={idx}
              className="relative ml-4 bg-white/80 border border-indigo-100 rounded-2xl shadow-md p-6 backdrop-blur-xl transition hover:shadow-indigo-200 sm:w-96 w-56"
            >
              {/* Dot indicator */}
              <div className="absolute -left-6 sm:-left-12 top-7 w-5 h-5 bg-indigo-600 border-4 border-white rounded-full shadow-lg animate-ping" />
              <div className="absolute -left-6 sm:-left-12 top-7 w-5 h-5 bg-indigo-600 border-4 border-white rounded-full shadow" />

              {/* Status ribbon */}
              <div className="absolute -top-4 right-4 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
                {edu.currentlyStudying ? "Ongoing" : "Completed"}
              </div>

              <div className="mb-3">
                <h4 className="text-xl font-semibold text-indigo-800">
                  {edu.degreeType}
                </h4>
                <p className="text-sm text-indigo-600">@ {edu.institution}</p>
              </div>

              <div className="grid grid-cols-3 gap-x-3 gap-y-2 text-sm text-gray-800 mt-4">
                <div className="font-semibold">Field</div>
                <div className="col-span-2">{edu.fieldOfStudy}</div>

                <div className="font-semibold">Duration</div>
                <div className="col-span-2">{formatDuration(edu)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmitEducation;
