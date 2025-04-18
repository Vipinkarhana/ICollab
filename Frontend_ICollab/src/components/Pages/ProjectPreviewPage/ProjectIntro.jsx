import React from "react";
import {
  Heart,
  Eye,
  Blocks,
  UserPlus,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageNavbar from "../../Common/PageNavbar/PageNavbar";
import CollabButton from "../../Common/CollabButton";
import PhonePageNavbar from "../../Common/PageNavbar/PhonePageNavbar";
import Carousel from "../../Common/Carousel";

function ProjectIntro({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="w-full bg-white h-[92svh] flex flex-col items-center gap-2 justify-evenly">
      <div className="w-full h-[40%] flex items-start justify-center p-4 border-2">
        <div className="h-full flex flex-col justify-start items-center w-[15%] p-2 border-2">
          <div className="h-28 w-28 rounded-md overflow-hidden">
            <img
              src="https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F77e90ba53cec4f1883f1a5d3350f6e82%2Fprojects%2F226d73c18e3148c8854d27868b6188c4%2Fa67a5df8-2e9a-4cfe-a6d0-bae79844512c.jpeg&w=1440&q=75"
              alt=""
            />
          </div>
        </div>
        <div className="h-full w-[50%] flex flex-col justify-center items-center border-2">
          <div className="h-32 w-full flex flex-col justify-center items-start ">
            <p className="font-bold text-[3.2rem] ">CareTrack</p>
            <p className="text-gray-500 text-[1.5rem] -mt-4">
              Navigating Your Health Journey with Care and Precision!
            </p>
          </div>
          <div className="h-[50%] w-full flex flex-col justify-center items-center">
            <div className="h-[45%] w-full flex justify-start items-center gap-2 ">
              <button className="border-2 h-[80%] w-auto rounded-md flex items-center justify-center gap-2 text-xl px-4">
                <Eye size={30} />
                47
              </button>
              <CollabButton className="w-32" />
            </div>
            <div className="h-10 w-full flex justify-start gap-1 items-center ">
              <p className="text-gray-500 text-lg ">
                Created on 21st October 2023
              </p>
              <p className="text-gray-500 text-3xl ">•</p>
              <p className="text-gray-500 text-lg">
                Updated on 1st October 2025
              </p>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col justify-start items-center w-[25%] border-2">
          <div className="h-auto w-full flex justify-evenly items-start gap-1 py-2 ">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 rounded-full p-2 border-2 border-white hover:border-blue-600 hover:border-2"
            >
              <Github size={28} color="blue" strokeWidth={1.3} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 rounded-full p-2 border-2 border-white hover:border-blue-600 hover:border-2"
            >
              <Linkedin size={28} color="blue" strokeWidth={1.3} />
            </a>
            <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 rounded-full p-2 border-2 border-white hover:border-blue-600 hover:border-2"
            >
              <Globe size={28} color="blue" strokeWidth={1.3} />
            </a>
            <Link
              to={"/profile/edit"}
              className="border border-gray-300 rounded-md px-3 py-2 text-purple-700 hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              Edit Project
            </Link>
          </div>
          <div className="h-[80%] w-full flex justify-evenly items-center gap-1 text-pretty px-2">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
              magni quos fugit labore eum cumque veritatis dolores dolorem vitae
              molestias. Et sunt asperiores aspernatur delectus, perferendis
              dolor earum aut velit officiis deserunt.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[50%] border-2 flex justify-center items-center w-full">
        {/* <Carousel>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
          <div className="h-[80%] w-[15%]">Naman</div>
        </Carousel> */}

        <Carousel>
          
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>
        <div className="h-[80%] w-auto bg-green-100">Naman</div>

        </Carousel>
        
      </div>
    </div>
  );
}

export default ProjectIntro;
