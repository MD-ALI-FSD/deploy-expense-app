const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

// app.use(express.static("client/public"));
app.use(express.static(path.join(__dirname, "client/public")));

const sequelize = require("./utils/database");

//Importing routes
const signupRoutes = require("./routes/sign-up");
const loginRoutes = require("./routes/login");
const ExpenseRoutes = require("./routes/expense");
const forgotpassRoutes = require("./routes/forgot-pass");
const downloadRoutes = require("./routes/download");

//Importing Models
const userModel = require("./models/user");
const expenseModel = require("./models/expense");
const orderModel = require("./models/order");
const urlModel = require("./models/url");

//using bodyparser and path
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Using routes
app.use(signupRoutes);
app.use(loginRoutes);
app.use(ExpenseRoutes);
app.use(forgotpassRoutes);
app.use(downloadRoutes);

//Creating Relations Between Tables
userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

userModel.hasMany(urlModel);
urlModel.belongsTo(userModel);

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT_NUMBER || 3000);
  })
  .catch((err) => {});

// .sync({ force: true })
