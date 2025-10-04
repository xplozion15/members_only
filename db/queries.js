const pool = require("./pool");

async function markMembershipInDb(userId) {
  await pool.query("UPDATE users SET is_member = TRUE WHERE id = $1;", [
    userId,
  ]);
}

async function getLetters() {
  const { rows } = await pool.query(
    "SELECT * FROM users INNER JOIN letters ON users.id = letters.user_id ORDER BY TIMESTAMP DESC;",
  );
  return rows;
}

async function postLetterToDb(letterText, userId) {
  await pool.query("INSERT INTO letters (text,user_id) VALUES ($1,$2);", [
    letterText,
    userId,
  ]);
}

async function deleteLetterFromDb(letterId) {
  await pool.query("DELETE FROM letters WHERE id = $1", [letterId]);
}

async function findUsername(value) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    value,
  ]);
  return rows;
}

async function insertUser(username, email, hashedPassword) {
  await pool.query(
    "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
    [username, email, hashedPassword],
  );
}

async function insertAdminUser(username, email, hashedPassword) {
  await pool.query(
    "INSERT INTO users (username,email,password,is_member,is_admin) VALUES ($1,$2,$3,$4,$5)",
    [username, email, hashedPassword, true, true],
  );
}

module.exports = {
  markMembershipInDb,
  getLetters,
  postLetterToDb,
  deleteLetterFromDb,
  findUsername,
  insertUser,
  insertAdminUser,
};
