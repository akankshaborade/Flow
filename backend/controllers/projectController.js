const Project = require("../models/Project");
const Client = require("../models/Client");


// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description, deadline, clientId, budget } = req.body;

    // Validate client ownership
    const client = await Client.findOne({
      _id: clientId,
      user: req.user.id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const project = new Project({
      user: req.user.id,
      client: clientId,
      title,
      description,
      deadline,
      budget,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// GET ALL PROJECTS (optionally filter by client)
exports.getProjects = async (req, res) => {
  try {
    const { clientId } = req.query;

    let filter = { user: req.user.id };

    if (clientId) {
      filter.client = clientId;
    }

    const projects = await Project.find(filter)
      .populate("client", "name email company")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// GET SINGLE PROJECT
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("client", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const {
      title,
      description,
      deadline,
      status,
      budget,
      paymentStatus,
    } = req.body;

    if (title) project.title = title;
    if (description) project.description = description;
    if (deadline) project.deadline = deadline;
    if (status) project.status = status;
    if (budget !== undefined) project.budget = budget;
    if (paymentStatus) project.paymentStatus = paymentStatus;

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// UPDATE PROJECT STATUS (quick endpoint)
exports.updateProjectStatus = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = req.body.status;
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// MARK PAYMENT AS PAID
exports.markAsPaid = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.paymentStatus = "paid";
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
