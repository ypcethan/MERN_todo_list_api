const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.resolve(__dirname, "config/dev.env") });
  console.log("Inserver");
  console.log(process.env.PORT);
  console.log(process.env.MONGO_URI);
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());
// enable req.cookies
app.use(cookieParser());
app.use(cors());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

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
