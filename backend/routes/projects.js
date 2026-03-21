const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateProjectStatus,
  markAsPaid,
} = require("../controllers/projectController");

// CREATE PROJECT
router.post("/", auth, createProject);

// GET ALL PROJECTS
router.get("/", auth, getProjects);

// GET SINGLE PROJECT
router.get("/:id", auth, getProjectById);

// UPDATE PROJECT
router.put("/:id", auth, updateProject);

// DELETE PROJECT
router.delete("/:id", auth, deleteProject);

// UPDATE STATUS
router.patch("/:id/status", auth, updateProjectStatus);

// MARK AS PAID
router.patch("/:id/pay", auth, markAsPaid);

module.exports = router;
