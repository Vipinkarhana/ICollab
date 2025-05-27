const userModel = require('../../models/user');
const postModel = require('../../models/post');
const pageViewModel = require('../../models/pageView');
const deviceUsageModel = require('../../models/deviceUsage');
const ApiError = require('../../utils/ApiError');

const getAnalytics = async (req, res, next) => {
  try {
    const [totalUsers, newUsers, activeUsers, totalPosts, newPosts] =
      await Promise.all([
        userModel.countDocuments(),
        userModel.countDocuments({
          createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        }),
        deviceUsageModel.countDocuments({
          createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
        }),
        postModel.countDocuments(),
        postModel.countDocuments({
          createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        }),
      ]);

    const retentionRate = Math.floor((activeUsers / totalUsers) * 100);

    // 🔍 Fetch page views grouped
    const pageViewsRaw = await pageViewModel.find();
    const pageViewsPerPageDaily = {};
    for (const doc of pageViewsRaw) {
      var { page, views } = doc.toObject();
      if (!views) continue;

      // console.log('Page:', page, 'Views:', views);

      // If views is a Map, convert it to an object
      if (views instanceof Map) {
        views = Object.fromEntries(views);
      }

      const viewArray = Object.entries(views)
        .map(([date, value]) => ({ date, value })) // Convert to array
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // console.log('Page:', page, 'View Array:', viewArray);
      pageViewsPerPageDaily[page] = viewArray;
    }

    // Fetch device + browser usage from deviceUsageModel
    const deviceUsageRaw = await deviceUsageModel.find({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    const browserUsage = {};
    const deviceUsage = {};
    const uniqueUserSet = new Set();

    for (let device of deviceUsageRaw) {
      const ua = device.userAgent || '';
      const ip = device.ipAddress || 'unknown';
      const uniqueKey = ip + ua;

      if (!uniqueUserSet.has(uniqueKey)) {
        uniqueUserSet.add(uniqueKey);

        // Browser Detection
        let browser = 'Other';
        if (/Edg\//i.test(ua)) browser = 'Edge';
        else if (/OPR|Opera/i.test(ua)) browser = 'Opera';
        else if (/Firefox/i.test(ua)) browser = 'Firefox';
        else if (/Chrome/i.test(ua) && !/Edg|OPR|Brave/i.test(ua))
          browser = 'Chrome';
        else if (/Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR/i.test(ua))
          browser = 'Safari';

        browserUsage[browser] = (browserUsage[browser] || 0) + 1;

        // Device Type Detection
        const isMobile = /mobile/i.test(ua);
        const isTablet = /tablet/i.test(ua);
        const deviceType = isTablet
          ? 'Tablet'
          : isMobile
            ? 'Mobile'
            : 'Desktop';

        deviceUsage[deviceType] = (deviceUsage[deviceType] || 0) + 1;
      }
    }

    const postGrowth = await postModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalUsers,
      newUsers,
      activeUsers,
      totalPosts,
      newPosts,
      retentionRate,
      pageViewsPerPageDaily,
      postGrowth: postGrowth.map((d) => ({ date: d._id, value: d.count })),
      deviceUsage,
      browserUsage,
    });
  } catch (err) {
    console.error('Analytics fetch error:', err);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

const trackPageView = async (req, res, next) => {
  try {
    const { page } = req.body;
    const ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const date = new Date().toISOString().split('T')[0];

    // Update page view count
    await pageViewModel.updateOne(
      { page },
      { $inc: { [`views.${date}`]: 1 } },
      { upsert: true }
    );

    // Store device usage only once per IP + UA combo
    const existing = await deviceUsageModel.findOne({ ipAddress, userAgent });
    if (!existing) {
      await deviceUsageModel.create({ ipAddress, userAgent });
    }

    res.status(201).json({ message: 'Page view recorded successfully' });
  } catch (err) {
    next(new ApiError(500, 'Failed to track page view'));
  }
};

module.exports = { trackPageView, getAnalytics };
