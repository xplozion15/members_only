const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

function showIndexPage(req, res) {
  res.render("indexPage");
}

function showSignupPage(req, res) {
  res.render("signUpPage", {});
}

function showLoginPage(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("logInPage", {});
  }
}

async function postUserToDb(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
      [req.body.username, req.body.email, hashedPassword],
    );
    res.redirect("/");
  } catch (error) {
    return next(error);
  }
}

module.exports = { showIndexPage, showSignupPage, postUserToDb, showLoginPage };
