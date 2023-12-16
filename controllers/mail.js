const sequelize = require("../configs/dbConfig");
const User = require("../models/user");

const postMail = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { to, subject, content } = req.body;
    if (!to || !content) {
      return res.json({
        status: false,
        data: null,
        message: "Missing required fields",
      });
    }
    const sendTo = await User.findOne({ where: { email: to } });
    if (!sendTo) {
      return res.json({ status: false, data: null, message: "No user found" });
    }
    const mail = await req.user.createMail({
      from: req.user?.email,
      to: sendTo?.email,
      subject,
      content,
    });
    console.log(mail);
    if (!mail) {
      await transaction.rollback();
      throw new Error("Something went wrong while send mail, please try again");
    }
    return res
      .status(201)
      .json({ status: true, data: null, message: "Mail sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "false", data: null, message: error.message });
  }
};

module.exports = { postMail };
