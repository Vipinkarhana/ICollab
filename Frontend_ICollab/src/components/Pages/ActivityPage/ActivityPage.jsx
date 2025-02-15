import React from 'react'
import ProfileCard from '../HomePage/LeftDiv/ProfileCard'
import AllActivity from './AllActivity'
function ActivityPage() {
  return (
    <div className= 'h-auto w-[90svw] mt-14 p-2 flex justify-evenly '>
        <div className='w-[20%] h-[100%] flex flex-col justify-start items-center'>
          <ProfileCard/>
        </div>
      <div className='w-[50%] h-auto flex-col justify-start items-center gap-2 py-1 border bg-gray-200 border-gray-400 rounded-md'>
        <AllActivity/>
      </div>
      <div className="h-44 w-[20%] bg-gray-200 border border-gray-400 rounded-md"></div>
    </div>
  )
}

export default ActivityPage
