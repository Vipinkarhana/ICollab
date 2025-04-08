const userModel = require('../../models/user');
const postModel = require('../../models/post');
const pageViewModel = require('../../models/pageView');
const ApiError = require('../../utils/ApiError');

const getAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newUsers = await userModel.countDocuments({
      createdAt: { $gte: today },
    });
    const totalPosts = await postModel.countDocuments();
    const newPosts = await postModel.countDocuments({
      createdAt: { $gte: today },
    });
    const activeUsers = await userModel.countDocuments({
      lastLogin: { $gte: today },
    });

    // Post Growth (Last 7 Days)
    const postGrowth = await postModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Page Views (Last 7 Days)
    const pageViews = await pageViewModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Extract Device Usage and Browser Usage using Aggregation
    const deviceUsage = {};
    const browserUsage = {};

    const pageViewsData = await pageViewModel.find({}, { userAgent: 1 });

    pageViewsData.forEach(({ userAgent }) => {
      if (!userAgent) return;

      // Identify Device Type
      let deviceType = 'Other';
      if (/mobile/i.test(userAgent)) deviceType = 'Mobile';
      else if (/tablet/i.test(userAgent)) deviceType = 'Tablet';
      else if (/windows|macintosh|linux/i.test(userAgent))
        deviceType = 'Desktop';

      deviceUsage[deviceType] = (deviceUsage[deviceType] || 0) + 1;

      // Improved Browser Detection
      let browser = 'Other';
      if (/edg/i.test(userAgent)) browser = 'Edge';
      else if (/chrome|crios/i.test(userAgent) && !/edg/i.test(userAgent))
        browser = 'Chrome';
      else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
      else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent))
        browser = 'Safari';
      else if (/opr|opera/i.test(userAgent)) browser = 'Opera';

      browserUsage[browser] = (browserUsage[browser] || 0) + 1;
    });

    res.status(200).json({
      totalUsers,
      newUsers,
      totalPosts,
      newPosts,
      activeUsers,
      postGrowth,
      pageViews,
      deviceUsage,
      browserUsage,
    });
  } catch (err) {
    next(new ApiError(500, 'Failed to fetch analytics'));
  }
};

const trackPageView = async (req, res, next) => {
  try {
    const { page } = req.body;
    const ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await pageViewModel.create({ page, ipAddress, userAgent });

    res.status(201).json({ message: 'Page view recorded successfully' });
  } catch (err) {
    next(new ApiError(500, 'Failed to track page view'));
  }
};

module.exports = { getAnalytics, trackPageView };
