import React from "react";

const TestimonialCard = () => {
  return (
    <div className="w-[35%] p-6 ml-4 h-[40vh] bg-white rounded-lg shadow-lg border border-gray-400">
      <p className="text-gray-700 flex justify-center text-center">
        "Thank you for running the event so smoothly  I had a great time, not
        only presenting, but also watching other sessions and interacting with
        attendees."
      </p>
      <div className="flex items-center mt-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Stella Smith</h3>
          <p className="text-gray-500 text-sm">Eventor Live Max</p>
        </div>
      </div>
      
    </div>
  );
};

export default TestimonialCard;