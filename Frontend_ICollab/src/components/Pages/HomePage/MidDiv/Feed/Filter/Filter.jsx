import React from 'react'
import Dropdown from './Dropdown'

function Filter() {
  return (
    <div className='flex h-5 w-[99%]  justify-around items-center'>
      <div className="w-[78%] h-auto text-black">
        <hr className=' border-gray-400 border-t-[0.1em]' />
      </div>
      <div className="w-[22%] flex items-center justify-center">
        <Dropdown></Dropdown>
      </div>
    </div>
  )
}

export default Filter
