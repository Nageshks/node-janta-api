const express = require("express");
const { authenticateWithPhone } = require("../controller/auth");

const router = express.Router();

router.post("/", authenticateWithPhone)

module.exports = router;