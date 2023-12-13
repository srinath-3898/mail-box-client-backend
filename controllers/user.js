const sequelize = require("../configs/dbConfig");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { fullName, email, mobile, password } = req.body;
    if (!fullName || !email || !mobile || !password) {
      transaction.rollback();
      return res.status(400).json({
        status: false,
        data: null,
        message: "Missing required fields",
      });
    }
    const userExits = await User.findOne({ where: { email } });
    if (userExits) {
      transaction.rollback();
      return res
        .status(403)
        .json({ status: false, data: null, message: "Account already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create(
      {
        fullName,
        email,
        mobile,
        password: hashedPassword,
        premiumUser: false,
        totalExpenses: 0,
      },
      { transaction }
    );
    if (!user) {
      await transaction.rollback();
      throw new Error(
        "Some thing went wrong while signing up, please try again"
      );
    }
    await transaction.commit();
    return res.status(201).json({
      status: true,
      data: user,
      message: "Signedup successfully, please signin to continue...",
    });
  } catch (error) {
    await transaction.rollback();
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = { signup };
