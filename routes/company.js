const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { validateCompany } = require("../validation/company");
const { auth } = require("../middleware/auth");
const Company = require("../models/Company");
const User = require("../models/User");

router.post("/", (req, res) => {
  let validation = validateCompany(req.body);
  if (validation[validation.length - 1] === false) {
    return res.status(400).json(validation[0]);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ userErr: "You do not have permission to do this action" });
    }
    if (user.role === "user") {
      return res
        .status(400)
        .json({ userErr: "You do not have permission to do this action" });
    }

    const newCompany = new Company({
      name: req.body.companyName,
      place: req.body.companyPlace,
      user
    });
    newCompany.save().then(savedCompany => {
      return res.status(200).json(savedCompany);
    });
  });
});

router.get("/", auth, (req, res) => {
  Company.find()
    .populate("user")
    .populate("products")
    .then(companies => {
      return res.status(200).json(companies);
    })
    .catch(err => res.status(400).json(err));
});

router.get('/comp/length', auth, (req, res) => {
  Company.find().then(companies => res.json(companies.length))
})

router.get("/:companyId", auth, (req, res) => {
  Company.findOne({ _id: req.params.companyId })
    .populate("user")
    .then(company => {
      return res.status(200).json(company);
    })
    .catch(err =>
      res.status(404).json({ companyNotFound: "This company does not exists" })
    );
});

router.get("/my/myCompany", auth, (req, res) => {
  Company.findOne({ user: req.user._id })
    .populate("user")
    .populate("products")
    .then(company => {
      if (company) {
        return res.status(200).json(company);
      } else {
        return res
          .status(404)
          .json({ companyNotFound: "This company does not exists" });
      }
    })
    .catch(err =>
      res.status(404).json({ companyNotFound: "This company does not exists" })
    );
});

module.exports = router;
