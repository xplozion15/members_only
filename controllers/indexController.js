const pool = require("../db/pool");

function showIndexPage(req, res) {
  res.render("indexPage");
}

function showSignupPage(req, res) {
  res.render("signUpPage", {});
}

function showLoginPage(req, res) {
  res.render("logInPage", {});
}

async function postUserToDb(req, res, next) {
  try {
    await pool.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
      [req.body.username, req.body.email, req.body.password],
    );
    res.redirect("/");
  } catch (error) {
    return next(error);
  }
}

module.exports = { showIndexPage, showSignupPage, postUserToDb, showLoginPage };
