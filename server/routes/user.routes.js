const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", user.register);
router.post("/login", user.login);

router.get("/dashboard", protect("user"), user.dashboard);
router.post("/request", protect("user"), user.createRequest);

module.exports = router;
