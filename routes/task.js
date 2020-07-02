const express = require("express");
const { getTasks } = require("../controllers/task");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/:userId/tasks", protect, getTasks);

module.exports = router;
