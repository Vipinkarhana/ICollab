import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import AddProgramForm from "./AddProgramForm";
import {
  Zap,
  Sprout,
  Factory,
  CheckCircle,
  Calendar,
  BadgeCheck,
  Menu,
} from "lucide-react";

const initialData = [
  ["Duration", "3 Months", "6 Months", "Ongoing"],
  ["Funding", "₹25L", "No", "No"],
  ["Mentor Support", true, true, true],
];

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([
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
  ]);

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

  const [isFormOpen, setFormOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [headers, setHeaders] = useState([
    "Metric",
    "Seed Accelerator",
    "Pre-Incubation",
    "Industry Connect",
  ]);
  const [rows, setRows] = useState(initialData);
  const [editCell, setEditCell] = useState({ r: null, c: null });
  const [adding, setAdding] = useState(false);
  const [newMetric, setNewMetric] = useState("");

  const handleCellClick = (r, c) => setEditCell({ r, c });
  const handleInputChange = (e, r, c) => {
    const val =
      typeof rows[r][c] === "boolean" ? e.target.checked : e.target.value;
    const updated = [...rows];
    updated[r][c] = val;
    setRows(updated);
  };
  const handleBlur = () => setEditCell({ r: null, c: null });
  const handleKey = (e) => e.key === "Enter" && handleBlur();
  const addMetric = () => {
    if (!newMetric.trim()) return;
    const newRow = [newMetric.trim(), "", "", ""];
    setRows((prev) => [...prev, newRow]);
    setNewMetric("");
    setAdding(false);
  };
  const isDefaultMetric = (r) => r < initialData.length;

  const handleAddProgram = (newProgram) => {
    const iconMap = {
      Online: <Sprout className="text-blue-600" size={28} />,
      Offline: <Factory className="text-blue-600" size={28} />,
      Hybrid: <Zap className="text-blue-600" size={28} />,
    };

    const program = {
      icon: iconMap[newProgram.mode] || (
        <Zap className="text-blue-600" size={28} />
      ),
      title: newProgram.title,
      duration: newProgram.duration,
      tags: newProgram.tags,
      startDate: `Starts ${new Date(newProgram.startDate).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )}`,
      features: [
        newProgram.funding,
        newProgram.mentorship && "Dedicated mentorship",
        newProgram.workspace && "Co-working space",
        newProgram.corporate && "Corporate access",
      ].filter(Boolean),
      cta: newProgram.cta,
    };

    setPrograms((prev) => [...prev, program]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="md:block hidden">
          <SidebarHeader />
        </div>
        {/* Mobile Sidebar (slide-in) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed top-0 left-0 z-50 w-64 bg-white h-full shadow-md transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
        >
          <SidebarHeader />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full overflow-x-hidden">
          {/* Mobile Top Navbar */}
          <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 flex items-center px-4 md:hidden mt-14">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={24} className="text-gray-700" />
            </button>
            <h1 className="ml-4 text-lg font-semibold text-gray-800">
              IncubatorHub
            </h1>
          </div>

          <main className="flex-1 pt-20 pb-24 px-4 sm:px-6 md:px-10 ml-0 md:ml-64">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <section className="mb-12 flex flex-row sm:flex-row sm:items-center justify-between gap-4 mt-12 sm:mt-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 border-l-4 border-blue-600 pl-4">
                    Our Incubation Programs
                  </h1>
                  <p className="text-gray-600 pl-4 text-sm sm:text-base">
                    Explore our tailored programs for every stage of your
                    startup journey.
                  </p>
                </div>
                <button
                  onClick={() => setFormOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white sm:px-4 sm:py-2 p-2 rounded-lg  font-semibold shadow transition w-[25%] h-[25%] sm:w-auto"
                >
                  + Add Program
                </button>
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
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-700"
                        >
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {successStories.map((startup, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 sm:p-5 rounded-xl shadow-md flex items-center gap-4"
                    >
                      <img
                        src={startup.logo}
                        alt={startup.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg text-gray-800">
                          {startup.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {startup.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comparison Table */}
              <section className="mt-20">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4">
                  Compare Your Programs
                </h2>
                <div className="overflow-x-auto animate-fade-in-up">
                  <table className="min-w-full bg-white rounded-xl shadow-lg ring-1 ring-gray-200 text-sm text-gray-800">
                    <thead className="bg-blue-50 text-blue-900 sticky top-0 z-10">
                      <tr>
                        {headers.slice(0, 4).map((h, i) => (
                          <th
                            key={"header-" + i}
                            className="text-left px-6 py-4 border-b border-blue-200 text-sm font-semibold uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {rows.map((row, r) => (
                        <tr
                          key={"row-" + r}
                          className="hover:bg-blue-50 transition duration-300 ease-in-out"
                        >
                          {row.slice(0, 4).map((cell, c) => (
                            <td
                              key={"cell-" + r + "-" + c}
                              className="px-6 py-4 border-r last:border-r-0 align-middle text-sm"
                              onClick={() =>
                                (c !== 0 || !isDefaultMetric(r)) &&
                                handleCellClick(r, c)
                              }
                            >
                              {editCell.r === r && editCell.c === c ? (
                                typeof cell === "boolean" ? (
                                  <input
                                    type="checkbox"
                                    checked={cell}
                                    onChange={(e) => handleInputChange(e, r, c)}
                                    onBlur={handleBlur}
                                    className="accent-blue-600 w-4 h-4"
                                    autoFocus
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    className="w-full border border-blue-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={cell}
                                    onChange={(e) => handleInputChange(e, r, c)}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKey}
                                    autoFocus
                                  />
                                )
                              ) : (
                                <span
                                  className={
                                    c === 0
                                      ? "font-semibold text-gray-800"
                                      : "block text-gray-700"
                                  }
                                >
                                  {typeof cell === "boolean"
                                    ? cell
                                      ? "Yes"
                                      : "No"
                                    : cell}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td className="px-6 py-4 border-t" colSpan={4}>
                          {adding ? (
                            <input
                              type="text"
                              className="w-full border-b border-blue-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="New metric"
                              value={newMetric}
                              onChange={(e) => setNewMetric(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && addMetric()
                              }
                              onBlur={addMetric}
                              autoFocus
                            />
                          ) : (
                            <button
                              className="text-blue-600 font-medium hover:underline transition duration-200"
                              onClick={() => setAdding(true)}
                            >
                              + Add Metric
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Modal Form */}
              <AddProgramForm
                isOpen={isFormOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleAddProgram}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
