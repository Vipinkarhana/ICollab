import React from "react";

const Education = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 -ml-96 ">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 space-y-6 min-h-[110svh]">
        <h2 className="text-3xl font-semibold">Education</h2>
        <p className="text-xl text-gray-600">
          The information you provide here helps us in performing analytics.
        </p>

        <div className="space-y-8">
        <div className="flex items-center space-x-2">
       <input type="checkbox" id="noEducation" className="w-4 h-4" />
      <label
       htmlFor="noEducation"
       className="text-lg text-gray-700"
        >
       I don’t have a formal education
      </label>
      </div>

        {/* Gap and Horizontal Line */}
          <div className="mt-4 border-t border-gray-300 w-full" />  
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Degree Type</label>
            <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Degree Type</option>
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>B.Sc</option>
              <option>M.Sc</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Educational Institution</label>
            <input
              type="text"
              placeholder="e.g. California Institute of Technology"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center mt-2">
              <input type="checkbox" id="currentlyStudying" className="w-4 h-4" />
              <label htmlFor="currentlyStudying" className="ml-2 text-sm text-gray-700">
                I currently study here
              </label>
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Field of Study</label>
            <input
              type="text"
              placeholder="e.g. Theoretical Physics"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div >
              <label className="block text-lg font-medium text-gray-700 mb-1">Month of Graduation</label>
              <input
                type="text"
                placeholder="Month of Graduation"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div >
              <label className="block text-lg font-medium text-gray-700 mb-1">Year of Graduation</label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Year of Graduation</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i}>{2025 + i}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;