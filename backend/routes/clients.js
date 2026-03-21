const express = require("express");
const router = express.Router();
const { createClient,
     getClients,
     updateClient, 
     deleteClient } = require("../controllers/clientControllers");
const { protect } = require("../middleware/auth"); 

router.route("/")
  .post(protect, createClient)
  .get(protect, getClients);

  router.route("/:id")
  .put(protect, updateClient)
  .delete(protect, deleteClient);
  
module.exports = router; 