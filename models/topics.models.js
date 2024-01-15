const db = require("../db/connection");
const format = require("pg-format");
const fs = require("fs/promises");

exports.retrieveTopics = () => {
    return db.query("SELECT * FROM topics");
}
