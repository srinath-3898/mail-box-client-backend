const sequelize = require("../configs/dbConfig");
const Mail = require("../models/mail");
const User = require("../models/user");

const postMail = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { recipientId, subject, content } = req.body;
    if (!recipientId || !subject || !content) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Missing required fields",
      });
    }
    const recipient = await User.findByPk(recipientId);
    if (!recipient) {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Recipient not found" });
    }
    const mail = await Mail.create(
      {
        senderId: req.user.id,
        senderMail: req.user.email,
        senderName: req.user.fullName,
        recipientId: recipient?.id,
        recipientMail: recipient.email,
        subject,
        content,
      },
      { transaction }
    );
    if (!mail) {
      throw new Error(
        "Something went wrong while sending mail, please try again"
      );
    }
    await transaction.commit();
    return res.status(201).json({
      status: true,
      message: "Mail sent successfully",
      data: null,
    });
  } catch (error) {
    await transaction.rollback();
    return res
      .status(500)
      .json({ status: "false", data: null, message: error.message });
  }
};

const getMail = async (req, res) => {
  try {
    const mails = await Mail.findAll({ where: { recipientId: req.user.id } });
    if (!mails) {
      throw new Error(
        "Something went wrong while fetching mails, please try again"
      );
    }
    return res
      .status(200)
      .json({ status: true, data: { mails }, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = { postMail, getMail };
