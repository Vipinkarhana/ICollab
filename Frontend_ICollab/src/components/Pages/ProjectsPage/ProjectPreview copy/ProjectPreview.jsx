import React from 'react'
import Head from './Head'
import SectionHeading from '../ProjectPreview/SectionHeading'

function ProjectPreview() {
  return (
    <div className="w-[100svw] mt-14 flex flex-col  justify-start items-center p-4">
      <div className="h-auto bg-white w-[95%] p-4">
        <Head/>
        <SectionHeading />
      </div>
      
    </div>
  )
}

export default ProjectPreview
