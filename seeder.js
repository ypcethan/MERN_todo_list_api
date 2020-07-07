const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const moment = require("moment");
// Load env vars
dotenv.config({ path: "./config/dev.env" });

// Load models
const Task = require("./models/Task");
const User = require("./models/User");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const idOne = mongoose.Types.ObjectId();
const idTwo = mongoose.Types.ObjectId();
const users = [
  {
    _id: idOne,
    name: "atrina",
    email: "atrina@gmail.com",
    password: "asdf",
  },

  {
    _id: idTwo,
    name: "ethan",
    email: "ethan@gmail.com",
    password: "asdf",
  },
];

const tasks = [
  {
    content: "T1",
    completed: true,
    completedDate: moment().subtract(3, "days"),
    user: idTwo,
  },
  {
    content: "T2",
    completed: true,
    completedDate: moment().subtract(2, "days"),
    user: idTwo,
  },
  {
    content: "T3",
    completed: true,
    completedDate: moment().subtract(3, "days"),
    user: idTwo,
  },
];
// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Task.create(tasks);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
