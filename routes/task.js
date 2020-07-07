const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  getCompletedTasks,
} = require("../controllers/task");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);
router.get("/completed/:amount/:unit", protect, getCompletedTasks);
router.route("/:id").patch(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
