const db = require("../config/db");

//table-name: products

const Customer = function (customer) {
	// this.customer_id = customer.customer_id;
	this.name = customer.name;
    this.password = customer.password;
    this.email_id = customer.email_id;
    this.address = customer.address;
	this.phone = customer.phone;
};

Customer.create = (newCustomer, result) => {
	let query = "INSERT INTO customers SET ?;";
	console.log(newCustomer);
	db.query(query, newCustomer, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			console.log("here", { id: res.insertId, ...newCustomer });
			result(null, { id: res.insertId, ...newCustomer });
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
			result(err, null);
		} else {
			result(null, res);
		}
	});
};
Customer.updateById = (customer_id, customer, result) => {
	let query = "UPDATE customers SET name = ?, email_id = ?, address = ?, phone=? WHERE id=?";
	db.query(
		query,
		[customer.name, customer.email_id, customer.address, customer.phone, customer_id],
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.affectedRows == 0) result({ kind: "not_found" }, null);
				else result(null, { id: id, ...customer });
			}
		}
	);
};



module.exports = Customer;
