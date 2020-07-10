const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before save
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.getJWTToken = function () {
  const payload = { userId: this._id };
  const token = jwt.sign(payload, process.env.JWT_SECRECT, {
    expiresIn: 60 * 60, // 1hour
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
// Delete all tasks belong to the user that is being deleted
userSchema.pre("remove", async function () {
  await this.model("Task").deleteMany({ user: this._id });
  next();
});
module.exports = mongoose.model("User", userSchema);
