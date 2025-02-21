import React from "react";


const NetworkPage = () => {
  return (
    <>
    <div className="min-h-screen flex bg-gray-100 ">
      {/* Left Sidebar (Reduced Width) */}
      <div className="w-[20%] bg-white p-4 shadow-md min-h-screen border border-black">Sidebar </div>

      {/* Center Content (Increased Width) */}
      <div className="w-4/5 flex flex-col items-center p-6 mt-10 ">
        {/* First Inner Div */}
        <div className="w-11/12 bg-white p-6 shadow-md mb-4 rounded-md h-auto min-h-[300px]">
          <p>First Inner Div (Top)</p>
          {/* <NetworkCard /> */}
        </div>

        {/* Second Inner Div (Increased Height for Cart) */}
        <div className="w-11/12 bg-white p-6 shadow-md rounded-md h-auto min-h-[300px]">
          <p>Second Inner Div (Bottom, Cart Area)</p>
        </div>
      </div>
    </div>
 

     
    </>
  ) 
  
}

export default NetworkPage;