const db = require("../db/queries");
const navbarLinks = [
  { href: "/", text: "Log in" },
  { href: "/", text: "Sign up" },
  { href: "/", text: "Log out" },
];

function showNewLetterForm(req, res) {
  res.render("createNewLetter",{navbarLinks:navbarLinks});
}

async function handleLetterPost(req, res) {
  const userId = req.user.id;
  const letterText = req.body.text;
  await db.postLetterToDb(letterText, userId);
  res.redirect("/");
}

async function handleLetterDelete(req, res) {
  const letterId = req.params.letterId;
  await db.deleteLetterFromDb(letterId);
  res.redirect("/");
}

module.exports = { showNewLetterForm, handleLetterPost, handleLetterDelete };
