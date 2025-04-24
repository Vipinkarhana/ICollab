import React from 'react'
import { Link } from 'react-router-dom';
import { Plus,Folder } from 'lucide-react';
function CreateProjectButton() {
  return (
    
      <div className="flex  items-center justify-center gap-4 w-4/6 h-full mt-4 sm:bg-white p-4 rounded-xl sm:shadow-xl">
        <div className="w-[50%] tracking-widest border-l-[2rem] px-2 font-extrabold text-[4rem] border-blue-700 md:flex hidden">
          <p>Share What you built.</p>
        </div>
        <Link
        to={"/project/create"}
        className="w-52 h-72 bg-white rounded-2xl shadow-xl border flex flex-col items-center justify-between p-4 transition hover:shadow-2xl cursor-pointer"
      >
        {/* Top placeholder */}
        <div className="w-full h-10 bg-gray-200 rounded-md" />

        {/* Middle placeholder with plus button */}
        <div className="w-full h-28 bg-gray-200 rounded-md flex items-center justify-center">
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <Plus size={24} />
          </div>
        </div>

        {/* Toggle buttons (mock) */}
        <div className="flex gap-2">
          <div className="w-4 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>

        {/* New Project button */}
        <div className="w-full">
          <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 text-sm font-medium">
            <Folder size={20} />
            New project
          </button>
        </div>

        {/* Bottom text */}
        <p className="text-xs text-gray-400 mt-2">Start a brand new project</p>
      </Link>
      </div>
      
  )
}

export default CreateProjectButton
