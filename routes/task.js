const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);

router.route("/:id").patch(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
