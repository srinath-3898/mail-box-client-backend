const Sequelize = require("sequelize");
const sequelize = require("../configs/dbConfig");

class Mail extends Sequelize.Model {}

Mail.init(
  {
    from: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
    to: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
    subject: { type: Sequelize.DataTypes.TEXT, allowNull: true },
    content: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
  },
  { sequelize, modelName: "mail" }
);

module.exports = Mail;
