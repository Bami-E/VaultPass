const express = require("express");
const router = express.Router();
const reports = require("../controllers/moderator.controllers");
const authorize = require("../middleware/role.middleware")
const protect = require("../middleware/auth.midddleware")


router.get("/reports", authorize("moderator","admin"), protect, reports);

module.exports = router;