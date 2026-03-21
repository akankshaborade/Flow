const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

// CREATE CLIENT
router.post("/", auth, createClient);

// GET ALL CLIENTS
router.get("/", auth, getClients);

// GET SINGLE CLIENT
router.get("/:id", auth, getClientById);

// UPDATE CLIENT
router.put("/:id", auth, updateClient);

// DELETE CLIENT
router.delete("/:id", auth, deleteClient);

module.exports = router;
