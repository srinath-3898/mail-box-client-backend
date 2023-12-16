const express = require("express");
const { getAllUsers } = require("../controllers/users");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("", protect, getAllUsers);

module.exports = router;
