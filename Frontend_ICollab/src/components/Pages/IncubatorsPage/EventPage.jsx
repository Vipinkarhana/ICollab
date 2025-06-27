import React, { useState } from "react";
import { CalendarDays, Clock, Plus, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import AddEventForm from "./AddEventForm";

// Sample events
const upcomingEvents = [
  {
    title: "Startup Pitch Night",
    day: "15",
    month: "JUL",
    time: "5:00 PM - 7:00 PM",
    location: "Delhi Innovation Center",
  },
  {
    title: "Investor Meet-Up",
    day: "25",
    month: "JUL",
    time: "3:00 PM - 5:00 PM",
    location: "Mumbai Startup Arena",
  },
];

const pastEvents = [
  {
    title: "Tech for Impact Hackathon",
    day: "10",
    month: "MAY",
    time: "10:00 AM - 6:00 PM",
    location: "Bangalore Innovation Hub",
  },
  {
    title: "Women in Startup Panel",
    day: "02",
    month: "JUN",
    time: "4:00 PM - 6:00 PM",
    location: "Chennai Tech Park",
  },
];

// Speakers
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
    photo:
      "https://ui-avatars.com/api/?name=Speaker+Name&background=0D8ABC&color=fff",
    bio: "Focused on early-stage B2B startups in India.",
  },
];

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const currentEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="h-auto bg-gray-50 flex w-full">
      <SidebarHeader />

      <div className="flex-1 pt-20 pb-16 px-4 md:px-10 ml-80">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 mt-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h1 className="text-4xl font-bold text-gray-800">Events</h1>
              <p className="text-sm text-gray-500">
                Stay updated with incubator-led programs and networking
                opportunities.
              </p>
            </div>

            <Link
              to="/AddEventForm"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Add Event
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-full font-medium border ${
                activeTab === "upcoming"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 rounded-full font-medium border ${
                activeTab === "past"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Past Events
            </button>
          </div>

          {/* Events List */}
          <div className="grid gap-6">
            {currentEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-md transition p-6 flex gap-6 items-start"
              >
                <div className="w-20 h-20 bg-blue-600 text-white rounded-lg flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold leading-none">
                    {event.day}
                  </span>
                  <span className="text-sm uppercase tracking-wide">
                    {event.month}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 gap-2 mb-1">
                    <Clock size={16} /> {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2 mb-3">
                    <MapPin size={16} /> {event.location}
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                      RSVP
                    </button>
                    <Link
                      to="/event-details"
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Speakers */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">
              Top Featured Speakers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-md flex gap-4 items-start"
                >
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">
                      {speaker.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">
                      {speaker.title}
                    </p>
                    <p className="text-sm text-gray-600">{speaker.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        

          {/* Past Event Highlights */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
              Past Event Highlights
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                alt="Startup Pitch"
                className="rounded-lg shadow"
              />
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg
"
                alt="Networking Event"
                className="rounded-lg shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
                alt="Workshop"
                className="rounded-lg shadow"
              />
            </div>
          </div>

          {/* Contact for Collaboration */}
          <div className="mt-20 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Want to Collaborate?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              If you are an incubator looking to participate, co-host, or
              showcase your startups in our upcoming events, we'd love to hear
              from you.
            </p>
            <a
              href="mailto:incubator@yourdomain.com"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Contact Us
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Stay in the Loop
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get event notifications, startup tips, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
