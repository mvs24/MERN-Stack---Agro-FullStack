const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");
const { protect } = require("../middleware/protect");
const { validateUser } = require("../validation/user");
const {
  validateIncreaseItemQuantity
} = require("../validation/inreaseItemQuantity");
const keys = require("../config/keys");

router.post("/register", (req, res) => {
  const validation = validateUser(req.body);
  if (validation[1] === false) {
    return res.status(400).json({ success: false, err: validation[0] });
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        let errors = {};
        errors.email = "User already exists";
        return res.status(400).json({ err: errors });
      } else {
        const newUser = new User({
          name: req.body.name,
          lastname: req.body.lastname,
          password: req.body.password,
          email: req.body.email,
          role: req.body.role,
          place: req.body.place
        });
        if (newUser.role === "seller") {
          newUser.company = req.body.company;
        }
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return res.status(400).json({ error: err });
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return res.status(400).json({ error: err });
            newUser.password = hash;
            newUser.save().then(savedUser => {
              savedUser.isAuth = false;
              res.json(savedUser);
            });
          });
        });
      }
    })
    .catch(err => res.status(400).json({ success: false, err: err.message }));
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
            .json(user);
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

router.post("/addToCart", auth, protect("user"), (req, res) => {
  User.findOne({ _id: req.user._id }).then(user => {
    Product.findOne({ _id: req.body.productId }).then(product => {
      const itemInTheCart = user.cart.find(
        el => el.productId.toString() === product._id.toString()
      );
      if (itemInTheCart) {
        if (req.body.quantity + itemInTheCart.quantity > product.quantity) {
          return res.status(400).json("You can not buy more than max quantity");
        }
      } else {
        if (req.body.quantity > product.quantity) {
          return res.status(400).json("You can not buy more than max quantity");
        }
      }

      let item = user.cart.find(
        el => el.productId.toString() == req.body.productId.toString()
      );

      if (!item) {
        user.cart.unshift(req.body);
        user
          .save()
          .then(savedUser => {
            return res.json({ savedUser, savedProduct });
          })

          .catch(err => res.status(400).json(err));
      } else {
        const newQuantity = item.quantity + req.body.quantity;
        const newPrice =
          item.price.toFixed(2) * 1 + req.body.price.toFixed(2) * 1;
        user.cart = user.cart.map(el => {
          if (el.productId.toString() === req.body.productId.toString()) {
            return {
              ...el,
              quantity: newQuantity,
              price: newPrice
            };
          } else {
            return el;
          }
        });

        user
          .save()
          .then(savedUser => {
            res.status(200).json({ savedUser, savedProduct });
          })

          .catch(err => res.status(400).json(err));
      }
    });
  });
});

router.post(
  "/decreaseItemQuantity",
  auth,
  protect("user"),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });

      const itemInCart = user.cart.find(
        el => el.productId.toString() === req.body.productId.toString()
      );
      const priceToRemove = itemInCart.singleItemPrice;

      if (itemInCart.quantity > 1) {
        user.cart = user.cart.map(el => {
          if (el.productId.toString() === req.body.productId.toString()) {
            return {
              ...el,
              price: el.price - priceToRemove,
              quantity: el.quantity - 1
            };
          } else {
            return el;
          }
        });
      } else {
        user.cart = user.cart.filter(
          el => el.productId.toString() !== req.body.productId.toString()
        );
      }

      const userSaved = await user.save();
      userSaved.password = undefined;

      return res.json({ userSaved });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
);

router.post(
  "/increaseItemQuantity",
  auth,
  protect("user"),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const product = await Product.findOne({ _id: req.body.productId });

      let validation = validateIncreaseItemQuantity(req.body, product);

      if (validation[0] === false) {
        product.increaseError = validation[validation.length - 1];
        const savedProduct = await product.save();
        return res.status(400).json(savedProduct);
      }

      const itemInCart = user.cart.find(
        el => el.productId.toString() === req.body.productId.toString()
      );
      const priceToAdd = itemInCart.singleItemPrice;

      user.cart = user.cart.map(el => {
        if (el.productId.toString() === req.body.productId.toString()) {
          return {
            ...el,
            price: el.price + priceToAdd,
            quantity: el.quantity + 1
          };
        } else {
          return el;
        }
      });

      const savedUser = await user.save();
      savedUser.password = undefined;

      return res.status(200).json(savedUser);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
);

router.post("/removeItemFromCart", auth, protect("user"), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.cart = user.cart.filter(
      el => el.productId.toString() !== req.body.productId.toString()
    );

    const savedUser = await user.save();
    savedUser.password = undefined;
    return res.status(200).json(savedUser);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/paymentSuccess/:userId", auth, protect("user"), (req, res) => {
  User.findOne({ _id: req.params.userId }).then(user => {
    user.cart = [];
    user
      .save()
      .then(savedUser => res.status(200).json(savedUser))
      .catch(err => res.status(400).json(err));
  });
});

router.post("/successPayment/email", auth, (req, res) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agropriceapp@gmail.com",
      pass: keys.pass
    }
  });

  let mail = {
    from: "Agro Price <agropriceapp@gmail.com>",
    to: req.body.card.email,
    subject: "Payment Success",
    text: `Successful payment of the products`,
    html: "<b>Successful payment</b>"
  };

  smtpTransport.sendMail(mail, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
    }
    smtpTransport.close();
  });
});

router.post("/removeQuantityOfProduct", auth, protect("user"), (req, res) => {
  const userCart = req.body;
  userCart.forEach(el => {
    Product.findOne({ _id: el.productId }).then(product => {
      product.quantity -= el.quantity;
      product.save().then(savedProduct => {
        res.status(200).json(savedProduct);
      });
    });
  });
});

router.get('/auth', auth, (req, res) => {
  if (req.user._id) return res.status(200).json(true);
  return res.status(200).json(false); 
})

module.exports = router;
