const db = require("../config/db");

//table-name: customers

const Customer = function (customer) {
	// this.customer_id = customer.customer_id;
	this.name = customer.name;
	this.password = customer.password;
	this.email_id = customer.email_id;
	this.address = customer.address;
	this.phone = customer.phone;
	this.token = customer.token;
};

Customer.create = (newCustomer, result) => {
	let query = "INSERT INTO customers SET ?;";
	console.log(newCustomer);
	db.query(query, newCustomer, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			console.log("here", { customer_id: res.insertId, ...newCustomer });
			result(null, { customer_id: res.insertId, ...newCustomer });
		}
	});
};
Customer.findAll = (result) => {
	let query = "SELECT * from customers;";
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Customer.findById = (customer_id, result) => {
	let query = `SELECT * from customers WHERE id = ${customer_id};`;
	db.query(query, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Customer.findByEmailAndPassword = (email_id, password, result) => {
	// console.log(email_id, password)
	let query = `SELECT * from customers WHERE email_id="${email_id}" and password="${password}";`;
	db.query(query, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Customer.updateById = (customer_id, customer, result) => {
	let query =
		"UPDATE customers SET name = ?, email_id = ?, address = ?, phone=? WHERE customer_id=?";
	db.query(
		query,
		[
			customer.name,
			customer.email_id,
			customer.address,
			customer.phone,
			customer_id,
		],
		(err, res) => {
			if (err) {
				console.log(err);
				result(err, null);
			} else {
				if (res.affectedRows == 0) result({ kind: "not_found" }, null);
				else result(null, { ...customer });
			}
		}
	);
};

module.exports = Customer;
