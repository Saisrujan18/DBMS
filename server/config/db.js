const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    //TODO: change the name of the database
    database: "ecommerce", 
});

module.exports = db;
