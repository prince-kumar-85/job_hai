const User = require("../models/User");
const Request = require("../models/Request");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER USER */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  res.status(201).json({ message: "User registered" });
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
  const requests = await Request.find({ userId: req.user.id });
  res.json({
    totalRequests: requests.length,
    requests
  });
};

/* CREATE REQUEST */
exports.createRequest = async (req, res) => {
  const { serviceType, description } = req.body;

  await Request.create({
    userId: req.user.id,
    serviceType,
    description
  });

  res.status(201).json({ message: "Request submitted" });
};
