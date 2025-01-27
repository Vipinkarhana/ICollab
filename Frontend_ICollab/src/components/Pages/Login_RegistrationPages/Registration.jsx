import React from "react";
import Logo from "../../../assets/ICollab_Logo.png"
import { UserRound } from "lucide-react"
import {Phone} from "lucide-react"
import { Mail } from "lucide-react"
import {Lock} from "lucide-react"
const Register = () => {
  return (
    <div className="h-[99svh] w-[99svw] flex justify-center items-center bg-gray-50">
      <div className="h-[95%] w-[95%] lg:w-[50%]  rounded-lg bg-gray-200">
        <div className="h-[10%] w-[100%] flex justify-start items-center px-4 ">
          <img src={Logo} alt="" className="h-[70%]" />
        </div>
        <div className="h-[80%] w-[100%] flex flex-col justify-center items-center">
          <div className="h-[15%] w-[100%] flex justify-center items-center  text-2xl lg:text-3xl font-semibold">
            Register With ICollab
          </div>
          <div className="h-[80%] flex flex-col justify-evenly gap-5">
            <div className="h-[20%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  id="input1"
                  required
                  className="peer w-full border border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-gray-200"
                />
                <label
                  htmlFor="input1"
                  className="absolute left-3 top-3 text-gray-500 text-md px-1 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-black peer-focus:-top-4 peer-focus:left-3 peer-focus:text-md peer-focus:text-black peer-focus:px-1 peer-focus:bg-gray-200 rounded-xl w-[auto] flex justify-center items-center gap-2 peer-focus:gap-1"
                >
                  <UserRound size={20} />
                  Your Name
                </label>
              </div>
            </div>

            <div className="h-[20%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  id="input2"
                  required
                  className="peer w-full border border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-gray-200"
                />
                <label
                  htmlFor="input2"
                  className="absolute left-3 top-3 text-gray-500 text-md px-1 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-black peer-focus:-top-4 peer-focus:left-3 peer-focus:text-md peer-focus:text-black peer-focus:px-1 peer-focus:bg-gray-200 rounded-xl w-[auto] flex justify-center items-center gap-2 peer-focus:gap-1"
                >
                  <Phone size={20} />
                  Mobile no.
                </label>
              </div>
            </div>

            <div className="h-[20%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  id="input3"
                  required
                  className="peer w-full border border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-gray-200"
                />
                <label
                  htmlFor="input3"
                  className="absolute left-3 top-3 text-gray-500 text-md px-1 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-black peer-focus:-top-4 peer-focus:left-3 peer-focus:text-md peer-focus:text-black peer-focus:px-1 peer-focus:bg-gray-200 rounded-xl w-[auto] flex justify-center items-center gap-2 peer-focus:gap-1"
                >
                  <Mail size={20} />
                  Email
                </label>
              </div>
            </div>

            <div className="h-[20%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="Password"
                  id="input4"
                  required
                  className="peer w-full border border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-gray-200"
                />
                <label
                  htmlFor="input4"
                  className="absolute left-3 top-3 text-gray-500 text-md px-1 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-black peer-focus:-top-4 peer-focus:left-3 peer-focus:text-md peer-focus:text-black peer-focus:px-1 peer-focus:bg-gray-200 rounded-xl w-[auto] flex justify-center items-center gap-2 peer-focus:gap-1"
                >
                  <Lock size={20} />
                  Password
                </label>
              </div>
            </div>
          <div className="h-[15%] w-[100%] flex justify-center items-center mt-2">
            <button className="h-[100%] w-[60%] bg-black text-white rounded-md text-lg">Register</button>
          </div>
          </div>
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  );
}

export default Register;