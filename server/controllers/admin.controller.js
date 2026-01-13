const User = require("../models/User");
const Request = require("../models/Request");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER ADMIN */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashed,
    role: "admin"
  });

  res.status(201).json({ message: "Admin registered" });
};

/* LOGIN ADMIN */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: "admin" });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

/* ADMIN DASHBOARD */
exports.dashboard = async (req, res) => {
  const users = await User.countDocuments({ role: "user" });
  const requests = await Request.countDocuments();
  res.json({ users, requests });
};

/* VIEW ALL REQUESTS */
exports.getRequests = async (req, res) => {
  const requests = await Request.find().populate("userId", "name email");
  res.json(requests);
};

/* UPDATE REQUEST STATUS */
exports.updateStatus = async (req, res) => {
  await Request.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Status updated" });
};
