import React from "react";
import ProfileCard from "./ProfileCard";
import ProgressCard from "./ProgressCard";
import MyIncubatorsCard from "./MyIncubatorsCard";
const LeftDiv = () => {
  return (
    <>
      <div className="w-[20%] h-[100%]  flex flex-col justify-start items-center gap-4">
        <ProfileCard />
        <ProgressCard />
        <MyIncubatorsCard/>
      </div>
    </>
  );
}

export default LeftDiv;