import React from "react";

const events = [
  {
    id: 1,
    date: "30",
    month: "JUN",
    title: "Investor Pitch Day",
    time: "10:00 AM - 4:00 PM",
    description:
      "Our startups will pitch to a panel of investors for funding opportunities.",
    location: "Virtual",
  },
  {
    id: 2,
    date: "15",
    month: "JUL",
    title: "Founder Workshop",
    time: "10:00 AM - 4:00 PM",
    description:
      "Hands-on workshop for founders on growth strategies and fundraising.",
    location: "Incubator HQ",
  },
];

const EventCard = ({ event }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row w-full max-w-md sm:-mt-8">
    {/* Date Block */}
    <div className="bg-blue-600 text-white flex flex-col items-center justify-center px-4 py-6">
      <div className="text-2xl font-bold leading-none">{event.date}</div>
      <div className="text-sm uppercase tracking-wider">{event.month}</div>
    </div>

    {/* Event Info */}
    <div className="flex-1 px-5 py-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-1">🕒 {event.time}</p>
        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
        <p className="text-sm text-blue-600 mt-2">📍 {event.location}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md w-full">
          RSVP
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md w-full">
          Add to Calendar
        </button>
      </div>
    </div>
  </div>
);

const UpcomingEvents = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-10 mb-12">
      <div className="flex flex-wrap gap-6 justify-center">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
