const express = require("express");
const { addUserMinInfo, getCurrentUserDetails } = require("../controller/user");

const router = express.Router();

router.post("/add-min-user-info", addUserMinInfo);
router.get("/get-current-user-details", getCurrentUserDetails);

module.exports = router;