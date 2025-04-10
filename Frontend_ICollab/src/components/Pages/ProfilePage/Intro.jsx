import { useState } from "react";
import ProfilePic from "../../Common/ProfilePic";
import { Github, Linkedin, Globe, MapPin, UserPlus } from "lucide-react";

function Intro() {
  const [activeTab, setActiveTab] = useState("Intro");
  const tabs = ["Intro", "Projects", "Resources"];

  const skills = ["JavaScript", "React", "Node.js", "CSS", "Python"];
  return (
    <div className="flex flex-col h-[55svh] justify-start items-center bg-white w-full px-6 py-4 gap-3">
      <div className="flex h-[75%] w-full  justify-around items-center gap-2 ">
        <div className="rounded-full h-48 w-48 flex justify-center items-center">
          <ProfilePic className="h-full w-full" />
        </div>
        <div className=" w-[80%] h-48 px-2 flex flex-col justify-evenly ">
          <div className="flex  justify-between h-auto items-start gap-1">
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="flex justify-center items-baseline gap-1">
                <p className="text-3xl font-bold tracking-tight">
                  Tanmay sharma
                </p>
                .
                <p className="text-gray-500 font-normal tracking-tight underline text-lg">
                  Frontend Developer
                </p>
              </div>
              <div className="flex justify-center items-baseline gap-2">
                <p className="text-xl text-gray-600 font-thin tracking-tight">
                  @Tanmaysharma36
                </p>
                <button className="w-full  px-4 py-1 rounded flex items-center justify-center gap-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg ">
                  <UserPlus size={20} />
                  Collab
                </button>
              </div>
            </div>
            <div className="w-[33%]  h-[80%] flex justify-evenly items-center">
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
              <button className="border border-gray-300 rounded-md px-4 py-2 text-purple-700 hover:bg-gray-100 transition-colors text-lg font-semibold">
                Edit Profile
              </button>
            </div>
          </div>
          <div className=" w-auto h-[50%] flex flex-col justify-around">
            {/* Skills Section */}
            <div className="flex justify-start items-start gap-2 ">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  className="border border-purple-300 rounded-md px-8 py-2 hover:bg-purple-200 transition-colors text-lg font-[1.5rem] "
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="flex justify-start items-center w-[70%]  opacity-75">
              <p className="text-gray-600 font-normal tracking-tight text-xl flex gap-2">
                <MapPin size={28} color="gray" strokeWidth={2} /> Delhi, India
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border w-[35%] h-[20%] bg-blue-100 rounded-md flex justify-evenly items-center ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-lg transition-colors 
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-black hover:bg-blue-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Intro;
