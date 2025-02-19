import React, { useEffect, useState } from "react";
import Users from "/Users.png";  // Replace with a placeholder or dynamic import for different images
import PostsImg from "/posts.png"; // Replace with actual image paths
import IncubatorImg from "/Incubators.png"; // Replace with actual image paths

// Utility function to animate the count with dynamic increment values
const useCounterAnimation = (target) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 4000; // 4 seconds total duration

    // Dynamically set increment based on the target value
    const incrementValue = target < 1000 ? 1 : 50;

    // Calculate the total increments and adjust interval time accordingly
    const totalIncrements = Math.max(end / incrementValue, 1);
    const incrementTime = duration / totalIncrements;

    if (start === end) return;

    let timer = setInterval(() => {
      start += incrementValue;
      if (start > end) start = end; // Ensure we don't exceed the target
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return count;
};

// Helper function to format numbers into k format (e.g. 1k, 2k)
const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`; // Formats numbers like 1.0k, 2.3k, etc.
  }
  return number;
};

const Counter = ({ target, text, image }) => {
  const count = useCounterAnimation(target);

  return (
    <div className="flex flex-col justify-evenly items-center w-[25rem]">
      <div className="w-14 h-14">
        <img src={image} alt={text} className="w-full h-full object-cover" />
      </div>
      <div className="text-gray-700 text-[7rem] font-semibold transition-all duration-500 ease-in-out">
        {formatNumber(count)} {/* Display formatted count */}
      </div>
      <div className="text-gray-500 text-2xl font-semibold">{text}</div>
    </div>
  );
};

const SocialCounter = () => {
  // Define the target values for the counters
  const targets = [12000, 5000, 7500];

  // Define the image sources for each counter
  const images = [PostsImg,Users,IncubatorImg];

  return (
    <div className="h-[90svh] w-[85svw] flex justify-evenly items-center">
      <div className="flex justify-between items-center w-[100%]">
        {targets.map((target, index) => (
          <Counter 
            key={index} 
            target={target} 
            text={["Posts", "Users", "Incubators"][index]} 
            image={images[index]}  // Passing the image prop for each counter
          />
        ))}
      </div>
    </div>
  );
};

export default SocialCounter;
