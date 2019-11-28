const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const path = require("path");

// SECURITY
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const { auth } = require("./middleware/auth");
const { protect } = require("./middleware/protect");
const keys = require("./config/keys");

mongoose.Promise = global.Promise;

const app = express();
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const mongoURI = keys.mongoURI;
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Mongo Connected")
);

mongoose.set("useCreateIndex", true);

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: keys.cloud_name,
  api_key: keys.api_key,
  api_secret: keys.api_secret
});

const user = require("./routes/user");
const product = require("./routes/product");
const company = require("./routes/company");

app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/company", company);

app.post(
  "/api/uploadFile",
  auth,
  protect("seller"),
  formidable(),
  (req, res) => {
    cloudinary.uploader.upload(
      req.files.file.path,
      result => {
        res.status(200).send({
          public_id: result.public_id,
          url: result.url
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: "auto"
      }
    );
  }
);

app.get(`/api/removeFile`, auth, protect("seller"), (req, res) => {
  const { public_id } = req.query;

  cloudinary.uploader.destroy(public_id, err => {
    res.status(200).send("success");
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App listening on port " + port));
