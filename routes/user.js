const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { auth } = require("../middleware/auth");
const { validateUser } = require("../validation/user");

router.post("/register", (req, res) => {
  const validation = validateUser(req.body);
  if (validation[1] === false) {
    return res.status(400).json({success: false, err: validation[0]});
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({success: false, email: "User already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
        place: req.body.place
      });
      if(newUser.role === 'seller') {
        newUser.company = req.body.company;
      }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({ error: err });
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.status(400).json({ error: err });
          newUser.password = hash;
          newUser.save().then(savedUser => {
            res.json(savedUser);
          });
        });
      });
    }
  }).catch(err => res.status(400).json({success: false, err: err.message}));
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }
    user.comparePassword(req.body.password, (err, matched) => {
      if (matched) {
        user.generateToken((err, user) => {
          if (err) return res.status(400).json(err);
          return res
            .cookie("w_auth", user.token)
            .status(200)
            .json(
              user
            );
        });
      } else {
        return res.status(400).json({ password: "Invalid Password" });
      }
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user.id }, { token: "" }, (err, doc) => {
    if (err) return res.status(400).json({ success: false });
    return res.status(200).json({ success: true });
  });
});

router.get("/current", auth, (req, res) => res.json(req.user));

module.exports = router;
