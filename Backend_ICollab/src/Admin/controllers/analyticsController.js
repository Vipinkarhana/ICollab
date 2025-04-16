const userModel = require('../../models/user');
const postModel = require('../../models/post');
const pageViewModel = require('../../models/pageView');
const ApiError = require('../../utils/ApiError');

const getAnalytics = async (req, res, next) => {
  try {
    const [totalUsers, newUsers, activeUsers, totalPosts, newPosts] = await Promise.all([
      userModel.countDocuments(),
      userModel.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),
      pageViewModel.distinct("ipAddress", {
        createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
      }).then((ips) => ips.length),
      postModel.countDocuments(),
      postModel.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),
    ]);

    const retentionRate = Math.floor((activeUsers / totalUsers) * 100);

    const pageViewsRaw = await pageViewModel.find({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // last 7 days
    });

    const pageViewsGrouped = {};
    const browserUsage = {};
    const deviceUsage = {};

    for (let view of pageViewsRaw) {
      const date = new Date(view.createdAt).toISOString().split("T")[0];

      if (!pageViewsGrouped[view.page]) pageViewsGrouped[view.page] = {};
      pageViewsGrouped[view.page][date] = (pageViewsGrouped[view.page][date] || 0) + 1;

      // Browser
      const browserMatch = view.userAgent?.match(/(Firefox|Chrome|Safari|Edge)/i);
      const browser = browserMatch ? browserMatch[1] : "Other";
      browserUsage[browser] = (browserUsage[browser] || 0) + 1;

      // Device
      const ua = view.userAgent || "";
      const isMobile = /mobile/i.test(ua);
      const isTablet = /tablet/i.test(ua);
      const deviceType = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";
      deviceUsage[deviceType] = (deviceUsage[deviceType] || 0) + 1;
    }

    // Create pageViewsPerPageDaily in required format
    const pageViewsPerPageDaily = {};
    for (const [page, data] of Object.entries(pageViewsGrouped)) {
      pageViewsPerPageDaily[page] = Object.entries(data)
        .map(([date, value]) => ({ date, value }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const postGrowth = await postModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    return res.json({
      totalUsers,
      newUsers,
      activeUsers,
      totalPosts,
      newPosts,
      retentionRate,
      pageViewsPerPageDaily, // ← 👈 This is what you’ll use for per-page daily views
      postGrowth: postGrowth.map((d) => ({ date: d._id, value: d.count })),
      deviceUsage,
      browserUsage,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    res.status(500).json({ message: "Error fetching analytics" });
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
