import React from 'react'
import ProjectCard from "../Common/ProjectCard"
function MoreProject() {
  return (
    <div className='flex flex-col gap-4 py-3'>
      <div className="flex  justify-between px-2 items-center w-full">
       <h1 className='text-3xl font-semibold tracking-tighter'>People Also Viewed</h1>
       <button className='bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white flex gap-2'>See more projects
       <span>{">"}</span>
       </button>
      </div>
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-6">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  )
}

export default MoreProject
