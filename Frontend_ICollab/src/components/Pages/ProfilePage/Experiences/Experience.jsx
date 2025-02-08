import React from 'react'
function Experience({experience}) {
  return (
    <div className='h-32 border-2 border-red-400'>
      <div className="h-16 w-[100%] border-2 border-red-400">
        <div className="h-full w-[10%] border-2 border-red-300 flex justify-center items-center ">
             <img src={experience.logo} alt="" className='h-14 w-14 object-cover object-center'/>
        </div>
      </div>
    </div>
  )
}

export default Experience
