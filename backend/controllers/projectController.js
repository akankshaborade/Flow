const Project = require('../models/Project');
const Client = require('../models/Client');

// @desc    Create a new project
// @route   POST /api/projects
const createProject = async (req, res) => {
  try {
    const { title, description, deadline, status, budget, paymentStatus, client } = req.body;

    // Check if the client exists and belongs to the logged-in user
    const existingClient = await Client.findById(client);
    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    if (existingClient.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to use this client' });
    }

    const project = await Project.create({
      user: req.user.id,
      client,
      title,
      description,
      deadline,
      status,
      budget,
      paymentStatus,
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all projects for logged-in user
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    // populate('client') fills in the full client object instead of just the ID
    const projects = await Project.find({ user: req.user.id }).populate('client', 'name email company');

    res.status(200).json({
      message: 'Projects fetched successfully',
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all projects for a specific client
// @route   GET /api/projects/client/:clientId
const getProjectsByClient = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.id,
      client: req.params.clientId,
    }).populate('client', 'name email company');

    res.status(200).json({
      message: 'Projects fetched successfully',
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('client', 'name email company');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await project.deleteOne();

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectsByClient,
  getProjectById,
  updateProject,
  deleteProject,
};