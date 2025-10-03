const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();


const validateUserLogin = [
  body("username")
    .custom(async (value)=>{
        const existingUser = await db.findUsername(value);
        if(existingUser.length === 0) {
          throw new Error("No such user exists")
        }
    }),
    body("password")
    .notEmpty()
    .withMessage("Please enter a password"),
    
];

const validateLetter = [
  body("text")
  // .notEmpty()
  // .withMessage("Please write your letter")
  .isLength({ min: 5, max: 30 })
  .withMessage("Letter length must be 8-30 characters")
]


const validateSignUp = [
  body("username")
  .trim()
  .isLength({min:3 ,max:12})
  .withMessage("Username must be 3-12 characters")
  .custom(async (value) => {
    const findUsername =   await db.findUsername(value);
    if(findUsername.length > 0) {
      throw new Error("Username already exists");
    }
    }),
    body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email id"),

    body("password")
    .trim()
    .isLength({ min: 4, max: 16 })
    .withMessage("Password must be 4-16 characters"),
  
    body("admin-password").custom((value, { req }) => {
  if (req.body.is_admin) {
   
    if (value !== process.env.ADMIN_PASSWORD) {
      throw new Error("Admin password is incorrect");
    }
  }
  return true
})  
]

module.exports = {validateUserLogin,validateLetter,validateSignUp}



