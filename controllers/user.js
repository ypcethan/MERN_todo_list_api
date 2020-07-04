const User = require("../models/User");
exports.postRegister = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        msg: "Email has already been taken",
      });
    }
    user = await User.create(req.body);

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: "Some error occured",
    });
  }
};

exports.postLogin = async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      success: false,
      msg: "Please provide both password and email ",
    });
  }

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      msg: `User with email : ${email} does not exist`,
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      msg: "Invalid credentails",
    });
  }

  sendTokenResponse(user, 200, res);
};

const sendTokenResponse = (user, statusCode, res, useCookie = false) => {
  const token = user.getJWTToken();
  if (useCookie) {
    return res.status(statusCode).cookie("token", token).json({
      success: true,
      token,
    });
  }
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};
