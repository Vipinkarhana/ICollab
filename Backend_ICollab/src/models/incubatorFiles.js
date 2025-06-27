const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
  incubator: {
    type: Schema.Types.ObjectId,
    ref: 'Incubator',
    required: true
  },
  startups_incubated: {
    type: String,
    required: true
  },
  startups_graduated: {
    type: String,
    required: true
  },
  startups_followon_investments: {
    type: String,
    required: true
  },
  survival_rate: {
    type: String,
    required: true
  },
  infra_support: {
    type: String,
    required: true
  },
  govt_support: {
    type: String,
    required: true
  },
  no_of_startups_invested: {
    type: String,
    required: true
  },
  total_investment_raised: {
    type: String,
    required: true
  },
  corpus_allocated: {
    type: String,
    required: true
  },
  paid_mentors: {
    type: String,
    required: true
  },
  startups_above_2cr: {
    type: String,
    required: true
  },
  IP_Registered: {
    type: String,
    required: true
  },
  mentoring_hours: {
    type: String,
    required: true
  },
  stakeholder_events: {
    type: String,
    required: true
  },
  industry_corporate_connect: {
    type: String,
    required: true
  },
  other_support: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('File', FileSchema);
