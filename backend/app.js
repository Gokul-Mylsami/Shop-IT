const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/errors");
const fileupload = require("express-fileupload");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload());

//Import all  routes

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", order);
//MiddleWare to Handle Errors
app.use(errorMiddleware);

module.exports = app;
