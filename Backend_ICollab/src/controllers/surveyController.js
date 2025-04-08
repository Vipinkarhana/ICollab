const userModel = require('../models/user');
const SurveyResponse = require('../models/surveyResponse');

// Controller to handle survey submission.
const submitSurvey = async (req, res) => {
  try {
    // Assume that an authentication middleware sets req.user.
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });

    const { answer } = req.body;
    if (!answer) {
      return res.status(400).json({ message: 'Answer is required' });
    }

    // Save the survey response
    const response = await SurveyResponse.create({ user: user._id, answer });
    return res
      .status(201)
      .json({ message: 'Survey response recorded', response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { submitSurvey };
