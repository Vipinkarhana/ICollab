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

const IncubatorForm = () => {
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
      title: "Contact Information",
      description: "Basic information about the incubator and its representative.",
      content: (
        <>
          <div><Label>Name of Incubator*</Label><Input /></div>
          <div><Label>Date of Incorporation*</Label><Input type="date" /></div>
          <div><Label>Name of Representative*</Label><Input /></div>
          <div><Label>Position of Representative</Label><Input /></div>
          <div><Label>Email ID*</Label><Input type="email" /></div>
          <div><Label>Mobile Number*</Label><Input type="tel" /></div>
          <div><Label>Alternate Email ID</Label><Input type="email" /></div>
          <div><Label>Alternate Mobile Number</Label><Input type="tel" /></div>
        </>
      )
    },
    {
      title: "Location Details",
      description: "Tell us about your physical address and geography.",
      content: (
        <>
          <div><Label>Address*</Label><Input /></div>
          <div><Label>State*</Label><Input /></div>
          <div><Label>City/Village*</Label><Input /></div>
          <div><Label>Pin Code*</Label><Input type="number" /></div>
        </>
      )
    },
    {
  title: "Incubation Metrics",
  description: "Key statistics about incubated startups.",
  content: (
    <>
      <div className="col-span-2">
        <Label>Total number of startup incubated*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of start-ups graduated from the Incubator*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of start-ups that have raised follow on investments*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>2 year survival rate of start-ups from date of joining incubation program*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Infrastructure support provided to start-ups (Co-working space, labs, networking rooms etc.)*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
    </>
  )
},

    {
  title: "Funding & Grants",
  description: "Details of investments and grants awarded.",
  content: (
    <>
      <div className="col-span-2">
        <Label>Number of start-ups invested in*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of start-ups supported through grant/fund (State/ Central/Any other org. etc.)*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Total investment raised for startups (In INR Million)*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Total corpus allocated to incubatees (in INR million)*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
    </>
  )
},

   {
  title: "Mentorship",
  description: "Support system and impact of mentors.",
  content: (
    <>
      <div className="col-span-2">
        <Label>Number of startups which crossed the mark of two crore revenue during the incubation program in past one year*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of IP registered by incubatees*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Mentoring hours – average monthly hours allocated / startup*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
    </>
  )
},

   {
  title: "Additional Support",
  description: "Engagements and ecosystem collaboration.",
  content: (
    <>
      <div className="col-span-2">
        <Label>Events held for stakeholder engagement*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Details of industry – corporate connect programs*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>Any other support provided*</Label>
        <Input />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload /></div>
      </div>
      <div className="col-span-2">
        <Label>How did you hear about us?*</Label>
        <Input />
      </div>
    </>
  )
},

  ];

  return (
    <div className="max-w-6xl  w-full px-6 py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen mt-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">
        Incubator Application Form
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
            Submit Application
          </button>
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Step {step + 1} of {steps.length}
      </p>
    </div>
  );
};

export default IncubatorForm;
