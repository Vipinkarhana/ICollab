import React from "react";
import { CalendarDays, Clock, MapPin, Mail } from "lucide-react";
import SidebarHeader from "./SidebarHeader";

const ViewDetailsPage = () => {
  // Dummy basic info data
  const basicInfo = {
    title: "Startup Pitch Night",
    type: "Demo Day",
    date: "2025-07-15",
    time: "5:00 PM - 7:00 PM",
    location: "Delhi Innovation Center",
    organizer: "TechSpark Incubator",
    contactEmail: "contact@techspark.org",
  };

  const speakers = [
    {
      name: "Anita Sharma",
      title: "Founder, AgriTechX",
      photo: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "Expert in sustainable tech and early-stage funding.",
    },
    {
      name: "Rahul Verma",
      title: "Investor, SeedSpark Ventures",
      photo: "https://ui-avatars.com/api/?name=Rahul+Verma&background=0D8ABC&color=fff",
      bio: "Focused on early-stage B2B startups in India.",
    },
  ];

  const agenda = [
    { time: "10:00 AM", title: "Welcome & Registration" },
    { time: "10:30 AM", title: "Startup Pitches" },
    { time: "12:00 PM", title: "Panel Discussion - Future of Tech in India" },
    { time: "1:00 PM", title: "Lunch & Networking" },
    { time: "2:00 PM", title: "Incubator-Investor Roundtable" },
    { time: "3:00 PM", title: "Closing Remarks & Certificates" },
  ];

  const attendReasons = [
    {
      title: "Discover High-Potential Startups",
      desc: "Find startups that align with your incubator’s mission and support them early.",
    },
    {
      title: "Build Partnerships",
      desc: "Network with fellow incubators, mentors, and investors for future collaborations.",
    },
    {
      title: "Increase Visibility",
      desc: "Showcase your incubator in front of a large startup audience and media coverage.",
    },
    {
      title: "Exclusive Access",
      desc: "Get front-row access to startup pitches, demos, and closed-door sessions.",
    },
  ];

  return (
    <div className="h-auto w-full px-4 md:px-20 pt-20 pb-16 bg-gray-50">
      <SidebarHeader />

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 ml-60">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">
          Event Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Title</p>
            <h3 className="text-lg font-semibold text-gray-800">{basicInfo.title}</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Type</p>
            <h3 className="text-lg font-semibold text-gray-800">{basicInfo.type}</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-2">
            <CalendarDays size={18} className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {new Date(basicInfo.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h3>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-2">
            <Clock size={18} className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <h3 className="text-lg font-semibold text-gray-800">{basicInfo.time}</h3>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-start gap-2">
            <MapPin size={18} className="text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <h3 className="text-lg font-semibold text-gray-800">{basicInfo.location}</h3>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Organizer</p>
            <h3 className="text-lg font-semibold text-gray-800">{basicInfo.organizer}</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-start gap-2 md:col-span-2">
            <Mail size={18} className="text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Contact Email</p>
              <h3 className="text-lg font-semibold text-gray-800">{basicInfo.contactEmail}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Speakers */}
      <div className="mb-16 ml-60">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">
          Featured Speakers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {speakers.map((speaker, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md flex gap-4 items-start">
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">{speaker.name}</h4>
                <p className="text-sm text-gray-500 mb-1">{speaker.title}</p>
                <p className="text-sm text-gray-600">{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Agenda */}
      <div className="mb-16 ml-60">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4">
          Event Agenda
        </h2>
        <div className="relative border-l-4 border-blue-500 pl-6 space-y-10">
          {agenda.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-blue-600 group-hover:scale-110 transition-transform"></div>
              <div className="bg-white shadow-md rounded-lg p-5 group-hover:shadow-lg transition">
                <p className="text-sm text-gray-500 font-semibold">{item.time}</p>
                <h4 className="text-md md:text-lg font-medium text-gray-800">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Attend */}
      <div className="mb-10 ml-60">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
          Why Should Incubators Attend?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {attendReasons.map((item, i) => (
            <div key={i} className="bg-blue-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPage;
