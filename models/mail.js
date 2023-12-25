const Sequelize = require("sequelize");
const sequelize = require("../configs/dbConfig");

class Mail extends Sequelize.Model {}

Mail.init(
  {
    senderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    senderMail: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    senderName: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    recipientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    recipientMail: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    subject: { type: Sequelize.DataTypes.TEXT, allowNull: false },
    content: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "mail" }
);

module.exports = Mail;
