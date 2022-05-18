const CartItem = require("../models/cartitems.model");

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
	const { customer_id, product_id, quantity } = req.body;
	const cartitem = new CartItem({
		customer_id,
		product_id,
		quantity,
	});

	CartItem.create(cartitem, (err, data) => {
		if (err) {
			err_(res, err.message, "creating");
		} else res.send(data);
	});
};

exports.findAll = (req, res) => {
	CartItem.findAll((err, data) => {
		if (err) err_(res, err.message, "findAll");
		else res.send(data);
	});
};

exports.findById = (req, res) => {
	const customer_id = req.user.customer_id;
	console.log(customer_id);
	CartItem.findByCustomerId(customer_id, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No cartitem with id: ${cartitem_id}`, "findById", true);
			else err_(res, err.message);
		} else res.send(data);
	});
};

exports.updateById = (req, res) => {
	if (!req.body) {
		res.state(400).send({
			message: "Empty Content for update",
		});
	}
	const cartitem_id = req.body.cartitem_id;
	const cartitem = new CartItem(req.body);
	CartItem.updateById(cartitem_id, cartitem, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No cartitem with id: ${cartitem_id}`, "UpdateById", true);
			else err_(res, err.message, "updateById");
		} else res.send(data);
	});
};

exports.deleteById = (req, res) => {
	const cartitem_id = req.body.cartitem_id;
	CartItem.deleteById(cartitem_id, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${cartitem_id}`, "DeleteById", true);
			else err_(res, err.message, "deleteById");
		} else res.send(data);
	});
};
