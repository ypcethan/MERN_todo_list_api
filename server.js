const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  dotenv.config({ path: "./config/dev.env" });
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());
// enable req.cookies
app.use(cookieParser());
app.use(cors());
// Mounting routers
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

module.exports = { app, start };
