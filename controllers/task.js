const Task = require("../models/Task");
exports.getTasks = async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    tasks: tasks,
  });
};

exports.createTask = async (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({
      success: false,
      msg: "A task requires content",
    });
  }
  req.body.user = req.user._id;
  const task = await Task.create(req.body);

  res.status(200).json({
    success: true,
    task,
  });
};

exports.updateTask = async (req, res, next) => {
  const id = req.params.id;
  let task = await Task.findById(id);

  if (!task) {
    return res.status(400).json({
      success: false,
      msg: `No task with id : ${id}`,
    });
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      msg: "Not authorize for this route",
    });
  }

  const { content } = req.body;
  if (!content) {
    return res.status(400).json({
      success: false,
      msg: "A task requires content",
    });
  }
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    task,
  });
};

exports.deleteTask = async (req, res, next) => {
  const id = req.params.id;
  let task = await Task.findById(id);

  console.log(task);
  if (!task) {
    return res.status(400).json({
      success: false,
      msg: `No task with id : ${id}`,
    });
  }
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      msg: "Not authorize for this route",
    });
  }
  task.remove();
  res.status(200).json({
    success: true,
    task: {},
  });
};
