const express = require("express");
const { addUserMinInfo, getCurrentUserDetails, deleteCurrentUser, updateCurrentUserProfile } = require("../controller/user");

const router = express.Router();

router.post("/add-min-user-info", addUserMinInfo);
router.get("/get-current-user-details", getCurrentUserDetails);
router.post("/delete-current-user", deleteCurrentUser);
router.post("/update-current-user-profile", updateCurrentUserProfile);

module.exports = router;