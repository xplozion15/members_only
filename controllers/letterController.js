const db = require("../db/queries");
const { validationResult } = require("express-validator");

const navbarLinks = [
  { href: "/", text: "Log in" },
  { href: "/", text: "Sign up" },
  { href: "/", text: "Log out" },
];

function showNewLetterForm(req, res) {
  if (req.user) {
    return res.render("createNewLetter", { navbarLinks: navbarLinks });
  }
  res.redirect("/");
}

async function handleLetterPost(req, res) {
  const userId = req.user.id;
  const letterText = req.body.text;

  const result = validationResult(req);

  if (result.isEmpty()) {
    await db.postLetterToDb(letterText, userId);
    res.redirect("/");
  } else {
    res.render("createNewLetter", {
      navbarLinks: navbarLinks,
      errors: result.array(),
    });
  }
}

async function handleLetterDelete(req, res) {
  const letterId = req.params.letterId;
  await db.deleteLetterFromDb(letterId);
  res.redirect("/");
}

module.exports = { showNewLetterForm, handleLetterPost, handleLetterDelete };
