import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden ">
      <main className="w-[80svw] mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-6  h-[75svh]">

          {/* Left Column - Contact Info */}
          <section className="bg-white p-6 rounded-lg shadow h-auto">
            <h2 className="text-2xl font-semibold mb-4">How can we reach you?</h2>
            <div className="space-y-4">
            <div>
  <label className="block text-xl font-medium text-gray-700">Email</label>

  {/* Email box */}
  <div className="mt-1">
  <input
    type="email"
    className="w-full bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
    placeholder="Enter your email"
    defaultValue="mohitgoel524@gmail.com"
  />
</div>

  {/* VERIFIED badge aligned right with top margin */}
  <div className="flex justify-between items-center mt-2">
  <span className="bg-yellow-700 text-white text-sm font-semibold px-2 py-1 rounded-full">
    VERIFIED
  </span>

  <button
    className="w-20 h-8 bg-teal-200 text-white text-lg font-medium rounded-md hover:bg-teal-400 transition duration-150 ease-in-out"
  >
    Edit
  </button>
</div>

</div>
                 <div className="border-b border-gray-300 " />
              <div >
                <label className="block text-xl font-medium text-gray-700 ">Phone Number</label>
                <input
                  type="tel"
                  className="mt-4 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="+91 e.g. 8577775289"
                />
              </div>
              <div className="border-b border-gray-300  " />
              <div>
                <label className="block text-xl font-medium text-gray-700">City</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="e.g. Bangalore"
                />
              </div>
            </div>
          </section>

          {/* Right Column - Emergency Contact */}
          <section className="bg-white p-6 rounded-lg shadow h-[60svh]">
            <h2 className="text-2xl font-semibold mb-4">Emergency contact</h2>
            <p className="text-lg text-gray-600 mb-4">
              In case something goes wrong when you're attending a hackathon organized on IrCollab, who’d you like us to reach out to first?
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xl font-medium text-gray-700">Emergency Contact Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Emergency Contact Number</label>
                <input
                  type="tel"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter contact number"
                />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Contact;
