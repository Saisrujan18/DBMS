const Order = require("../models/orders.model");

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
	const { orderList } = req.body;

	let orderObjects = [];
	for(x in orderList){
		const {customer_id, product_id, quantity, status, placedAt} = orderList[x];
		const orderObject = new Order({
			customer_id,
			product_id,
			quantity,
			status,
			placedAt
		});
		orderObjects.push(orderObject);
	}

	Order.create(orderObjects, (err, data) => {
		if (err) {
			err_(res, err.message, "creating");
		} else res.send(data);
	});
};

exports.findAll = (req, res) => {
	Order.findAll((err, data) => {
		if (err) err_(res, err.message, "findAll");
		else res.send(data);
	});
};

exports.findById = (req, res) => {
	const customer_id = req.params.id;
	Order.findByCustomerId(customer_id, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${product_id}`, "findById", true);
			else err_(res, err.message);
		} else res.send(data);
	});
};

exports.findBySellerId = (req, res) => {
	const seller_id = req.params.id;
	Order.findBySellerId(seller_id, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${seller_id}`, "findById", true);
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
	const order_id = req.body.order_id;
	const product = new Order(req.body);
	Order.updateById(order_id, product, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${product_id}`, "UpdateById", true);
			else err_(res, err.message, "updateById");
		} else res.send(data);
	});
};
