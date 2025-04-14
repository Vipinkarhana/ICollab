import React from 'react'
import clsx from 'clsx';

function PageNavbar({ tabs, activeTab, setActiveTab, className="" }) {
  console.log("className", className)
  return (
    <div
    className={clsx(
      'border w-auto h-full bg-blue-100 px-4 rounded-md flex justify-evenly items-center gap-2',
      className
    )}
  >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-md text-lg transition-colors 
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-black hover:bg-blue-300"
              }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default PageNavbar
