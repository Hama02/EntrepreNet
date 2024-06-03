const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");
const bcrypt = require("bcrypt");

function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.accountType },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
}

exports.register = async (req, res) => {
  const { username, email, password, accountType } = req.body;

  try {
    const checking = await User.findOne({ username });
    if (checking) {
      return res.status(401).json({
        status: "failed",
        msg: "User Already Exists!",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        accountType,
      });
      await newUser.save();
      newUser.password = undefined;
      return res.status(201).json({ status: "success", newUser });
    }
  } catch (err) {
    return res.status(500).json({ status: "failed", err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        msg: "User not found!",
      });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: "failed",
        msg: "Wrong Password!",
      });
    }
    const token = generateToken(user);
    user.password = undefined;
    return res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({ status: "failed", err });
  }
};

exports.protect = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", msg: "No token provided." });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "failed", msg: "Failed to authenticate token." });
    }
    req.user = decoded;
    next();
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
