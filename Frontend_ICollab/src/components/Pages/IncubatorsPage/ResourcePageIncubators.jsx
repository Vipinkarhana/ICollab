import React, { useState } from "react";
import {
  Lightbulb,
  Download,
  FileText,
  Landmark,
  Megaphone,
  Cpu,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  ClipboardCheck,
  Menu,
} from "lucide-react";
import SidebarHeader from "./SidebarHeader";

const categories = ["All Resources", "Legal", "Funding", "Marketing", "Technology"];

const dummyResources = [
  {
    id: 1,
    title: "Startup Legal Guide",
    type: "Legal",
    icon: <Landmark size={36} />,
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Investor Pitch Deck Template",
    type: "Funding",
    icon: <FileText size={36} />,
    downloadLink: "#",
  },
  {
    id: 3,
    title: "Marketing Strategy 101",
    type: "Marketing",
    icon: <Megaphone size={36} />,
    downloadLink: "#",
  },
  {
    id: 4,
    title: "AI Tools for Startups",
    type: "Technology",
    icon: <Cpu size={36} />,
    downloadLink: "#",
  },
];

const trendingResources = [
  {
    id: 5,
    title: "Due Diligence Checklist",
    icon: <ShieldCheck size={36} />,
    downloadLink: "#",
  },
  {
    id: 6,
    title: "Startup Pitch Template",
    icon: <ClipboardCheck size={36} />,
    downloadLink: "#",
  },
];

const founderToolkits = [
  {
    name: "Legal Starter Kit",
    icon: <Landmark size={28} />,
    description: "Incorporation docs, NDA templates, IP agreements.",
  },
  {
    name: "Fundraising Essentials",
    icon: <Briefcase size={28} />,
    description: "Pitch deck templates, investor email scripts, term sheets.",
  },
  {
    name: "Marketing Pack",
    icon: <Megaphone size={28} />,
    description: "Go-to-market strategy, brand kit, ad copy templates.",
  },
];

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All Resources");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const filteredResources =
    activeCategory === "All Resources"
      ? dummyResources
      : dummyResources.filter((r) => r.type === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100 mt-8">
      <div className="flex flex-1 relative">
        <div className="md:block hidden">
          <SidebarHeader />
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed top-0 left-0 z-50 w-64 bg-white h-full shadow-md transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <SidebarHeader />
        </div>

        <div className="flex-1 flex flex-col md:ml-64 w-full">
          <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 flex items-center px-4 md:hidden mt-14">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={24} className="text-gray-700" />
            </button>
            <h1 className="ml-4 text-lg font-semibold text-gray-800">IncubatorHub</h1>
          </div>

          <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2 mt-20 sm:mt-0">Resource Library</h1>
              <p className="text-gray-500 text-md">Explore curated tools, templates, and guides to accelerate your startup journey.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition border shadow-sm ${
                    activeCategory === category
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp size={20} /> Trending Resources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingResources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col justify-between"
                  >
                    <div className="text-blue-600 mb-4">{res.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{res.title}</h3>
                    <a
                      href={res.downloadLink}
                      className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition mt-auto"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Founder Toolkits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {founderToolkits.map((kit, index) => (
                  <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
                    <div className="flex items-center gap-3 text-blue-600 mb-4">
                      {kit.icon}
                      <h3 className="text-lg font-semibold text-gray-800">{kit.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{kit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">All Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
                  >
                    <div className="bg-blue-600 p-6 flex justify-center items-center relative">
                      <div className="text-white">{res.icon}</div>
                      <span className="absolute top-4 right-4 bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {res.type}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{res.title}</h3>
                      <div className="mt-auto pt-4 border-t border-gray-200">
                        <a
                          href={res.downloadLink}
                          className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                        >
                          <Download size={16} />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
