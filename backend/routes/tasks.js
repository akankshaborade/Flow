const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");

const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  markTaskComplete,
} = require("../controllers/taskController");

const { protect } = require('../middleware/auth');

// // CREATE TASK
// router.post("/", auth, createTask);

// // GET TASKS BY PROJECT
// router.get("/project/:projectId", auth, getTasksByProject);

// // UPDATE TASK
// router.put("/:id", auth, updateTask);

// // DELETE TASK
// router.delete("/:id", auth, deleteTask);

// // MARK COMPLETE
// router.patch("/:id/complete", auth, markTaskComplete);

router.post("/", protect, createTask);
router.get("/project/:projectId", protect, getTasksByProject);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/complete", protect, markTaskComplete)

module.exports = router;
