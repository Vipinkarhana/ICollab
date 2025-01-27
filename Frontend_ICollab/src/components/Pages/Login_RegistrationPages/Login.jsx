import React from "react";
import Logo from "../../../assets/ICollab_Logo.png";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className="h-[99svh] w-[99svw] flex justify-center items-center bg-gray-200 lg:bg-gray-50 py-2">
        <div className="h-auto w-[100%] lg:w-[50%] flex flex-col justify-center items-center rounded-lg  lg:bg-gray-200">
          <div className="h-14 w-[100%] flex justify-start items-center px-4  ">
            <img src={Logo} alt="" className="h-[100%]" />
          </div>
          <div className="h-auto w-[100%] flex flex-col justify-center items-center">
            <div className="h-20 w-[100%] flex justify-center items-center  text-3xl lg:text-3xl font-semibold">
              Welcome Back!
            </div>
            <div className="h-auto flex flex-col justify-center gap-5">
              
              <div className="h-[15%] w-[100%] flex justify-center items-center">
                <div className="relative w-64">
                  <input
                    type="text"
                    id="input3"
                    required
                    className="peer w-full border-2 border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-gray-200"
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

              <div className="h-[18%] w-[100%] flex justify-center items-center">
                <div className="relative w-64">
                  <input
                    type="Password"
                    id="input4"
                    required
                    className="peer w-full border-2 border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-gray-200"
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
              <div className="h-12 lg:h-10 w-[100%] flex justify-center items-center mt-2">
                <button className="h-[100%] w-[60%] bg-black text-white rounded-md text-xl">
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center w-[90%] lg:w-[70%]  my-4">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="px-4 text-gray-500 text-lg font-semibold whitespace-nowrap">
              or sign in with
            </span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div>
          <div className="h-32 w-[100%] flex flex-col  justify-evenly items-center">
            <button className="flex items-center justify-evenly  bg-white text-white border border-blue-600 font-medium  rounded-lg  shadow-md  transition duration-300 h-12 w-[63%] lg:w-[34%] lg:h-10">
              <div className="w-[20%] h-full flex justify-center items-center">
                <svg className="w-20 h-8" viewBox="0 0 48 48">
                  <path
                    fill="#4285F4"
                    d="M24 22.08v5.84h9.84c-.44 2.64-3.12 7.76-9.84 7.76-5.92 0-10.72-4.88-10.72-10.88s4.8-10.88 10.72-10.88c3.36 0 5.6 1.44 6.88 2.64l4.88-4.8C32.96 8 28.96 6 24 6 13.6 6 6 13.6 6 24s7.6 18 18 18c9.28 0 17.04-6.72 17.04-16.08 0-1.12-.08-1.92-.24-2.72H24z"
                  />
                </svg>
              </div>
              <div className="h-full bg-blue-500 w-[80%] rounded-r-lg flex justify-center items-center text-md font-semibold">
                Sign in with Google
              </div>
            </button>
            <button className="flex items-center justify-evenly  bg-white text-white border border-blue-600 font-medium  rounded-lg  shadow-md  transition duration-300 h-12 w-[63%] lg:w-[34%] lg:h-10">
              <div className="w-[20%] h-full flex justify-center items-center">
                <svg className="w-full h-full" viewBox="0 0 48 48">
                  <path
                    fill="#0077B5"
                    d="M41.6 4H6.4C5.1 4 4 5.1 4 6.4v35.2C4 43 5.1 44 6.4 44h35.2c1.3 0 2.4-1 2.4-2.4V6.4C44 5.1 42.9 4 41.6 4zM15.6 36H10V19.2h5.6V36zm-2.8-19.2c-1.8 0-3.2-1.4-3.2-3.2S11 10.4 12.8 10.4s3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2zm24 19.2h-5.6v-8.8c0-2.1-.8-3.5-2.8-3.5-1.6 0-2.4 1-2.8 2-.2.4-.2 1-.2 1.6V36H20V19.2h5.6v2.4c.8-1.2 2.4-2.8 5.2-2.8 3.8 0 6.4 2.4 6.4 7.6V36z"
                  />
                </svg>
              </div>

              <div className="h-full bg-blue-500 w-[80%] rounded-r-lg flex justify-center items-center text-md font-semibold">
                Sign in with Linked in
              </div>
            </button>
          </div>
          <div className="text-center mt-4 h-10">
            <p className="text-md  text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;