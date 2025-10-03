const express = require("express");
const letterRouter = express.Router();
const letterController = require("../controllers/letterController");
const { validateLetter } = require("../validators/validationFunctions");

//get req
letterRouter.get("/new", letterController.showNewLetterForm);

//post req
letterRouter.post("/new", validateLetter, letterController.handleLetterPost);
letterRouter.post("/delete/:letterId", letterController.handleLetterDelete);

module.exports = { letterRouter };
