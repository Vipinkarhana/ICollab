import React from "react";
import { Link } from "react-router-dom";
const MyIncubatorsCard = () => {
  return (
    <>
      <div className="h-[40%] w-[90%] bg-gray-200 rounded-md py-2 flex flex-col justify-evenly items-center">
        <div className="h-[20%] w-[100%] text-xl font-bold px-2  flex  items-center justify-start">
          <Link to='/incubators' className="hover:underline">My Incubators</Link>
        </div>
        <div className="h-[80%] w-[100%] text-md text-gray-600 px-2">
          <p>TBI-KIET</p>
          <p>BIMTECH</p>
        </div>
      </div>
    </>
  );
}

export default MyIncubatorsCard;