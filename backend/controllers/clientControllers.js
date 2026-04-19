const Client = require("../models/Client");

// CREATE — saves all 5 fields including phone & company
const createClient = async (req, res) => {
  try {
    const { name, email, phone, company, notes } = req.body;
    const client = await Client.create({
      user:    req.user.id,
      name:    name.trim(),
      email:   email.trim(),
      phone:   phone   ? phone.trim()   : "",
      company: company ? company.trim() : "",
      notes:   notes   ? notes.trim()   : "",
    });
    res.status(201).json({ message: "Client created successfully", client });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET ALL
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Clients fetched successfully", count: clients.length, clients });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET ONE
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    if (client.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });
    res.status(200).json({ message: "Client fetched successfully", client });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE — uses findByIdAndUpdate so all fields are replaced atomically
// Bug fix: old code used `client.phone = phone || client.phone` which prevented clearing fields
const updateClient = async (req, res) => {
  try {
    const existing = await Client.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Client not found" });
    if (existing.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    const { name, email, phone, company, notes } = req.body;
    const updated = await Client.findByIdAndUpdate(
      req.params.id,
      {
        name:    name    ? name.trim()    : existing.name,
        email:   email   ? email.trim()   : existing.email,
        phone:   phone   !== undefined    ? phone.trim()   : existing.phone,
        company: company !== undefined    ? company.trim() : existing.company,
        notes:   notes   !== undefined    ? notes.trim()   : existing.notes,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Client updated successfully", client: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    if (client.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });
    await client.deleteOne();
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };