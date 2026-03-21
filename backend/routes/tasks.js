const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  markTaskComplete,
} = require("../controllers/taskController");

// CREATE TASK
router.post("/", auth, createTask);

// GET TASKS BY PROJECT
router.get("/project/:projectId", auth, getTasksByProject);

// UPDATE TASK
router.put("/:id", auth, updateTask);

// DELETE TASK
router.delete("/:id", auth, deleteTask);

// MARK COMPLETE
router.patch("/:id/complete", auth, markTaskComplete);

module.exports = router;
