const db = require("../db/queries");
const { body } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

const validateUserLogin = [
  body("username").custom(async (value) => {
    const existingUser = await db.findUsername(value);
    if (existingUser.length === 0) {
      throw new Error("No such user exists");
    }
  }),
  body("password").notEmpty().withMessage("Please enter a password"),
];

const validateLetter = [
  body("text")
    .isLength({ min: 5, max: 30 })
    .withMessage("Letter length must be 8-30 characters"),
];

const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Username must be 3-12 characters")
    .custom(async (value) => {
      const findUsername = await db.findUsername(value);
      if (findUsername.length > 0) {
        throw new Error("Username already exists");
      }
    }),
  body("email").trim().isEmail().withMessage("Please enter a valid email id"),

  body("admin-password").custom((value, { req }) => {
    console.log("is-admin:", req.body.is_admin);
    console.log("admin-password value:", value);
    console.log("ADMIN_PASSWORD env:", process.env.ADMIN_PASSWORD);

    if (req.body["is-admin"] === "on") {
      if (!value) {
        throw new Error("Admin password is required");
      }
      if (value !== process.env.ADMIN_PASSWORD) {
        throw new Error("Admin password is incorrect");
      }
    }
    return true;
  }),
];

module.exports = { validateUserLogin, validateLetter, validateSignUp };
