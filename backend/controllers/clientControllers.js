const Client = require('../models/Client');

// @desc    Create a new client
// @route   POST /api/clients
const createClient = async (req, res) => {
  try {
    const { name, email, company, notes } = req.body;

    const client = await Client.create({
      user: req.user.id,
      name,
      email,
      company,
      notes,
    });

    res.status(201).json({
      message: 'Client created successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all clients for logged-in user
// @route   GET /api/clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.id });

    res.status(200).json({
      message: 'Clients fetched successfully',
      count: clients.length,
      clients,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single client by ID
// @route   GET /api/clients/:id
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (client.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      message: 'Client fetched successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a client
// @route   PUT /api/clients/:id
const updateClient = async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (client.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Client updated successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a client
// @route   DELETE /api/clients/:id
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (client.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await client.deleteOne();

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};