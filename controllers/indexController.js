const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const db = require("../db/queries");
dotenv.config();

function showIndexPage(req, res) {
  res.render("indexPage");
}

function showSignupPage(req, res) {
  res.render("signUpPage", {});
}

function showMembershipForm(req, res) {
  res.render("membershipForm", {});
}

function showLoginPage(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("logInPage", {});
  }
}

async function postUserToDb(req, res, next) {

  const isUserAdmin = req.body["is_admin"]; // on or off expected value from the req body through the form

  const userInputAdminPassword = req.body["admin-password"];
  const adminPassword = process.env.ADMIN_PASSWORD;
  const doesAdminPasswordMatch = userInputAdminPassword === adminPassword;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (isUserAdmin === undefined) {
  
        await pool.query(
          "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
          [req.body.username, req.body.email, hashedPassword],
        );
        res.redirect("/");
    }
    else if (isUserAdmin === "on") {
      if (doesAdminPasswordMatch) {
        await pool.query(
          "INSERT INTO users (username,email,password,is_admin) VALUES ($1,$2,$3,$4)",
          [req.body.username, req.body.email, hashedPassword,"TRUE"],
        );
        res.redirect("/");
      }
      else {
        res.send("wrong password bruh?")
      }
    }
  } catch (error) {
    return next(error);
  }
}

async function giveMembership(req, res) {
  const userId = req.user.id;
  const userPasswordInput = req.body["membership-password"];
  if (userPasswordInput === process.env.MEMBERSHIP_PASSWORD) {
    await db.markMembershipInDb(userId);
    res.redirect("/");
  } else {
    res.redirect("/membership-form");
  }
}

module.exports = {
  showIndexPage,
  showSignupPage,
  postUserToDb,
  showLoginPage,
  showMembershipForm,
  giveMembership,
};
