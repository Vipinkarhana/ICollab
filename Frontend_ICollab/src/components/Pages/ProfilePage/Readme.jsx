import React from "react";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const Readme = ({ paragraph }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md w-full max-w-[100%] sm:max-w-[80%] mx-auto">
      <div className="flex  justify-between items-center sm:items-center mb-4 border-b border-gray-400 pb-2 gap-3">
        <h2 className="text-gray-700 font-semibold text-xl sm:text-2xl">
          README.MD
        </h2>
        <Link
          to={"/profile/edit"}
          className="border border-gray-300 rounded-md px-3 py-2 text-purple-700 hover:bg-gray-100 transition-colors text-sm sm:text-lg font-semibold flex items-center gap-2"
        >
          <Pencil size={20} className="sm:size-6" />
          <span>Edit Readme</span>
        </Link>
      </div>

      <div className="text-gray-700 text-base sm:text-xl leading-relaxed">
        {paragraph}
      </div>
    </div>
  );
};

export default Readme;
