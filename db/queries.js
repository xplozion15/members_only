const pool = require("./pool");


async function markMembershipInDb(userId) {
  await pool.query(
    "UPDATE users SET is_member = TRUE WHERE id = $1;",
    [userId]
  );
}






module.exports = {markMembershipInDb}