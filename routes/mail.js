const express = require("express");
const { protect } = require("../middlewares/auth");
const { postMail } = require("../controllers/mail");

const router = express.Router();

router.post("", protect, postMail);

module.exports = router;
