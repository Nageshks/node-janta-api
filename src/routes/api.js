const express = require("express");
const { addUserMinInfo, getCurrentUserDetails, deleteCurrentUser, updateCurrentUserProfile, updateProfilePicture, updateProfileCover } = require("../controller/user");
const uploadImage = require('../middleware/multer');
const router = express.Router();
// const path = require('path');

/* const uploadDir = path.join(__dirname, '..', '..', 'uploads');
// console.log(uploadDir);
router.use('/uploads', express.static(uploadDir)); */
router.post("/add-min-user-info", addUserMinInfo);
router.get("/get-current-user-details", getCurrentUserDetails);
router.post("/delete-current-user", deleteCurrentUser);
router.post("/update-current-user-profile", updateCurrentUserProfile);
router.post("/update-current-user-profile-pic", uploadImage.single('profilePicture'), updateProfilePicture);
router.post("/update-current-user-profile-cover", uploadImage.single('profileCover'), updateProfileCover);

module.exports = router;