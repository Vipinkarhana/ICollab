import React from "react";
import { Link } from "react-router-dom";
const RightDiv = ({className=""}) => {
  return (
    <>
      <div className={`w-[20%] h-[100%]  flex flex-col justify-start items-center ${className}`}>
        <div className="w-[100%] h-44 bg-white border border-gray-300 rounded-md flex flex-col justify-evenly items-center ">
          <div className="h-[15%] w-[100%] text-xl font-bold px-2  flex  items-center justify-start">
            <p>Network</p>
          </div>
          <div className="h-auto w-[100%] text-sm text-gray-600 px-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad omnis
              Lorem ipsum dolor sit
            </p>
          </div>
          <div className="h-[10%] w-[100%] flex items-center justify-start font-semibold hover:underline px-2">
            <Link>Learn More</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RightDiv