import React from "react";
import MyNetwork from "./MyNetwork";
const NetworkPage = () => {
  return (
    <>
      <div className=" w-[100%] h-auto mt-12 py-1 flex justify-center gap-2">
        {/* Fixed Sidebar */}
        <div className="w-[20%] bg-white rounded-md border border-gray-300"></div>

        {/* Main Content (Fixed Position) */}
        <div className="w-[70%]  flex flex-col items-center p-6   overflow-auto h-auto">
          {/* First Inner Div */}
          <div className="w-full bg-white p-6 shadow-md  rounded-md h-auto ">
           
            <MyNetwork />
          </div>

          {/* Second Inner Div */}
          <div className="w-full  bg-white p-6 shadow-md rounded-md h-auto ">
            <p>Second Inner Div (Bottom, Cart Area)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkPage;