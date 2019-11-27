const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const path = require("path");

const app = express();
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { auth } = require("./middleware/auth");
const { protect } = require("./middleware/protect");
const keys = require("./config/keys");

mongoose.Promise = global.Promise;
// "mongodb://localhost:27017/agro";

const mongoURI = keys.mongoURI;
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Mongo Connected")
);

mongoose.set("useCreateIndex", true);

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
 
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log("App listening on port " + port));
