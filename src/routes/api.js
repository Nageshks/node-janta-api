const express = require("express");
const { addUserMinInfo, getCurrentUserDetails, deleteCurrentUser } = require("../controller/user");

const router = express.Router();

router.post("/add-min-user-info", addUserMinInfo);
router.get("/get-current-user-details", getCurrentUserDetails);
router.post("/delete-current-user", deleteCurrentUser);

module.exports = router;