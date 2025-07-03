import React from "react";
import { motion } from "framer-motion";

const startups = [
  {
    initial: "E",
    name: "EcoTech Solutions",
    subtitle: "AI-powered waste management",
    description:
      "Developing smart waste sorting systems using computer vision to improve recycling efficiency.",
    founded: 2022,
    stage: "Seed Stage",
    tags: ["AI", "Sustainability", "Computer Vision"],
  },
  {
    initial: "H",
    name: "HealthAI",
    subtitle: "Predictive healthcare analytics",
    description:
      "Using machine learning to predict patient health risks and optimize treatment plans.",
    founded: 2021,
    stage: "Series A",
    tags: ["Healthcare", "Machine Learning", "Big Data"],
  },
  {
    initial: "A",
    name: "AgriGrow",
    subtitle: "Smart farming solutions",
    description:
      "IoT sensors and analytics platform to optimize crop yields and reduce water usage.",
    founded: 2023,
    stage: "Pre-Seed",
    tags: ["IoT", "Agriculture", "Sustainability"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, type: "spring" },
  }),
};

const StartupCard = ({ startup, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
    className="bg-white rounded-2xl border border-gray-200 p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[40%] xl:w-[30%] cursor-pointer transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-md">
        {startup.initial}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{startup.name}</h2>
        <p className="text-sm text-gray-500">{startup.subtitle}</p>
      </div>
    </div>

    <p className="text-gray-600 text-sm mb-4">{startup.description}</p>

    <div className="flex flex-wrap gap-3 text-sm text-blue-700 font-medium mb-2">
      <span className="bg-blue-50 px-3 py-1 rounded-full">Founded: {startup.founded}</span>
      <span className="bg-blue-50 px-3 py-1 rounded-full">{startup.stage}</span>
    </div>

    <div className="flex flex-wrap gap-2 mt-4">
      {startup.tags.map((tag, i) => (
        <span
          key={i}
          className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const StartupCards = () => (
  <div className="bg-gray-50 py-12 px-4 sm:px-8 min-h-screen">
    <div className="max-w-7xl mx-auto">
    
      <div className="flex flex-wrap justify-center gap-8">
        {startups.map((startup, index) => (
          <StartupCard key={index} startup={startup} index={index} />
        ))}
      </div>
    </div>
  </div>
);

export default StartupCards;
