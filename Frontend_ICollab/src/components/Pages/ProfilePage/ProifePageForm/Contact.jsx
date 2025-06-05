import React from "react";

const Contact = ({setActiveTab}) => {
  return (
    <div className="h-auto w-full overflow-x-hidden">
      <main className="w-full max-w-screen-lg mx-auto sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">
          {/* Left Column - Contact Info */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="sm:text-2xl text-xl font-semibold mb-4">How can we reach you?</h2>
            <div className="space-y-4">
              <div>
                <label className="block sm:text-xl text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter your email"
                  defaultValue=" "
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="bg-yellow-700 text-white text-sm font-semibold px-2 py-1 rounded-full">
                    VERIFIED
                  </span>
                  <button className="w-20 h-8 bg-teal-200 text-white text-lg font-medium rounded-md hover:bg-teal-400 transition duration-150 ease-in-out">
                    Edit
                  </button>
                </div>
              </div>
              <div className="border-b border-gray-300" />
              <div>
                <label className="block  sm:text-xl text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  className="mt-4 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="+91 e.g. 8577775289"
                />
              </div>
              <div className="border-b border-gray-300" />
              <div>
                <label className="block  sm:text-xl text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="e.g. Bangalore"
                />
              </div>
               <div>
                <label className="block  sm:text-xl text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="e.g. Uttar Pradesh"
                />
              </div>
            </div>
          </section>

          {/* Right Column - Emergency Contact */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Emergency contact</h2>
            <p className="text-lg text-gray-600 mb-4">
              In case something goes wrong when you're attending a hackathon organized on IrCollab, who’d you like us to reach out to first?
            </p>
            <div className="space-y-4">
              <div>
                <label className="block sm:text-xl text-lg font-medium text-gray-700">Emergency Contact Name</label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Emergency Contact Number</label>
                <input
                  type="tel"
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter contact number"
                />
              </div>
            </div>
          </div>
        </div>

         

      </main>
       <div className=" bottom-0">
       <div className="absolute p-2 right-4 left-4 sm:left-32 sm:right-32 flex flex-row justify-between items-center space-x-4 mt-4">
        <button
          onClick={() => setActiveTab("EDUCATION")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition "
        >
          ← Back
        </button>
        <button
          onClick={() => setActiveTab("LINKS")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition "
        >
          Next →
        </button>
      </div>
      </div>
     </div>
  );
};

export default Contact;
