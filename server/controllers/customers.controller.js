const Customer = require("../models/customers.model");

const err_ = (res, message, op, e404 = false) => {
	if (e404) {
		res.status(404).send({
			message: message,
		});
		return;
	}
	res.status(500).send({
		message: message || `Some error occurred while performing: ${op}`,
	});
};

exports.create = (req, res) => {
	const {name, password, email_id, address, phone } = req.body;
	const customer = new Customer({
		name: name,
        password: password,
		email_id: email_id,
		address: address,
        phone: phone,
	});

	Customer.create(customer, (err, data) => {
		if (err) {
			err_(res, err.message, "creating");
		} else res.send(data);
	});
};

exports.findAll = (req, res) => {
	Customer.findAll((err, data) => {
		if (err) err_(res, err.message, "findAll");
		else res.send(data);
	});
};

exports.findById = (req, res) => {
	const customer_id = req.params.id;
	Customer.findById(customer_id, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${product_id}`, "findById", true);
			else err_(res, err.message);
		} else res.send(data);
	});
};

exports.updateById = (req, res) =>{
    if (!req.body) {
		res.state(400).send({
			message: "Empty Content for update",
		});
	}
	const customer_id = req.body.product_id;
	const customer = new Customer(req.body);
	Customer.updateById(customer_id, customer, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${customer_id}`, "UpdateById", true);
			else err_(res, err.message, "updateById");
		} else res.send(data);
	});
}

