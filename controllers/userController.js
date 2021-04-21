const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const async = require("async");
const bcrypt = require("bcryptjs");

// GET request for all users
exports.users_get = function (req, res, next) {
  User.find()
    .sort([["lastName", "ascending"]])
    .exec((err, users) => {
      if (err) {
        return next(err);
      }
      res.json(users);
    });
};

// GET request for one users
exports.user_get = function (req, res, next) {
  User.findById(req.params.id).exec((err, user) => {
    if (user == undefined) {
      res.status(404);
      res.json({
        message: "User not found",
      });
    }
    if (err) {
      return next(err);
    }
    res.json(user);
  });
};

// post request to create a user
exports.user_post = [
  // Validate and sanitize fields.
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a first name."),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a last name."),
  body("email")
    .isEmail()
    .withMessage("must provide a valid email")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("email must be less than 100 characters long"),
  body("password")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a password"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors.
      res.json(errors.array());
      return;
    } else {
      // check to see if the email is in use
      User.findOne({ email: req.body.email }).exec((err, foundUser) => {
        if (foundUser) {
          res.json(
            {
              value: req.body.email,
              message: "email already in use",
              param: "email",
              location: "body",
            },
          );
        } else {
          // Email is not in use, so create user
          console.log("email is not being used");

          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            console.log("password hashed");
            if (err) {
              return next(err);
            }
            let user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hashedPassword,
            });
            user.save((err) => {
              if (err) {
                return next(err);
              }
              res.json({ message: "user created" });
            });
          });
        }
      });
    }
  },
];

// post request to update a user
exports.user_update = [
  // Validate and sanitize fields.
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a first name."),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a last name."),
  body("email")
    .isEmail()
    .withMessage("must provide a valid email")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("email must be less than 100 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors.
      res.json(errors.array());
      return;
    } else {
      // check to see if the email is in use
      User.findOne({ email: req.body.email }).exec((err, foundUser) => {
        if (foundUser && foundUser._id != req.params.id) {
          res.json(
            {
              value: req.body.email,
              message: "email already in use",
              param: "email",
              location: "body",
            },
          );
        } else {
          // Email is not in use, so update user
          console.log("email is not being used");

          let updatedUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
          };
          User.findByIdAndUpdate(req.params.id, updatedUser, (err) => {
            if (err) {
              return next(err);
            }
            res.json({ message: "user updated" });
          });
        }
      });
    }
  },
];

// delete a user
exports.user_delete = function (req, res, next) {
  User.findById(req.params.id).exec((err, foundUser) => {
    if (foundUser == undefined) {
      res.status(404);
      res.json({
        message: "User not found",
      });
    }
    if (err) {
      return next(err);
    } else {
      User.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
          return next(err);
        }
        res.json({message: "user deleted"});
      });
    }
  });
};
