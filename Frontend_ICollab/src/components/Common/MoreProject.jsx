import React from 'react'
import ProjectCard from "../Common/ProjectCard"

function MoreProject() {
  return (
    <div className='flex flex-col gap-4 py-3 px-2 sm:px-4'>
      <div className="flex flex-row sm:flex-row sm:justify-between sm:items-center w-full sm:gap-2 gap-9">
        <h1 className='text-lg sm:text-3xl font-semibold tracking-tight'>People Also Viewed</h1>
        <button className='bg-blue-500 hover:bg-blue-600 sm:px-4 sm:py-2 px-1 py-2 rounded-md text-white flex items-center gap-2 self-start sm:self-auto '>
          See more projects
          <span>{">"}</span>
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  )
}

export default MoreProject
