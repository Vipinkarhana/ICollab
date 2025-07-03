import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { submitIncubatorApplication } from '../../../Services/incubatorService';
import SubmissionModal from '../../Common/IncubatorApplicationSubmissionModel';

const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-1">{children}</label>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
  />
);

const FileUpload = ({ name, onChange }) => (
  <input
    type="file"
    accept="application/pdf"
    name={name}
    onChange={onChange}
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

const IncubatorForm = ({ onClose, submitButtonText = "Submit Application" }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData(prev => ({ 
    ...prev, 
    [name]: files[0]  // Store the file object
  }));
};

  const steps = [
    {
      title: "Contact Information",
      description: "Basic information about the incubator and its representative.",
      content: (
        <>
      <div><Label>Name of Incubator*</Label><Input name="nameOfIncubator" value={formData.nameOfIncubator || ""} onChange={handleChange} /></div>
      <div><Label>Date of Incorporation*</Label><Input type="date" name="dateOfIncorporation" value={formData.dateOfIncorporation || ""} onChange={handleChange} /></div>
      <div><Label>Name of Representative*</Label><Input name="representativeName" value={formData.representativeName || ""} onChange={handleChange} /></div>
      <div><Label>Position of Representative</Label><Input name="representativePosition" value={formData.representativePosition || ""} onChange={handleChange} /></div>
      <div><Label>Email ID*</Label><Input type="email" name="email" value={formData.email || ""} onChange={handleChange} /></div>
      <div><Label>Mobile Number*</Label><Input type="tel" name="mobile" value={formData.mobile || ""} onChange={handleChange} /></div>
      <div><Label>Alternate Email ID</Label><Input type="email" name="alternateEmail" value={formData.alternateEmail || ""} onChange={handleChange} /></div>
      <div><Label>Alternate Mobile Number</Label><Input type="tel" name="alternateMobile" value={formData.alternateMobile || ""} onChange={handleChange} /></div>
    </>
      )
    },
    {
      title: "Location Details",
      description: "Tell us about your physical address and geography.",
      content: (
        <>
          <div><Label>Address*</Label><Input name="address" value={formData.address || ""} onChange={handleChange} /></div>
          <div><Label>State*</Label><Input name="state" value={formData.state || ""} onChange={handleChange} /></div>
          <div><Label>City/Village*</Label><Input name="city" value={formData.city || ""} onChange={handleChange} /></div>
          <div><Label>Pin Code*</Label><Input type="number" name="pinCode" value={formData.pinCode || ""} onChange={handleChange} /></div>
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
        <Input 
          name="totalIncubated" 
          value={formData.totalIncubated || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="startups_incubated"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of start-ups graduated from the Incubator*</Label>
        <Input 
          name="totalGraduated" 
          value={formData.totalGraduated || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="startups_graduated"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of start-ups that have raised follow on investments*</Label>
        <Input 
          name="followOnInvestments" 
          value={formData.followOnInvestments || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="startups_followon_investments"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>2 year survival rate of start-ups from date of joining incubation program*</Label>
        <Input 
          name="survivalRate" 
          value={formData.survivalRate || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="survival_rate"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Infrastructure support provided to start-ups (Co-working space, labs, networking rooms etc.)*</Label>
        <Input 
          name="infraSupport" 
          value={formData.infraSupport || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="infra_support"
            onChange={handleFileChange} 
          /></div>
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
        <Input 
          name="investedStartups" 
          value={formData.investedStartups || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="govt_support"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of start-ups supported through grant/fund (State/ Central/Any other org. etc.)*</Label>
        <Input 
          name="grantSupport" 
          value={formData.grantSupport || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="no_of_startups_invested"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Total investment raised for startups (In INR Million)*</Label>
        <Input 
          name="totalInvestmentRaised" 
          value={formData.totalInvestmentRaised || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="total_investment_raised"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Total corpus allocated to incubatees (in INR million)*</Label>
        <Input 
          name="totalCorpus" 
          value={formData.totalCorpus || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="corpus_allocated"
            onChange={handleFileChange} 
          /></div>
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
        <Input 
          name="highRevenueStartups" 
          value={formData.highRevenueStartups || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="startups_above_2cr"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Number of IP registered by incubatees*</Label>
        <Input 
          name="ipRegistered" 
          value={formData.ipRegistered || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="IP_Registered"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Mentoring hours – average monthly hours allocated / startup*</Label>
        <Input 
          name="mentoringHours" 
          value={formData.mentoringHours || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="mentoring_hours"
            onChange={handleFileChange} 
          /></div>
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
        <Input 
          name="eventsOrganized" 
          value={formData.eventsOrganized || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="stakeholder_events"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Details of industry – corporate connect programs*</Label>
        <Input 
          name="industryPrograms" 
          value={formData.industryPrograms || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="industry_corporate_connect"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>Any other support provided*</Label>
        <Input 
          name="otherSupport" 
          value={formData.otherSupport || ""} 
          onChange={handleChange} 
        />
        <p className="text-sm text-gray-500 mt-1">Attach supporting proof</p>
        <div className="mt-2"><FileUpload 
            name="other_support"
            onChange={handleFileChange} 
          /></div>
      </div>
      <div className="col-span-2">
        <Label>How did you hear about us?*</Label>
        <Input 
          name="referralSource" 
          value={formData.referralSource || ""} 
          onChange={handleChange} 
        />
      </div>
    </>
  )
},

  ];


  // const handleSubmit = async () => {
  //   try {
  //     await submitIncubatorApplication(formData);
  //     localStorage.setItem("incubatorProfile", JSON.stringify({
  //       ...formData,
  //       status: 'pending'
  //     }));
  //     setShowModal(true);
  //   } catch (error) {
  //     console.error('Submission failed:', error);
  //     alert('Application submission failed. Please try again.');
  //   }
  // };



  const handleSubmit = async () => {
  try {
    const formDataToSend = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else {
        formDataToSend.append(key, value);
      }
    });

    await submitIncubatorApplication(formDataToSend);
    localStorage.setItem('incubatorStatus', 'pending');
    setShowApprovalModal(true);
  } catch (error) {
    console.error('Submission error:', error);
    alert('Application submission failed. Please try again.');
  }
};



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
            onClick={handleSubmit}
            className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium shadow-lg"
          >
          {submitButtonText}
          </button>
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Step {step + 1} of {steps.length}
      </p>

      {/* <SubmissionModal 
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/incubators");
        }}
      /> */}

      {showApprovalModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-md">
      <h3 className="text-2xl font-bold mb-4">Application Submitted</h3>
      <p>
        Your data has been submitted and sent for verification. 
        You'll gain full access once approved.
      </p>
      <button 
        onClick={() => navigate('/incubators')}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Continue to Dashboard
      </button>
    </div>
  </div>
)}

      
    </div>
  );
};

export default IncubatorForm;
