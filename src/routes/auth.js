const express = require("express");
const { authenticateWithPhone, validatePhoneAuth, resendOtp } = require("../controller/auth");

const router = express.Router();

router.post("/", authenticateWithPhone);
router.post("/resend-otp", resendOtp);
router.post("/validate-phone-otp", validatePhoneAuth);

module.exports = router;