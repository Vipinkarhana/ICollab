import React from "react";
import LeftDiv from "./LeftDiv/LeftDiv";
import MidDiv from "./MidDiv/MidDiv";
import RightDiv from "./RightDiv/RightDiv";
const HomePage = () => {
  return (
    <>
      <div className="w-[99svw] h-[90svh] mt-16 flex gap-1  justify-evenly p-2">
        <LeftDiv />
        <MidDiv />
        <RightDiv />
      </div>
    </>
  ); 
  
}

export default HomePage;