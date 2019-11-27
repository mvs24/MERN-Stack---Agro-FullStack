const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const keys = require('../config/keys')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  lastname: {
    type: String,
    required: true, 
    minlength: 2
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user"
  },
  place: String,
  cart: {
    type: Array,
    default: []
  },
  token: String
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, matched) {
  
    if (err) return callback(err);
    callback(null, matched);
  });
};

userSchema.methods.generateToken = function(callback) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), keys.superSecret);
  user.token = token;
  user
    .save()
    .then(user => {
      callback(null, user);
    })
    .catch(err => {
      return callback(err);
    });
};


userSchema.statics.findByToken = function(token, cb) {
  let user = this;
  jwt.verify(token,keys.superSecret, (err, decode) => {
    user.findOne({ _id: decode, token: token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};


module.exports = mongoose.model("User", userSchema);
