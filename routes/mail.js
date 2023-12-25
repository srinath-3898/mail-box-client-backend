const express = require("express");
const { protect } = require("../middlewares/auth");
const { postMail, getMail } = require("../controllers/mail");

const router = express.Router();

router.post("", protect, postMail);
router.get("", protect, getMail);

module.exports = router;
