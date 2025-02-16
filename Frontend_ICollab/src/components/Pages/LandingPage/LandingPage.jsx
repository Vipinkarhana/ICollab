import React from 'react';
import { Search ,FilePenLine, UsersRound, Lightbulb} from 'lucide-react';
import Header from '../../Common/Header/Header';

function LandingPage() {
  return (
    <>
      <Header id="Header" />
    <div className="flex flex-col  items-center justify-between max-w-6xl mx-auto py-16 px-4">
    <div className="flex  items-center justify-between max-w-6xl mx-auto py-8 px-4 gap-14">
      <div className="w-[50%] flex flex-col justify-evenly gap-4">
        <h1 className="text-[3.5rem] font-bold mb-4">IdeaIn - Ideas Collab</h1>
        <p className="text-gray-950 text-lg font-semibold mb-4">
          A research collaboration platform for sharing knowledge and building a community of highly skilled professionals. <br />
          Startups and working professionals can accelerate their ideas and get the funds from the right investors, incubators, and accelerators. <br />
          Learn from the work of professionals from various sectors. Share and collaborate on your project, research work, and startup ideas.
        </p>
        <button className="bg-black text-white px-6 py-2 rounded-md w-[30%] text-xl">Learn more</button>
      </div>

      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <img 
          src="/LandingImage.png" 
          className="rounded-lg shadow-md" 
          alt="website screenshot" 
        />
      </div>
    </div>

    <div className="bg-white py-16 ">
      <div className="max-w-6xl mx-auto text-center px-4 flex flex-col gap-6 items-center">
        <h2 className="text-3xl font-bold mb-6 ">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-72">
          <div className="bg-gray-200 p-6 rounded-lg ">
            <div className="-mt-10 p-1 w-16 h-16  bg-gray-400 flex justify-center items-center rounded-full  shadow-xl shadow-gray-200">
            <Search color='white' size={26} />
            </div>
            <h3 className="text-2xl font-bold mb-2 mt-2">Research</h3>
            <p className="text-gray-700 text-lg">Promotes research work, business ideas, and financial needs.</p>
            <a href="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</a>
          </div>
         <div className="bg-gray-200 p-6 rounded-lg shadow">
         <div className="-mt-10 p-1 w-16 h-16  bg-[#E0D4B7] flex justify-center items-center rounded-full">
         <FilePenLine color='white' size={26}/> 
            </div>
         <h3 className="text-2xl font-bold mb-2 mt-2">Projects</h3>
            <p className="text-gray-700 text-lg">Resources library with research papers, articles and educational materials.</p>
         <a href="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</a>
         </div>
         <div className="bg-gray-200 p-6 rounded-lg shadow">
         <div className="-mt-10 p-1 w-16 h-16  bg-[#C5DDAD] flex justify-center items-center rounded-full">
         <UsersRound color='white' size={26}/> 
            </div>
         <h3 className="text-2xl font-bold mb-2 mt-2">Network</h3>
            <p className="text-gray-700 text-lg">Connect with professionals having similar interests.</p>
         <a href="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</a>
         </div>
         <div className="bg-gray-200 p-6 rounded-lg shadow">
         <div className="-mt-10 p-1 w-16 h-16  bg-[#A0CED4] flex justify-center items-center rounded-full">
         <Lightbulb color='white' size={26}/> 
            </div>
         <h3 className="text-2xl font-bold mb-2 mt-2">Incubators</h3>
         <p className="text-gray-700 text-lg">Explore incubators based on their profiles and funding options.</p>
         <a href="#" className="text-black font-bold mt-4 block hover:underline text-lg">Learn more</a>
         </div>
        </div>
        <button className='mt-6 bg-black text-white  rounded-lg p-4 w-[20%] text-lg font-semibold'>Explore all features</button>
      </div>
    </div>
    </div>
    </>
  );
}

export default LandingPage;
