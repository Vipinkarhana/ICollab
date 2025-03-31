import React from "react";
import LeftDiv from "./LeftDiv/LeftDiv";
import MidDiv from "./MidDiv/MidDiv";
import RightDiv from "./RightDiv/RightDiv";
import Survey from "../../Common/Survey";

const HomePage = () => {
  return (
    <>
      <div className="w-[100svw] mt-14 flex flex-col items-center  justify-center gap-3 md:flex-row md:items-start lg:justify-evenly p-2">
        {/* <Survey /> */}
        <LeftDiv className="hidden lg:flex lg:w-[20%]"/>
        <MidDiv className="sm:w-[95%] md:w-[95%] lg:w-[50%]"/>
        <RightDiv className="hidden lg:block" />
      </div>
    </>
  ); 
  
}

export default HomePage;