const express = require("express");
const { addUserMinInfo } = require("../controller/user");

const router = express.Router();

router.post("/add-min-user-info", addUserMinInfo);

module.exports = router;