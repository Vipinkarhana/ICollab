import React from "react";
import {
  MapPin,
  Users,
  Rocket,
  Briefcase,
  Handshake,
  Calendar as CalIcon,
} from "lucide-react";
import { useIncubator } from "../../Common/IncubatorContext";

const InfoGroup = ({ icon: Icon, title, items }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-200 transition duration-300 group relative overflow-hidden">
    <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-t-2xl" />
    <div className="flex items-center gap-2 mb-4 mt-2">
      <Icon className="text-blue-600 w-5 h-5" />
      <h3 className="text-xl font-semibold text-gray-800 underline underline-offset-4 decoration-blue-400">
        {title}
      </h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-700">
      {items.map(({ label, value }) => (
        <div key={label}>
          <span className="font-semibold text-gray-600">{label}:</span>{" "}
          <span className="text-gray-800">{value || "N/A"}</span>
        </div>
      ))}
    </div>
  </div>
);

const IncubatorCards = () => {
  // const incubator = defaultIncubatorData;

  //  const storedData = localStorage.getItem("incubatorProfile");
  // const incubator = storedData ? JSON.parse(storedData) : defaultIncubatorData;






  const { incubatorData } = useIncubator(); // Get data from context
  const incubator = incubatorData?.incubator || {};

  



  if (incubator.status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Under Approval
          </h2>
          <p className="text-gray-600">
            Your incubator profile is currently under review. You'll gain full
            access once approved.
            Please check back later or contact support for more information.
            Also, please keep checking your email for updates on your application.
          </p>
        </div>
      </div>
    );
  }






  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="sm:text-5xl text-4xl font-bold text-center text-blue-900 mb-16">
           Incubator Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <InfoGroup
            icon={Users}
            title="Contact Details"
            items={[
              { label: "Representative", value: incubator.representativeName },
              { label: "Position", value: incubator.representativePosition },
              { label: "Email", value: incubator.email },
              { label: "Mobile", value: incubator.mobile },
              { label: "Alt Email", value: incubator.alternateEmail },
              { label: "Alt Mobile", value: incubator.alternateMobile },
            ]}
          />

          <InfoGroup
            icon={MapPin}
            title="Location Details"
            items={[
              { label: "Address", value: incubator.address },
              { label: "City", value: incubator.city },
              { label: "State", value: incubator.state },
              { label: "Pin Code", value: incubator.pinCode },
            ]}
          />

          <InfoGroup
            icon={Rocket}
            title="Incubation Metrics"
            items={[
              { label: "Total Incubated", value: incubator.totalIncubated },
              { label: "Graduated", value: incubator.totalGraduated },
              { label: "Investments", value: incubator.followOnInvestments },
              { label: "Survival Rate", value: incubator.survivalRate },
              { label: "Infrastructure", value: incubator.infraSupport },
            ]}
          />

          <InfoGroup
            icon={Briefcase}
            title="Funding & Grants"
            items={[
              { label: "Invested Startups", value: incubator.investedStartups },
              { label: "Grant Support", value: incubator.grantSupport },
              {
                label: "Investment Raised (INR M)",
                value: incubator.totalInvestmentRaised,
              },
              {
                label: "Total Corpus (INR M)",
                value: incubator.totalCorpus,
              },
            ]}
          />

          <InfoGroup
            icon={Handshake}
            title="Mentorship"
            items={[
              { label: "₹2Cr+ Startups", value: incubator.highRevenueStartups },
              { label: "IP Registered", value: incubator.ipRegistered },
              { label: "Mentoring Hours", value: incubator.mentoringHours },
            ]}
          />

          <InfoGroup
            icon={CalIcon}
            title="Support & Events"
            items={[
              { label: "Events", value: incubator.eventsOrganized },
              {
                label: "Industry Programs",
                value: incubator.industryPrograms,
              },
              { label: "Other Support", value: incubator.otherSupport },
              { label: "Referral Source", value: incubator.referralSource },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default IncubatorCards;
