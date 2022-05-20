const db = require("../config/db");

//table-name: customers

const Seller = function (seller) {
	// this.customer_id = customer.customer_id;
	this.name = seller.name;
	this.password = seller.password;
	this.email_id = seller.email_id;
	this.address = seller.address;
	this.phone = seller.phone;
	this.token = seller.token;
};

Seller.findByEmailAndPassword = (email_id, password, result) => {
	let query = `SELECT * from sellers WHERE email_id="${email_id}" and password="${password}";`;
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			console.log(res);
			result(null, res);
		}
	});
};

module.exports = Seller;
