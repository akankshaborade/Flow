const express = require("express");
const router = express.Router();
const { createClient, getClients } = require("../controllers/clientControllers");
const { protect } = require("../middleware/auth"); 

router.route("/")
  .post(protect, createClient)
  .get(protect, getClients);

module.exports = router;