const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product");
const { protect } = require("../middleware/protect");
const { auth } = require("../middleware/auth");

router.post("/", auth, protect("seller"), (req, res) => {
  User.findOne({ _id: req.user._id }).then(user => {
    const newProduct = new Product({
      name: req.body.name,
      user: req.user._id,
      quantity: req.body.quantity,
      smallPrice: req.body.smallPrice,
      bigPrice: req.body.bigPrice,
      medPrice: req.body.medPrice,
      company: user.company
    });
    newProduct.save().then(savedProduct => res.status(200).json(savedProduct));
  });
});

router.get("/", auth, protect("user", "seller", "admin"), (req, res) => {
  Product.find()
    .populate("user")
    .then(products => {
      products;
      return res.json(products);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
