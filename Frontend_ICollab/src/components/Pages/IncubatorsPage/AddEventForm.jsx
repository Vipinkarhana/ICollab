import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const MultiStepEventForm = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    contactEmail: "",
    speakers: [{ name: "", title: "", bio: "", photo: null }],
    agenda: [{ time: "", title: "" }],
    attend: [{ heading: "", title: "" }],
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSpeakerChange = (i, field, value) => {
    const updated = [...data.speakers];
    updated[i][field] = value;
    setData((prev) => ({ ...prev, speakers: updated }));
  };

  const addSpeaker = () =>
    setData((prev) => ({
      ...prev,
      speakers: [...prev.speakers, { name: "", title: "", bio: "", photo: null }],
    }));

  const handleAgendaChange = (i, field, value) => {
    const updated = [...data.agenda];
    updated[i][field] = value;
    setData((prev) => ({ ...prev, agenda: updated }));
  };

  const addAgendaItem = () =>
    setData((prev) => ({
      ...prev,
      agenda: [...prev.agenda, { time: "", title: "" }],
    }));

  const handleAttendChange = (i, field, value) => {
    const updated = [...data.attend];
    updated[i][field] = value;
    setData((prev) => ({ ...prev, attend: updated }));
  };

  const addAttendItem = () =>
    setData((prev) => ({
      ...prev,
      attend: [...prev.attend, { heading: "", title: "" }],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="flex justify-center p-4 h-auto w-full mt-12">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg relative">
        {/* Stepper */}
        <div className="flex items-center mb-8 w-[120%]">
          {["Info", "Speakers", "Agenda", "Attend"].map((_, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step - 1 === i ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 text-gray-600"
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-0.5 ${step - 1 > i ? "bg-blue-600" : "bg-gray-300"}`}></div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              {["Basic Event Info", "Featured Speakers", "Agenda", "Why Attend"][step - 1]}
            </h2>

            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["title", "type", "date", "time", "location", "organizer", "contactEmail"].map((f, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium capitalize">
                      {f.replace(/([A-Z])/g, " $1")}
                    </label>
                    {f === "type" ? (
                      <select
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg"
                        required
                      >
                        <option value="">Select</option>
                        {["Webinar", "Workshop", "Demo Day", "Networking", "Mentorship"].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={
                          f === "date"
                            ? "date"
                            : f === "time"
                            ? "time"
                            : f === "contactEmail"
                            ? "email"
                            : "text"
                        }
                        name={f}
                        value={data[f]}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg"
                        required
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {data.speakers.map((s, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      placeholder="Name"
                      value={s.name}
                      onChange={(e) => handleSpeakerChange(i, "name", e.target.value)}
                      className="border px-4 py-2 rounded-lg h-14"
                      required
                    />
                    <input
                      placeholder="Title"
                      value={s.title}
                      onChange={(e) => handleSpeakerChange(i, "title", e.target.value)}
                      className="border px-4 py-2 rounded-lg h-14"
                    />
                    <input
                      placeholder="Bio"
                      value={s.bio}
                      onChange={(e) => handleSpeakerChange(i, "bio", e.target.value)}
                      className="border px-4 py-2 rounded-lg h-14"
                    />
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium -mt-4">Upload Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSpeakerChange(i, "photo", e.target.files[0])}
                        className="border px-4 py-2 rounded-lg h-14 w-40"
                      />
                      {s.photo && (
                        <img
                          src={URL.createObjectURL(s.photo)}
                          alt="speaker"
                          className="w-16 h-16 rounded-full mt-2 object-cover"
                        />
                      )}
                    </div>
                  </div>
                ))}
                <motion.button type="button" onClick={addSpeaker} className="text-blue-600" whileHover={{ scale: 1.05 }}>
                  + Add Speaker
                </motion.button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Agenda</h3>
                {data.agenda.map((a, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      placeholder="Time"
                      value={a.time}
                      onChange={(e) => handleAgendaChange(i, "time", e.target.value)}
                      className="border px-4 py-2 rounded-lg w-1/4"
                      required
                    />
                    <input
                      placeholder="Activity"
                      value={a.title}
                      onChange={(e) => handleAgendaChange(i, "title", e.target.value)}
                      className="border px-4 py-2 rounded-lg flex-1"
                      required
                    />
                  </div>
                ))}
                <motion.button type="button" onClick={addAgendaItem} className="text-blue-600" whileHover={{ scale: 1.05 }}>
                  + Add Agenda Item
                </motion.button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                {data.attend.map((a, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="attendHeading"
                      placeholder="Section Heading"
                      value={a.heading}
                      onChange={(e) => handleAttendChange(i, "heading", e.target.value)}
                      className="w-full border px-4 py-2 rounded-lg"
                      required
                    />
                    <input
                      name="attendTitle"
                      placeholder="Section Title"
                      value={a.title}
                      onChange={(e) => handleAttendChange(i, "title", e.target.value)}
                      className="w-full border px-4 py-2 rounded-lg"
                      required
                    />
                  </div>
                ))}
                <motion.button type="button" onClick={addAttendItem} className="text-blue-600" whileHover={{ scale: 1.05 }}>
                  + Add Attend Item
                </motion.button>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  onClick={handleBack}
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  Back
                </motion.button>
              )}
              {step < 4 && (
                <motion.button
                  onClick={handleNext}
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  Next
                </motion.button>
              )}
              {step === 4 && (
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  Submit
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
};

export default MultiStepEventForm;
