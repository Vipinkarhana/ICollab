import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Google from "./Google";
import Linkedin from "./LinkedinButoon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../Redux/Slices/UserSlice";
import useAlert from "../../Common/UseAlert";
import dotenv from "dotenv";
dotenv.config();

const Login = () => {
  const Logo = "/ICollab.png";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccess, showWarning, showError] = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async () => {
    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();

      if (response.role === 'admin') {
        window.location.href = process.env.VITE_ADMIN_DOMAIN;
      } else {
        navigate("/home");
      }


    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="h-[99svh] w-[99svw] flex justify-center items-center   py-2">
      <div className="h-auto w-[100%] lg:w-[50%] flex flex-col justify-center items-center rounded-lg bg-white border border-gray-300">
        <div className="h-14 w-[100%] flex justify-start items-center px-4">
          <img src={Logo} alt="Logo" className="h-[100%]" />
        </div>
        <div className="h-auto w-[100%] flex flex-col justify-center items-center">
          <div className="h-20 w-[100%] flex justify-center items-center text-3xl lg:text-3xl font-semibold">
            Welcome Back!
          </div>
          <div className="h-auto flex flex-col justify-center gap-5">
            <div className="h-[15%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-white"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 top-3 text-gray-500 text-md px-1 transition-all duration-300 ${
                    email ? "-top-4 text-black" : "top-3 text-lg text-black"
                  } peer-focus:-top-4 peer-focus:left-3 peer-focus:text-md peer-focus:text-black peer-focus:px-1 peer-focus:bg-white rounded-xl flex items-center gap-2`}
                >
                  <Mail size={20} /> Email
                </label>
              </div>
            </div>

            <div className="h-[18%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black focus:border-b bg-white"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 top-3 text-gray-500 text-md px-1 transition-all duration-300 ${
                    password ? "-top-4 text-black" : "top-3 text-lg text-black"
                  } peer-focus:-top-4 peer-focus:left-3 peer-focus:text-md peer-focus:text-black peer-focus:px-1 peer-focus:bg-white rounded-xl flex items-center gap-2`}
                >
                  <Lock size={20} /> Password
                </label>
              </div>
            </div>

            <div className="h-12 lg:h-10 w-[100%] flex justify-center items-center mt-2">
              <button
                className="h-[100%] w-[60%] bg-black text-white rounded-md text-xl"
                onClick={handleFormSubmit}
              >
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
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="h-32 w-[100%] flex flex-col  justify-evenly items-center">
          <Google />
          <Linkedin />
        </div>
        <div className="text-center mt-4 h-10">
          <p className="text-md text-gray-600">
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
  );
};

export default Login;
