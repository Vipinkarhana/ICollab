import React, { useState } from "react";
import Logo from "../../../assets/ICollab_Logo.png";
import { UserRound, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Google from "./Google";
import Linkedin from "./LinkedinButoon";
import { register } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async () => {
    try {
      const response = await register({ name, email, password });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-[98svw] flex justify-center items-center bg-gray-200 lg:bg-gray-50 py-2">
      <div className="h-auto w-[100%] lg:w-[50%] flex flex-col justify-center items-center rounded-lg lg:bg-gray-200">
        <div className="h-14 w-[100%] flex justify-start items-center px-4">
          <img src={Logo} alt="" className="h-[100%]" />
        </div>
        <div className="h-auto w-[100%] flex flex-col justify-center items-center">
          <div className="h-20 w-[100%] flex justify-center items-center text-3xl lg:text-3xl font-semibold">
            Register With ICollab
          </div>
          <div className="h-auto flex flex-col justify-center gap-5">
            {/* Name Input */}
            <div className="h-[20%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer w-full border-2 border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-200"
                />
                <label
                  htmlFor="name"
                  className={`absolute left-3 ${name
                    ? "-top-3 text-md px-1 bg-gray-200 peer-focus:text-black"
                    : "top-3 text-lg"
                    } text-gray-500 transition-all duration-300 rounded-xl w-auto flex justify-center items-center gap-2`}
                >
                  <UserRound size={20} />
                  Your Name
                </label>
              </div>
            </div>

            {/* Email Input */}
            <div className="h-[20%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full border-2 border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-200"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 ${email
                    ? "-top-3 text-md px-1 bg-gray-200 peer-focus:text-black"
                    : "top-3 text-lg"
                    } text-gray-500 transition-all duration-300 rounded-xl w-auto flex justify-center items-center gap-2`}
                >
                  <Mail size={20} />
                  Email
                </label>
              </div>
            </div>

            {/* Password Input */}
            <div className="h-[20%] w-[100%] flex justify-center items-center">
              <div className="relative w-64">
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full border-2 border-black rounded-md px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-200"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 ${password
                    ? "-top-3 text-md px-1 bg-gray-200 peer-focus:text-black"
                    : "top-3 text-lg"
                    } text-gray-500 transition-all duration-300 rounded-xl w-auto flex justify-center items-center gap-2`}
                >
                  <Lock size={20} />
                  Password
                </label>
              </div>
            </div>

            <div className="h-12 lg:h-10 w-[100%] flex justify-center items-center mt-2">
              <button
                className="h-[100%] w-[60%] bg-black text-white rounded-md text-xl"
                onClick={handleFormSubmit}
              >
                Register
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
          <Google />
          <Linkedin />
        </div>
        <div className="text-center mt-4 h-10">
          <p className="text-md text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
