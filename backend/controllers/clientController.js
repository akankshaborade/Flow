const Client = require("../models/Client");

// CREATE CLIENT
exports.createClient = async (req, res) => {
  try {
    const { name, email, company, notes } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const client = new Client({
      user: req.user.id,
      name,
      email,
      company,
      notes,
    });

    await client.save();

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET ALL CLIENTS (for logged-in user)
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET SINGLE CLIENT
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE CLIENT
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const { name, email, company, notes } = req.body;

    if (name) client.name = name;
    if (email) client.email = email;
    if (company) client.company = company;
    if (notes) client.notes = notes;

    await client.save();

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE CLIENT
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
