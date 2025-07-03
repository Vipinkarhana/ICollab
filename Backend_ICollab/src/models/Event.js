const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  photo: { type: String, required: true } // R2 file key
});

const agendaSchema = new mongoose.Schema({
  time: { type: String, required: true },
  activity: { type: String, required: true }
});

const whyAttendSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  title: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  eventType: { 
    type: String, 
    required: true,
    enum: ['Webinar', 'workshop', 'demo day', 'networking', 'mentorship'] 
  },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventLocation: { type: String, required: true },
  registrationLink: { type: String, required: true },
  description: { type: String, required: true },
  organizer: { type: String, required: true },
  contactEmail: { type: String, required: true },
  targetAudience: { 
    type: [String], 
    required: true,
    enum: ['startups', 'investors', 'students', 'researchers'] 
  },
  seats: { type: Number, required: true },
  eventBanner: { type: String, required: true }, // R2 file key
  speakers: [speakerSchema],
  agenda: [agendaSchema],
  whyAttend: [whyAttendSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);