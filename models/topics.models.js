const db = require("../db/connection");
const format = require("pg-format");

exports.retrieveTopics = () => {
    return db.query("SELECT * FROM topics");
}