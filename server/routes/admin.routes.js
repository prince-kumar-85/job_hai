const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", admin.register);
router.post("/login", admin.login);
router.get("/dashboard", protect(["admin"]), admin.dashboard);
router.get("/requests", protect(["admin"]), admin.getRequests);
router.put("/request/:id", protect(["admin"]), admin.updateStatus);

module.exports = router;
