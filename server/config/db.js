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

/* Create customers table */
// CREATE TABLE `ecommerce`.`customers` (
//   `name` VARCHAR(45) NOT NULL,
//   `password` VARCHAR(45) NOT NULL,
//   `email_id` VARCHAR(45) NOT NULL,
//   `address` VARCHAR(45) NULL,
//   `token` VARCHAR(45) NULL,
//   `phone` VARCHAR(45) NULL,
//   `customer_id` INT NOT NULL AUTO_INCREMENT,
//   PRIMARY KEY (`email_id`),
//   UNIQUE INDEX `customer_id_UNIQUE` (`customer_id` ASC) VISIBLE,
//   UNIQUE INDEX `email_id_UNIQUE` (`email_id` ASC) VISIBLE);


module.exports = db;
