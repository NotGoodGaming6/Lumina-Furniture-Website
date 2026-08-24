const Order = require('#models/user/order.model.js');
const User = require('#models/user/user.model.js');
const Product = require('#models/misc/product.model.js');

class AnalyticsService {
  async getDashboardAnalytics() {

    const revenueAggregation = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    const totalOrders = await Order.countDocuments();
    const activeUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const topProductsAggregation = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $unwind: '$orderItems' },
      { 
        $group: { 
          _id: '$orderItems.name', 
          sales: { $sum: '$orderItems.qty' }
        } 
      },
      { $sort: { sales: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, name: '$_id', sales: 1 } }
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dateNow = new Date();
    const last7MonthsStart = new Date(dateNow.getFullYear(), dateNow.getMonth() - 6, 1);

    const monthlyRevenueAggregation = await Order.aggregate([
      { 
        $match: { 
          status: { $ne: 'cancelled' },
          createdAt: { $gte: last7MonthsStart }
        } 
      },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' }, 
            month: { $month: '$createdAt' } 
          },
          total: { $sum: '$totalPrice' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    let revenueData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(dateNow.getFullYear(), dateNow.getMonth() - i, 1);
      const m = d.getMonth() + 1;
      const y = d.getFullYear();
      const monthName = months[d.getMonth()];

      const foundMatch = monthlyRevenueAggregation.find(
        (agg) => agg._id.month === m && agg._id.year === y
      );

      revenueData.push({
        name: monthName,
        total: foundMatch ? foundMatch.total : 0
      });
    }

    const lowStockProducts = await Product.find({ stock: { $lte: 5 } })
      .select('name stock category')
      .sort('stock')
      .lean();

    return {
      totalRevenue,
      totalOrders,
      activeUsers,
      totalProducts,
      revenueData,
      topProductsData: topProductsAggregation,
      lowStockProducts
    };
  }
}

module.exports = new AnalyticsService();
