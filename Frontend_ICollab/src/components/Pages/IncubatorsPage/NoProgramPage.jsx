import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import { Rocket, Calendar, CheckCircle, Zap, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useIncubator } from '../../Common/IncubatorContext';
import { createProgram } from '../../../Services/incubatorService';

const ProgramsPage = () => {
  const { addProgram } = useIncubator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    tags: [],
    tagInput: "",
    startDate: "",
    funding: "",
    mentorship: false,
    workspace: false,
    corporate: false,
    mode: "Online",
    level: "Beginner",
    ctaLabel: "",
  });

  const [additionalFeatures, setAdditionalFeatures] = useState([]);
  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim() && featureInput.length <= 50) {
      setAdditionalFeatures((prev) => [...prev, featureInput.trim()]);
      setFeatureInput("");
      setShowFeatureInput(false);
    }
  };

  const handleFeatureDelete = (index) => {
    setAdditionalFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const finalData = { ...formData, additionalFeatures };
    try {
      const response = await createProgram(finalData);
      addProgram(response.program); // Add to context
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create program:', error);
      // Handle error (show toast, etc.)
    }
  };

  

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-white to-blue-50">
      <SidebarHeader />
      <main className="flex-1 pt-24 pb-16 px-6 md:px-16 ml-64">
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center bg-white rounded-3xl shadow-lg p-12 border border-blue-200 relative overflow-hidden"
          >
            <div className="absolute -top-6 -left-6 opacity-10">
              <Rocket size={120} className="text-blue-500" />
            </div>
            <div className="flex justify-center items-center gap-2 mb-4">
              <Rocket className="text-blue-700 animate-pulse" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
                Incubation Programs
              </h1>
            </div>
            <p className="text-gray-600 text-lg mb-6">
              Manage and launch world-class startup support initiatives tailored for every growth stage.
            </p>
            <div className="flex justify-center gap-6 mb-6 text-gray-600 text-sm">
              <div className="flex items-center gap-1"><CheckCircle className="text-green-500" size={16}/> 10+ Programs Running</div>
              <div className="flex items-center gap-1"><Zap className="text-yellow-500" size={16}/> ₹1 Cr+ Funding Disbursed</div>
              <div className="flex items-center gap-1"><Calendar className="text-blue-500" size={16}/> 500+ Startups Supported</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-700 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-800 transition text-lg font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              + Add New Program
            </motion.button>
          </motion.div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4 ">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-3xl p-8 rounded-3xl shadow-2xl relative border border-blue-100"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-6 border-l-4 border-blue-600 pl-3">
                📝 New Program Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Program Title
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Funding Amount (₹)
                    </label>
                    <input
                      name="funding"
                      value={formData.funding}
                      onChange={handleChange}
                      placeholder="e.g. 25L"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mode
                    </label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    >
                      <option>Online</option>
                      <option>Offline</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Program Benefits
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded-lg bg-gray-50">
                    {["mentorship", "workspace", "corporate"].map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          name={item}
                          checked={formData[item]}
                          onChange={handleChange}
                          className="accent-blue-600"
                        />
                        {item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Additional Features
                  </label>
                  <div className="space-y-2">
                    {additionalFeatures.map((feature, idx) => (
                      <div key={idx} className="bg-blue-50 text-blue-800 px-4 py-2 rounded-md text-sm shadow flex justify-between items-center">
                        <span>{feature}</span>
                        <button onClick={() => handleFeatureDelete(idx)} type="button" className="text-red-500 hover:text-red-700">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {showFeatureInput && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            maxLength={50}
                            placeholder="Max 50 characters"
                            className="w-full border border-gray-300 px-3 py-2 rounded-md"
                          />
                          <p className="text-xs text-right text-gray-500 mt-1">{featureInput.length}/50</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleFeatureAdd}
                          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    )}
                    {!showFeatureInput && (
                      <button
                        type="button"
                        onClick={() => setShowFeatureInput(true)}
                        className="text-blue-600 flex items-center gap-1 text-sm font-medium hover:underline"
                      >
                        <Plus size={16} /> Add Additional Feature
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit Program
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProgramsPage;
