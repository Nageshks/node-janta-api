const express = require("express");
const { authenticateWithPhone, validatePhoneAuth } = require("../controller/auth");

const router = express.Router();

router.post("/", authenticateWithPhone);
router.post("/validate-phone-otp", validatePhoneAuth);

module.exports = router;