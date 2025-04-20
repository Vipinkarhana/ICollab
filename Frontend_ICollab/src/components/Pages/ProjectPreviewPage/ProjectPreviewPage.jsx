import React, { useState } from 'react';
import ProjectIntro from './ProjectIntro';
import ProjectPreviewDetail from './ProjectPreviewDetail';
import Interaction from "../../Common/Interaction"
import MoreProject from '../../Common/MoreProject';
const ProjectPreviewPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("Intro");
  const tabs = ["Intro", "Timeline", "Messages", "Files", "Members"];

  return (
    <div className="w-screen min-h-screen   bg-gray-50 pt-20 px-4 md:px-12 lg:px-24 py-4">
      {/* Tabs / Project Header */}
      <div className="mb-6">
        <ProjectIntro 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>

      {/* Project Details Section */}
      <div >
        <ProjectPreviewDetail />
      </div>

      <div className='bg-white rounded-md shadow-md p-4'>
        <Interaction className='border-t-0'/>
      </div>
      <div className="mt-10">
        <MoreProject/>
      </div>
    </div>
  );
};

export default ProjectPreviewPage;