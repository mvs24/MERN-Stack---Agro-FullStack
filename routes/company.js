const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const {validateCompany} = require('../validation/company');
const Company = require('../models/Company');
const User = require('../models/User');

router.post('/', (req, res) => {
    let validation = validateCompany(req.body);
    if(validation[validation.length - 1] === false) {
        return res.status(400).json(validation[0]);
    } 
    User.findOne({ email: req.body.email }).then(user => {
        if(!user) {
            return res.status(400).json({userErr: "You do not have permission to do this action"});
        }
        if(user.role === 'user') {
            return res.status(400).json({userErr: "You do not have permission to do this action"});
        }

        const newCompany = new Company({
            name: req.body.companyName,
            place: req.body.companyPlace,
            user
        });
        newCompany.save().then(savedCompany => {
                return res.status(200).json(savedCompany);
        })
    })
})

module.exports = router;