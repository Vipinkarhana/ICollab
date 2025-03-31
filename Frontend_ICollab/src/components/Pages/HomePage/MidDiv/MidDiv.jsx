import React from "react";
import StartPost from "./Feed/Posts/StartPost/StartPost";
import Feed from "./Feed/Feed";

const MidDiv = ({className=""}) => {
  return (
    <>
      <div className={`w-[100%] h-auto  flex flex-col justify-start items-center gap-2 py-1 ${className}`}>
        <StartPost className="hidden lg:flex"/>
        <Feed />
      </div>
    </>
  );
};

export default MidDiv;