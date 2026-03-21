const Client = require("../models/Client");
const Project = require("../models/Project");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Total Clients
    const totalClients = await Client.countDocuments({ user: userId });

    // 2. Total Projects
    const totalProjects = await Project.countDocuments({ user: userId });

    // 3. Earnings + Pending Payments (Aggregation)
    const earningsData = await Project.aggregate([
      {
        $match: {
          user: require("mongoose").Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,

          totalEarnings: {
            $sum: {
              $cond: [
                { $eq: ["$paymentStatus", "paid"] },
                "$budget",
                0,
              ],
            },
          },

          pendingPayments: {
            $sum: {
              $cond: [
                { $eq: ["$paymentStatus", "pending"] },
                "$budget",
                0,
              ],
            },
          },
        },
      },
    ]);

    const stats = earningsData[0] || {
      totalEarnings: 0,
      pendingPayments: 0,
    };

    res.json({
      totalClients,
      totalProjects,
      totalEarnings: stats.totalEarnings,
      pendingPayments: stats.pendingPayments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
