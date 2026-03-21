const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, dueDate, projectId } = req.body;

    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: projectId,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = new Task({
      title,
      dueDate,
      project: projectId,
      user: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({
      project: projectId,
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, dueDate, status } = req.body;

    if (title) task.title = title;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// MARK COMPLETE
exports.markTaskComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "completed";
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
