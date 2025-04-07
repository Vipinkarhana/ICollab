import React from 'react';
import Head from './Head';
import SectionHeading from './SectionHeading';
import ProjectTracking from './ProjectTracking';
import ProjectCollab from './ProjectCollab';
import Interactions from '../../../Common/Interaction';

function ProjectPreview() {
  const sampleData = {
    heading: "Welcome to Our Platform!",
    photo: "/LandingImage.png", 
    text_content:
      "This platform offers a range of services to help you grow. From networking to knowledge-sharing, we provide everything you need to succeed.This platform offers a range of services to help you grow. From networking to knowledge-sharing, we provide everything you need to succeed.This platform offers a range of services to help you grow. From networking to knowledge-sharing, we provide everything you need to succeed.This platform offers a range of services to help you grow. From networking to knowledge-sharing, we provide everything you need to succeed.This platform offers a range of services to help you grow. From networking to knowledge-sharing, we provide everything you need to succeed.This platform offers a range of services to help you grow. From networking to knowledge-sharing, we provide everything you need to succeed.This platform offers a range of services to help you grow. From networking to knowledge-sharing, we provide everything you need to succeed.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
  };

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[75%] mt-20 flex flex-col justify-start items-center gap-0">
      {/* Main Container */}
      <div className="h-auto bg-white w-full p-4 rounded-lg shadow-lg">
        {/* Head Component */}
        <Head />

        {/* Section Heading */}
        <SectionHeading 
          heading={sampleData.heading} 
          photo={sampleData.photo} 
          text_content={sampleData.text_content} 
          video={sampleData.video}
        />

        {/* Project Tracking and Collaboration Sections */}
        <ProjectTracking />
        <ProjectCollab />
        <Interactions />
        {/* <Interactions/> */}
      </div>
    </div>
  );
}

export default ProjectPreview;
