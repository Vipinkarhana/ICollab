import React from "react";
import StartPost from "./Feed/Posts/StartPost/StartPost";
import Feed from "./Feed/Feed";

const MidDiv = () => {
  return (
    <>
      <div className="w-[50%] h-[100%] border-2 flex flex-col justify-start items-center gap-2 py-1">
        <StartPost />
        <Feed />
      </div>
    </>
  );
};

export default MidDiv;
