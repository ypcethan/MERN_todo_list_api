const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Task", taskSchema);
