const mysql = require("mysql");
// var db = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	password: "VASAm@123",
// 	//TODO: change the name of the database
// 	database: "ecommerce",
// 	port: 3306,
// });

let db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "VASAm@123",
	database: "ecommerce",
	port: 3306,
});

// Connect to MySQL server
db.connect((err) => {
	if (err) {
		console.log("Database Connection Failed !!!", err);
	} else {
		console.log("connected to Database");
	}
	// db.query("SELECT * from products", (err, res) => {
	// 	if (!err) console.log(res);
	// });
});

module.exports = db;
