const { check } = require("express-validator");
const { isValidObjectId } = require("mongoose");

let validateSignup = [
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
  check("email").isEmail().withMessage("Enter a valid Email").normalizeEmail(),
  check("name")
    .not()
    .isEmpty()
    .withMessage("Enter A valid name")
    .trim()
    .escape(),
];
let validateSignin = [
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
  check("email").isEmail().withMessage("Enter a valid Email").normalizeEmail(),
];

let validateNote = [
  check("body").not().isEmpty().withMessage("Enter A valid body").escape(),
  check("category")
    .not()
    .isEmpty()
    .withMessage("Enter A valid category")
    .escape(),
];

module.exports = {
  validateSignup,
  validateSignin,
  validateNote,
};
