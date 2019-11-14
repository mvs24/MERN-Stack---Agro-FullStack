const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

mongoose.Promise = global.Promise;

const mongoURI = "mongodb://localhost:27017/agro";
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
  () => console.log("Mongo Connected")
);

mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const user = require("./routes/user");
const product = require('./routes/product');
const company = require('./routes/company');

app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/company", company);


const port = 5000;
app.listen(port, () => console.log("App listening on port " + port));
