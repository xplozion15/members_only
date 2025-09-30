const db = require("../db/queries");
const { body, validationResult } = require("express-validator");



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
    .withMessage("Please enter a password")
];

module.exports = {validateUserLogin}


  // body("username")
  // .custom(async (value) =>{
  //   const existingUser = await db.findUsername(value);
  //   if (existingUser.length > 0) {
  //     throw new Error('Username is already taken');
  //   }
  // })