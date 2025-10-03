const express = require("express");
const indexRouter = express.Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");
const { validateSignUp } = require("../validators/validationFunctions");

//get req
indexRouter.get("/", indexController.showIndexPage);
indexRouter.get("/sign-up", validateSignUp, indexController.showSignupPage);
indexRouter.get("/log-in", indexController.showLoginPage);
indexRouter.get("/membership-form", indexController.showMembershipForm);
//post req
indexRouter.post("/sign-up", validateSignUp, indexController.postUserToDb);

indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
);

indexRouter.post("/log-out", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

indexRouter.post("/membership-form", indexController.giveMembership);

module.exports = { indexRouter };
