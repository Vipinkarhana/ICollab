import React from "react";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const Readme = ({ paragraph}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-[80%] mx-auto">
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 pb-2">
        <h2 className="text-gray-700 font-semibold text-2xl">README.MD</h2>
        <Link
          to={"/profile/edit"}
          className="border border-gray-300 rounded-md px-3 py-2 text-purple-700 hover:bg-gray-100 transition-colors text-lg font-semibold flex justify-evenly items-center gap-2"
        >
          <Pencil  size={24} />
          Edit Readme
        </Link>
      </div>

      <div className="text-gray-700 text-xl leading-relaxed">
        {paragraph}
      </div>
    </div>
  );
};

export default Readme;
