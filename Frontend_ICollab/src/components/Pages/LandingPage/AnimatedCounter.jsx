import React, { useEffect, useState } from "react";
import Users from "/Users.png";  
import PostsImg from "/posts.png";  
import IncubatorImg from "/Incubators.png";  
import InstitutionImg from "/Institution.png";
import IndustriesImg from "/Industry.png";
import LiveProjectImg from "/LiveProjectImg.png";

// Utility function to animate the count
const useCounterAnimation = (target) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 3000; 
    const incrementValue = target < 1000 ? 1 : 50;
    const totalIncrements = Math.max(target / incrementValue, 1);
    const incrementTime = duration / totalIncrements;

    let timer = setInterval(() => {
      start += incrementValue;
      if (start > target) start = target;
      setCount(start);
      if (start === target) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return count;
};

// Helper function to format numbers into k format (e.g., 1k, 2k)
const formatNumber = (number) => {
  return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number;
};

const Counter = ({ target, text, image }) => {
  const count = useCounterAnimation(target);

  return (
    <div className="flex flex-col items-center w-full sm:w-[48%] md:w-[20rem] justify-center">
      <div className="w-14 h-14 mb-4 mx-auto">
        <img src={image} alt={text} className="w-full h-full object-cover" />
      </div>
      <p className="text-gray-700 text-7xl font-semibold">{formatNumber(count)}</p>
      <p className="text-gray-500 text-2xl font-medium">{text}</p>
    </div>
  );
};

const SocialCounter = () => {
  const targets = [400, 112, 2, 2, 3, 5];
  const images = [PostsImg, Users, IncubatorImg, InstitutionImg, IndustriesImg, LiveProjectImg];
  const labels = ["Posts", "Users", "Incubators", "Institutions", "Industries", "Live Project"];

  return (
    <div className="w-full px-4 py-20 flex flex-col items-center justify-center gap-10">
  {/* Upper Row (First 3 Counters) */}
  <div className="flex flex-wrap justify-center gap-14 sm:gap-4 sm:flex-col md:flex-row">
    {targets.slice(0, 3).map((target, index) => (
      <Counter key={index} target={target} text={labels[index]} image={images[index]} />
    ))}
    
  </div>

  {/* Lower Row (Last 3 Counters) */}
  <div className="flex flex-wrap justify-center gap-14  sm:gap-4 sm:flex-col md:flex-row">
    {targets.slice(3).map((target, index) => (
      <Counter key={index + 3} target={target} text={labels[index + 3]} image={images[index + 3]} />
    ))}
  </div>



      {/* Section with Image and Text */}
      <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-8 px-6 max-w-6xl mx-auto">
        {/* Left Side Image */}
        <div className="w-[100%] md:w-[30%] max-w-[250px] flex justify-center mb-8 md:mb-0">
          <img src="/StartupImg.jpeg" alt="Startup and Incubation" className="w-full h-auto rounded-lg shadow-lg" />
        </div>

        {/* Right Side Text */}
        <div className="w-[100%] md:w-[60%] text-center md:text-left">
          <h1 className="font-bold text-4xl leading-snug text-gray-800">
            Our Main Branch for Startup and Incubation Funding
          </h1>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            A leading foundation with connected incubation centers across many states like 
            <span className="font-semibold"> Uttar Pradesh, Delhi, Haryana, Uttarakhand, and Punjab.</span><br />
            Serving funding requirements of student entrepreneurs, schools, universities, institutions, and grants requirements from state and central government.
          </p>
          <a href="https://uvpfoundation.org/our-gallery/" target="_blank" rel="noopener noreferrer">
            <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-black transition duration-300">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialCounter;
