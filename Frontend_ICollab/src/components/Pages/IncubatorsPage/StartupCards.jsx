import React from "react";

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

const StartupCard = ({ startup }) => (
  <div className="bg-white rounded-lg shadow-md p-5 transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] cursor-pointer 
                  w-full sm:w-[90%] md:w-[45%] lg:w-[40%] xl:w-[30%] sm:h-80 h-auto">
    <div className="flex items-center space-x-4 mb-3">
      <div className="bg-gray-200 text-2xl font-bold text-gray-600 w-10 h-10 flex items-center justify-center rounded-full">
        {startup.initial}
      </div>
      <div className="flex flex-col flex-1">
        <h2 className="text-lg font-semibold">{startup.name}</h2>
        <p className="text-sm text-gray-500">{startup.subtitle}</p>
        <hr className="w-full border-t border-gray-300 my-2" />
      </div>
    </div>

    <p className="text-gray-500 mb-4 text-base">{startup.description}</p>

    <div className="flex flex-wrap items-center text-sm text-blue-600 font-medium gap-4 mb-2">
      <span className="bg-blue-100 px-2 py-1 rounded-full">📅 Founded: {startup.founded}</span>
      <span className="bg-blue-100 px-2 py-1 rounded-full">📈 {startup.stage}</span>
    </div>

    <div className="flex flex-wrap gap-3 mt-4">
      {startup.tags.map((tag, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const StartupCards = () => (
  <div className="flex flex-wrap gap-6 p-4 sm:p-6 bg-gray-50 min-h-screen justify-center">
    {startups.map((startup, index) => (
      <StartupCard key={index} startup={startup} />
    ))}
  </div>
);

export default StartupCards;
