const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const protect = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res
          .status(401)
          .json({ status: false, data: null, message: "Not authorized" });
      }
      req.user = user;
      next();
    } else {
      return res
        .status(401)
        .json({ status: false, data: null, message: "Not authorized" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = { protect };
