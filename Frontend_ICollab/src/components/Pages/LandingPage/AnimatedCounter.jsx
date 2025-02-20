import React, { useEffect, useState } from "react";
import Users from "/Users.png";  
import PostsImg from "/posts.png";  
import IncubatorImg from "/Incubators.png";  
import InstitutionImg from "/Institution.png";
import IndustriesImg from "/Industry.png";

// Utility function to animate the count
const useCounterAnimation = (target) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 3000; // 4 seconds total duration

    // Dynamically set increment based on the target value
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
   
    <div className="flex flex-col items-center w-[20rem]  ">
       <div className="w-14 h-14">
      <img src={image} alt={text} className="w-full h-full object-cover " />
      </div>
      <p className="text-gray-700 text-7xl font-semibold">{formatNumber(count)}</p>
      <p className="text-gray-500 text-2xl font-medium">{text}</p>
    </div>
  );
};

const SocialCounter = () => {
  const targets = [350, 112, 3, 3, 3];
  const images = [PostsImg, Users, IncubatorImg, InstitutionImg, IndustriesImg];
  const labels = ["Posts", "Users", "Incubators", "Institutions", "Industrials"];

  return (
    <div className="h-[90svh] w-[85svw] flex flex-col items-center justify-center gap-10 mt-40">
      {/* Upper Row (First 3 Counters) */}
      <div className="flex justify-center gap-14">
        {targets.slice(0, 3).map((target, index) => (
          <Counter key={index} target={target} text={labels[index]} image={images[index]} />
        ))}
      </div>

      {/* Lower Row (Last 2 Counters) */}
      <div className="flex justify-center gap-14 mt-20">
        {targets.slice(3).map((target, index) => (
          <Counter key={index + 3} target={target} text={labels[index + 3]} image={images[index + 3]} />
        ))}
      </div>
    </div>
  );
};

export default SocialCounter;