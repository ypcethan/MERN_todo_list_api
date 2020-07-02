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
});

module.exports = mongoose.model("Task", taskSchema);
