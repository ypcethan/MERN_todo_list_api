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
});

module.exports = mongoose.model("Task", taskSchema);