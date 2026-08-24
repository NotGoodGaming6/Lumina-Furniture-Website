const analyticsService = require('#services/admin/analytics.service.js');

exports.getAnalytics = async (req, res) => {
  try {
    const data = await analyticsService.getDashboardAnalytics();

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
