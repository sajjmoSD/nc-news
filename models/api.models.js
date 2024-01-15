const db = require("../db/connection");
const format = require("pg-format");
const fs = require("fs/promises");

exports.retrieveEndPoints = async () => {
    const fileContents = await fs.readFile('./endpoints.json')
    const stringified = JSON.parse(fileContents)
    return stringified
    
 }