import React from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IncubatorLanding = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/apply-incubator");
  };

  return (
    <div className="bg-gray-100 text-gray-700 rounded-xl p-8 md:p-12 max-w-6xl mx-auto mt-12 shadow-xl">
      <div className="flex flex-col gap-4 md:gap-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Empower Your Vision with Our Incubator Program
        </h2>
        <p className="text-gray-700 text-base md:text-lg max-w-2xl">
          Step into a hub of innovation where ideas take flight. Get mentorship, resources, and
          strategic networks to empower entrepreneurs and foster transformative technologies.
        </p>

        <button
          onClick={handleApplyClick}
          className="mt-4 w-fit bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md flex items-center gap-2 transition"
        >
          <Briefcase size={18} />
          Apply as Incubator
        </button>
      </div>
    </div>
  );
};

export default IncubatorLanding;
