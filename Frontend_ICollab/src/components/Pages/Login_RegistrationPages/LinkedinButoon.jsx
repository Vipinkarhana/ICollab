import React from "react";
import Linkedinimg from "../../../assets/Linkedin.png";
import { linkedinAuth } from "../../../services/authService";

const Linkedin = () => {

  return (
    <>
      <button onClick={linkedinAuth} className="flex items-center justify-evenly  bg-white text-sm text-gray-700  rounded-sm    h-10 w-[50%] lg:w-[26%] lg:h-9">
        <div className="w-[20%] h-full flex justify-center items-center">
          <img src={Linkedinimg} alt="" className="h-8 w-8" />
        </div>

        <div className="h-full  w-[80%]  flex justify-center items-center ">
          Sign in with Linked in
        </div>
      </button>
    </>
  );
}

export default Linkedin;