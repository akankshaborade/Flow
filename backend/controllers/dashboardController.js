const Client = require('../models/Client');
const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Get dashboard summary
// @route   GET /api/dashboard
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Count total clients
    const totalClients = await Client.countDocuments({ user: userId });

    // Count total projects
    const totalProjects = await Project.countDocuments({ user: userId });

    // Count active projects
    const activeProjects = await Project.countDocuments({
      user: userId,
      status: 'active',
    });

    // Count completed projects
    const completedProjects = await Project.countDocuments({
      user: userId,
      status: 'completed',
    });

    // Count total tasks
    const totalTasks = await Task.countDocuments({ user: userId });

    // Count pending tasks
    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: 'pending',
    });

    // Count completed tasks
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: 'completed',
    });

    // Calculate total earnings (all paid projects)
    const paidProjects = await Project.find({
      user: userId,
      paymentStatus: 'paid',
    });
    const totalEarnings = paidProjects.reduce(
      (sum, project) => sum + project.amount, 0
    );

    // Calculate pending payments (all unpaid projects)
    const unpaidProjects = await Project.find({
      user: userId,
      paymentStatus: 'pending',
    });
    const pendingPayments = unpaidProjects.reduce(
      (sum, project) => sum + project.amount, 0
    );

    res.status(200).json({
      message: 'Dashboard fetched successfully',
      dashboard: {
        clients: {
          total: totalClients,
        },
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
        },
        tasks: {
          total: totalTasks,
          pending: pendingTasks,
          completed: completedTasks,
        },
        payments: {
          totalEarnings,
          pendingPayments,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getDashboard };