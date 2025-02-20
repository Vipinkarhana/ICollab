import React from 'react';
import { Search, FilePenLine, UsersRound, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Header from '../../Common/Header/Header';  
import AnimatedCounter from './AnimatedCounter';  
import TestimonialCard from './TestimonialCard';  

function LandingPage() {
  const totalPosts = 10000;

  return (
    <>
      {/* Header */}
      <Header id="Header" />

      <div className="flex flex-col items-center justify-between max-w-6xl mx-auto py-16 px-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto py-8 px-4 gap-14">
          {/* Left Section (Text and Button) */}
          <div className="w-[50%] flex flex-col justify-evenly gap-2">
            <h1 className="text-[3rem] font-bold mb-4">
              Innovation Research <br /> & Collaboration
            </h1>
            <p className="text-gray-950 text-lg font-semibold mb-4">
              A research collaboration platform for sharing knowledge and building a community of highly skilled professionals. <br />
              Startups and working professionals can accelerate their ideas and get the funds from the right investors, incubators, and accelerators. <br />
              Learn from the work of professionals from various sectors. Share and collaborate on your project, research work, and startup ideas.
            </p>
            <button className="bg-black text-white px-6 py-2 rounded-md w-[30%] text-xl">
              Learn more
            </button>
          </div>

          {/* Right Section (Image) */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src="/LandingImage.png" // Ensure the image exists in the public directory
              className="rounded-lg shadow-md"
              alt="website screenshot"
            />
          </div>
        </div>

        {/* Animated Counter */}
        <div>
          <AnimatedCounter totalPosts={totalPosts} />
        </div>

        {/* Testimonials */}
        <div className="h-[90svh]">
          <TestimonialCard />
        </div>

        {/* Features Section */}
        <div className="bg-white py-16 h-[90svh]">
          <div className="max-w-6xl mx-auto text-center px-4 flex flex-col gap-6 items-center">
            <h2 className="text-5xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-72">
              {/* Feature 1 */}
              <div className="bg-gray-200 p-6 rounded-lg">
                <div className="-mt-10 p-1 w-16 h-16 bg-gray-400 flex justify-center items-center rounded-full shadow-xl shadow-gray-200">
                  <Search color="white" size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-2">Research</h3>
                <p className="text-gray-700 text-lg">Promotes research work, business ideas, and financial needs.</p>
                <Link to="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</Link>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-200 p-6 rounded-lg shadow">
                <div className="-mt-10 p-1 w-16 h-16 bg-[#E0D4B7] flex justify-center items-center rounded-full">
                  <FilePenLine color="white" size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-2">Projects</h3>
                <p className="text-gray-700 text-lg">Resources library with research papers, articles and educational materials.</p>
                <Link to="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</Link>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-200 p-6 rounded-lg shadow">
                <div className="-mt-10 p-1 w-16 h-16 bg-[#C5DDAD] flex justify-center items-center rounded-full">
                  <UsersRound color="white" size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-2">Network</h3>
                <p className="text-gray-700 text-lg">Connect with professionals having similar interests.</p>
                <Link to="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</Link>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-200 p-6 rounded-lg shadow">
                <div className="-mt-10 p-1 w-16 h-16 bg-[#A0CED4] flex justify-center items-center rounded-full">
                  <Lightbulb color="white" size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-2">Incubators</h3>
                <p className="text-gray-700 text-lg">Explore incubators based on their profiles and funding options.</p>
                <Link to="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</Link>
              </div>
            </div>

            {/* Explore all features button */}
            <button className="mt-6 bg-black text-white rounded-lg p-4 w-[20%] text-lg font-semibold">Explore all features</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-300 text-black py-8 flex">
        <div className=" px-20 grid grid-cols-3 gap-10 ">
          {/* Left Section */}
          <div>
            <h2 className="text-lg font-bold">IR-Collab </h2>
            <p className="text-gray-900 mt-2 text-xl">
              We are an IoT company which sells its products online like IoT Devices, IoT Softwares, 
              IoT Applications related to the IoT Industry.
            </p>
          </div>

          {/* Middle Section */}
          <div>
            <h2 className="text-lg font-bold">Our Products</h2>
            <ul className="text-black mt-2 space-y-2 text-xl">
              <li>IoT Devices For Home Buildings</li>
              <li>IoT Devices For Agriculture Sector</li>
              <li>IoT Devices For Transportation Sector</li>
              <li>IoT Applications For Office Buildings</li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="text-black mt-2 text-2xl">
              IR-Collab <br />
              Tagline: Making Powerful IoT Applications <br />
              Sector-15, Noida, Uttar Pradesh, India <br />
              Phone Number: +91-7065151075 <br />
              Email: <a href="mailto:support@cubegreentech.com" className="text-green-600"><br />support@ir-collab.com</a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-20 mt-1">
          <h2 className="text-lg font-bold">Resources</h2>
          <ul className="mt-2 text-black space-y-2 text-xl">
            <li><Link to="/home" className="hover:text-white">Home</Link></li>
            <li><Link to="/network" className="hover:text-white">My Networks</Link></li>
            <li><Link to="/project" className="hover:text-white">Projects</Link></li>
            <li><Link to="/message" className="hover:text-white">Messages</Link></li>
            <li><Link to="/incubators" className="hover:text-white">Incubators</Link></li>
            <li><Link to="/profile" className="hover:text-white">User Profile</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
