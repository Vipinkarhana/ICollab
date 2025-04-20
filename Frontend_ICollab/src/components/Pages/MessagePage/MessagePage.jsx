import React from "react";
import UnderConstruction from "/UnderConstruction.png"
import MoreProject from "../../Common/MoreProject";
const MessagePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-black w-full h-svh flex  justify-center items-center">
        <img src={UnderConstruction} alt="" />
      </div>
      <div>
        <MoreProject />
      </div>
    </div>
  );
}

export default MessagePage;