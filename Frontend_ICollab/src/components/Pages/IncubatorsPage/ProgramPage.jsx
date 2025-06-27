import React from "react";
import SidebarHeader from "./SidebarHeader";
import {
  Zap,
  Sprout,
  Factory,
  CheckCircle,
  Calendar,
  BadgeCheck,
} from "lucide-react";

const programs = [
  {
    icon: <Zap className="text-blue-600" size={28} />,
    title: "Seed Accelerator",
    duration: "3 Months Program",
    tags: ["Advanced", "Hybrid"],
    startDate: "Starts July 15, 2025",
    features: [
      "₹25L funding",
      "Dedicated mentorship",
      "Co-working space",
      "Investor connections",
    ],
    cta: "Apply Now",
  },
  {
    icon: <Sprout className="text-blue-600" size={28} />,
    title: "Pre-Incubation",
    duration: "6 Months Program",
    tags: ["Beginner", "Online"],
    startDate: "Starts August 1, 2025",
    features: [
      "Idea validation",
      "Prototype development",
      "Business model workshops",
      "Access to labs",
    ],
    cta: "Apply Now",
  },
  {
    icon: <Factory className="text-blue-600" size={28} />,
    title: "Industry Connect",
    duration: "Ongoing",
    tags: ["Expert", "In-person"],
    startDate: "Open all year",
    features: [
      "Corporate partnerships",
      "Pilot opportunities",
      "Technical mentorship",
      "Market access",
    ],
    cta: "Learn More",
  },
];

const successStories = [
  {
    name: "AgroHive",
    description: "Raised ₹1.2 Cr seed funding post-accelerator.",
    logo: "https://ui-avatars.com/api/?name=AgroHive&background=0D8ABC&color=fff",
  },
  {
    name: "HealthifyGo",
    description: "Acquired by a major health tech firm in 2024.",
    logo: "https://ui-avatars.com/api/?name=HealthifyGo&background=F39C12&color=fff",
  },
  {
    name: "Recytech",
    description: "Expanded to 4 countries after pre-incubation.",
    logo: "https://ui-avatars.com/api/?name=Recytech&background=27AE60&color=fff",
  },
];

const comparisonData = [
  ["Duration", "3 Months", "6 Months", "Ongoing"],
  ["Funding", "₹25L", "No", "No"],
  ["Mentorship", "✔️", "✔️", "✔️"],
  ["Workspace Access", "✔️", "✔️", "❌"],
  ["Corporate Connections", "✔️", "❌", "✔️"],
];

const ProgramsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar */}
      <SidebarHeader />

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-24 px-4 md:px-10 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 border-l-4 border-blue-600 pl-4">
              Our Incubation Programs
            </h1>
            <p className="text-gray-600 pl-4">
              Explore our tailored programs for every stage of your startup journey.
            </p>
          </section>

          {/* Program Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 relative min-h-[460px]"
              >
                {program.title === "Seed Accelerator" && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <BadgeCheck size={14} />
                    Top Program
                  </div>
                )}

                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
                  {program.icon}
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {program.title}
                </h2>
                <p className="text-sm font-medium text-blue-600 mb-2">
                  {program.duration}
                </p>

                <div className="flex gap-2 flex-wrap mb-3">
                  {program.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar size={14} className="mr-2" />
                  {program.startDate}
                </div>

                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  {program.cta}
                </button>
              </div>
            ))}
          </section>

          {/* Success Stories */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((startup, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4"
                >
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">
                      {startup.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{startup.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Program Comparison Table */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">
              Compare Our Programs
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md text-sm text-gray-700">
                <thead className="bg-blue-100 text-gray-800">
                  <tr>
                    <th className="text-left p-3">Feature</th>
                    <th className="text-left p-3">Seed Accelerator</th>
                    <th className="text-left p-3">Pre-Incubation</th>
                    <th className="text-left p-3">Industry Connect</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="border-t">
                      {row.map((cell, j) => (
                        <td key={j} className="p-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProgramsPage;
