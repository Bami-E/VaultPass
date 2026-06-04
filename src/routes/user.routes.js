const express = require('express');
const profile = require('../controllers/users.controllers');
const protect = require("../middleware/auth.midddleware")
const router = express.Router();


router.get("/profile", protect, profile)


module.exports = router;