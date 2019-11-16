const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product");
const Company = require("../models/Company");
const { protect } = require("../middleware/protect");
const { auth } = require("../middleware/auth");

router.get("/", auth, protect("user", "seller", "admin"), (req, res) => {
  Product.find()
    .populate("user")
    .then(products => {
      products;
      return res.json(products);
    })
    .catch(err => res.status(400).json(err));
});

router.post("/:companyId", auth, protect("seller"), (req, res) => {
  Company.findOne({ _id: req.params.companyId }).then(company => {
    if (company.user.toString() === req.user._id.toString()) {
      const newProduct = new Product({
        name: req.body.name,
        user: req.user._id,
        company: req.params.companyId,
        quantity: req.body.quantity,
        smallPrice: req.body.smallPrice,
        bigPrice: req.body.bigPrice
      });

      newProduct
        .save()
        .then(savedProduct => {
          return res.status(200).json(savedProduct);
        })
        .catch(err => res.status(400).json(err));
    } else {
      return res.status(400).json({
        createProductErr: "You do not have permission to do this action"
      });
    }
  });
});


router.get('/all/:companyId', auth, (req, res) => {
  Product.find({ company: req.params.companyId })
    .then(products => res.json(products))
    .catch(err => res.status(404).json(err));
})

module.exports = router;
