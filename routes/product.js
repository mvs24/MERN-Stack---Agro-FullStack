const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product");
const Company = require("../models/Company");
const { protect } = require("../middleware/protect");
const { auth } = require("../middleware/auth");
const { validateProduct } = require("../validation/product");

router.get("/", auth, protect("user", "seller", "admin"), (req, res) => {
  Product.find({quantity : { $gt: 0 }})
    .populate("user")
    .populate("company")
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
        bigPrice: req.body.productBigPrice,
        images: req.body.images 
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



router.get("/all/:companyId", auth, (req, res) => {
  let limit = 6;
  let page = req.query.page * 1 || 2;
  let skip = (page - 1) * limit;

  Product.find({ company: req.params.companyId, quantity : { $gt: 0 } })
    .populate("user")
    .populate("company")
    .skip(skip)
    .limit(limit)
    .then(products => res.json(products))
    .catch(err => res.status(404).json(err));
});

router.get(
  "/companyDetails/:cid",
  auth,
  protect("user", "seller", "admin"),
  (req, res) => {
    Product.find({ company: req.params.cid, quantity : { $gt: 0 } })
      .populate("user")
      .populate("company")
      .limit(6)
      .then(products => {
        return res.status(200).json(products);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/companyProductsLength/:cid",
  auth,
  protect("user", "seller", "admin"),
  (req, res) => {
    let length = 0;
    Product.find({ company: req.params.cid, quantity : { $gt: 0 } })
      .populate("user")
      .populate("company")
      .then(products => {
        products.forEach(el => {
          if(el.quantity > 0) {
            length++;
          } 
        })
        return res.status(200).json(length);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/todayProducts",
  auth,
  protect("user", "seller", "admin"),
  (req, res) => {
    let results = [];
    let previousResults = [];

    let todayDate = new Date(Date.now());

    let limit = 2;
    let page = req.query.page * 1 || 2;
    let skip = (page - 1) * limit;
    
    Product
      .find({quantity : { $gt: 0 }})
      .populate("user")
      .populate("company")
      .then(products => {
        products.forEach(product => {
          if (
            new Date(product.date).getDate() == todayDate.getDate() &&
            new Date(product.date).getMonth() == todayDate.getMonth() &&
            new Date(product.date).getFullYear() == todayDate.getFullYear()
          ) {
            results.unshift(product);
            previousResults.unshift(product);
          }
        });
        previousResults = results.splice(page - 2, skip);
        results = previousResults.splice(0, 2);
        return res.json(results);
      })
      .catch(err => res.status(400).json(err));
  }
);

router.get(
  "/allProducts/:cid",
  auth,
  protect("user", "seller", "admin"),
  (req, res) => {
    Product.find({ company: req.params.cid, quantity : { $gt: 0 } })
      .then(products => res.json(products))
      .catch(err => res.status(400).json(err));
  }
);

router.get("/numberOfTodayProducts", auth, (req, res) => {
  let todayDate = new Date(Date.now());
  let results = [];
  let length = 0;

  Product.find({quantity : { $gt: 0 }}).then(products => {
    products.forEach(product => {
      if (
        new Date(product.date).getDate() == todayDate.getDate() &&
        new Date(product.date).getMonth() == todayDate.getMonth() &&
        new Date(product.date).getFullYear() == todayDate.getFullYear()
      ) {
        results.unshift(product); 
      }
    });
    results.forEach(el => {
      if(el.quantity > 0) {
        length ++;
      }
    })
    return res.status(200).json({ nrOfTodayProducts: length });
  });
});

module.exports = router;
