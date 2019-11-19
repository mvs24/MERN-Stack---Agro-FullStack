const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const app = express();

const {auth} = require('./middleware/auth')
const {protect} = require('./middleware/protect')

mongoose.Promise = global.Promise;

const mongoURI = "mongodb://localhost:27017/agro";
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Mongo Connected")  
); 
   
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: 'ddnfmuxo5',
  api_key: '887347439998624',
  api_secret: '4bpXMvUX7UQLZ6vFSWK8hhXMYbU'
})

const user = require("./routes/user");
const product = require('./routes/product');
const company = require('./routes/company');

app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/company", company);

app.post('/api/uploadFile', auth, protect('seller'), formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (result) => {
    res.status(200).send({
      public_id: result.public_id,
      url: result.url 
    })
  }, {
    public_id: `${Date.now()}`,
    resource_type: 'auto'
  })
})

app.get(`/api/removeFile`, auth, protect('seller'), (req, res) => {
  const {public_id} = req.query;

  cloudinary.uploader.destroy(public_id, (err) => { 
    res.status(200).send('success');
  })
})  


const port = 5000;
app.listen(port, () => console.log("App listening on port " + port));
