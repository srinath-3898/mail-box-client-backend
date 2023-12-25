const express = require("express");
const cors = require("cors");
const sequelize = require("./configs/dbConfig");
const User = require("./models/user");
const Mail = require("./models/mail");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./routes/user"));
app.use("/users", require("./routes/users"));
app.use("/mail", require("./routes/mail"));

User.hasMany(Mail, { as: "SentMails", foreignKey: "fromUserId" });
User.hasMany(Mail, { as: "ReceivedMails", foreignKey: "toUserId" });
Mail.belongsTo(User, { as: "Sender", foreignKey: "fromUserId" });
Mail.belongsTo(User, { as: "Receiver", foreignKey: "toUserId" });

const port = process.env.PORT;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected");
    return app.listen(port);
  })
  .then(() => console.log(`Server running on port ${port}`))
  .catch((err) => console.log(err));
