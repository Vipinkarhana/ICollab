const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncubatorSchema = new Schema({
  // Basic details
  name:             { type: String, required: true },
  incorporatedOn:   { type: Date, required: true },
  representative: {
    name:           { type: String, required: true },
    position:       { type: String },
    email:          { type: String, required: true },
    mobile:         { type: String, required: true },
    altEmail:       { type: String },
    altMobile:      { type: String }
  },
  address: {
    line1:          { type: String },
    state:          { type: String, required: true },
    city:           { type: String, required: true },
    pincode:        { type: String, required: true }
  },
  // Form sections
  incubationSupport: {
    totalIncubated:     { type: Number, default: 0 },
    graduated:          { type: Number, default: 0 },
    raisedInvestments:  { type: Number, default: 0 },
    twoYearSurvivalRate:{ type: Number, default: 0 },
    infrastructure:     { type: String },
    govtSupport:        { type: Boolean, default: false }
  },
  fundingDetails: {
    investedCount:      { type: Number, default: 0 },
    grantSupportedCount:{ type: Number, default: 0 },
    totalRaisedMillion: { type: Number, default: 0 },
    corpusAllocatedMillion: { type: Number, default: 0 }
  },
  mentoringSupport: {
    paidMentors:        { type: Number, default: 0 },
    startupsAbove2Cr:   { type: Number, default: 0 },
    ipRegistered:       { type: Number, default: 0 },
    avgMentorHoursPerMonth: { type: Number, default: 0 }
  },
  eventsAndConnects: {
    stakeholderEvents:  { type: String },
    industryPrograms:   { type: String },
    otherSupport:       { type: String }
  },
  heardAboutUs:       { type: String },

  // Status workflow
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true
  },
  submittedAt:        { type: Date, default: Date.now },
  reviewedAt:         { type: Date },
  reviewerId:         { type: Schema.Types.ObjectId, ref: 'User' },
  reviewNotes:        { type: String }
});

module.exports = mongoose.model('Incubator', IncubatorSchema);
