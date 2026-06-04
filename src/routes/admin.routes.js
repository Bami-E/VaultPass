const express = require('express');
const { deleteUsers, promoteUsers } = require('../controllers/admin.controllers');
const router = express.Router();
const authorize = require("../middleware/role.middleware");
const protect = require("../middleware/auth.midddleware")



router.delete("/delete/:id", protect, authorize("admin"), deleteUsers);

router.post("/promote/:id", protect, authorize("admin"), promoteUsers);

module.exports = router;