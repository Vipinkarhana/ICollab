import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Upload,
  Globe,
  Users,
  Tag,
} from "lucide-react";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    date: "",
    time: "",
    location: "",
    registrationLink: "",
    organizer: "",
    contactEmail: "",
    tags: [],
    capacity: "",
    isPublic: true,
    banner: null,
  });

  const eventTypes = ["Webinar", "Workshop", "Demo Day", "Networking", "Mentorship"];
  const tagOptions = ["Startups", "Investors", "Students", "Researchers"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, banner: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="h-auto w-full mt-8 py-14 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 border-l-8 border-blue-600 pl-5">
          Create a New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-sm font-semibold mb-1 block">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Startup Demo Day 2025"
                className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Event Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select type</option>
                {eventTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <CalendarDays className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Time</label>
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Clock className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Zoom / Venue Address"
                  className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <MapPin className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Registration Link</label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event in detail..."
              rows={4}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-sm font-semibold mb-1 block">Organizer</label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="IncubatorHub Ventures"
                className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="contact@incubatorhub.com"
                className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Target Audience</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {tagOptions.map((tag, i) => (
                <label key={i} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Seats / Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Event Banner</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                name="banner"
                onChange={handleChange}
                accept="image/*"
                className="file:border file:rounded-lg file:px-4 file:py-2 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <Upload size={20} className="text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <label className="text-sm text-gray-700">Make this event public</label>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold shadow-md transition"
            >
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
