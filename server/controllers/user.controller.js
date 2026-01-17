const User = require("../models/User");
const Request = require("../models/Request");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER USER */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  res.status(201).json({ message: "User registered", user });
};

/* LOGIN USER */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: "user" });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

/* USER DASHBOARD */
exports.dashboard = async (req, res) => {
  res.json({
    message: "User Dashboard",
    user: req.user,
  });
};

/* CREATE SERVICE REQUEST */
exports.createRequest = async (req, res) => {
  const { serviceType, description } = req.body;

  const request = await Request.create({
    userId: req.user.id,
    serviceType,
    description,
  });

  res.status(201).json(request);
};
