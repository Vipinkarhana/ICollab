import React from "react";
import UnderConstruction from "/UnderConstruction.png"
import MoreProject from "../../Common/MoreProject";
import ProjectCardSkeleton from "../../Common/ProjectcardSkeleton";
const MessagePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-black w-full h-svh flex  justify-center items-center">
        <img src={UnderConstruction} alt="" />
      </div>
      <div>
        {/* <MoreProject /> */}
        <ProjectCardSkeleton/>
      </div>
    </div>
  );
}

export default MessagePage;