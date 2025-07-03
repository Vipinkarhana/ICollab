import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-1">{children}</label>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
  />
);

const FileUpload = () => (
  <input
    type="file"
    accept="application/pdf"
    className="block w-full border border-dashed border-gray-400 p-3 rounded-md text-sm text-gray-500 bg-white shadow-inner cursor-pointer"
  />
);

const Section = ({ title, description, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-xl mb-10 border border-gray-200">
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-blue-700 mb-2">{title}</h3>
      {description && <p className="text-gray-500 text-sm">{description}</p>}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const ApplyStartup = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const steps = [
  {
    title: "Basic Information",
    description: "Personal and contact details of the innovator.",
    content: (
      <>
        <div><Label>Email*</Label><Input type="email" name="email" value={formData.email || ""} onChange={handleChange} /></div>
        <div><Label>Upload Latest Photo (Max 1MB)</Label><input type="file" accept="image/*" className="block w-full p-3 border border-gray-300 rounded-md text-sm bg-white" /></div>
        <div><Label>Full Name*</Label><Input name="applicantName" value={formData.applicantName || ""} onChange={handleChange} /></div>
        <div><Label>Father’s / Husband’s Name</Label><Input name="fatherName" value={formData.fatherName || ""} onChange={handleChange} /></div>
        <div><Label>Date of Birth</Label><Input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} /></div>
        <div><Label>Mobile Number*</Label><Input type="tel" name="mobile" value={formData.mobile || ""} onChange={handleChange} /></div>
        <div><Label>Gender*</Label>
          <select name="gender" onChange={handleChange} value={formData.gender || ""} className="w-full border px-4 py-2 rounded-lg">
            <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div><Label>Educational Qualification with Specialisation</Label><Input name="education" value={formData.education || ""} onChange={handleChange} /></div>
        <div><Label>Category*</Label>
          <select name="category" onChange={handleChange} value={formData.category || ""} className="w-full border px-4 py-2 rounded-lg">
            <option value="">Select</option><option>General</option><option>SC</option><option>ST</option><option>OBC</option><option>Others</option>
          </select>
        </div>
        <div><Label>PAN Card No*</Label><Input name="pan" value={formData.pan || ""} onChange={handleChange} /></div>
        <div><Label>Aadhaar No*</Label><Input name="aadhaar" value={formData.aadhaar || ""} onChange={handleChange} /></div>
      </>
    ),
  },
  {
    title: "Address & Employment",
    description: "Location and employment background.",
    content: (
      <>
        <div><Label>Residential Address*</Label><Input name="address" value={formData.address || ""} onChange={handleChange} /></div>
        <div><Label>Are you employed or a student at R&D or Academic Institute?</Label>
          <select name="isEmployed" onChange={handleChange} value={formData.isEmployed || ""} className="w-full border px-4 py-2 rounded-lg">
            <option value="">Select</option><option>Yes</option><option>No</option>
          </select>
        </div>
        <div><Label>Annual Income (if employed)</Label><Input name="annualIncome" value={formData.annualIncome || ""} onChange={handleChange} /></div>
        <div><Label>Have you registered a startup?*</Label>
          <select name="isRegisteredStartup" onChange={handleChange} value={formData.isRegisteredStartup || ""} className="w-full border px-4 py-2 rounded-lg">
            <option value="">Select</option><option>Yes</option><option>No</option>
          </select>
        </div>
        <div><Label>Team Members in Project</Label>
          <select name="teamSize" onChange={handleChange} value={formData.teamSize || ""} className="w-full border px-4 py-2 rounded-lg">
            <option value="">Select</option><option>No team member</option><option>Less than 3</option><option>More than 3</option>
          </select>
        </div>
      </>
    )
  },
  {
    title: "Startup Idea & Progress",
    description: "Details about your startup idea and its innovation.",
    content: (
      <>
        <div className="col-span-2"><Label>Brief Description of Idea*</Label><Input name="ideaDescription" value={formData.ideaDescription || ""} onChange={handleChange} /></div>
        <div><Label>Status of Work*</Label>
          <select name="workStatus" onChange={handleChange} value={formData.workStatus || ""} className="w-full border px-4 py-2 rounded-lg">
            <option value="">Select</option>
            <option>Idea level</option><option>College Project</option><option>Lab PoC</option><option>Paper Presentation</option><option>Working Prototype</option>
          </select>
        </div>
        <div className="col-span-2"><Label>Science & Working Principle Behind the Idea</Label><Input name="scienceBehind" value={formData.scienceBehind || ""} onChange={handleChange} /></div>
        <div className="col-span-2"><Label>Video URL (YouTube preferred)</Label><Input name="videoUrl" value={formData.videoUrl || ""} onChange={handleChange} /></div>
        <div className="col-span-2"><Label>Quantum of Fund Required (mention breakup during presentation)</Label><Input name="fundRequired" value={formData.fundRequired || ""} onChange={handleChange} /></div>
      </>
    )
  },
  {
    title: "Financial & Declaration",
    description: "Funding support, mentions, and applicant declaration.",
    content: (
     <>
  <div>
    <Label>Have you received funding for this work?*</Label>
    <select
      name="hasReceivedSupport"
      onChange={handleChange}
      value={formData.hasReceivedSupport || ""}
      className="w-full border px-4 py-2 rounded-lg"
    >
      <option value="">Select</option>
      <option>Yes</option>
      <option>No</option>
    </select>
  </div>

  <div>
    <Label>Are you enrolled or planning for incubation program?</Label>
    <select
      name="isInIncubation"
      onChange={handleChange}
      value={formData.isInIncubation || ""}
      className="w-full border px-4 py-2 rounded-lg"
    >
      <option value="">Select</option>
      <option>Yes</option>
      <option>No</option>
    </select>
  </div>

  <div className="col-span-1 md:col-span-2">
    <Label>Any special mentions regarding the solution?</Label>
    <Input
      name="specialMention"
      value={formData.specialMention || ""}
      onChange={handleChange}
    />
  </div>

  <div className="col-span-1 md:col-span-2">
    <Label>Declaration & Signature Upload*</Label>
    <input
      type="file"
      accept="image/*,.pdf"
      className="block w-full p-3 border border-gray-300 rounded-md text-sm bg-white"
    />
  </div>
</>

    )
  }
];

  return (
    <div className="max-w-6xl  w-full px-6 py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen mt-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">
        Founder's Innovation & Startup Details
      </h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <Section title={steps[step].title} description={steps[step].description}>
            {steps[step].content}
          </Section>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button
            onClick={prev}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft size={18} /> Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={next}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 shadow-lg"
          >
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("incubatorProfile", JSON.stringify(formData));
              navigate("/incubators");
            }}
            className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium shadow-lg"
          >
            Submit 
          </button>
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Step {step + 1} of {steps.length}
      </p>
    </div>
  );
};

export default ApplyStartup;
