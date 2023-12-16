const Sequelize = require("sequelize");
const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const { searchString } = req.body;
    if (!searchString) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Search string is required",
      });
    }
    const users = await User.findAll({
      where: {
        email: {
          [Sequelize.Op.like]: `${searchString}%`,
          [Sequelize.Op.ne]: req.user.email,
        },
      },
    });
    return res
      .status(200)
      .json({ status: true, data: { users }, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = { getAllUsers };
