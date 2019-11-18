const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const { cloudinaryApiKey, cloudinaryName, cloudinaryApiSecret } = require('../keys/secret');

const Product = require("../models/Product");
const Company = require("../models/Company");
const { protect } = require("../middleware/protect");
const { auth } = require("../middleware/auth");
const { validateProduct } = require("../validation/product");


cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
})


router.get("/", auth, protect("user", "seller", "admin"), (req, res) => {
  Product.find()
    .populate("user")
    .populate('company')
    .then(products => {
      products;
      return res.json(products);
    })
    .catch(err => res.status(400).json(err));
});

router.post("/:companyId", auth, protect("seller"), (req, res) => {
  Company.findOne({ _id: req.params.companyId }).then(company => {
    if (company.user.toString() === req.user._id.toString()) {
      let validation = validateProduct(req.body);
      if (validation[validation.length - 1] === false) {
        return res.status(400).json(validation[0]);
      }
      const newProduct = new Product({
        name: req.body.productName,
        user: req.user._id,
        company: req.params.companyId,
        quantity: req.body.productQuantity,
        smallPrice: req.body.productSmallPrice,
        bigPrice: req.body.productBigPrice
      }); 
      newProduct.medPrice = (newProduct.smallPrice + newProduct.bigPrice) / 2;

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

router.post('/uploadImage', auth, protect("seller"), formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (result) => {
    console.log('-----')
    console.log(result);
    res.status(200).json({ public_id: result.public_id, url: result.url })
  }, {
    public_id: `${Date.now()}`,
    resource_type: "auto"
  })
})


router.get("/all/:companyId", auth, (req, res) => {
  Product.find({ company: req.params.companyId })
    .populate('user')
    .populate('company')
    .then(products => res.json(products))
    .catch(err => res.status(404).json(err));
});

router.get('/companyDetails/:cid', auth, protect('user', 'seller', 'admin'), (req, res) => {
  Product.find({company: req.params.cid}).populate('user').populate('company')
  .then(products => {
    return res.status(200).json(products);
  }).catch(err => res.status(404).json(err));
})

router.get('/todayProducts', auth, protect('user', 'seller', 'admin'), (req, res) => {
  let results = []; 
  let todayDate = new Date(Date.now());
  Product.find().populate('user').populate('company')
    .then(products => {
      products.forEach(product => {
        if((new Date(product.date).getDate() == todayDate.getDate())
          && ( new Date(product.date).getMonth() == todayDate.getMonth())
          && ( new Date(product.date).getFullYear() == todayDate.getFullYear() )
        ) {     
          results.unshift(product);
        }
      })
      return res.json(results);
    }).catch(err => res.status(400).json(err));
})


module.exports = router;
