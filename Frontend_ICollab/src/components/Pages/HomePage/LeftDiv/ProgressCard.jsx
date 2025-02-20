import React from "react";
import { Link } from "react-router-dom";
const ProgressCard = () => {
  return (
    <>
      <div className="h-40 w-[100%] bg-white rounded-md py-2 flex flex-col justify-evenly items-center border border-gray-300">
        <div className="h-[20%] w-[100%] text-xl font-bold px-2  flex  items-center justify-start">
          <p>Progress Report</p>
        </div>
        <div className="h-[55%] w-[100%] text-sm text-gray-600 px-2">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad omnis Lorem ipsum dolor sit  </p>
        </div>
        <div className="h-[10%] w-auto flex items-center justify-center font-semibold hover:underline">
          <Link>
            Learn More
          </Link>
        </div>
      </div>
    </>
  );
} 

export default ProgressCard;