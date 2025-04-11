import React, { useState } from 'react';
import ProjectIntro from './ProjectIntro';

const ProjectPreviewPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("Intro");
  const tabs = ["Intro", "Timeline", "Messages", "Files", "Members"];

  return (
    <div className="w-[100svw] min-h-screen flex flex-col items-start justify-start mt-14 m-0 p-0">
      <ProjectIntro tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default ProjectPreviewPage;
