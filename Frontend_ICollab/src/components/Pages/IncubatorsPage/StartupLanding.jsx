import React from "react";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StartupLanding = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/apply-startup");
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-xl">
      {/* Background Layer */}
      <div className="absolute inset-0bg-gradient-to-br from-[#E9EBF5] to-[#DCE0EC]">
        {/* Decorative shapes */}
        <div className="absolute left-10 top-10 w-28 h-28 bg-purple-400/10 rotate-45 rounded-lg blur-3xl" />
        <div className="absolute right-10 bottom-10 w-24 h-24 bg-purple-300/20 rotate-45 rounded-lg blur-2xl" />
        <div className="absolute left-1/2 top-1/2 w-16 h-16 bg-purple-500/20 rotate-45 rounded-lg blur-xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 text-center text-gray-600">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Launch Your Startup with Confidence
        </h2>
        <p className="text-sm sm:text-base text-gray-800 max-w-2xl mx-auto mb-8">
          Join our program and access mentorship, funding, and powerful networks that will elevate your startup from idea to reality.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleApplyClick}
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition shadow-md flex items-center gap-2"
          >
            <Rocket size={18} />
            Apply as Startup
          </button>
        </div>

        <p className="text-xs text-gray-800 mt-4">
          Your journey begins with one click — no prior funding or registration required.
        </p>
      </div>
    </div>
  );
};

export default StartupLanding;
