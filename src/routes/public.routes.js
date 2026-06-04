const express = require("express");
const router = express.Router();
const message = require("../controllers/public.controllers");


router.get("/message", message);

module.exports = router;