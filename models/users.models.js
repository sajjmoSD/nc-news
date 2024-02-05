const db = require("../db/connection")

exports.fetchUsers = () =>{
    return db.query(`
    SELECT * FROM users;
    `)
}
exports.fetchUsersByUsername = (username) => {
    return db.query(`
        SELECT users.* FROM users
        WHERE username = $1
    `, [username])
}