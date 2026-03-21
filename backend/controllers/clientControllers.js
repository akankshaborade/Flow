const Client = require("../models/Client");

exports.createClient = async (req, res) => {
  try {
    // We add req.user.id so the client is "owned" by the person logged in
    const client = await Client.create({ ...req.body, user: req.user.id });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    // Only get clients that belong to the logged-in user
    const clients = await Client.find({ user: req.user.id });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add your Update and Delete functions here too!