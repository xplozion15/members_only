const express = require("express");
const letterRouter = express.Router();
const letterController = require("../controllers/letterController");
const passport = require("passport");

//get req
letterRouter.get("/new", letterController.showNewLetterForm);

//post req
letterRouter.post("/new", letterController.handleLetterPost);
letterRouter.post("/delete/:letterId", letterController.handleLetterDelete);

module.exports = { letterRouter };
